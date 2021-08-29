const express = require('express');
const contacts = require('../controllers/contacts.controller');
const users = require('../controllers/users.controller');
const contact = require('../middlewares/contact.mid');
const secure = require('../middlewares/secure.mid')
const upload = require('../config/multer.config')
const router = express.Router();

router.post('/users', upload.single('avatar'), users.create);
router.get('/users/:id', secure.isAuthenticated, users.get);
router.delete('/users/:id', secure.isAuthenticated, users.delete);
router.patch('/users/:id', secure.isAuthenticated, secure.isUser, users.update);

router.post('/login', users.login);
router.post('/logout', users.logout);

router.get('/authenticate/google', users.loginWithGoogle)
router.get('/authenticate/google/cb', users.doLoginWithGoogle)

router.get('/contacts', secure.isAuthenticated, contacts.list);
router.post('/contacts', secure.isAuthenticated, contacts.create);
router.get('/contacts/:id', secure.isAuthenticated, contact.exists, contacts.detail);
router.delete('/contacts/:id', secure.isAuthenticated, contact.exists, contacts.delete);
router.put('/contacts/:id', secure.isAuthenticated, contact.exists, contacts.edit);

module.exports = router;
