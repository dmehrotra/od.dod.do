var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = '';
var db = pgp(connectionString);

function getAllContracts(req, res, next) {
	  db.any('select * from contract')
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL puppies'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function createContract(req, res, next) {
	  contractor = req.body.contractor_name
	  department = req.body.department_name

	  
	 createMeta(contractor, department, function(obj){
		if (req.body.another_country){
			another_country = req.body.another_country
		}else{
			another_country = "United States"
		}
		insertion = {
			'contract_number': req.body.contract_number,
			'for_what': req.body.for_what,
			'contractor_id':obj.contractor_id,
			'department_id':obj.department_id,
			'place_of_work': req.body.place_of_work,
			'amount':parseFloat(req.body.amount.replace(/,/g, '')),
			'contract_date':new Date(req.body.contract_date),
			'contracting_activity':req.body.contracting_activity,
			'foreign':req.body.foreign,
			'another_country':another_country
		}
		 console.log(another_country)
	        db.none('insert into contract (contract_number,for_what,contractor_id,department_id,place_of_work,amount,contract_date,contracting_activity,"foreign","another_country")' + 'VALUES (${contract_number}, ${for_what}, ${contractor_id}, ${department_id},${place_of_work},${amount},${contract_date},${contracting_activity},${foreign},${another_country})', insertion)
			 .then(function () {
				 res.status(200).json({
					status: 'success',
					message: "Inserted this contract:" + req.body.contract_number + " into the postgres database"
				 });
			 }).catch(function (err) { 
				 console.log(err)
				 res.status(200).json({
				 	status:'nah',
					message:err
				 })
			 		
			 });
 	})
	  
}

function createContractor(c,d){
	return db.any('select * from contractor where name = $1', c).then(function (data) {
		if (data.length > 0){
			return {'contractor_id': data[0].id,
				'department': d
			}
		}else{
			return db.one('insert into contractor(name)' + 'values($1) RETURNING id', c).then(function(data){
				return {'contractor_id': data.id,
					'department': d
				}
			})
		}
	})
}
function createDepartment(obj){
	return db.any('select * from department where name = $1', obj.department).then(function (data) {
		     if (data.length > 0){
			return { "contractor_id": obj.contractor_id,
				 "department_id": data[0].id
			}
	             }else{
			 return db.one('insert into department(name)' + 'values($1) RETURNING id', d).then(function(data){
				return { "contractor_id": obj.contractor_id,
					 "department_id": data.id
				}
			})
		     }
				    
	 })
}
function createMeta(c,d,callback){
	createContractor(c,d).then(function(obj){
		console.log("creating contractor: ",obj)
		return createDepartment(obj)
	}).then(function(obj){
		console.log("creating department:", obj);
		callback(obj);
	})
	
}

module.exports = {
	getAllContracts: getAllContracts,
	createContract: createContract

};
