import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const findUserById = (id) => 
	users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name) => {
	return users["users_list"].filter(
		(user) => user["name"] === name
	);
};

const findUserByNameAndJob = (name, job) => {
	return users["users_list"].filter(
		(user) => user["name"] === name && user["job"] === job
	);
};

const generateRandomId = () => {
	const id = Math.floor(Math.random() * 100) + 1;
	return id;
}

const addUser = (user) => {  
	const newUser = { ...user, id: generateRandomId() };
	users["users_list"].push(newUser);  
	return newUser; 
};

const deleteUser = (id) => {
	const index = users["users_list"].findIndex((user) => user.id === id);   

	if(index !== -1)  
	{   
		const deletedUser = users["users_list"].splice(index, 1)[0]; // delete one element at the index, will return at index 0
		return deletedUser;  
	} 
	
	return null; 
};


const users = {
	users_list: [
		{
			id: "xyz789",
			name: "Charlie",
			job: "Janitor"
		},
		{	id: "abc123",
			name: "Mac",
			job: "Bouncer"
		},
		{
			id: "ppp222",
			name: "Mac",
			job: "Professor"
		},
		{	
			id: "yat999",
			name: "Dee",
			job: "Aspiring actress"
		},
		{
			id: "zap555",
			name: "Dennis",
			job: "Bartender"
		}
	]
};

app.use(cors());

app.use(express.json());

app.post("/users", (req, res) => {  
	const userToAdd = req.body;  
	const newUser = addUser(userToAdd);  
	res.status(201)
		.location(`/users/${newUser.id}`)
		.json(newUser); 
});

app.get("/users/:id", (req, res) => {  
	const id = req.params["id"];  
	let result = findUserById(id);  
	if (result === undefined)  
	{   
		res.status(404).send("Resource not found.");  
	}  
	else  
	{   
		res.send(result);  
	} 
});

app.get("/users", (req, res) => {  
	const name = req.query.name;  
	const job = req.query.job;   
	
	if(name && job)  
	{   
		let result = findUserByNameAndJob(name, job);   
		result = { users_list: result };   
		res.send(result);  
	}  
	else if(name)  
	{   
		let result = findUserByName(name);   
		result = { users_list: result };   
		res.send(result);  
	}  
	else  
	{   
		res.send(users);  
	} 
});

app.delete("/users/:id", (req, res) => {  
	const id = req.params["id"];  
	const deletedUser = deleteUser(id);  

	if(deletedUser === undefined)  
	{   
		res.status(404).send("User with ID ${id} could not be found");  
	}  
	else  
	{   
		res.send(users);  
	} 
});

app.listen(port, () => {
	console.log(
		`Example app listening at http://localhost:${port}`
	);
});


