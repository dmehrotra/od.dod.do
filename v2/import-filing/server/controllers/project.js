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
	test: test
};

