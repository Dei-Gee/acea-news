const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const StorySchema = new Schema({
    Title: {
        type: String, 
        required: true
    }, 
    Content: {
        type: String, 
        required: true
    }, 
    ImageURL: {
        type: String, 
        required: true
    }, 
    Location: {
        type: String, 
        required: true
    }, 
    DateCreated: {
        type: Date, 
        default: Date.now
    }

});

module.exports = Story = mongoose.model('Story', StorySchema);