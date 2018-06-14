//http://d3indepth.com/layouts/
//
let root = d3.hierarchy(data, d => d.connections)

root.descendants().filter(d => d.data.id)
    .forEach(d=>{
      if(d.children){
        d._children = d.children;
        d.children = null;
      }
      return d;
    });

let svg = d3.select("body").append("svg");
let width = 500;
let height = 500;
let margin = 50;
let radius = 5;
 
let simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .on("tick", ticked)
;
svg
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "black")
;

let node = svg.selectAll(".node").attr("class", "node");
let link = svg.selectAll(".link").attr("class", "link");
let label = svg.selectAll(".label").attr("class", "label");


function update(){
  let nodes = flatten(root);
  let links = d3.hierarchy({children:nodes}).links();
  console.log('nodes', nodes);
  console.log('links', links);

  simulation.nodes(nodes);
  simulation.force("link").links(links);
  //
  // Update the links…
  link = link.data(links, function(d) { return d.target.data.id; });

  // Exit any old links.
  link.exit().remove();

  // Enter any new links.
  link = link.enter().insert("line", ".node")
      .attr("class", "link")
      .attr("stroke", "white")
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; })
      .merge(link)
  ;

  node = node.data(nodes, d=>d.data.id);
  label = label.data(nodes, d=>d.data.id);
  node.exit().remove();
  label.exit().remove();
  // Enter any new nodes.
  node = node.enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", radius)
      .attr("fill", "white")
      .on("click", click)
      .merge(node)
  ;
  label = label.enter().append("text")
      .attr("class", "label")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("fill", "red")
      .text(d=>d.data.id)
      .merge(label)
  ;
  simulation.alpha(1).restart();
}
update();

// Toggle children on click.
function click(d) {
  console.log(d);
  if (!d3.event.defaultPrevented) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update();
 }
}



function ticked() {

  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  label
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
  node
      .attr("cx", function(d) { return d.x = Math.max(margin+radius, Math.min(width - margin - radius, d.x)); })
      .attr("cy", function(d) { return d.y = Math.max(margin+radius, Math.min(height - margin - radius, d.y)); });
  
}
function flatten(root) {
  var nodes = [], i = 0;
  let ids = [];
  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    if(node.data.type != 'origin' && !ids.includes(node.data.id)){
      nodes.push(node);
      ids.push(node.data.id);
    }
  }
  recurse(root);
  return nodes;
}
