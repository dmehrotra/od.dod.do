<template>
  <div :style="{width: width+'px', height: height+'px'}">
    <svg xmlns="http://www.w3.org/2000/svg">
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'viz',
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
        console.log(val.connections[0]);
        this.processNewData(val.connections[0]);
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

    var attractForce = d3.forceManyBody().strength(0.1).distanceMax(400).distanceMin(70);
    var repelForce = d3.forceManyBody().strength(-200).distanceMax(70).distanceMin(4);

    this.simulation = d3.forceSimulation()
      .force("attract", attractForce)
      .force("repell", repelForce)
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force("link", d3.forceLink().id(d=> d.data.id))
        .on("tick", this.ticked)
    ;

    this.node = this.nodeLayer.selectAll(".node").attr("class", "node");
    this.link = this.linkLayer.selectAll(".link").attr("class", "link");
    this.label = this.labelLayer.selectAll(".label").attr("class", "label");

  },
  methods: {
    flatten(root) {
      var nodes = [];
      var links = [];
      let ids = [];
      function recurse(node, parentNode) {
        console.log(node.data.id, parentNode);
        if (node.children) node.children.forEach(d => recurse(d, node.data.id));
        if (parentNode){
          links.push({source: parentNode, target: node.data.id});
        }
        if(node.data.type != 'origin' && !ids.includes(node.data.id)){
          nodes.push(node);
          ids.push(node.data.id);
        }
      }
      recurse(root, null);
      //console.log('links', links);
      return {nodes:nodes, links: links};
    },
    updateGraph(){
      let nodeslinks = this.flatten(this.root)
      let nodes = nodeslinks.nodes;
      //nodes = [nodes[0], nodes[1]];
      let links = nodeslinks.links;
      console.log("nodes", nodes);

      
      this.simulation.nodes(nodes, d=>d.data.id);
      this.simulation.force("link").links(links);
      //
      // Update the links…
      this.link = this.link.data(links, function(d) { return d.target.data.id; });

      // Exit any old links.
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

      this.node = this.node.data(nodes, d=>d.data.id);
      this.node.exit().remove();
      this.node = this.node.enter().append("circle")
          .attr("class", "node")
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
          .attr("r", d => {
            //console.log(d);
            //console.log(d.data.type);
            if(d.data.Relationships){
              return 10;
            }else{
              return 4;
            }
          })
          .attr("fill", "white")
          .on("click", this.click)
          .merge(this.node)
      ;

      this.label = this.label.data(nodes, d=>d.data.id);
      this.label.exit().remove();
      this.label = this.label.enter().append("text")
          .attr("class", "label")
          .attr("x", function(d) { return d.x+20; })
          .attr("y", function(d) { return d.y+20; })
          .attr("fill", "red")
          .style("font-size", "12px")
          .text(d=>{
            if(d.data.type){

            console.log(d)
              return d.data.type;
            }else{
              return "";
            }
            //return "$" + d.data.amount;
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
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        this.updateGraph();
       }
    },
    processNewData(newData){
      console.log("[Viz] processing new data");
      this.root = d3.hierarchy({type:'origin', Relationships: newData}, d=> d.Relationships);
      this.root.descendants().filter(d => d.data.id)
            .forEach(d=>{
              if(d.children){
                d._children = d.children;
                d.children = null;
              }
              return d;
            });
      console.log('root',this.root);
      this.updateGraph();

    },

  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{

  }
  svg{
    background-color: grey;
    width:100%;
    height:100%;
  }
</style>
