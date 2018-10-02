<template>
  <!--<div id="vizWrapper" :style="{width: width+'px', height: height+'px', display: 'inline-block', float: 'left'}">-->
  <div id="viz" :style="{height:height+'px'}">
    <div id="vizControl">
      <p>verbose note: entering contracts will ALWAYS connect to relations they share that are already on display</p>
      <br>
      <p>in addition we have the option of automatically folding out relation nodes if they are shared by
      <input type="number" name="points" value=2 min=1 step="1" @change=changeThreshold>
      or more contract nodes. Click here <input type="checkbox" checked=unfoldSharedRelationsByDefault @click=toggleUnfoldSharedRelationsByDefault ></input> to activate this behaviour by default or click <a href="#" @click="unfoldSharedRelationByThreshold">here</a> to run in just once on for the nodes on display.</p>


    </div>
    <!--<div id="currentNode" v-if=currentNode>-->
      <!--<p v-if="currentNode.type=='project'">{{currentNode.id}}</p>-->
      <!--<p v-else>{{currentNode.title}}</p>-->
    <!--</div>-->
    <tooltip
      :xPos=tooltipX
      :yPos=tooltipY
      :fullactive=tooltipFullactive
      :setActiveNode=setActiveNode
      :currentNode=currentNode
      :deleteProject=deleteProject
      :setSubnode=setSubnode
      :setAnimateViz=setAnimateViz
      
      :unselectProject=unselectProject
    >
    </tooltip>
    <svg xmlns="http://www.w3.org/2000/svg">
    </svg>
  </div>
</template> 
<script>
import * as d3 from 'd3';
import Tooltip from '@/components/Tooltip'

import {mapGetters, mapActions} from 'vuex';

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

      data: {
        nodes:[],
        links:[]
      },

      currentNode: undefined,

      tooltipX: -500,
      tooltipY: -500,
      tooltipFullactive: false,
    }
  },
  props:[
    'nodeData',
    'width',
    'height',
    'setActiveNode',
    'activeNode',
    'requestRelatedToId',
    'unfoldSharedRelationsByDefault',
    'toggleUnfoldSharedRelationsByDefault',
    'changeThreshold',
    'unfoldSharedRelationByThreshold',
    
    'deleteProject',
    'setSubnode',

    'animateViz',
    'setAnimateViz',
    'unselectProject',

  ],
  computed:{
    ...mapGetters([
    ]),
    dataIds: function(){
      return this.data.map(d=>d.id);
    }
  },
	watch: {
   
    '$props.nodeData':{
      handler: function (val, oldVal) { 
        this.integrateChanges(val);
      },
      deep: true
    },
    '$props.activeNode':{
      handler: function (val, oldVal) { 
        console.log("[Viz] activeNode changed");
        console.log(val);
        this.node.selectAll(".activeRing")
          .attr("stroke", d=>{
            if(d.id==val){ 
              return 'red';
            }else{
              return 'none';
            }
          })
        ;
        this.link
          .attr("stroke-width", d=>{
            if(d.target.id == val || d.source.id == val){
              return 2;
            }else{
              return 1;
            }
          })
          .attr("stroke", d=>{
            if(d.target.id == val || d.source.id == val){
              return 'red'
            }else{
              return 'grey'
            }
          })
        ;
      },
      deep: true
    },
  },
  mounted(){
    this.svg = d3.select("svg");
    this.chart = this.svg.append("g").attr("class", "chart");

    this.linkLayer = this.chart.append("g").attr("class", "linkLayer");
    this.nodeLayer = this.chart.append("g").attr("class", "nodeLayer");
    this.labelLayer = this.chart.append("g").attr("class", "labelLayer");



    this.simulation = d3.forceSimulation()
        //.force("attract", attractForce)
        //.force("repell", repelForce)
        //.force("specific", d3.forceManyBody().strength(-50))
        .force("specific", d3.forceManyBody().strength(d=>{
             if(d.type == "project"){
              console.log(d); 
               if(d.subnodes.length > 0){
                 console.log("long");
                 return -2000;
               }else{
                 return -100;
               }
             }else{
               return -10;
             }
        }))
        //.force("x", d3.forceX().strength(0.002))
        //.force("y", d3.forceY().strength(0.002))
        .force("center", d3.forceCenter(this.width/2, this.height/2))
        .force("collide", d3.forceCollide().radius(20).iterations(2))
        .force("link", d3.forceLink().id(d=> d.id))
        .on("tick", this.ticked)
    ;

    this.node = this.nodeLayer.selectAll(".node").attr("class", "node");
    this.link = this.linkLayer.selectAll(".link").attr("class", "link");
    //this.label = this.labelLayer.selectAll(".label").attr("class", "label");

		//this.unwatchSelection = this.$store.watch(this.$store.getters.selectionWatcher, n => {
    //  console.log("todo", n);
    //  

    //  this.processNewData(n.map(id => this.getProjectById(id)));
    //})
  },
  methods: {
    ticked() {

      let margin =10;
      let radius = 10;
      let w = 300;
      let height = 300;


      this.node
        //.attr("x", d => { return d.x = Math.max(margin+radius, Math.min(this.width - margin - radius, d.x)); })
        //.attr("y", d => { return d.y = Math.max(margin+radius, Math.min(this.height - margin - radius, d.y)); });
        .attr("transform", d=>{
          d.x = Math.max(margin+radius, Math.min(this.width - margin - radius, d.x));
          d.y = Math.max(margin+radius, Math.min(this.height - margin - radius, d.y));
          return "translate("+d.x+","+d.y+")";

        })
      ;
      this.link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      //this.label
      //    .attr("x", function(d) { return 10+d.x; })
      //    .attr("y", function(d) { return 10+d.y; });
      
    },
    updateGraph(){
      this.simulation.nodes(this.data.nodes, d => d.id);
      this.simulation.force("link").links(this.data.links);

      this.link = this.link.data(this.data.links, function(d) { return d.target.id; });

    //  // Exit any old links.
      this.link.exit().remove();

      // Enter any new links.
      this.link = this.link.enter().insert("line", ".node")
          .attr("class", "link")
          .attr("stroke", "grey")
          .attr("stroke-width", 1)
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; })
          .merge(this.link)
      ;

      this.node = this.node.data(this.data.nodes, d=>d.id);
      this.node.selectAll(".markedRing")
                .attr("stroke", d=>{
                    return d.marked; // this assumes the incoming node is always currently hovered (in the pane)
                })
      ;

      
      this.node.exit().remove();
        
      this.nodeIn = this.node.enter().append("g").attr("class", "node")
                    //.attr("x", 200)
                    //.attr("y", 200)
                    .attr("translate", d=>"transform("+d.x+","+d.y+")")
                .call(d3.drag()
                  .on("start", this.dragstarted)
                  .on("drag", this.dragged)
                  .on("end", this.dragended)
                )
      ;
      

      this.nodeIn
                .append("circle")
                .attr("class", "main")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", d=>{
                  if(d.type=='project'){
                    return 15;
                  }else{
                    return 6;
                  }
                })
                .attr("fill", d=>{

                  if(d.type=='project'){
                    return 'white';
                  }else{
                    return 'blue';
                  }

                })

                .on('mouseover', (d,i,nodes)=>{
                  this.setActiveNode(d.id, true);
                  this.currentNode = d;
                  this.tooltipX = d.x + 20;
                  this.tooltipY = d.y - 110;
                  this.tooltipFullactive = true;

                  //d3.select(nodes[i]).select(".main").attr("fill","red");
                })
                .on('mouseout', (d,i,nodes)=>{
                  this.setActiveNode(d.id, false);
                  //if(d.type=='project'){
                  //d3.select(nodes[i]).select(".main").attr("fill","white");
                  //}else{
                  //d3.select(nodes[i]).select(".main").attr("fill","blue");
                  //}
                  //this.hideTooltip();
                  this.tooltipX = null;
                  this.tooltipY = null;
                  this.tooltipFullactive = false;
                })
                .on('click', (d,i,nodes)=>{
                  if(d.type!='project'){
                    console.log("clicked", d.id, d);
                    this.requestRelatedToId({type: 'relation', value: d.title}, d.id);
                  }
                })
      ;
      this.nodeIn
                .append("circle")
                .attr("class", "activeRing")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", d=>{
                  if(d.type=='project'){
                    return 15 + 8;
                  }else{
                    return 6 + 8;
                  }
                })
                .attr("fill", "none")
                .attr("stroke", d=>{
                  if(d.type=='project'){
                    return 'red'; // this assumes the incoming node is always currently hovered (in the pane)
                  }else{
                    return 'none';
                  }
                })
                .attr("stroke-width", 3);
      ;
      this.nodeIn
                .append("circle")
                .attr("class", "markedRing")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", d=>{
                  if(d.type=='project'){
                    return 15 + 2;
                  }else{
                    return 6 + 2;
                  }
                })
                .attr("fill", "none")
                .attr("stroke", d=>{
                    return d.marked; // this assumes the incoming node is always currently hovered (in the pane)
                })
                .attr("stroke-width", 2);
      ;
      this.node = this.nodeIn.merge(this.node);


      if(!this.animateViz){
        //this needs a solution
        // generally how to not animate a graph like crazy??
        this.simulation.alpha(1).restart();
        this.setAnimateViz(true);
      }else{
        this.simulation.alpha(1).restart();
      }


    },
    flatten(nestedData){
      let keys = [];
      let out = [];
      //nestedData.forEach(d=>{
      //  if
      //});
      let o = nestedData.reduce((acc, d)=>{
        if(!acc.map(node=>node.id).includes(d.id)){
          console.log("checking", d);
          acc.push(d); 
        }
        d.subnodes.forEach(subnode=>{
          if(!acc.map(node=>node.id).includes(subnode.id)){
            acc.push(subnode); 
          }
        });
        return acc;

      }, []);
      return o;

      
    },
    integrateChanges(newData){
      console.log("latest", newData);
      
      //this.data = newData;


      let allVisibleSubnodeIds = [];
      newData = newData.map(node=>{
        //let links = []; 

        // go over subnodes here

        let subnodes = node.relationships.filter(subnode=>subnode.visible).map(subnode=>{
          //links.push({source: node.id, target: subnode.id});
          if(!allVisibleSubnodeIds.includes(subnode.id)){
            allVisibleSubnodeIds.push(subnode.id);
          }

          if(this.data.nodes.map(d=>d.id).includes(subnode.id)){
            return this.data.nodes.find(d=>d.id==subnode.id);
          }else{
            if(this.data.nodes.map(d=>d.id).includes(node.id)){
              //the idea here is that the subnode orgin in the node that it is folded out from
              // but i am not sure if this works yet
              subnode.x = node.x;
              subnode.y = node.y;
              
              // this is experimental, freezing the mother nood in place while subndes unfold
              // then unfreeze after timeout
              node.fx = node.x;
              node.fy = node.y;
              setTimeout(function(){
                node.fx = undefined;
              }, 1500);

            }else{
              //the idea here is that the subnode orgin in the node that it is folded out from
              // but i am not sure if this works yet
              subnode.x = this.width*0.5;
              subnode.y = this.height*0.5;
            }
            return subnode;
          }
        })
        console.log("subnodes", subnodes);

        if(this.data.nodes.map(d=>d.id).includes(node.id)){
          let n = this.data.nodes.find(d=>d.id==node.id);
          console.log("got this node already!", n);
          n.subnodes = subnodes;
          //n.links = links;
          return n;
        }else{
          node.x = this.width*0.5;
          node.y = this.height*0.5;
          node.subnodes = subnodes;
          node.type = 'project';
          //node.links = links;
          return node;
        }
      });

      //now create links. the reason i am not doing this within the loops above is that need links even if a node
      // has no subnodes unfolded as long as a subnode that it WOULD be connected to is currently on display.
      this.data.links = [];
      newData.forEach(node=>{
        node.relationships.forEach(d=>{
          if(allVisibleSubnodeIds.includes(d.id)){
            this.data.links.push({source:node.id, target:d.id, id: [node.id,d.id].join("-")});
          }
        });
      });

      this.data.nodes = this.flatten(newData);
      this.updateGraph();
    },
    dragstarted(d) {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    dragended(d) {
      if (!d3.event.active) this.simulation.alphaTarget(0);
      // comment next two lines to fix nodes after dragging
      //d.fx = null;
      //d.fy = null;
    },
    hideTooltip(){
      this.tooltipX = -500;
      this.tooltipY = -500;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #viz{
    position:relative;
  }
  svg{
    background-color: black;
    width:100%;
    height:100%;
  }
  #vizControl{
    position: absolute;
  }
  #vizControl p{
    color: white;
    font-family: sans-serif;
    display: inline-block;
    margin:0;
    margin-right:10px;
  }

  #currentNode{
    position: absolute;
    top: 20px;
  }
  #currentNode p{
    color: white;
    font-family: sans-serif;
    display: inline-block;
    margin:0;
    margin-right:10px;
  }

</style>
