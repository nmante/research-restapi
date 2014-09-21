#Controllers

Documented by Nii Mante

##Overview
This directory contains the code which will handle each route for the API.  When the sesrver hits a url/route like so:

	/patients/ab12cd34ef/
	
The code in this directory will be responsible for connecting to the database via the object models, and sending the responses back.