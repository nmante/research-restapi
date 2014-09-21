#Research Database

**Nii Mante**

**University of Southern California**

##Purpose

- Make it easy to create and analyze my research data

##Overview

I'm creating a: 

- ***RESTful API*** (**NodeJS**, **MongoDB**, **Express**) 
	- Receive requests from a client which creates and consumes data
- ***Mobile/web client*** (In another repo)
	- Creates experiments, patients, studies 
	- Allows me to view graphs and the above entities
	
No actual research data will be stored on Github due to privacy issues.  

##Install

Once it's complete I will include complete install instructions

##More details

###Technology

The project uses:

- *Node.JS* + *Express* + *Mongoose* for my server
- *Python* for scientific data analysis
- *MongoDB* to persist data

The system will receive api calls via Express.  NodeJS will be responsible for starting worker threads and persisting data.  

*Worker Threads*

- **Python** - for producing plots using matplotlib
- **R** - data analysis such as ANOVA

*Data Persistence*

- Api calls will result in the use of **MongooseJS**, a node package, to work with and persist data to **MongoDB**

####MongoDB + Database Logic

I'll be persisting three main types of objects to the database.  

- Patient
- Experiments
- Studies

Studies can have many patients, and patients can belong to many studies. 

Patients can have many (>500) experiments.

An experiment has to belong to one patient, and one study.

An experiment has many Points(data, >100). A point has one experiment.

#####Schema

***Note:*** `[]` symbolize an array of that item.  `ref` symbolizes a pointer/reference to the entity.

	Patient {
		_id 		: ObjectId,
		name 		: String,
		age			: Number,
		impairment	: {
			cause : String,
			level : String		
		}
		studies		: [ref to ObjectId <study>],
		experiments	: [ref to ObjectId <experiment>]	
	} Index (name)
	
	Study {
		_id			: ObjectId,
		name		: String,
		patients	: [ref to ObjectId <Patient>]
	} Index (name)
	
	
	Experiment {
		_id				: ObjectId,
		number			: Number,
		patient			: ref to ObjectId<Patient>,
		study			: ref to ObjectId<Study>,
		finalGraspTime	: Number,
		firstGraspTime	: Number,
		intervals		: [Number],
		numGrasps		: Number,
		points			: [
			{
				x			: Number,
				y			: Number,
				width		: Number,
				height		: Number,
				fsTimeStamp	: String,
				timeStamp	: String
				soundCode	: Number
			}
		]
	}
	
	

####NodeJS + REST Api logic

I'll utilize a RESTful Api to receive requests, and process/persist data to the database.

`[]` symbolize an array of that item. The format of the API routes/statements is:

	[HTTP Method] [route]		-> <response code> [response object]

#####Patients
	POST /patients					-> 200: :patient
	GET /patients					-> 200: [:patient]
	GET /patients/:id				-> 200: :patient
	PUT /patients/:id				-> 200: :patient
	DELETE /patients/:id			-> 200
	
	
	GET /patients/:id/experiments	-> 200: [:experiment]
	GET /patients/:id/studies		-> 200: [:study]
	
	
######Studies
	POST /studies					-> 200: :study
	POST /studies/:id/experiments	-> 200: :experiment
	GET /studies					-> 200: [:study]
	GET /studies/:id				-> 200: :study
	GET /studies/:id/experiments	-> 200: [:experiment]
	DELETE /studies/:id				-> 200
	

######Experiments

	POST /experiments				-> 200: :experiment
	GET /experiments				-> 200: [:experiments]
	GET /experiments/:id			-> 200: :experiment
	PUT /experiments/:id			-> 200: :experiment
	DELETE /experiment/:id			-> 200
	
	PUT /experiments/:id/points		-> 200: 
