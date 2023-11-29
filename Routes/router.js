const express = require('express')
const router = new express.Router()
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

// register API
router.post('/user/register',userController.register)

// login
router.post('/user/login',userController.login)

// add-project
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProjects)

// get userprojects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)

// get allprojects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)

// get homeprojects
router.get('/projects/home-projects',projectController.gethomeProjects)

// edit project
router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

// delete project
router.delete('/projects/remove/:id',jwtMiddleware,projectController.deleteProjectController)

// update user
router.put('/user/edit',jwtMiddleware,multerConfig.single("profileImage"),userController.editUser)

// export router
module.exports = router