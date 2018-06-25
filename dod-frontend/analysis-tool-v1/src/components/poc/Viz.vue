<template>
  <div id="vizWrapper" :style="{width: width+'px', height: height+'px'}">
    <svg xmlns="http://www.w3.org/2000/svg">
    </svg>
    <tooltip
      :x="toolTipX"
      :y="toolTipY"
      :types="toolTipTypes"
      :nodeId="toolTipId"
      v-on:input="toolTipEvent(arguments)"
     ></tooltip>
  </div>
</template>

<script>
import * as d3 from 'd3';

import Tooltip from "@/components/Tooltip"
export default {
  name: 'viz',
  components:{
    Tooltip
  },
  data () {
    return {
      svg: undefined,
      chart: undefined,
      linkLayer: undefined,
      nodeLayer: undefined,
      labelLayer: undefined,
      
      simulation: undefined,
      root: undefined,
      node: undefined, 
      label: undefined,
      link: undefined,
      
      toolTipX: 20,
      toolTipY: 20,
      toolTipTypes: [],
      toolTipId:0,
    }
  },
  props:[
    'width',
    'height',
    'graphData',
  ],
	watch: {
   
    '$props.height':{
      handler: function (val, oldVal) { 
        console.log("[Viz] height changed");
        console.log(val);
      },
      deep: true
    },
    '$props.width':{
      handler: function (val, oldVal) { 
        console.log("[Viz] width changed");
        console.log(val);
      },
      deep: true
    },
    '$props.graphData':{
      handler: function (val, oldVal) { 
        console.log("[Viz] graphData changed");
        console.log(val);
        this.processNewData(val.connections[0].slice(0,50));
      },
      deep: true
    }
  },
  mounted(){
    this.svg = d3.select("svg");
    this.chart = this.svg.append("g");

    this.linkLayer = this.chart.append("g");
    this.nodeLayer = this.chart.append("g");
    this.labelLayer = this.chart.append("g");

    var attractForce = d3.forceManyBody().strength(d=>{
      console.log(d);
      if(d.type == "project"){
        return 0.1;
      }else{
        return -5000;
      }
    }).distanceMax(1000).distanceMin(200);
    var repelForce = d3.forceManyBody().strength(d=>{
      console.log(d);
      if(d.type == "project"){
        return -70;
      }else{
        return -5000;
      }
    }).distanceMax(200).distanceMin(4);


    this.simulation = d3.forceSimulation()
        //.force("attract", attractForce)
        //.force("repell", repelForce)
        .force("specific", d3.forceManyBody().strength(-90))
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force("link", d3.forceLink().id(d=> d.id))
        .on("tick", this.ticked)
    ;

    this.node = this.nodeLayer.selectAll(".node").attr("class", "node");
    this.link = this.linkLayer.selectAll(".link").attr("class", "link");
    this.label = this.labelLayer.selectAll(".label").attr("class", "label");

  },
  methods: {
    getNode(id){
      return this.root.filter(d=>d.id==id)[0];
    },
    flatten(root) {
      var nodes = []; var links = [];
      let ids = [];
      
      let that = this;

      function recurse(node, parentNode){
        if(node.Relationships){
          //node.Relationships.filter(d => (d.display && d.type == "ProvinceOrState" && (d.title == "California" || d.title == "New York"))).forEach(d => recurse(d, node.id));
          node.Relationships.filter(d => (d.display)).forEach(d => recurse(d, node.id));
        }


        if(!ids.includes(node.id)){
          if(parentNode){
            console.log("NODE", node.x);
            if(node.x == undefined){
              let parent = that.getNode(parentNode);
              node.x = parent.x;
              node.y = parent.y;
            }
            node.parents = [parentNode];
          }
          nodes.push(node);
          ids.push(node.id);
        }else{
          let existing = nodes.filter(d=>d.id==node.id)[0];
          existing.parents.push(parentNode);
          console.log("pushing")
        }
        if(parentNode){
          links.push({source: parentNode, target: node.id});
        }


      };

      root.forEach(d => recurse(d, null));
      return {nodes:nodes, links: links};


    },
    updateGraph(){
      let nodeslinks = this.flatten(this.root)
      let nodes = nodeslinks.nodes;
      console.log("[Viz] nodes to display");
      console.log(nodes);

    //  let nodeslinks = this.flatten(this.root)
    //  let nodes = nodeslinks.nodes;
    //  //nodes = [nodes[0], nodes[1]];
      let links = nodeslinks.links;
      console.log("[Viz] links to display");
      console.log(links);

    //  
      this.simulation.nodes(nodes, d => d.id);
      this.simulation.force("link").links(links);
    //  //
      // Update the links…
      this.link = this.link.data(links, function(d) { return d.target.id; });

    //  // Exit any old links.
      this.link.exit().remove();

      // Enter any new links.
      this.link = this.link.enter().insert("line", ".node")
          .attr("class", "link")
          .attr("stroke", "white")
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; })
          .merge(this.link)
      ;

      this.node = this.node.data(nodes, d=>d.id);
      this.node.exit().remove();
      this.node = this.node.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
          .attr("r", d => {
            //console.log(d);
            //console.log(d.data.type);
            if(d.type == "project"){
              return 10;
            }else{
              return 4;
            }
          })
          .attr("fill", "white")
          .on("click", this.click)
          .on("mouseover", d=>{
            console.log(d, d3.event.pageX);
            this.toolTipX = d3.event.pageX;
            this.toolTipY = d3.event.pageY- 100;
            this.toolTipTypes = [];
            if(d.Relationships){
              this.toolTipTypes = d.Relationships.reduce( function(acc, dd){
                let t = dd.type;
                console.log("d", dd);
                console.log("acc", acc);
                if(!acc.includes(t)){
                  acc.push(t);
                }
                return acc;
              }, []);
            }
            this.toolTipId = d.id;
          })
          .merge(this.node)
      ;

      this.label = this.label.data(nodes, d=>d.id);
      this.label.exit().remove();
      this.label = this.label.enter().append("text")
          .attr("class", "label")
          .attr("x", function(d) { return d.x+20; })
          .attr("y", function(d) { return d.y+20; })
          .attr("fill", "red")
          .style("font-size", "12px")
          .text((d, i)=>{
            if(d.type){
              console.log(d)
              if(d.type == "project"){
                return ""
                return (String(i) + " " + d.type);
              }else{
                if(d.parents.length > 1){
                  console.log("DD");
                 
                  return d.type + "  " + d.title;
                }
                return ""
              }
            }else{
              return "";
            }
          })
          .merge(this.label)
      ;
      this.simulation.alpha(1).restart();

    },
    ticked() {

      let margin =40;
      let radius = 10;

      this.link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        this.node
          .attr("cx", d => { return d.x = Math.max(margin+radius, Math.min(this.width - margin - radius, d.x)); })
          .attr("cy", d => { return d.y = Math.max(margin+radius, Math.min(this.height - margin - radius, d.y)); });

      this.label
          .attr("x", function(d) { return 10+d.x; })
          .attr("y", function(d) { return 10+d.y; });
      
    },
    click(d) {
      console.log(d);
      if (!d3.event.defaultPrevented) {
        //d.fx = d.x;
        //d.fy = d.y;
        d.Relationships.forEach(d => {
          d.display = true;
        });
        //if (d.children) {
        //  d._children = d.children;
        //  d.children = null;
        //} else {
        //  d.children = d._children;
        //  d._children = null;
        //}
        this.updateGraph();
       }
    },
    unfoldAll(type){
      this.root.forEach(d=>{
        d.Relationships.forEach(r=>{
          if(r.type == type){
            r.display = true;
          }
        })
      });
        this.updateGraph();
    },
    processNewData(newData){
      console.log("[Viz] processing new data");
      console.log(newData);
      // // just for my sanity I delete some keys here
      newData.forEach(d => {
        delete d.checked;
        delete d.contract_numbers;
        delete d.full_text;
        delete d.createdAt;
        delete d.filing_date;
        delete d.updatedAt;
        delete d.amount;
        delete d.DepartmentId;
        d.display = true;
        d.type = "project";
        // // and I'll also delete some in their Relationships
        d.Relationships.forEach(r => {
          delete r.ProjectRelationship;
          delete r.createdAt;
          delete r.updatedAt;
          r.display = false;
          //r.parents = [d.id];
        });
      });
      this.root = newData;

      this.updateGraph();



      console.log(newData[0]);
      //this.root = d3.hierarchy({type:'origin', Relationships: newData}, d=> d.Relationships);
      //this.root.descendants().filter(d => d.data.id)
      //      .forEach(d=>{
      //        if(d.children){
      //          d._children = d.children;
      //          d.children = null;
      //        }
      //        return d;
      //      });
      //console.log('root',this.root);
      //this.updateGraph();

    },
    toolTipEvent(args){
      console.log("tooltipevent", args);
      let data = args[0];
      if(data.type = "unfold"){
        console.log("unfold", data.data);
        this.root.filter(d => d.id == data.data.id).forEach(d=>{
          d.Relationships.forEach(r=>{
            if(r.type == data.data.type){
              r.display = true;
            }
          })
        });
        this.updateGraph();
      }
      
    }

  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #vizWrapper{
    position: relative;
  }
  svg{
    position: absolute;
    background-color: black;
    width:100%;
    height:100%;
   
  }
</style>
