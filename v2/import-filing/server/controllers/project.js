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
					projects = target.getProjects()
					Promise.all([projects]).then(function(v){
						obj = {}
						obj.sourceType = target.constructor.name
						obj.source = target
						obj.connections = v
						
					
						res.send(JSON.stringify(obj));
					})

				}else{
					relationships = target.getRelationships()
					Promise.all([relationships]).then(function(v){
						obj = {}
						obj.sourceType = target.constructor.name
						obj.source = target
						obj.connections = v
			
					
						res.send(JSON.stringify(obj));
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


function uuid(req,res){
	eval(require('locus'))
	type = req.params.type
	uuid = req.parms.uuid
	if (type == "d"){
		Department.findAll({where:{id:uuid}}).then(function(department){
			
		})
	}
	if (type == "p"){

	}
	if (type == "r"){

	}
}


function test(req,res){
	Project.findAll({where: {checked: true}}).then(function(p){
		p[0].getRelationships().then(function(r){
			res.status(201).send(r)
		})
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
	uuid: uuid,
	connected: connected
};


