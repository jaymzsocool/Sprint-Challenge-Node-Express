const express = require('express');
const actionDb = require('./data/helpers/actionModel.js')
const projectDb = require('./data/helpers/projectModel.js')
const server = express();

logger = (req, res, next) => {
    console.log(`${req.method} to ${req.url}`)
    next();
}

server.use(logger);
server.use(express.json());

server.get('/', (req, res) =>{
    res.send('running')
})

server.get('/actions', async (req, res) => {
    try{
        const actions = await actionDb.get();
        if (actions.length > 0){
            res.status(200).json(actions);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    }
});

server.get('/actions/:id', async (req, res) => {
    try {
        const action = await actionDb.get(req.params.id);
        if (action) {
            return res.status(200).json(action);
        } 
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    }
})

server.post('/actions', async (req, res) => {
    try{
        if (req.body.project_id && req.body.description && req.body.notes){
            const action = await actionDb.insert(req.body);
            return res.status(200).json(action);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    } 
})

server.put('/actions/:id', async (req, res) => {
    if (!req.body.project_id || !req.body.description || !req.body.notes) {
        return status(400).json({ message: 'Please input the required fields.' })
    }        
    try { 
        const action = await actionDb.update(req.params.id, req.body);       
        if (req.body.project_id && req.body.description && req.body.notes) {
            
            return res.status(200).json(action);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    } 
})

server.delete("/actions/:id", async (req, res) => {
	try {
		let action = await actionDb.remove(req.params.id);
		if (action) {
			return res.status(200).json(action);
        }
        return res.status(404).json({
            message: "Information not found"
        })
	} catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    } 
});



server.get('/projects', async (req, res) => {
    try{
        const projects = await projectDb.get();
        if (projects.length > 0){
            res.status(200).json(projects);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    }
});

server.get('/projects/:id', async (req, res) => {
    try {
        const project = await projectDb.get(req.params.id);
        if (project) {
            return res.status(200).json(project);
        } 
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    }
})

server.post('/projects', async (req, res) => {
    try{
        if (req.body.name && req.body.description){
            const project = await projectDb.insert(req.body);
            return res.status(200).json(project);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    } 
})

server.put('/projects/:id', async (req, res) => {
    if (!req.body) {
        return status(400).json({ message: 'Please input a name.' })
    }        
    try { 
        
        const project = await projectDb.update(req.params.id, req.body);       
        if (req.body.name && req.body.description) {
            
            return res.status(200).json(project);
        }
        return res.status(404).json({
            message: "Information not found"
        })
    } catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    } 
})

server.delete("/projects/:id", async (req, res) => {
	try {
		let project = await projectDb.remove(req.params.id);
		if (project) {
			return res.status(200).json(project);
        }
        return res.status(404).json({
            message: "Information not found"
        })
	} catch (err) {
        res.status(500).json({ error: "Unable to retrieve."})
    } 
});

server.listen(5000, () =>     
    console.log(`server is listening on port 5000`));