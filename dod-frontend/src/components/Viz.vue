<template>
  <div id="vizWrapper" :style="{ width: width+'px', flexGrow: flex, height: height+'px'}">
    <!--<p><b>Viz</b></p>-->
    <!--<p>I got {{data.length}} data points, yo!</p>-->
    <!--<a @click="unfixPositions">Unfix the Positions, would you?</a>-->
    <!--<div>-->
    <!--<svg xmlns="http://www.w3.org/2000/svg" :width="width+'px'" :height="height+'px'" v-if="true">-->
    <svg xmlns="http://www.w3.org/2000/svg" v-if="true">
    </svg>
    </div>

  </div>
</template>

<script>
import * as d3 from 'd3';
import {mapGetters, mapActions} from 'vuex';
import {TweenMax} from "gsap";

export default {
  name: 'Viz',
  data () {
    return {
      flex: 1,
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)-80,
      chartRadius: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      d: {
        nodes: [],
        links: []
      },
      node: undefined,
      link: undefined,
      chart: undefined,
      nodesLayer: undefined,
      linksLayer: undefined,
      simulation: undefined,
      strokeWidthScale: undefined,
      strokeColorScale: undefined,
      strokeLengthScale: undefined,
      boundingRadius: 1000,
      zoom: undefined,
      unwatchStoreForSelection: undefined,
    }
  },
  props:[
    'data'
  ],
	computed: {
    ...mapGetters([
      'selection'
    ]),
  },
	watch: {
    '$props.data':{
      //making some changes
      handler: function (val, oldVal) { 
        let processed = this.processData(val);
        let oldNodes = this.d.nodes;
        this.d.nodes = processed.nodes;
        var kv = {};
        _.each(oldNodes, function(d) {
          kv[d.uindex] = d;
        });
        _.each(this.d.nodes, (d) => {
          if (kv[d.uindex]) {
            // if the node already exists, maintain current position
            d.fx = kv[d.uindex].x;
            d.fy = kv[d.uindex].y;
          } else {
            // else assign it a random position near the center
            //d.x = this.chartWidth * Math.random(); 
            //d.y = this.chartHeight * Math.random(); 
            let angle = Math.random()*Math.PI*2;
            let ranRad = Math.random()*this.boundingRadius;
            d.x = Math.cos(angle)*ranRad;
            d.y = Math.sin(angle)*ranRad;
            //d.x = 0;
            //d.y = 0;
          }
        });

        console.log(processed);
        this.d.links = processed.links;
        this.strokeWidthScale = d3.scaleLinear()
                                  .domain([1, Number(processed.maxStrength)])
                                  .range([2, 4])
        ;
        this.strokeColorScale = d3.scaleLinear()
                                  .domain([1, Number(processed.maxStrength)])
                                  .range(['#252525' , '#ffffff'])
        ;
        this.strokeLengthScale = d3.scaleLinear()
                                  .domain([Number(processed.maxStrength), 1])
                                  .range([5,10])
        ;
        this.update();
      },
      deep: true
    }
  },
  mounted(){
		this.simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id((d) => { 
              return d.uindex; 
          }).distance((d) => { 
              return this.strokeLengthScale(Number(d.strength));
          })
        )
        .force("charge", d3.forceManyBody().strength(d=>{
          if(d.type == "Contractor") return -50;
          else if(d.type == "Department") return -1000;
        
        }))
        .force("collide", d3.forceCollide(8))
        //.force("center", d3.forceCenter(this.chartWidth / 2, this.chartHeight / 2))
        .force("center", d3.forceCenter(0,0))
        .on("tick", this.ticked)
    ;

    let svg = d3.select("svg");
    this.chart = svg.append("g");
    this.zoom = d3.zoom().on("zoom", () => {
        this.chart.attr("transform", d3.event.transform); 
      });
    svg.call(this.zoom);
    //this is to get the scale out later when selecting... pretty sketchy
    this.chart.attr("transform", "translate(0,0) scale(1)");

    this.linksLayer = this.chart.append("g");
    this.nodesLayer = this.chart.append("g");

    //// boundaries cricle:
    this.linksLayer.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", this.boundingRadius)
            .attr("stroke", "#232323")
            .attr("stroke-width", "8")
            .attr("fill", "none")
    ;

    // here I make sure that the bounding circle is within the opening screen. 
    // This could be a reset function too.
    let bounds = [[-this.boundingRadius, -this.boundingRadius], [this.boundingRadius, this.boundingRadius]];
    let dx = bounds[1][0] - bounds[0][0];
    let dy = bounds[1][1] - bounds[0][1];
    let x = (bounds[0][0] + bounds[1][0]) / 2;
    let y = (bounds[0][1] + bounds[1][1]) / 2;
    let scale = .95 / Math.max(dx / this.width, dy / this.height);
    let translate = [this.width / 2 - scale * x, this.height / 2 - scale * y];

    this.linksLayer.attr("transform", "translate(" + translate + ")scale(" + scale + ")");
    this.nodesLayer.attr("transform", "translate(" + translate + ")scale(" + scale + ")");

    this.update();

		this.unwatchStoreForSelection = this.$store.watch(this.$store.getters.currentSelectionWatcher, selection => {
      this.processNewSelection(selection);
      if(selection.length > 0){
        let newWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) *0.5;
        console.log(this.chart.attr("transform"));
        // // posponing this part
        //console.log(Number(this.chart.attr("transform").split(" ")[1].split("(")[1].split(")")[0]));
        //let currentScale = Number(this.chart.attr("transform").split(" ")[1].split("(")[1].split(")")[0]);
        //let currentTransformX = Number(this.chart.attr("transform").split(" ")[0].split("(")[1].split(")")[0].split(",")[0]);
        //let currentTransformY = Number(this.chart.attr("transform").split(" ")[0].split("(")[1].split(")")[0].split(",")[1]);
        //console.log(currentTransformX, currentTransformX);
        //this.chart.attr("transform", "translate("+ (currentTransformX - newWidth/2)  +","+currentTransformY+") scale("+currentScale+")"); 
        TweenLite.to(this.$data, 1.0, { flex: 0.5, width: newWidth });
        //this.chart.attr("transform", "scale(0.5)"); 
      }else{
         TweenLite.to(this.$data, 1.0, { flex: 1.0, width: 0.0 });
      }
    })
    window.addEventListener('resize', this.handleResize)
    this.handleResize();
  },
  beforeDestroy: function () {
    this.unwatchStoreForSelection();
    window.removeEventListener('resize', this.handleResize)
  },
  methods:{
    ...mapActions([
      'addToSelection'
    ]),
    update(){
      let t = d3.transition()
                    .duration(200)
      ;
      setTimeout(()=>{
          _.each(this.d.nodes, function(d) {
            d.fx = null;
            d.fy = null;
          });
      }, 200);
      this.node = this.nodesLayer.selectAll("circle").data(this.d.nodes, d=>d.uindex);
      this.node
        //.attr("fill", "red")
      ;


      this.node.exit()
        .transition(t)
        .attr("fill", "black")
        .remove()
      ;

      this.node = this.node.enter().append("circle")
                .attr("cx", d => 0)
                .attr("cy", d => 0)
                .attr("r", d=>{
                  if(d.type == "Contractor") return 6;
                  else if(d.type == "Department") return 8;
                })

                .attr("fill", d=>{
                  if(d.type == "Contractor") return "white";
                  else if(d.type == "Department") return "blue";
                })
                //.attr("stroke-width", 1)
                //.attr("stroke", "black")
                .merge(this.node)
                .call(d3.drag()
                  .on("start", this.dragstarted)
                  .on("drag", this.dragged)
                  .on("end", this.dragended)
                )
                .on("click", (d)=>{
                  console.log("clicked on", d.uindex);
                  let connections = this.d.links.filter(d1=>{
                                      return d1.source==d||d1.target==d;
                                    }).map(d1=>{
                                      return d1.source==d?d1.target:d1.source;
                                    })
                  ;
                  //connections.push(d.uindex);
                  //this.node.attr("fill", d1=>{
                  //  if(connections.includes(d1.uindex)){
                  //    return "#ff00ef";
                  //  }else{
                  //    if(d1.type == "Contractor") return "white";
                  //    else if(d1.type == "Department") return "blue";
                  //  }
                  //});
                  let selection = {"selected": d, "connections": connections};
                  this.addToSelection(selection);

                  console.log(connections);
                });

      ;
      this.link = this.linksLayer.selectAll("line").data(this.d.links, d=>d.uindex);
      this.link.exit()
          .transition(t)
          .attr("stroke", "black")
          .remove();
      this.link = this.link.enter().append("line")
                .attr("stroke-width", d=>{
                  return this.strokeWidthScale(d.strength); 
                })
                .attr("stroke", d=>{
                  return this.strokeColorScale(d.strength); 
                })
                .merge(this.link)
      ;
      this.simulation.nodes(this.d.nodes);
      this.simulation.force("link").links(this.d.links);
      this.simulation.alpha(1).restart();

    },
    processNewSelection(selection){
      let selectedNodes = selection.map(d=>{return d.selected.uindex;});
      console.log("s", selectedNodes);
      let connectedNodes = selection.reduce((accumulator, d) => {
        d.connections.forEach(d1=>{
          accumulator.push(d1.uindex);
        })
        return accumulator;
      }, []);

      this.node.attr("fill", d1=>{
        if(selectedNodes.includes(d1.uindex)){
          return "green";
        }else if(connectedNodes.includes(d1.uindex)){
          return "#ff00ef";
        }else{
          if(d1.type == "Contractor") return "white";
          else if(d1.type == "Department") return "blue";
        }
      });

    },
    processData(data){
      let nodes = [];
      let links = [];
      let maxStrength = 0;
      data.forEach(d => {
        nodes.push({ name: d.contractor_name, uindex: d.contractor_uuid, type: "Contractor"});  
        nodes.push({ name: d.department_name, uindex: d.department_uuid, type: "Department"});  
        links.push({strength: d.count, source: d.contractor_uuid, target: d.department_uuid, uindex: d.contractor_uuid + "-" + d.department_uuid});
        if(d.count > maxStrength) maxStrength = d.count;
      })
      // i still don't believe this works but apparently it works
      // mostly taken from: https://stackoverflow.com/a/43878335
      // to uniquify by value.metadata.id
      console.log(nodes);
      nodes =  _(nodes)
                .groupBy(d => d.uindex)
                .map(objs => _.assignWith({}, ...objs, (val1, val2) => val1 || val2))
                .value();
      console.log(nodes);
      return {nodes: nodes, links: links, maxStrength: maxStrength}
    },
    pythag(r, b, coord, addition) {
        // this is hacked together and could be refined (maybe somehow with doing it all from point 0,0
        // the underlying code comes from here: http://bl.ocks.org/nsonnad/5993342

        let m = 20; // apprently it really needs a little margin, other wise nodes are sticking at top and bottom of boundary
        // force use of b coord that exists in circle to avoid sqrt(x<0)
        b = Math.min(this.boundingRadius - m, Math.max(m - this.boundingRadius, b));

        let a = Math.sqrt(  Math.pow(this.boundingRadius, 2)   -   Math.pow((b), 2)    );

        coord = Math.max(- a + m, Math.min(a - m, coord));

        return coord;
    },
    ticked() {
      this.node
          .attr("cx", (d) => {return d.x = this.pythag(8, d.y, d.x, 8)})
          .attr("cy", (d) => {return d.y = this.pythag(8, d.x, d.y, 8)})

      this.link
          .attr("x1", (d) => {return d.source.x})
          .attr("y1", (d) => {return d.source.y})
          .attr("x2", (d) => {return d.target.x})
          .attr("y2", (d) => {return d.target.y})

      //this.node
      //    .attr("cx", (d) => {return d.type=="Department"?d.x=Math.max(0, Math.min(this.chartWidth, d.x)):d.x;})
      //    .attr("cy", (d) => {return d.y = Math.max(0, Math.min(this.chartHeight, d.y));})

      //this.link
      //    .attr("x1", (d) => {return Math.max(0, Math.min(this.chartWidth, d.source.x));})
      //    .attr("y1", (d) => {return Math.max(0, Math.min(this.chartHeight, d.source.y));})
      //    .attr("x2", (d) => {return Math.max(0, Math.min(this.chartWidth, d.target.x));})
      //    .attr("y2", (d) => {return Math.max(0, Math.min(this.chartHeight, d.target.y));})

      //this.node
      //    .attr("cx", (d) => {
      //       return d.x = this.pythag(8, d.y, d.x, this.width); 
      //        //return d.type=="Department"?d.x=Math.max(0, Math.min(this.chartWidth, d.x)):d.x;
      //    })
      //    .attr("cy", (d) => {
      //      return d.y = this.pythag(8, d.x, d.y, this.width);
      //      //return d.y = Math.max(0, Math.min(this.chartHeight, d.y));
      //    })

      //this.link
      //    .attr("x1", (d) => {return Math.max(0, Math.min(this.width*2, d.source.x));})
      //    .attr("y1", (d) => {return Math.max(0, Math.min(this.height*2, d.source.y));})
      //    .attr("x2", (d) => {return Math.max(0, Math.min(this.width*2, d.target.x));})
      //    .attr("y2", (d) => {return Math.max(0, Math.min(this.height*2, d.target.y));})
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
    unfixPositions(){
      _.each(this.d.nodes, function(d) {
        d.fx = null;
        d.fy = null;
      });
      this.simulation.alpha(1).restart();
    },
    handleResize(){
      if(this.selection.length > 0){
        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0) * 0.5;
      }else{
        this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 80;
    },

  }
  //data () {
  //  return {
  //    msg: ''
  //  }
  //}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  svg{
    background-color: black;
    
    width:100%;
    height:100%;
  }
  #vizWrapper{
    /*
    display: inline-block;
    float:left;

    flex-grow:0.4;
    */
  }
</style>
