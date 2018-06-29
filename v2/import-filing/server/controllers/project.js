const Project = require('../models').Project;
const Department = require('../models').Department;
const Relationship = require('../models').Relationship;
var Sequelize = require('sequelize');

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

function connected(req,res){
	let uuid = [req.params.uuid]
	if (uuid[0].length > 30){
		let department = getDepartment(uuid);
		let project = getProject(uuid);
		let relationship = getRelationship(uuid)
		Promise.all([department,project,relationship]).then(function(v){
			node = _.compact(v)
			if (node){
				target = node[0]

				if (target.constructor.name == 'Department' || target.constructor.name == 'Relationship'){
					projects = target.getProjects({include: [{model: Relationship}]})
					Promise.all([projects]).then(function(v){
						obj = {}
						obj.sourceType = target.constructor.name
						obj.data = target.dataValues
						obj.data.projects = clean_array(v[0],"P")
						obj = _.omit(obj.data, ['createdAt','updatedAt',"DepartmentId",'ProjectRelationship']);
						res.json(obj);

						
					})

				}else{
					relationships = target.getRelationships({include: [{model: Project}]})
					Promise.all([relationships]).then(function(v){
						obj = {}
						obj.sourceType = target.constructor.name
						obj.data = target.dataValues
						obj.data.relationships = clean_array(v[0],"DR")
						obj = _.omit(obj.data, ['createdAt','updatedAt',"DepartmentId",'ProjectRelationship']);					
						res.json(obj);
					})
				}

			
			}else{
				res.status(400).send("not a valid uuid")
			}
		});
	}else{
		res.status(400).send("not a valid uuid")
	}
	

}


function clean_array(o,type){
 	if (type == "DR"){
 		return _.map(o, function(d, key){ 
			clean = _.omit(d.dataValues, ['createdAt','updatedAt','ProjectRelationship',"DepartmentId"]);
			keys = _.map(clean, function(v,k){ return k.toLowerCase()})
			values = _.values(clean)
			clean = _.object(keys, values);
			clean.projects = _.map(clean.projects,function(c,key){
				data = _.omit(c.dataValues, ['createdAt','updatedAt','ProjectRelationship',"DepartmentId"]);
				dk = _.map(data, function(v,k){ return k.toLowerCase()})
				dv = _.values(data)
				data = _.object(dk, dv);
				return data
	 			
			})
			return clean
		});
 	}else{
 		 return _.map(o, function(d, key){ 
			clean = _.omit(d.dataValues, ['createdAt','updatedAt','ProjectRelationship',"DepartmentId"]);
			keys = _.map(clean, function(v,k){ return k.toLowerCase()})
			values = _.values(clean)
			clean = _.object(keys, values);
			clean.relationships = _.map(clean.relationships,function(c,key){
				
				data = _.omit(c.dataValues, ['createdAt','updatedAt','ProjectRelationship',"DepartmentId"]);
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
	return Project.findOne({ where: {
	    id: {
	          $in: uuid
	        } }
	})

}
function getRelationship(uuid){
	return Relationship.findOne({ where: {
	    id: {
	          $in: uuid
	        } }
	})

}



function test(req,res){
	Relationship.findAll().then(function(p){
		
	})
}
function find_department(dn){
	return Department.findOrCreate({
		where: {name: dn}
		})
}
module.exports = {
	create: create,
	test: test,
	connected: connected
};


