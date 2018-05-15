const Filing = require('../models').Filing;
const Department = require('../models').Department;
const Contract = require('../models').Contract;
_ = require('underscore')
function create(req,res){
	find_department(req.body.department_name)
		.then(function(department){
			Filing.create({
				full_text: req.body.full_text,
				amount: parseFloat(req.body.amount.replace(/\D/g,'')),
				department_id: department[0].dataValues.id
			})
			.then(function(filing){
				let numbers = req.body.contract_numbers.split(',')
				_.each(numbers, function(e,i,l){
					Contract.create({
						contract_number: e,
						filing_id: filing.dataValues.id
					})
				})
			})
			.then(function(){ res.status(201).send("Success")})
			.catch(error => res.status(400).send(error));	
		})

}

function find_department(dn){
	return Department.findOrCreate({
		where: {name: dn}
		})
}
module.exports = {
	create: create
};

