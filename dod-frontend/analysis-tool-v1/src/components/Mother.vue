<template>
  <div id="mother">
    <layout>
      <template slot="search">
        <search
          :search=search
        >
        </search>
      </template>

      <template slot="tabs">
          <tabs
            :tabs=requestSources
            :deleteByTab=deleteByTab
          >
          </tabs>
      </template>

      <template slot="pane">
        <pane
          :nodes=nodes
          :deleteNode=deleteNode
          :setNodeSelect=setNodeSelect
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
      unfoldSharedRelationsByDefault: true,
      sharedRelationsThreshold: 2,

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
    ]),
    nodesReversed: function(){
      return this.nodes.reverse();
    },
    requestSources: function(){
      let searchValues = [];
      let idValues = [];
      let sources = this.nodes.reduce((acc, node)=>{
              //return acc.concat(node.requestSource)
              let searchSources = node.requestSource.filter(rs=>rs.type=='search')
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
    queryNodes(query, done){
      let type = query.type; 
      let domain;
      if(type == 'search'){
        domain = "https://quagga.club/api/search/" + encodeURIComponent(query.query);
      }
      console.log(domain);
      api.get(domain)
        .then((response) => {
          console.log("nodes", response);
          let num = response.body.length;
          let timestamp = Date.now();
          this.integrateNodes(response.body, {'type': 'search', 'value': query.query, 'timestamp': timestamp});
          done(num, timestamp);
        })
        .catch((error) => {
          console.log("ERROR with API", error); 
          done(null);
        });
    },
    search(query, done){
      this.queryNodes({'type': 'search', 'query': query}, (res,timestamp )=>{

        done({'res': res, 'query': query, 'timestamp': timestamp});
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
        this.nodes.splice(projectIndex, 1);
        if(this.currentReaderContent.id == id){
          this.changeReaderHeight(0);
          this.changeReaderContent({id: undefined, text: undefined});
        }
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
      //console.log(this.nodes.filter(node => node.requestSource.filter(rs => rs.timestamp==tab.timestamp)) )
    },

    setNodeSelect(id, flag){
      this.nodes.find(d=>d.id==id).selected = flag;
      this.$refs.vizComponent.testFunction("update graph");
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
    //unfoldSharedRelationByThreshold(){
    //  let sharedSubnodes = this.nodes.reduce((acc, d)=>{
    //    if(d.selected){
    //      d.relationships.forEach(subnode=>{
    //        if(!subnode.active && acc[subnode.id] != this.sharedRelationsThreshold){
    //          if(acc[subnode.id] == undefined){
    //            acc[subnode.id] = 1;
    //          }else{
    //            acc[subnode.id]++;
    //          }
    //        }
    //      })
    //    }
    //    return acc;
    //  }, {});
    //  Object.keys(sharedSubnodes).forEach(d=>{
    //    if(sharedSubnodes[d] >= this.sharedRelationsThreshold){
    //      this.setSubnode(d, true);
    //    }
    //  });
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
      this.nodes.forEach(d=>{
        let subnode = d.relationships.find(dd=>dd.id==id);
        if(subnode){
          subnode.visible = flag
        }
      });
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
