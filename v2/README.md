# Press-Release-Filing & Extension

This folder contains code to collect, tag, organize, and retrieve the press releases. 
- Press releases are sent to our import API using a chrome extension ( see dod-extension ).
- Our db is structured with Departments, Projects, and Relationships. A department has many projects and a project has and belongs to many relationships. 
- Once press releases are stored there is a cron job that will semantically tag and assign keywords to new projects. This is powered by Thompson Reuters' Open Calais.
