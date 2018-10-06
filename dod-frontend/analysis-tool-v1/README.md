# analysis-tool-v1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


todo:

- tooltip 
  - to unselect nodes (erase them from the graph)
  - to mark nodes with a color
  - maybe also 'mark all connected nodes'
  - to unfold subnodes
  - to make a request related to it (subnode)
  - maybe also to fix nodes in space
  - different tooltips for project and connection
  - on connection toggle name to be visible in graph


- display where nodes in the pane come from and allow to close in batch
  e.g. nodes from search and nodes from clicking on subnode 'Alabama', you should be able to just delete out of the pane

- generally ability to delte out of pane

- style, display full text in pane etc.

- warning system if many new ndoes are added and give option to add them to the pane only, and not to the viz directly

- zoom in and out and increase canvas size if there is more nodes


- i need to sdistinguish between graph updates that make the graph move (new node) and ones that only enhance (eg tagging a node)

- default shared relaations should only disolay the nodes that are connected to ALL project on display

- documentation

- display names of subnodes in graph if they are connected to whatevers is active (hovered), what is active itself will be having the tooltip

- export option


- in tooltip allow to write label for main nodes
- tab with everything that currently on the graph


maybe in the pane, for each node and steadily updating it should displayed how many of the relation nodes on viz curretnly they share...


@dhruv

contracts should be searchable by ID
timeout errors for big searches like "new York" - by ID i am pretty sure they work, but text search seems to kill it

the way subnodes fold out autimatically etc should be accessible in a little settings overlay



