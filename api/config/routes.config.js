const express = require('express');
const passport = require('passport');
const contacts = require('../controllers/contacts.controller');
const users = require('../controllers/users.controller');
const contact = require('../middlewares/contact.mid');
const secure = require('../middlewares/secure.mid')
const router = express.Router();

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]

router.post('/users', users.create);
router.get('/users/:id', secure.isAuthenticated, users.get);
router.delete('/users/:id', secure.isAuthenticated, users.delete);
router.patch('/users/:id', secure.isAuthenticated, users.update);

router.post('/login', users.login);
router.post('/logout', users.logout);

router.get('/authenticate/google', passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }))
router.get('/authenticate/google/cb', users.loginWithGoogle)

router.get('/contacts', secure.isAuthenticated, contacts.list);
router.post('/contacts', secure.isAuthenticated, contacts.create);
router.get('/contacts/:id', secure.isAuthenticated, contact.exists, contacts.detail);
router.delete('/contacts/:id', secure.isAuthenticated, contact.exists, contacts.delete);
router.put('/contacts/:id', secure.isAuthenticated, contact.exists, contacts.edit);

module.exports = router;
