const express = require('express');
const router = express.Router();

//story model
const Story = require('../../models/story');

// @route GET api/stories
// @desc Get All Stories
// @access private

router.get('/', (req, res) => {
    Story.find()
    .sort({date: -1})
    .then(stories => res.json(stories))
});

// @route POST to api/stories
// @desc POST a Story
// @access private

router.post('/', (req, res) => {
    const newStory = new Story({
        Title: req.body.Title, 
        Content: req.body.Content, 
        ImageURL: req.body.ImageURL, 
        Location: req.body.Location, 
        DateCreated: req.body.DateCreated
    });

    newStory.save().then(story => res.json(story));
});

// @route DELETE to api/stories
// @desc DELETE a Story
// @access private

router.delete('/:id', (req, res) => {
    Story.findById(req.params._id)
    .then(story => story.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}, ' Story not found!'));
});

module.exports = router;