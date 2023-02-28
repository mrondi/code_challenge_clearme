const mongoose = require('mongoose');
const { model, Schema} = mongoose;
const Member = require("../models/Member");

const clientSchema = new Schema({
    name: { type: String, required: true },
    dateCreated: { type: Date },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state:  { type: String, required: true },
    zip:  { type: String, required: true },
    headcount:  { type: Number, required: true },
    isPrivate:  { type: Boolean, required: true },    
});

clientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

clientSchema.pre('findOneAndDelete', async function(next) {

    const doc = await this.model.findOne(this.getQuery());

    Member.deleteMany({
        "client": doc._id
    }).then(() => {
        next()
    }).catch(error => next(error)); 

});

clientSchema.pre('save', function(next){    
    if(this.isNew) {
        this.dateCreated = new Date()
    }
    next();
});

const Client = model('Client', clientSchema);

module.exports = Client;