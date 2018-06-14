let rp = require('request-promise');
let db = require('../server/models');
var Sequelize = require('sequelize');

let _ = require('underscore')
let calais_url = 'https://api.thomsonreuters.com/permid/calais'
require('dotenv').config()
obj = []


db.Project.findAll({
  where: {
    checked: false
  },
  limit: 1
}).then(function(projects){
    projects.forEach(function(p){
        let options = {
            method: 'POST',
            uri: calais_url,
            body: p.dataValues.full_text,
            headers: {
                'X-AG-Access-Token' : process.env.CALAIS, 'Content-Type' : 'text/plain', 'outputformat' : 'application/json'
            },
            json: true
        };
        rp(options)
        .then(function (parsedBody) {
            _.each(parsedBody, function(v,k,i){
                if(k != 'doc' && v._typeGroup != "language" && v._typeGroup != "versions" ){
                    if (v._typeGroup == "topics"){
                        console.log(v._typeGroup +": "+ v.name)
                        cr(p,v._typeGroup,v.name)
                    }
                    if (v._typeGroup == "socialTag"){
                        console.log("tag" +": "+ v.name)
                        cr(p,v._typeGroup,v.name)
                    }
                    if (v._typeGroup == "industry"){
                            cr(p,v._typeGroup,v.name)            
                    }
                    if (v._typeGroup == "entities"){
                        cr(p,v._type,v.name)
                    }
                }
            })


        }).catch(function (err) {
            console.log(err)
        });
    })
});
function cr(project,type,name){
    
    let RelationshipData = {
        type: type,
        title: name,
        info: ""
    }
    db.Relationship.find({where:RelationshipData}).then(function (relationship) {
        
        if (relationship){
            console.log("REPEAT RELATIONSHIP")
            project.addRelationship(relationship).then(function(r){
                project.updateAttributes({
                    checked: true
                }).then(function(r){

                });
            });
        }else{
            db.Relationship.create(RelationshipData).then(function (relationship) {
                project.addRelationship(relationship).then(function(r){
                    project.updateAttributes({
                        checked: true
                    }).then(function(r){});
                });
            }).then(function(d){});


        }

    }).then(function(d){

    });


}


setTimeout(function() {db.sequelize.close();}, 10000);




