const express = require('express');
const router = express.Router();
const authController = require('../userProfile/auth-controller');
const { authenticate,checkPermission}=require('../../middleware/member-middleware');



router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/users',  authController.getUserList); //authenticate,checkPermission('view','userrole'),
router.get('/users/:id', authController.getUserById); //  authenticate,checkPermission('view','userrole'),
router.put('/users/:id', authController.updateUser); //  authenticate,checkPermission('edit','userrole'),
router.delete('/users/:id',  authController.deleteUser); // authenticate,checkPermission('delete','userrole'),

module.exports = router;
