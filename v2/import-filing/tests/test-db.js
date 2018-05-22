const chai = require('chai')
let should = chai.should()
let expect = chai.expect
let db = require('../server/models')


let Department = db.Department
let Project = db.Project
let Relationship = db.Relationship

Department.associate(db)
Project.associate(db)
Relationship.associate(db)

db.sequelize.sync()

models = { Department, Project, Relationship}

let DepartmentData = {
    name: "ARMY"
}
let ProjectData = {
    full_text:"Total Technology,* Cherry Hill, New Jersey (W15QKN-18-D-0073); Pioneering Decisive Solutions,* California, Maryland (W15QKN-18-D-0078); Logisys Technical Services,* Huntsville, Alabama (W15QKN-18-D-0077), will compete for each order of the $125,000,000 firm-fixed-price contract for automated test system testing, and diagnostics and net-centric support services. Bids were solicited via the Internet with six received. Work locations and funding will be determined with each order, with an estimated completion date of May 20, 2023. U.S. Army Contracting Command, New Jersey, is the contracting activity.",
    contract_numbers:"W15QKN-18-D-0073,W15QKN-18-D-0078,W15QKN-18-D-0077",
    amount: 125000000,
    filing_date: 2018-05-21

}
let RelationshipData = {
	type: "Company",
    title: "Total Technology",
    info: "www.totaltechnology.com"
}

let ProjectTwoData = {
    full_text:"Total Technology,* Huntsville, Alabama, was awarded a $75,943,165 cost-plus-fixed-fee contract for programmatic support services for security assistance, foreign military sales and international programs. Bids were solicited via the Internet with seven received. Work locations and funding will be determined with each order, with an estimated completion date of May 31, 2023. U.S. Army Contracting Command, Aberdeen Proving Ground, Maryland, is the contracting activity (W91CRB-18-D-0005).",
    contract_numbers:"W91CRB-18-D-0005",
    amount: 75943165,
    filing_date: 2018-05-21

}


describe("Department", function (done) {
    it("should create a new Department", function () {

        db.Department.create(DepartmentData).then(function (d) {
            //victim name should be equivalent to the fake submission we are using
            expect(d.name).to.equal("ARMY"); 
            //remove the entry from the database
            
            db.Department.destroy({
                where: {
                    id: d.id
                }
            })
        })


    });
})
describe("Project", function (done) {


    it("should create a new Project", function () {

        db.Project.create(ProjectData).then(function (p) {
            //victim name should be equivalent to the fake submission we are using
            expect(p.amount).to.equal(125000000); 
            //remove the entry from the database
            
            db.Project.destroy({
                where: {
                    id: p.id
                }
            })
        })


    });
})
describe("Relationship", function (done) {


    it("should create a new Relationship", function () {

        db.Relationship.create(RelationshipData).then(function (r) {
            //victim name should be equivalent to the fake submission we are using
            expect(r.type).to.equal("Company"); 
            //remove the entry from the database
            
            db.Project.destroy({
                where: {
                    id: r.id
                }
            })
        })


    });
})

describe("Relationships", function (done) {


    it("should create new Relationships", function () {
    	db.Department.create(DepartmentData).then(function(department){
    		db.Project.create(ProjectData).then(function(project){
                department.addProject(project)
                db.Relationship.create(RelationshipData).then(function (relationship) {
                    project.addRelationship(relationship)
                    
                    db.Project.create(ProjectTwoData).then(function(project_two){
                        department.addProject(project_two)
                        project_two.addRelationship(relationship).then(function(r){
                            department.getProjects().then(function(p){
                                expect(p.length).to.equal(2); 
                            })
                            relationship.getProjects().then(function(p){
                                expect(p.length).to.equal(2); 
                            })

                        })

                    })
                })
    		})
    	})

    

    });
})


 
