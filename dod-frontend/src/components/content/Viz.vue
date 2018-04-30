<template>
    <svg xmlns="http://www.w3.org/2000/svg">
    </svg>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Viz',
  data () {
    return {
      componentGraphData: {
        nodes: [],
        links: []
      },
      svg: undefined,
      simulation: undefined,
      node: undefined,
      link: undefined,
      chart: undefined,
      nodesLayer: undefined,
      linksLayer: undefined,
      strokeWidthScale: undefined,
      strokeColorScale: undefined,
      strokeLengthScale: undefined,
      boundingRadius: 1000,
      zoom: undefined,
    }
  },
  props:[
    'width',
    'height',
    'graphData'
  ],
	watch: {
   
    '$props.width':{
      handler: function (val, oldVal) { 
        this.centerGraph();
      },
      
      deep: true
    },
    '$props.graphData':{
      handler: function (val, oldVal) { 
        let processed = this.processData(val);
        this.addNewNodesKeepOldNodes(processed);
        this.addNewLinks(processed);
        this.update();
      },
      deep: true
    }
  },
  mounted(){
    this.svg = d3.select("svg");
    this.chart = this.svg.append("g");
    

    this.zoom = d3.zoom().on("zoom", () => {
        this.chart.attr("transform", d3.event.transform); 
     });
    // this allows to drag and scrool to zoom and navigate
    this.svg.call(this.zoom);
    // this centeres the graph initially. to do so on changes calles this.centerGraph()
    this.svg.call(this.zoom.transform, d3.zoomIdentity.translate(this.width/2,this.height/2).scale(this.height/(2*this.boundingRadius+30)));
    
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
    

    this.update();



  },
  beforeDestroy: function () {
  },
  methods: {
    update(){
      let t = d3.transition()
                    .duration(200)
      ;
      setTimeout(()=>{
          _.each(this.componentGraphData.nodes, function(d) {
            d.fx = null;
            d.fy = null;
          });
      }, 200);
      this.node = this.nodesLayer.selectAll("circle").data(this.componentGraphData.nodes, d=>d.uindex);
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
                  let connections = this.componentGraphData.links.filter(d1=>{
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
      this.link = this.linksLayer.selectAll("line").data(this.componentGraphData.links, d=>d.uindex);
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
      this.simulation.nodes(this.componentGraphData.nodes);
      this.simulation.force("link").links(this.componentGraphData.links);
      this.simulation.alpha(1).restart();

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
    processData(data){
      let nodes = [];
      let links = [];
      let maxStrength = 0;
      data.forEach(d => {
        nodes.push({ name: d.contractor_name, uindex: d.contractor_uuid, type: "Contractor"});  
        nodes.push({ name: d.department_name, uindex: d.department_uuid, type: "Department"});  
        links.push({strength: d.contracts_date.length, source: d.contractor_uuid, target: d.department_uuid, uindex: d.contractor_uuid + "-" + d.department_uuid});
        if(d.contracts_date.length > maxStrength) maxStrength = d.contracts_date.length;
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
    addNewNodesKeepOldNodes(data){

        let oldNodes = this.componentGraphData.nodes;
        this.componentGraphData.nodes = data.nodes;
        var oldNodesByIndex = {};
        _.each(oldNodes, function(d) {
          oldNodesByIndex[d.uindex] = d;
        });
        _.each(this.componentGraphData.nodes, (d) => {
          if (oldNodesByIndex[d.uindex]) {
            // if the node already exists, maintain current position
            d.fx = oldNodesByIndex[d.uindex].x;
            d.fy = oldNodesByIndex[d.uindex].y;
          } else {
            // else assign it a random position near the center
            let angle = Math.random()*Math.PI*2;
            let ranRad = Math.random()*this.boundingRadius;
            d.x = Math.cos(angle)*ranRad;
            d.y = Math.sin(angle)*ranRad;
          }
        });

    },
    addNewLinks(data){
        this.componentGraphData.links = data.links;
        this.strokeWidthScale = d3.scaleLinear()
                                  .domain([1, Number(data.maxStrength)])
                                  .range([2, 4])
        ;
        this.strokeColorScale = d3.scaleLinear()
                                  .domain([1, Number(data.maxStrength)])
                                  .range(['#252525' , '#ffffff'])
        ;
        this.strokeLengthScale = d3.scaleLinear()
                                  .domain([Number(data.maxStrength), 1])
                                  .range([5,10])
        ;
    },
    centerGraph(){
        let newScale = this.width>this.height?(this.height/(2*this.boundingRadius+30)):(this.width/(2*this.boundingRadius+30));
        this.svg.transition()
                  .duration(500)
                  .call(this.zoom.transform, d3.zoomIdentity.translate(this.width/2,this.height/2).scale(newScale));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  svg{
    background-color: black;
    width:100%;
    height:100%;
  }
</style>
