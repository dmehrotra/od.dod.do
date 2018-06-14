COPY (SELECT * FROM "Projects") TO '/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/Projects.csv' WITH CSV header;
COPY (SELECT * FROM "Departments") TO '/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/Departments.csv' WITH CSV header;
COPY (SELECT * FROM "Relationships") TO '/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/Relationships.csv' WITH CSV header;
COPY (SELECT * FROM "ProjectRelationships") TO '/Users/Mehrotra/projects/department-of-defense-contracts/cypher2.0/data/ProjectRelationships.csv' WITH CSV header;
