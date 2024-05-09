const express = require('express');
const router = express.Router();
const tagController = require('../Controllers/tagsController');
const { tagValidation } = require('../Middleware/tagValidation');
const authMiddleware = require('../Middleware/authMiddleware');

// Create a new tag
router.post('/create', authMiddleware.verifyToken,tagValidation, tagController.createTag);

// Get all tags
router.get('/gettags', authMiddleware.verifyToken,tagController.getAllTags);

// Get tag by ID
router.get('/gettag/:id', tagController.getTagsById);

// Update tag
router.put('/updatetag/:id', authMiddleware.verifyToken,tagController.updateTag);

// Delete tag
router.delete('/deletetag/:id', authMiddleware.verifyToken,tagController.deleteTags);

module.exports = router;