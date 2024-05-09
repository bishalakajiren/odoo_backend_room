const Tag = require('../Models/Tags-model');
const { validationResult } = require('express-validator');

// Create a new tag
exports.createTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
        const tag = await Tag.create({ name });
        return res.status(200).json({ message: 'Tag created successfully', data: tag });
    } catch (error) {
        console.error('Error in creating tag:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateTag = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  const roomId = req.params.id;
  const {  name } = req.body;
 
  try {
    const updatedrooms = await Tag.updatetag(roomId, {
      name
    });

    // const findUpdatedrooms = await Rooms.findRoomById(roomId);
    return res.status(200).json({ message: 'Service updated successfully', data: updatedrooms });
  } catch (error) {
    console.error('Error in updateService:', error);
    return res.status(400).json({ errors: ['Something went wrong'] });
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const tag = await Tag.getAlltags();
    return res.status(200).json({ message: 'tag found', data: tag });
  } catch (error) {
      console.error(error);
      return res.status(407).json({ errors: ['Something went wrong'] });
  }
};

exports.deleteTags = async (req, res) => {
  const tagId = req.params.id;
  try {
      const deleteTag = await Tag.deletetag(tagId);
      if (!deleteTag ) {
          return res.status(404).json({ errors: ['Category not found'] });
      }
      return res.status(200).json({ message: 'Category deleted successfully', data: deleteTag  });
  } catch (error) {
      console.error(error);
      return res.status(407).json({ errors: ['Something went wrong'] });
  }
};

exports.getTagsById = async (req, res) => {
  const tagId = req.params.id;

  try {
    const tag = await Tag.findtagById(tagId);
    if (!tag) {
      return res.status(404).json({ error: 'tag not found' });
    }
    return res.json(tag);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ errors: ['Something went wrong'] });
  }
};