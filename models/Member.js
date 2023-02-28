const mongoose = require('mongoose');
const { model, Schema} = mongoose;
const Note = require("../models/Note");

const memberSchema = new Schema({
    fullname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'] 
    },

    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true},
});

memberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

memberSchema.pre(['deleteMany', 'findOneAndDelete'], async function(next) {

    const doc = await this.model.findOne(this.getQuery());

    Note.deleteMany({
        "member": doc.id
        })
    .then(() => {
        next()
    }).catch(error => next(error)); 

})

const Member = model('Member', memberSchema);

module.exports = Member;