<template>
  <div id="viz" :style="{height:windowDims.height+'px'}" >
    <resize-observer @notify="vizResized" />
    <a class='settings-button' @click=toggleVizSettings v-show=!showVizSettings>settings</a>

    <!--<svg xmlns="http://www.w3.org/2000/svg" id='vizsvg' :width=vizWidth :height=windowDims.height>-->

    <tooltip
      :xPos=tooltipX
      :yPos=tooltipY
    >
    </tooltip>
    <svg xmlns="http://www.w3.org/2000/svg" id='vizsvg' :height=windowDims.height>


    </svg>
    <p class="zoomNote" v-show=zoomable
       :style="">scroll to zoom</p>
    <viz-settings v-if=showVizSettings
       :vizWidth=vizWidth
      >
    </viz-settings>
  </div>
</template> 
<script>
import * as d3 from 'd3';
import Tooltip from '@/components/Tooltip'

import VizSettings from '@/components/VizSettings'
//import { forceCluster } from 'd3-force-cluster'
import { forceAttract } from 'd3-force-attract'

import { ResizeObserver } from 'vue-resize'
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'viz',
  components:{
    ResizeObserver,
    VizSettings,
    Tooltip,
  },
  data () {
    return {
      ready: false,
      zoomable: false,
      svg: undefined,
      chart: undefined,
      zoomLayer: undefined,
      centerLayer: undefined,
      linkLayer: undefined,
      nodeLayer: undefined,
      labelLayer: undefined,
      
      simulation: undefined,
      //root: undefined,
      node: undefined, 
      //label: undefined,
      link: undefined,
      zoom: undefined,

      data: {
        nodes:[],
        links:[]
      },

      //currentNode: undefined,

      tooltipX: -500,
      tooltipY: -500,
      //tooltipFullactive: false,
      //boundaryRadius: 50,
      projectNodeRadius: 20,
      relationNodeRadius: 10,
      unwatchFocus: undefined,
    }
  },
  props:[
    'nodeData',
    //'width',
    //'height',
    //'setActiveNode',
    //'activeNode',
    //'requestRelatedToId',
    //'unfoldSharedRelationsByDefault',
    //'toggleUnfoldSharedRelationsByDefault',
    //'changeThreshold',
    //'unfoldSharedRelationByThreshold',
    //
    //'deleteProject',
    //'setSubnode',

    //'animateViz',
    //'setAnimateViz',
    //'unselectProject',

  ],
  computed:{
    ...mapGetters([
      'windowDims',
      'leftColPercGoal',
      'resizeElementWidth',
      'showVizSettings',
      'focusedNode',
      'tooltipDims',
    ]),
    vizWidth: function(){
      let w = (1.0-this.leftColPercGoal)*this.windowDims.width-this.resizeElementWidth/2;
      return w<0?0:w;    
    },
    boundaryRadius: function(){
      //return 400;
      let projectSurface = this.projectNodeRadius * this.projectNodeRadius * Math.PI;
      //let spaceTakenByProjectNodes = projectSurface*this.data.nodes.filter(node=>node.type=='project').length;
      let spaceTakenByProjectNodes = projectSurface*this.data.nodes.length;
      let spaceFactorPerNode = 50;
      let radiusForRequiredSpace = Math.sqrt((spaceTakenByProjectNodes*spaceFactorPerNode)/Math.PI)
      return Math.max(radiusForRequiredSpace, Math.min(this.vizWidth, this.windowDims.height)/2);
      return Math.max((this.data.nodes.length) * 50, Math.min(this.vizWidth, this.windowDims.height)/2);
    },
    //dataIds: function(){
    //  return this.data.map(d=>d.id);
    //}
  },
	watch: {
  },
  mounted(){
    setTimeout(()=>{
      this.init();
      this.ready = true;
    }, 500);

    this.unwatchFocus = this.$store.watch(this.$store.getters.focusedNodeWatcher, _ => {
      this.updateGraphVisual();
    });
  },
  beforeDestroy: function () {
    this.unwatchFocus();
  },
  methods: {
    ...mapActions([
     'toggleVizSettings',
      'setFocusedNode'
    ]),
    vizResized(){
      if(this.ready)
      this.adjustZoom();
    },
    adjustZoom(){
      this.centerLayer.transition().duration(500)
        .attr("transform", "translate("+(this.vizWidth/2)+","+(this.windowDims.height/2)+")")
        .attr("opacity", 1)
      ;
      this.centerLayer.select('.boundary')
        .transition().duration(500)
        .attr("r", this.boundaryRadius)
      ;
      let nodeDiameter = 30; //for now
      let marginFactor = 1-nodeDiameter/this.boundaryRadius;
      let minZoom = 
          this.vizWidth<this.windowDims.height?
            (
              this.boundaryRadius<this.vizWidth/2?
              marginFactor
              :
              (this.vizWidth/(2*this.boundaryRadius))*marginFactor
            )
            :
            (
              this.boundaryRadius<this.windowDims.height/2?
              marginFactor
              :
              (this.windowDims.height/(2*this.boundaryRadius))*marginFactor
            )
      ;
      this.zoomable = minZoom < marginFactor;
      
      this.zoom
        .scaleExtent([
          minZoom
          , 
          marginFactor
        ])
        .translateExtent([
          [
            this.boundaryRadius>(this.vizWidth/2)?(this.vizWidth-2*this.boundaryRadius)/2-nodeDiameter:0, 
            this.boundaryRadius>(this.windowDims.height/2)?(this.windowDims.height-2*this.boundaryRadius)/2-nodeDiameter:0
          ], [
            this.vizWidth
            - (this.boundaryRadius>(this.vizWidth/2)?(this.vizWidth-2*this.boundaryRadius)/2-nodeDiameter:0)
            , this.windowDims.height
            - (this.boundaryRadius>(this.windowDims.height/2)?(this.windowDims.height-2*this.boundaryRadius)/2-nodeDiameter:0)
          ]])
      ;
      this.zoom.scaleTo(this.svg.transition().duration(500), minZoom);
    },
    zoomed() {
      this.zoomLayer.attr("transform", d3.event.transform);
    },
    init(){
      this.svg = d3.select("#vizsvg");

      this.zoom = d3.zoom()
        .on("zoom", this.zoomed);

      this.zoomLayer = this.svg.append("g")
        .attr("class", "zoomLayer");

      this.centerLayer = this.zoomLayer.append('g')
        .attr("opacity", 0)
        .attr("transform", "translate("+(this.vizWidth/2)+","+(this.windowDims.height/2)+")")
      ;
        
      this.centerLayer.append('circle')
        .attr("class", "boundary")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", this.boundaryRadius)
        .attr("fill", "white")
        .attr("stroke", "white")
        .attr("stroke-width", 35)
      ;
      this.svg.call(this.zoom);
      this.adjustZoom();

      this.linkLayer = this.centerLayer.append("g").attr("class", "linkLayer");
      this.nodeLayer = this.centerLayer.append("g").attr("class", "nodeLayer");
      //this.labelLayer = this.centerLayer.append("g").attr("class", "labelLayer");


      let attractForce = forceAttract().target((d)=> { 
            let relatedProjectIds = d.projects.map(p=>p.id);
            let projects = this.data.nodes.filter(n=>n.type=='project');
            //console.log(relatedProjectIds)
            //console.log(projects);
            let ys = projects.filter(p=>relatedProjectIds.includes(p.id)).reduce((acc, p, i)=>{
              //console.log("--");
              //console.log("acc", acc);
              //console.log("p", p);
              //console.log("p.x", p.x);
              //console.log("i", i);
              let sum = acc * i + p.y;
              if(sum == 0){
                return 0;
              }else{
                acc = sum/(i+1);
                return acc 
              }
            }, 0)
            let xs = projects.filter(p=>relatedProjectIds.includes(p.id)).reduce((acc, p, i)=>{
              //console.log("--");
              //console.log("acc", acc);
              //console.log("p", p);
              //console.log("p.x", p.x);
              //console.log("i", i);
              let sum = acc * i + p.x;
              if(sum == 0){
                return 0;
              }else{
                acc = sum/(i+1);
                return acc 
              }
            }, 0)
            console.log("final xs", xs);
            console.log("final ys", ys);
            
            
            return [xs,ys];
      }).strength(1);
      let attractInit = attractForce.initialize; 
      attractForce.initialize = (nodes)=>{
       // Filter subset of nodes and delegate to saved initialization.
        attractInit(nodes.filter(d => d.type!='project'));
      }

      let forceManyBodyNew = d3.forceManyBody().strength(-9000).distanceMin(200);
      let forceManyBodyNewInit = forceManyBodyNew.initialize;
      forceManyBodyNew.initialize = (nodes)=>{
        forceManyBodyNewInit(nodes.filter(d => d.type=='project'));
      }
      let forceManyBodySubnodes = d3.forceManyBody().strength(-800).distanceMin(100);
      let forceManyBodySubnodesInit = forceManyBodySubnodes.initialize;
      forceManyBodySubnodes.initialize = (nodes)=>{
        forceManyBodySubnodesInit(nodes.filter(d => d.type!='project'));
      }

      let centerForce = d3.forceCenter(0,0);
      let centerForceInit = centerForce.initialize;
      centerForce.initialize = (nodes)=>{
        centerForceInit(nodes.filter(d => d.type=='project'));
      }
    

      this.simulation = d3.forceSimulation()
          //.force("attract", attractForce)
          //.force("repell", repelForce)

          .force('cluster',attractForce)  //.force("specific", d3.forceManyBody().strength(d=>{
          .force("specific", forceManyBodyNew)
          .force("specific2", forceManyBodySubnodes)
          .force("specific3", d3.forceManyBody().strength(-30).distanceMax(100))
          //     if(d.type == "project"){
          //      console.log(d); 
          //       if(d.subnodes.length > 0){
          //         console.log("long");
          //         return -2000;
          //       }else{
          //         return -100;
          //       }
          //     }else{
          //       return -10;
          //     }
          //}))
          //.force("x", d3.forceX().strength(0.002))
          //.force("y", d3.forceY().strength(0.002))
          //.force('x', d3.forceX().strength(0.0005))
          //.force('y', d3.forceY().strength(0.0005))
          .force("center", centerForce)
          .force("collide", d3.forceCollide().radius(20).iterations(2))
          //.force('cluster', this.clustering)
          .force("link", d3.forceLink().id(d=> d.id))

          .on("tick", this.ticked)
      ;

      this.node = this.nodeLayer.selectAll(".node").attr("class", "node");

      this.link = this.linkLayer.selectAll(".link").attr("class", "link");
      ////this.label = this.labelLayer.selectAll(".label").attr("class", "label");

      var radialGradient = this.svg.append("defs")
          .append("radialGradient")
            .attr("id", "radial-gradient");

        radialGradient.append("stop")
            .attr("offset", "40%")
            .attr("stop-color", "red");

        radialGradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "white")
            .attr("stop-opacity", "0");

    },
    ticked() {
      this.node
        .attr("transform", d=>{
          let newPos = this.limit(d.x,d.y);
          d.x = newPos.x;
          d.y = newPos.y;
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
    limit(x, y) {
        var dist = this.distance([x, y], [0,0]);
        if (dist <= this.boundaryRadius) {
            return {x: x, y: y};
        }
        else {
          var radians = Math.atan2(y, x)
             return {
                 x: Math.cos(radians) * this.boundaryRadius,
                 y: Math.sin(radians) * this.boundaryRadius
             }
        }
    },
    distance(dot1, dot2) {
        var x1 = dot1[0],
            y1 = dot1[1],
            x2 = dot2[0],
            y2 = dot2[1];
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
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
      //this.node.selectAll(".markedRing")
      //          .attr("stroke", d=>{
      //              return d.marked; // this assumes the incoming node is always currently hovered (in the pane)
      //          })
      //;

      
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
      

      this.nodeIn.append("circle")
              .attr("class", "focusRing")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", d=>{
                if(d.type=='project'){
                  return this.projectNodeRadius*2.2;
                }else{
                  return this.relationNodeRadius*2.2;
                }
              })
              .style("fill", "url(#radial-gradient)")
              .attr("opacity", d=>(d.id==this.focusedNode?1:0))
      ;

      this.nodeIn
                .append("circle")
                .attr("class", "main")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", d=>{
                  if(d.type=='project'){
                    return this.projectNodeRadius;
                  }else{
                    return this.relationNodeRadius;
                  }
                })
                .attr("fill", d=>{

     //             if(d.type=='project'){
     //               return 'white';
     //             }else{
                    return 'black';
     //             }

                })

               .on('mouseover', (d,i,nodes)=>{
                 this.setFocusedNode({id:d.id, flag:true});
     //             this.currentNode = d;
                  let clientRect = d3.select(nodes[i]).node().getBoundingClientRect()
                  var transform2 = d3.zoomTransform(this.svg.node());
                  console.log('transform2', transform2);
                  let xy1 = transform2.invert([d.x,d.y] )
                  //xy1 = transform2.invert()
                  console.log('xy1', xy1);
                  let paneWidth = this.windowDims.width-this.vizWidth;
                  let leftRight = clientRect.x > (paneWidth+this.vizWidth/2)?1:0;
                  let topBottom = clientRect.y > (this.windowDims.height/2)?1:0;
                  console.log("leftRight", leftRight); 
                  let x = leftRight==0?(clientRect.x-paneWidth+50):(clientRect.x-paneWidth-this.tooltipDims.width);
                  let y = topBottom==0?(clientRect.y+50):(clientRect.y-this.tooltipDims.height);
                 
                  //this.tooltipX = clientRect.x - paneWidth + 50;
                  this.tooltipX = x;
                  this.tooltipY = y;

                 
                  //this.tooltipY = clientRect.y;

                  //this.tooltipX = xy1[0];
                  //this.tooltipY = xy1[1]; 
                  //this.tooltipX = d.x + 20 + this.vizWidth/2;
                  //this.tooltipY = d.y - 110 + this.windowDims.height/2;
     //             this.tooltipFullactive = true;

     //             //d3.select(nodes[i]).select(".main").attr("fill","red");
                })
                .on('mouseout', (d,i,nodes)=>{
                 this.setFocusedNode({id:d.id, flag:false});
     //             //if(d.type=='project'){
     //             //d3.select(nodes[i]).select(".main").attr("fill","white");
     //             //}else{
     //             //d3.select(nodes[i]).select(".main").attr("fill","blue");
     //             //}
     //             //this.hideTooltip();
                  this.tooltipX = null;
                  this.tooltipY = null;
     //             this.tooltipFullactive = false;
                })
     //           .on('click', (d,i,nodes)=>{
     //             if(d.type!='project'){
     //               console.log("clicked", d.id, d);
     //               this.requestRelatedToId({type: 'relation', value: d.title}, d.id);
     //             }
     //           })
      ;





    //  this.nodeIn
    //            .append("circle")
    //            .attr("class", "activeRing")
    //            .attr("cx", 0)
    //            .attr("cy", 0)
    //            .attr("r", d=>{
    //  //            if(d.type=='project'){
    //  //              return 15 + 8;
    //  //            }else{
    //                return 6 + 8;
    //  //            }
    //            })
    //            .attr("fill", "none")
    //            .attr("stroke", d=>{
    //   //           if(d.type=='project'){
    //                return 'red'; // this assumes the incoming node is always currently hovered (in the pane)
    //    //          }else{
    //    //            return 'none';
    //    //          }
    //    //        })
    //            .attr("stroke-width", 3);
    //  ;
    //  this.nodeIn
    //            .append("circle")
    //            .attr("class", "markedRing")
    //            .attr("cx", 0)
    //            .attr("cy", 0)
    //            .attr("r", d=>{
    //              if(d.type=='project'){
    //                return 15 + 2;
    //              }else{
    //                return 6 + 2;
    //              }
    //            })
    //            .attr("fill", "none")
    //            .attr("stroke", d=>{
    //                return d.marked; // this assumes the incoming node is always currently hovered (in the pane)
    //            })
    //            .attr("stroke-width", 2);
    //  ;
      this.node = this.nodeIn.merge(this.node);


    //  if(!this.animateViz){
    //    //this needs a solution
    //    // generally how to not animate a graph like crazy??
    //    this.simulation.alpha(1).restart();
    //    this.setAnimateViz(true);
    //  }else{
        this.adjustZoom();
        this.simulation.alpha(1).restart();
    //  }


    },
    updateGraphVisual(){

      this.node.select(".focusRing").transition().duration(200).attr("opacity", d=>(this.focusedNode.includes(d.id)?1:0));

    },
    flatten(nestedData){
      return nestedData.reduce((acc, d)=>{
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
    },
    integrateNewNodes(newData){
      //let newData = this.nodeData;
      let allVisibleSubnodeIds = [];
      newData = newData.map(node=>{
        let existingNode = this.data.nodes.find(d=>d.id==node.id);
        let subnodes = node.relationships.filter(subnode=>subnode.visible).map(subnode=>{
          // going over all visible subnodes:

          // saving the ones we make visible here in an array to avoid adding them twice:
          if(!allVisibleSubnodeIds.includes(subnode.id)){
            allVisibleSubnodeIds.push(subnode.id);
          }
          


          // check if this subnode is already on the graph
          if(this.data.nodes.map(d=>d.id).includes(subnode.id)){
            // if it is on the graph already, we return its instance:
            return this.data.nodes.find(d=>d.id==subnode.id);
          }else{
            // if the subnode is not on the graph yet, 
            // we set its initial x and y position to that of the node it unfolds from
            if(existingNode){
              // if that node is on the graph already (which it should be in a normal)
              // case we get its current x and y position
              subnode.x = existingNode.x;
              subnode.y = existingNode.y;
            }else{
              subnode.x = 0;
              subnode.y = 0;
      //        subnode.x = this.vizWidth*0.5;
      //        subnode.y = this.windowDims.height*0.5;

            }
            return subnode;
          }
        })

        if(existingNode){
          existingNode.subnodes = subnodes;
          return existingNode;
        }else{
          node.x = 0;
          node.y = 0;
          //node.x = this.vizWidth*0.5;
          //node.y = this.windowDims.height*0.5;
          node.subnodes = subnodes;
          node.type = 'project';
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
    //zoomed() {
    //  centerLayer.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    //},

    dragstarted(d) {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;

      // i have not fully tested if setting or rather reinforcing the focus here in 
      // the dagging functions might confuse it elsewhere, but on first try it seems
      // to work
     this.setFocusedNode({id:d.id, flag:true});
    },
    dragended(d) {
      if (!d3.event.active) this.simulation.alphaTarget(0);
      // comment next two lines to fix nodes after dragging
      
      d.fx = null;
      d.fy = null;

      // i have not fully tested if setting or rather reinforcing the focus here in 
      // the dagging functions might confuse it elsewhere, but on first try it seems
      // to work
     this.setFocusedNode({id:d.id, flag:false});
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
    background-color: black;

    width:100%;
  }
  svg{
    background-color: black;
    width:100%;
    /*
    height:100%;
    /**/
  }
  .settings-button{
    margin:0;
    position:absolute;
    font-family: sans-serif;
    font-size:14px;
    text-align: right;
    right:10px;
    top: 5px;
    color: grey;
    text-decoration: underline;
    cursor: pointer;
  }
  .settings-button:hover{
    opacity: 0.8;
  }
  .zoomNote{
    margin:0;
    position:absolute;
    font-family: sans-serif;
    font-size:14px;
    text-align: right;
    right:10px;
    bottom: 5px;
    color: white;
    mix-blend-mode: difference;
  }
  /*
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
  */

</style>
