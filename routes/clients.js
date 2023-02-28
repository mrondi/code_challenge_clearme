const router = require('express').Router();
const Client = require('../models/Client.js');

router.post('/', (req, res, next) => {

    const data = req.body;
    const client = new Client(data);
    
    client.save()
        .then(result => {            
            res.json(result)          
        }).catch(error => next(error));
    
});

router.put('/:id', (req, res, next) => {

    const { id } = req.params;
    const data = req.body;
    
    if(!id) {
        res.status(400).json({ error: "'id' is missing" }).end()
    }

    Client.findByIdAndUpdate(id, data, { new: true })
        .then(result => {            
            res.json(result)          
        }).catch(error => next(error));
    
});

router.delete('/:id', (req, res, next) => {

    const { id } = req.params;

    if(!id) {
        res.status(400).json({ error: "'id' is missing" }).end()
    }

    Client.findByIdAndDelete(id)
        .then(() => {
            res.status(204).end()
        }).catch(error => next(error));

});

router.get('/find-by-name', (req, res, next) => {

    const { name } = req.body;

    if(!name) {
        res.status(400).json({ error: "'name' is missing"}).end()
    }

    Client.find({ name })
        .then(result => {
            res.json(result)           
        }).catch(error => next(error));

});

router.get('/find-by-state', (req, res, next) => {

    const { state } = req.body;

    if(!state) {
        res.status(400).json({ error: "'state' is missing" }).end()
    }

    Client.find({ state })
        .then(result => {
            res.json(result)           
        }).catch(error => next(error));

})

module.exports = router;