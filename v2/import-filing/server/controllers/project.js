const Project = require('../models').Project;
const Department = require('../models').Department;
const Relationship = require('../models').Relationship;

_ = require('underscore')

function create(req,res){
	eval(require('locus'))

}

function find_department(dn){
	return Department.findOrCreate({
		where: {name: dn}
		})
}
module.exports = {
	create: create
};

