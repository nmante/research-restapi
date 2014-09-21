#Models

Documented by Nii Mante

##Overview

This directory will contain all of the Models and Schema for working with the Database.

I'll use the [Mongoose](https://github.com/LearnBoost/mongoose) library to connect to the database and create schemas.

##Structure

I'll have one `models.js` file which will act as an interface for all of my schemas.  In a nutshell, if another folder/directory in my project wants to use a schema, then it should use this type of syntax

	var models = require('relative/path/to/models.js');
	
	// models is a Node Module
	models.<name_of_model>.<a_property>
	
This will keep my requires in all other directories clean, and acts as a way to modularize my Models.


	