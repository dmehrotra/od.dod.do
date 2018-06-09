// Create Department
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/Departments.csv" AS row
CREATE (:Department {name: row.name, psql_id: row.id});


// Create Projects

USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/Projects.csv" AS row
CREATE (c:Project {psql_id: row.id, full_text: row.full_text, DepartmentId: row.DepartmentId})



// Create Relationships
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/Relationships.csv" AS row

CREATE (:Relationship {type: row.type, title: row.title, psql_id: row.id});


// Create Relatinship between Departents and Projects
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/Projects.csv" AS row
MATCH (c:Project {psql_id: row.id})
MATCH (d:Department {psql_id: row.departmentId})
CREATE (d)-[:Issued {department_id:id(d), project_id:id(c)}]->(c);

// Create Connections between Projects and Relationships
USING PERIODIC COMMIT
LOAD CSV WITH HEADERS FROM "file:/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/ProjectRelationships.csv" AS row
MATCH (c:Project {psql_id: row.ProjectId})
MATCH (r:Relationship {psql_id: row.RelationshipId})
CREATE (c)-[:Has {project_id:id(c), relationship_id:id(r)}]->(r);


