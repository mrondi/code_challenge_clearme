const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const noteSchema = new Schema({
    text: { type: String, required: true },
    dateCreated: { type: Date },
    member: { type: Schema.Types.ObjectId, ref: 'Member', required: true},
});

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
});

noteSchema.pre('save', function(next) {    
    if(this.isNew) {
        this.dateCreated = new Date()
    }
    next();
});

const Note = model('Note', noteSchema);

module.exports = Note;