var promise = require('bluebird');
var _ = require('underscore');
var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 
var db = pgp(connectionString);
//Contracts

function ac(req, res, next) {
	  department_uuid = (req.params.department_uuid != undefined) ? req.params.department_uuid : "0"
	  contractor_uuid = (req.params.contractor_uuid != undefined) ? req.params.contractor_uuid : "0" 
	  console.log("Department: " + department_uuid)
	  console.log("Contractor: " + contractor_uuid)
	if (department_uuid == "0" && contractor_uuid == "0"){
		ac_all(res,next)
	}else if ( department_uuid == "0" && contractor_uuid != "0"){
		ac_contractor(contractor_uuid,res,next)
	}else if ( department_uuid != "0" && contractor_uuid =="0"){
		ac_department(department_uuid,res,next)
	
	}else{
		ac_d_c(department_uuid,contractor_uuid,res,next)
	}
	
}

function ac_d_c(department_uuid,contractor_uuid,res,next){

	  db.any('select *,contract.uuid as contract_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1 and contractor.uuid = $2',[department_uuid,contractor_uuid])
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ac_department(department_uuid,res,next){

	  db.any('select *, contract.uuid as contract_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1',department_uuid)
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ac_contractor(contractor_uuid,res,next){

	  db.any('select *, contract.uuid as contract_uuid, contractor.uuid as contractor_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where contractor.uuid = $1',contractor_uuid)
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ac_all(res,next){

	  db.any('select *, contract.uuid as contract_uuid, contractor.uuid as contractor_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id')
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}



//

//Works With
function ww(req, res, next) {
	  department_uuid = (req.params.department_uuid != undefined) ? req.params.department_uuid : "0"
	  contractor_uuid = (req.params.contractor_uuid != undefined) ? req.params.contractor_uuid : "0" 
	  console.log("Department: " + department_uuid)
	  console.log("Contractor: " + contractor_uuid)
	if (department_uuid == "0" && contractor_uuid == "0"){
		ww_all(res,next)
	}else if ( department_uuid == "0" && contractor_uuid != "0"){
		ww_contractor(contractor_uuid,res,next)
	}else if ( department_uuid != "0" && contractor_uuid =="0"){
		ww_department(department_uuid,res,next)
	
	}else{
		ww_d_c(department_uuid,contractor_uuid,res,next)
	}
	
}

function ww_d_c(department_uuid,contractor_uuid,res,next){

	  db.any('select contract_date, place_of_work, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1 and contractor.uuid = $2',[department_uuid,contractor_uuid]).then(function (data) {
		        createMeta(data,res)
	  		}).catch(function (err) {
			  return next(err);
		        });
}
function ww_department(department_uuid,res,next){

	  db.any('select contract_date, place_of_work, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1',department_uuid).then(function (data) {
	createMeta(data,res)	        
	  }).catch(function (err) {
		return next(err);
	  });
}
function ww_contractor(contractor_uuid,res,next){

	  db.any('select contract_date, place_of_work, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where contractor.uuid = $1',contractor_uuid).then(function (data) {
		        	createMeta(data,res)
	  		}).catch(function (err) {
			  return next(err);
		        });
}
function ww_all(res,next){

	  db.any('select contract_date, place_of_work, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id').then(function (data) {
		createMeta(data,res)		        
	    }).catch(function (err) {
		 return next(err);
	    });
}
function ww_test(req,res,next){
	db.any('select contract_date, place_of_work, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id') .then(function (data) {
		createMeta(data,res);			
	}).catch(function (err) {
	  return next(err);
	});
}
function createMeta(data,res){
	var obj_a = []
	_.each(data,function(e,i){
		var c = {
			"contractor_name": e.contractor_name,
			"department_name": e.department_name,
			"contractor_uuid": e.contractor_uuid,
			"department_uuid": e.department_uuid,
			"contracts_date": [e.contract_date],
			"places_of_work": [e.place_of_work]
		}
		var o_c = _.findWhere(obj_a, {'contractor_name': c.contractor_name, 'department_name': c.department_name});
		if (o_c){
			o_c.contracts_date.push(c.contracts_date[0]);
			o_c.places_of_work.push(c.places_of_work[0]);
			
		}else{
			obj_a.push(c)
		}
	
		
	})
	res.status(200).json({
		status: 'success',
		data: obj_a,
		message: 'Retrieved ALL contracts'
	});
	
}

module.exports = {
	ac:ac,
	ww: ww,
	ww_test: ww_test
};
