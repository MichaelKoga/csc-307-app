import express from "express";
import cors from "cors";

import { addUser, getUsers, findUserById, findUserByName, findUserByJob, findUserByNameAndJob, findUserByIdAndDelete, } from './services/user-service.js';

const app = express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.post("/users", async (req, res) => {  
	
    const userToAdd = req.body; 

    try { 
        const newUser = await addUser(userToAdd);   

        res.status(201)   
            .location(`/users/${newUser.id}`)   
            .json(newUser);

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
    
});

app.get("/users/:id", async (req, res) => {  
    
    const id = req.params["id"];  
	
    try {
        const user = await findUserById(id);  
	
        if(user === undefined)  
	    {   
		    res.status(404).send("Resource not found.");  
	    }  
	    else  
	    {   
		    res.json(user);	
	    } 
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server errror");
    }
});

app.get("/users", async (req, res) => {  
    
    const name = req.query.name;  
	const job = req.query.job;   

    try {
        const users = await getUsers(name, job)     
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    } 
});

app.delete("/users/:id", async (req, res) => {  
	
    const id = req.params["id"];

    try {  
	    const deletedUser = await findUserByIdAndDelete(id);  

	    if(deletedUser === undefined)  
	    {   
		    res.status(404).send("User with ID ${id} could not be found");  
	    }  
	    else  
	    {   
		    res.status(200).send("Successful deletion of ${id}");  
	    } 
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
   
});

app.listen(port, () => {
	console.log(
		`Example app listening at http://localhost:${port}`
	);
});


