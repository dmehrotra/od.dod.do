const Project = require('../models').Project;
const Department = require('../models').Department;
const Relationship = require('../models').Relationship;
var Sequelize = require('sequelize');
let db = require('../models')
let ommit = ["tsv",'createdAt','updatedAt',"DepartmentId",'ProjectRelationship']
_ = require('underscore')

function create(req,res){
	console.log(req.body)
	find_department(req.body.department_name)
		.then(function(department){
			Project.create({
				full_text: req.body.full_text,
				amount: parseFloat(req.body.amount.replace(/\D/g,'')),
				contract_number: req.body.contract_numbers,
				filing_date: req.body.filing_date
			}).then(function(project){
				department[0].addProject(project)
				.then(function(){ 
					department[0].getProjects().then(function(p){
                   		str = "\nProjectId:" + project.dataValues.id
                   		str += "\nDepartment Contract Amount: "+p.length
                   		res.status(201).send(str)
					})
				})
				.catch(error => res.status(400).send(error));	
			})
		})

}
function search(req,res){
	let query = req.params.query;
	let sql = 'SELECT id, full_text FROM(SELECT tsv,id, full_text FROM "Projects", plainto_tsquery(\''+query+'\') AS q WHERE (tsv @@ q)) AS t1 ORDER BY ts_rank_cd(t1.tsv, plainto_tsquery(\''+query+'\')) DESC;';

	db.sequelize.query(sql,{ model: Project }).then(function(projects){
		if (projects){
			ar = _.map(projects,function(a){ return a.id});
			project_ar = _.map(ar,getProject);
			Promise.all(project_ar).then(function(v){
				node=_.compact(v)
				if(node){
					promises = _.map(node,processSearch)
					Promise.all(promises).then(function(v){
						res.json(v)
					})
				}
				
			})
		}else{res.status(400).send("not a valid uuid")}

	});
}

function processSearch(project){
	
	return new Promise(function(resolve, reject){
				get_node(project,function(obj){
					resolve(obj)
				})
			})
}
function connected(req,res){
	let uuid = [req.params.uuid]
	if (uuid[0].length > 30){
		let department = getDepartment(uuid);
		let project = getProject(uuid);
		let relationship = getRelationship(uuid)
		Promise.all([department,project,relationship]).then(function(v){
			node = _.compact(v)
			if (node){
				get_node(node[0],function(obj){
					res.json(obj)
				})
			}else{res.status(400).send("not a valid uuid")}
		});
	}else{res.status(400).send("not a valid uuid")}
	

}

function get_node(node,callback){
	if (node.constructor.name == 'Department' || node.constructor.name == 'Relationship'){
		projects = node.getProjects({include: [{model: Relationship}]})
		Promise.all([projects]).then(function(v){
			obj = {}
			obj.sourceType = node.constructor.name
			obj.data = node.dataValues
			obj.data.projects = clean_array(v[0],"P")
			obj = _.omit(obj.data, ommit);
			callback(obj)

			
		})

	}else{
		relationships = node.getRelationships({include: [{model: Project}]})
		Promise.all([relationships]).then(function(v){
			obj = {}
			obj.sourceType = node.constructor.name
			obj.data = node.dataValues
			obj.data.relationships = clean_array(v[0],"DR")
			obj = _.omit(obj.data, ommit);
			callback(obj);
		})
	}
}

function clean_array(o,type){
 	if (type == "DR"){
 		return _.map(o, function(d, key){ 
			clean = _.omit(d.dataValues, ommit);
			keys = _.map(clean, function(v,k){ return k.toLowerCase()})
			values = _.values(clean)
			clean = _.object(keys, values);
			clean.projects = _.map(clean.projects,function(c,key){
				data = _.omit(c.dataValues, ommit);
				dk = _.map(data, function(v,k){ return k.toLowerCase()})
				dv = _.values(data)
				data = _.object(dk, dv);
				return data
	 			
			})
			return clean
		});
 	}else{
 		 return _.map(o, function(d, key){ 
			clean = _.omit(d.dataValues, ommit);
			keys = _.map(clean, function(v,k){ return k.toLowerCase()})
			values = _.values(clean)
			clean = _.object(keys, values);
			clean.relationships = _.map(clean.relationships,function(c,key){
				
				data = _.omit(c.dataValues, ommit);
				dk = _.map(data, function(v,k){ return k.toLowerCase()})
				dv = _.values(data)
				
				return _.object(dk, dv);
	 			
			})
			return clean
		});
 	}

}
function getDepartment(uuid){
	return Department.findOne({ where: {
	    id: {
	          $in: uuid
	        } }
	})

}
function getProject(uuid){
	return Project.findOne({ where: {id:uuid} })

}
function getRelationship(uuid){
	return Relationship.findOne({ where: {
	    id: {
	          $in: uuid
	        } }
	})
}
function find_department(dn){
	return Department.findOrCreate({
		where: {name: dn}
		})
}
module.exports = {
	create: create,
	connected: connected,
	search:search
};


