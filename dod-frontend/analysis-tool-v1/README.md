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


nvm: 
- rare blogpost that seems to handle vue+d3 the same way I do: [http://www.eikospartners.com/blog/integrating-complex-d3-visualizations-into-vue](http://www.eikospartners.com/blog/integrating-complex-d3-visualizations-into-vue)
- this, too. okay this calms me down a little [https://zhuanlan.zhihu.com/p/36799963](https://zhuanlan.zhihu.com/p/36799963)
- mainly my whole questioning is about what exactly vue thinks of d3 manipulating the dom...because vue really wants to be in charge of this as far as I understand

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



TODO:

- [ ] tooltip for projects and relations (should be priority right now)
- [ ] flesh out settigs page, what will be no there apart from how many default unfolding relations?
  - [ ] relations on graph should have option to request all related to this, but also all from current pane related to it
  - [ ] ...
- [x] date picker next to search bar
- [x] default to download most recent 
  - [ ] just need to add in the right function once recent data exists.
- [ ] maybe the view window (left bottom) should list the relations, too for a quick glance
  - [ ] this should be elsewhere on hover of the paneNodes, maybe below the tabs, somewhere indescrete but visible
- [ ] help page explaining the features
- [ ] soltuion needed for tabs growing to large... -.-
- [ ] i love the little numbers in the paneNodes and want to highlight them/their function better
- [ ] fix function not yet working but postponing to later
- [x] should we do somthing on the server about duplicate subnodes (same name, different type)? (( 12-5-2018 - I think I fixed this, but its a bit tricky. Working on a command line tool for us. ))
- [ ] Hover over a node should light up the paths connected to it. 
- [ ] Nodes of a type hsould be colored similarly ie; cities
- [ ] I want to be able to remove nodes of a certain type
- [ ] When i drag a node and its connections it would be cool if it was fixed to the spot where I dragged it.  Sometimes the gravity makes seeing connections difficult. 
- [ ] fix most recent nodes (there is still some data confusion, at least when doing it here fro china....)

COMMENT:

I find that the best way to find cool shit is to show a lot of connections and then slowly delete all the things that are bullshit.  I like that work flow.  



