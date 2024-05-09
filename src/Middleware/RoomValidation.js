const { body } = require("express-validator");

const createRoomValidation = [
  body("name").trim().notEmpty().withMessage("Title is required"),
];


module.exports = {
  createRoomValidation,
};
