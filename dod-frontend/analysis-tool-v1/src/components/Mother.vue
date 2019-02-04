<template>
  <div id="mother">
    <layout>
      <template slot="search">
        <search
          :search=search
        >
        </search>
      </template>

      <template slot="datePicker">
        <date-picker
          :dateSearch=searchByDate
          :recentUpdate=lastUpdateDate
        >
        </date-picker>
      </template>

      <template slot="tabs">
          <tabs
            :tabs=requestSources
            :deleteByTab=deleteByTab
            :idsByTab=idsByTab
            :nodesOnGraph="nodes.filter(n=>n.selected).length>0"
          >
          </tabs>
      </template>

      <template slot="pane">
        <pane
          :nodes=nodes
          :deleteNode=deleteNode
          :setNodeSelect=setNodeSelect
          :activeSubnodeIds=activeSubnodeIds
        >
        </pane>
      </template>

      <template slot="reader">
        <reader>
        </reader>
      </template>

      <template slot="viz">
        <viz
          ref='vizComponent'
          :nodeData=selectedNodeData
          :setNodeSelect=setNodeSelect
          :setSubnode=setSubnode
          :createTabBySubnode=createTabBySubnode
          :selectNodesBySubnode=selectNodesBySubnode
        >
        </viz>
      </template>

    </layout>

    <!--
    <div :style="{width: paneWidthPercentage + '%'}">
      <search
        :letMotherSearch=searchRequest
        :height=searchBarHeight
      >
      </search>
      <pane
         :nodes=nodes
         :height=height-searchBarHeight-currentReaderHeight
         :toggleSelect=toggleSelect
         :deleteProject=deleteProject
         >
      </pane>
      <reader v-if="currentReaderHeight>0"
        :height=currentReaderHeight
      >

      </reader>


    </div>
    <div :style="{width: (100-paneWidthPercentage) + '%'}">
      <viz
         :nodeData=selectedNodeData
         :width=width*0.5
         :height=height
         :setActiveNode=setActiveNode
         :activeNode=activeNode
         :requestRelatedToId=requestRelatedToId
         :unfoldSharedRelationsByDefault=unfoldSharedRelationsByDefault
         :toggleUnfoldSharedRelationsByDefault=toggleUnfoldSharedRelationsByDefault
         :changeThreshold=changeThreshold
         :unfoldSharedRelationByThreshold=unfoldSharedRelationByThreshold

         :deleteProject=deleteProject
         :setSubnode=setSubnode

         :animateViz=animateViz
         :setAnimateViz=setAnimateViz
         :unselectProject=unselectProject
      >
      </viz>
    </div>
    -->
  </div>
</template>

<script>
import Layout from '@/components/Layout'

import Search from '@/components/Search'
import DatePicker from '@/components/DatePicker'
import Tabs from '@/components/Tabs'
import Pane from '@/components/Pane'

import Viz from '@/components/Viz'
import Reader from '@/components/Reader'
import {mapGetters, mapActions} from 'vuex';

import api from '@/vuex/api'

export default {
  name: 'mother',
  components: {
    Layout,
    Search,
    DatePicker,
    Pane, 
    Tabs,
    Reader,
    Viz,
  },
  data () {
    return {
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      
      //nodes: [{id:"ill stay"}, {id:"d5ac3158-8c3b-430a-88af-97acc36083b3"}, {id:"69fabee7-0a3e-4dea-8e91-4107c0d6cddf"}, {id:"66b45a0d-707a-4f14-bb3f-63fbf5e7f9f5"}, {id:"me too"}],
      nodes: [],
      activeNode: undefined,

      animateViz:true,

      
    }
  },
  computed:{
    ...mapGetters([
      'searchBarHeight',
      'paneWidthPercentage',
      'currentReaderHeight',
      'activeTab',
      'currentReaderContent',

      'unfoldSharedRelationsByDefault',
      'sharedRelationsThreshold',
    ]),
    nodesReversed: function(){
      return this.nodes.reverse();
    },
    idsByTab: function(){
      return this.requestSources.reduce((acc,rs)=>{
        let ids = this.nodes.filter(node=>node.requestSource.find(rss=>(rss.type==rs.type&&rss.value==rs.value))).map(n=>n.id);
          acc[rs.value] = ids;
        return acc; 
      }, {});
    },
    requestSources: function(){
      let searchValues = [];
      let idValues = [];
      let sources = this.nodes.reduce((acc, node)=>{
              //return acc.concat(node.requestSource)
              //let searchSources = node.requestSource.filter(rs=>rs.type=='search')
              let searchSources = node.requestSource;
              searchSources = searchSources.filter(rs=>(!searchValues.includes(rs.value)));
              searchValues = searchValues.concat(searchSources.map(rs=>rs.value))
              return acc.concat(searchSources);
            }, []);

      return sources.sort((a, b)=> a.timestamp-b.timestamp)
    },
    selectedNodeData: function(){
      return this.nodes.filter(d=>d.selected);
    },
    activeSubnodeIds(){
      return this.nodes.filter(node=>node.selected).reduce((acc,node)=>{
        return acc.concat(node.relationships.filter(subnode=>(subnode.visible&&!acc.includes(subnode.id))).map(subnode=>subnode.id));
      }, []);
    },
  },
  mounted(){
    this.nodes.forEach(d=>{
      d.requestSource = ["initial"];
    });
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapActions([
      'changeActiveTab',
      'changeReaderHeight',
      'changeReaderContent',
    ]),
    lastUpdateDate(done){
      let domain = "https://quagga.club/api/recent/" ;
      api.get(domain)
        .then((response) => {
          done(response);
        })
        .catch((error) => {
          console.log("ERROR with API", error); 
          done(null);
        });
    },
    queryNodes(query, done){
      let type = query.type; 
      let domain;
      let tabName;
      if(type == 'search'){
        domain = "https://quagga.club/api/search/" + encodeURIComponent(query.query);
        //domain = "https://quagga.club/api/date-range/2018-4-2/2018-4-4"
        tabName = query.query;
      }else if(type == 'dateSearch'){
        domain = "https://quagga.club/api/date-range/" + encodeURIComponent(query.query.start) + "/" + encodeURIComponent(query.query.end);
        if(query.query.tabName){
          tabName = query.query.tabName;
        }else{
          tabName = query.query.start.replace(/-/g,"/") + "-" + query.query.end.replace(/-/g,"/");
        }
      }
      console.log(domain);
      api.get(domain)
        .then((response) => {
          console.log("nodes", response);
          let num = response.body.length;
          let timestamp = Date.now();
          this.integrateNodes(response.body, {'type': query.type, 'value': tabName, 'timestamp': timestamp});
          done(num, timestamp, tabName);
        })
        .catch((error) => {
          console.log("ERROR with API", error); 
          done(null);
        });
    },
    search(query, done){
      this.queryNodes({'type': 'search', 'query': query}, (res,timestamp, tabName )=>{
        done({'res': res, 'query': tabName, 'timestamp': timestamp});
      });
    },
    searchByDate(query, done){
      this.queryNodes({'type': 'dateSearch', 'query': query}, (res,timestamp, tabName )=>{
        done({'res': res, 'query': tabName, 'timestamp': timestamp});
      });

    },
    integrateNodes(newNodes, requestSource){
      //first check which nodes exist already and brng them to the top,
      
      let del = [];
      newNodes = newNodes.map(node=>{
        
        // keeping track of how each node got into the data
        node["requestSource"] = [requestSource];

        node.selected = false;
        node.active = false;
        node.marked = 'none';

        node.relationships.forEach(d=>d.visible = false);

        this.nodes.find((d, i)=>{

          if(d.id == node.id){
            // if node exists already, then we use the one that alreadt in the array (since it might have position values alrady)
            node = d;

            let requestSourceExists = node.requestSource.find(rs=>(rs.type==requestSource.type&&rs.value==requestSource.value));
            console.log('requestSourceExists', requestSourceExists);
            if(requestSourceExists==undefined){
              node.requestSource.push(requestSource);
            }

            // keeping track of how each node got into the data
            //if(!node.requestSource.includes(requestSource)){
            //  node.requestSource.push(requestSource);
            //}

            // this node exists already, to make sure it comes in on top of the array, we delte the old instance and simly add it again as part of newNodes
            del.push(i);
          }

        });
        return node;
      });
      del.sort((a,b)=>a - b).reverse().forEach(i=>this.nodes.splice(i, 1));

      //then fill up the new nodes

      // never seen before, but from here: https://stackoverflow.com/a/9650855
      this.nodes.push.apply(this.nodes, newNodes);

    },
    deleteNode(id){ //this does not mean relationship nodes as those are never deleted but only 'folded in'
      let projectIndex = this.nodes.findIndex(d=>d.id==id);
      if(projectIndex > -1){
        let upadetVizNeeded = this.nodes[projectIndex].selected;
        this.nodes.splice(projectIndex, 1);
        //update reader
        if(this.currentReaderContent.id == id){
          this.changeReaderHeight(0);
          this.changeReaderContent({id: undefined, text: undefined});
        }
        //update viz
        if(upadetVizNeeded){
          this.$refs.vizComponent.integrateNewNodes(this.nodes.filter(d=>d.selected));
        }
        //update tabs
        let tabShouldStillExist = this.requestSources.find(rs=>(rs.timestamp == this.activeTab.timestamp));
        if(!tabShouldStillExist){
          setTimeout(()=>{
            this.changeActiveTab({type:'all', value:'all', timestamp:0})
          }, 600);
        }
      }
    },
    deleteByTab(tab){

      // SHIT, when a tab closes I need to update all nodes so that none of them
      // has that tab in its requestSource array anymore 
      // equally if I close a whole tab I need to take this tab ut of all the ndoes.
      // these two cases are related but my brain is too tired right now, postponing this function to another day
      // ... shouldnt be too hard
      console.log("deleteTab", tab);

      if(tab.type == 'all'){
        let ids = this.nodes.map(d=>d.id);
        ids.forEach(id=>{
          this.deleteNode(id);
        });
      }else if(tab.type == 'graph'){
        // graph should not really delete but rather unselect everynode
        
        let ids = this.nodes.filter(d=>d.selected).map(d=>d.id);
        ids.forEach(id=>{
          this.setNodeSelect(id, false);
        });

        // // this actually deletes
        //let ids = this.nodes.filter(d=>d.selected).map(d=>d.id);
        //ids.forEach(id=>{
        //  this.deleteNode(id);
        //});
      }else{
        let idsSingles =  this.nodes.filter(node=>node.requestSource.find(rs=>(rs.type==tab.type&&rs.value==tab.value))).filter(node=>node.requestSource.length==1).map(d=>d.id);
        idsSingles.forEach(id=>{
          this.deleteNode(id);
        });
        this.nodes.filter(node=>node.requestSource.find(rs=>(rs.type==tab.type&&rs.value==tab.value))).filter(node=>node.requestSource.length>1).forEach(node=>{
          node
          let sourceIndex = node.requestSource.findIndex(rs=>rs.type==tab.type&&rs.value==rs.value);
          if(sourceIndex > -1){
            node.requestSource.splice(sourceIndex, 1);
          }
        });
      }
      setTimeout(()=>{
        this.changeActiveTab({type:'all', value:'all', timestamp:0})
      }, 600);





      //console.log(this.nodes.filter(node => node.requestSource.filter(rs => rs.timestamp==tab.timestamp)) )
    },
    createTabBySubnode(id, tabName){
      let timestamp = Date.now();
      let newSource = {type:'subnode', value:tabName, timestamp:timestamp}
      this.nodes.forEach(d=>{
        let subnode = d.relationships.find(dd=>dd.id==id);
        if(subnode){
          d.requestSource.push(newSource);
        }
      });
      setTimeout(()=>{
        this.changeActiveTab(newSource)
      }, 600);

    },
    selectNodesBySubnode(id){
      this.nodes.forEach(d=>{
        let subnode = d.relationships.find(dd=>dd.id==id);
        if(subnode){
          d.selected = true;
        }
      });
      this.$refs.vizComponent.integrateNewNodes(this.nodes.filter(d=>d.selected));
    },

    setNodeSelect(id, flag){
      //this.nodes.find(d=>d.id==id).fixed = false;
      this.nodes.find(d=>d.id==id).selected = flag;
      //this.$refs.vizComponent.integrateNewNodes();


      // my thinking to do this from here (mother component) is that I 
      // have a hunch that otherwise every small trigger (e.g. many nodes updated slighted after each other)
      // triggers the viz coponent to react, but it might be more economocial (and perhaps better for the graph 
      // force animation, if I update the graph in a more controlled manner
      // above, it lets me seperate between updates that need to trigger an animation
      // and those that only change colors etc. 
      // i am not sure if this all is sensical, but i try if it does what i 
      // hope for it to do :)

      if(flag==true && this.unfoldSharedRelationsByDefault){
        this.unfoldSharedRelationByThreshold();
      }else if(flag==false){
        // we should fold subnodes in when unselecting a node
        this.nodes.find(d=>d.id==id).relationships.forEach(subnode=>{
          subnode.visible=false
          //subnode.fixed=false
        });


      }
      this.$refs.vizComponent.integrateNewNodes(this.nodes.filter(d=>d.selected));
    },
    unfoldSharedRelationByThreshold(){
      let sharedSubnodes = this.nodes.reduce((acc, d)=>{
        if(d.selected){
          d.relationships.forEach(subnode=>{
            if(!subnode.active && acc[subnode.id] != this.sharedRelationsThreshold){
              if(acc[subnode.id] == undefined){
                acc[subnode.id] = 1;
              }else{
                acc[subnode.id]++;
              }
            }
          })
        }
        return acc;
      }, {});
      console.log(sharedSubnodes);
      Object.keys(sharedSubnodes).forEach(d=>{
        if(sharedSubnodes[d] >= this.sharedRelationsThreshold){
          this.setSubnode(d, true);
        }
      });
    },


    //integrateNewNodes(newNodes, selectedDefault, requestSource){
    //  //first check which nodes exist already and brng them to the top,
    //  
    //  let del = [];
    //  newNodes = newNodes.map(node=>{
    //    
    //    // keeping track of how each node got into the data
    //    node["requestSource"] = [requestSource];
    //    //node.relationships.forEach(d=>d.visible = false);
    //    let activeSubnodes = this.activeSubnodeIds;
    //    // this is so that incoming nodes have there relationships subnodes already visible if they are displayed so far.
    //    node.relationships.forEach(d=>{
    //      if(activeSubnodes.includes(d.id)){
    //        d.visible = true;
    //      }else{
    //        d.visible = false;
    //      }
    //    });

    //    node.selected = selectedDefault;
    //    node.active = false;
    //    node.marked = 'none';

    //    this.nodes.find((d, i)=>{

    //      if(d.id == node.id){
    //        // if node exists already, then we use the one that alreadt in the array (since it might have position values alrady)
    //        node = d;

    //        // keeping track of how each node got into the data
    //        if(!node.requestSource.includes(requestSource)){
    //          node.requestSource.push(requestSource);
    //        }

    //        // this node exists already, to make sure it comes in on top of the array, we delte the old instance and simly add it again as part of newNodes
    //        del.push(i);
    //      }

    //    });
    //    return node;
    //  });
    //  del.sort((a,b)=>a - b).reverse().forEach(i=>this.nodes.splice(i, 1));

    //  //then fill up the new nodes

    //  // never seen before, but from here: https://stackoverflow.com/a/9650855
    //  this.nodes.push.apply(this.nodes, newNodes);


    //  if(this.unfoldSharedRelationsByDefault){

    //    this.unfoldSharedRelationByThreshold();

    //  }



    //},
    //requestRelatedToId(requestSource, id){
    //  let domain = "https://quagga.club/api/connected/" + id;
    //  api.get(domain)
    //    .then((response) => {
    //      this.integrateNewNodes(response.body.projects, true, requestSource);
    //    })
    //    .catch((error) => {
    //      console.log("ERROR with API", error); 
    //    });
    //},
    //searchRequest(query){
    //  let domain = "https://quagga.club/api/search/" + encodeURIComponent(query);
    //  api.get(domain)
    //    .then((response) => {
    //      this.integrateNewNodes(response.body, false, {type: 'search', value: query});
    //    })
    //    .catch((error) => {
    //      console.log("ERROR with API", error); 
    //    });
    //},
    //toggleSelect(id){
    //  this.nodes.find(d=>d.id==id).selected = !this.nodes.find(d=>d.id==id).selected;
    //  if(this.unfoldSharedRelationsByDefault){
    //    this.unfoldSharedRelationByThreshold();
    //  }
    //},
    unselectProject(id){
      this.nodes.find(d=>d.id==id).selected = false;
    },
    toggleSubnode(id){

    },
    setSubnode(id, flag){
      console.log("set subnode", id, flag);
      this.nodes.forEach(d=>{
        let subnode = d.relationships.find(dd=>dd.id==id);
        if(subnode){
          subnode.visible = flag
        }
      });
      this.$refs.vizComponent.integrateNewNodes(this.nodes.filter(d=>d.selected));
    },
    setAllSubnodes(id, flag){
      //this.nodes.find(d=>d.id==id).relationships.forEach(d=>d.visible = true);
      this.nodes.find(d=>d.id==id).relationships.forEach(d=>this.setSubnode(d.id, flag));
    },
    

    setActiveNode(id, flag){
      if(flag){
        this.activeNode = id;
      }else{
        this.activeNode = undefined;
      }
      //let b = false;
      //for(let i = 0; i< this.nodes.length; i++){
      //  if(this.nodes[i].id == id){
      //    this.nodes[i].active = flag;
      //    break;
      //  }
      //  for(let j =0; j < this.nodes[i].relationships.length; j++){
      //    if(this.nodes[i].relationships[j].id == id){
      //      this.nodes[i].relationships[j].active = flag;
      //      b = true;
      //      break;
      //    }
      //  }
      //  if(b) break;
      //}
    },
    markProject(id, color){
      this.setAnimateViz(false);
      let project = this.nodes.find(d=>d.id==id);
      if(project){
        project.marked = color
      }
    },
    deleteProject(id){
      let projectIndex = this.nodes.findIndex(d=>d.id==id);
      if(projectIndex > -1){
        this.nodes.splice(projectIndex, 1);
      }
    },
    toggleUnfoldSharedRelationsByDefault(){
      this.unfoldSharedRelationsByDefault = !this.unfoldSharedRelationsByDefault;

    },
    changeThreshold(e){
      console.log(e.target.value);
      this.sharedRelationsThreshold = parseInt(e.target.value);
      

    },

    setAnimateViz(flag){
      this.animateViz=flag;
    },




  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  /*
  outline: 1px solid black;
  /**/
}
#mother{
  width:100%;
  height:100%;
  display: flex;
}
.halfWidth{
  width: 50%;
}
.twoThirdWidth{
  width: 66%;
}
.thirdWidth{
  width: 33%;
}



</style>
