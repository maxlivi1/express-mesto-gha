const notFoundPageRouter = require('express').Router();
const sendNotFoundPageError = require('../controllers/notFoundPage');

notFoundPageRouter.get('/', sendNotFoundPageError);
notFoundPageRouter.post('/', sendNotFoundPageError);
notFoundPageRouter.put('/', sendNotFoundPageError);
notFoundPageRouter.patch('/', sendNotFoundPageError);
notFoundPageRouter.delete('/', sendNotFoundPageError);

module.exports = notFoundPageRouter;
