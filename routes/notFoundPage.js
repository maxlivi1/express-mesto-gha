const notFoundPageRouter = require('express').Router();
const sendNotFoundPageError = require('../controllers/notFoundPage');

notFoundPageRouter.use('/', sendNotFoundPageError);

module.exports = notFoundPageRouter;
