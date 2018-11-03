const Project = require('../models').Project;
const Department = require('../models').Department;
const Relationship = require('../models').Relationship;
var Sequelize = require('sequelize');
let db = require('../models')
let ommit = ["tsv",'createdAt',"checked",'updatedAt',"DepartmentId",'ProjectRelationship',"Relationships","Projects"]
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
	let sql = 'SELECT id FROM(SELECT tsv,id, full_text FROM "Projects", plainto_tsquery(\''+query+'\') AS q WHERE (tsv @@ q)) AS t1 ORDER BY ts_rank_cd(t1.tsv, plainto_tsquery(\''+query+'\')) DESC;';
// I straight up cant figure out how to include associations in a raw query... so for now this is it
	db.sequelize.query(sql,{ model: Project }).then(function(projects){
		if (projects){
			
			ar = _.map(projects,function(a){ return a.id});

			project_ar = _.map(ar,getProject);
			Promise.all(project_ar).then(function(v){
				prs=_.compact(v)
				if(prs){
					cleaned_projects = _.map(prs,process)
					Promise.all(cleaned_projects).then(function(v){
						res.json(v)
					})
				
				}
				
			})
		}else{res.status(400).send("not a valid uuid")}

	});
}
function connected(req,res){
	let uuid = [req.params.uuid]
	if (uuid[0].length > 30){
		let department = getDepartment(uuid);
		let project = getProject(uuid);
		let relationship = getRelationship(uuid)
		Promise.all([department,project,relationship]).then(function(v){
			prs=_.compact(v)
			if(prs){
				cleaned_projects = _.map(prs,process)
				Promise.all(cleaned_projects).then(function(v){
					res.json(v)
				})
			
			}
		});
	}else{res.status(400).send("not a valid uuid")}
	

}
function dateSearch(req,res){
	let sd=req.params.start_date;
	let ed=req.params.end_date
	let sql = 'select id from "Projects" where filing_date between \''+sd+'\'::date and \''+ed+'\'::date;'
	db.sequelize.query(sql,{ model: Project }).then(function(projects){
		if (projects){
			ar = _.map(projects,function(a){ return a.id});
			project_ar = _.map(ar,getProject);
			Promise.all(project_ar).then(function(v){
				prs=_.compact(v)
				if(prs){
					cleaned_projects = _.map(prs,process)
					Promise.all(cleaned_projects).then(function(v){
						res.json(v)
					})
				
				}
				
			})
		}else{res.status(400).send("not a valid uuid")}

	});
}
function findHash(req,res){
	let hash=req.params.hash
	let sql = 'select id from "Projects" where id = \''+hash+'\'';
	db.sequelize.query(sql,{ model: Project }).then(function(projects){
		if (projects){
			ar = _.map(projects,function(a){ return a.id});
			project_ar = _.map(ar,getProject);
			Promise.all(project_ar).then(function(v){
				prs=_.compact(v)
				if(prs){
					cleaned_projects = _.map(prs,process)
					Promise.all(cleaned_projects).then(function(v){
						res.json(v)
					})
				
				}
				
			})
		}else{res.status(400).send("not a valid uuid")}

	});
}

function clean_node(node,callback){
	if (node.constructor.name == 'Department' || node.constructor.name == 'Relationship'){
		obj = {}
		obj.sourceType = node.constructor.name
		obj.data = node.dataValues
		obj.data.projects = standardize(node.dataValues.Projects,"P")
		obj = _.omit(obj.data, ommit);
		callback(obj)
	}else{
		obj = {}
		obj.sourceType = node.constructor.name
		obj.data = node.dataValues
		obj.data.relationships = standardize(node.dataValues.Relationships,"DR")
		obj = _.omit(obj.data, ommit);

		callback(obj)
	}
}
function process(project){
	return new Promise(function(resolve, reject){
				clean_node(project,function(obj){
					resolve(obj)
				})
			})
}
function standardize(o,type){
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

function recent(req,res){
	let sql = 'select MAX(filing_date) from "Projects";';
	db.sequelize.query(sql,{ model: Project }).then(function(recent){
		if (recent){
			date = recent[0].dataValues.max
			res.json(date)
		}else{
			res.status(500).send("API error")
		}
	});
}



function getDepartment(uuid){
	return Department.findOne({ 
		where: {
	    	id: {$in: uuid} 	
	    }, 
	    include: [{model: Project}]
	})

}
function getProject(uuid){
	// include relationship here?
	return Project.findOne({ where: {id:uuid}, include: [{model: Relationship}]} )

}
function getRelationship(uuid){
	return Relationship.findOne({ 
		where: {
	    	id: {$in: uuid} 	
	    }, 
	    include: [{model: Project}]
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
	search: search,
	recent: recent,
	findHash: findHash,
	dateSearch: dateSearch
};


