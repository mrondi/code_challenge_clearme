const router = require('express').Router();
const Member = require('../models/Member.js');
const Note = require('../models/Note.js');
const ObjectId = require('mongodb').ObjectId;

router.post('/', async (req, res, next) => {

    let data = req.body;

    if(!data.member) {
        res.status(400).json({ error: "'member' is missing" }).end()
    }

    if(!ObjectId.isValid(data.member)) {
        res.status(400).json({ error: "'member' is invalid" }).end()
    }

    const member = await Member.findById(data.member) ;

    if(!member) {
        res.status(400).json({ error: "'member' not found" }).end()
    }

    const note = new Note(data);

    note.save()
        .then(async (result) => {                 
            res.json(result)          
        }).catch(error => next(error));

});

router.put('/:id', (req, res, next) => {

    const { id } = req.params;
    const data = req.body;
    
    if(!id) {
        res.status(400).json({ error: "'id' is missing" })
    }

    Note.findByIdAndUpdate(id, data, { new: true })
        .then(result => {            
            res.json(result)          
        }).catch(error => next(error)); 
    
});

router.delete('/:id', (req, res, next) => {

    const { id } = req.params;

    if(!id) {
        res.status(400).json({ error: "'id' is missing" });
    }

    Note.findByIdAndDelete(id)
        .then(() => {
            res.status(204).end()
        }).catch(error => next(error));

})

router.get('/', (req, res, next) => {

    Note.find({}).populate("member")
        .then(result => {
            res.json(result)           
        }).catch(error => next(error)); 

})

module.exports = router;