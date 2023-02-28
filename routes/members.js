const router = require('express').Router();
const Member = require('../models/Member.js');
const Client = require('../models/Client.js');
const ObjectId = require('mongodb').ObjectId;

router.post('/', async (req, res, next) => {

    let data = req.body;
    
    if(!data.client) {
        res.status(400).json({ error: "'client' is missing" }).end()
    }

    if(!ObjectId.isValid(data.client)) {
        res.status(400).json({ error: "'client' is invalid" }).end()
    }

    const client = await Client.findById(data.client);

    if(!client) {
        res.status(400).json({ error: "'client' not found" }).end()
    }

    const member = new Member(data);

    member.save()
        .then(async (result) => {                   
            res.json(result)          
        }).catch(error => next(error));   
    
});

router.put('/:id', async (req, res, next) => {

    const { id } = req.params;
    const data = req.body;
    
    if(!id) {
        res.status(400).json({ error: "'id' is missing" }).end()
    }   

    if(data.client) {
        
        const client = await Client.findById(data.client);

        if(!ObjectId.isValid(data.client)) {
            res.status(400).json({ error: "'client' is invalid" }).end()
        }

        if(!client) {
            res.status(400).json({ error: "'client' not found" }).end()
        }
    }

    Member.findByIdAndUpdate(id, data, { new: true })
        .then(result => {            
            res.json(result)          
        }).catch(error => next(error));
    
});

router.delete('/:id', (req, res, next) => {

    const { id } = req.params;

    if(!id) {
        res.status(400).json({ error: "'id' is missing" }).end()
    }

    Member.findByIdAndDelete(id)
        .then((result) => {
            res.status(204).end()
        }).catch(error => next(error));

})

router.get('/', (req, res, next) => {

    Member.find({}).populate('client')
        .then(result => {
            res.json(result)           
        }).catch(error => next(error));

});

module.exports = router;