const express = require('express');
const AdminController = require('../controllers/adminController');
const AuthController = require('../controllers/authController');


const router = express.Router();

/**
 * @swagger
 * /api/admin/allPost:
 *  get: 
 *      summary: Return the list of all the Donate Events
 *      tags: [Role Manager and CTV]
 *      responses:
 *          200:
 *              description: The list of the Donate Events if role Manager - The list of the Donate Events post by CTV if role Manager
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              AllPost:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/DonateEvent'
 *          403:
 *              description: Role Admin not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */

router.get('/allPost' , AuthController.checkAdminLogin, AdminController.getAllPost);
//router.get('/allCategory' , AuthController.checkAdminLogin, AdminController.getAdllCategoryDonateEvents);
/**
 * @swagger
 * /api/admin/logout:
 *  get: 
 *      summary: Logout
 *      description: Logout user admin
 *      tags: [User Admin]
 *      responses:
 *          200:
 *              description: Logout success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *              headers:
 *                  Set-Cookie:
 *                      description: Set cookie jwtAdmin = loggedout
 *                      schema:
 *                      type: string
 *          400:
 *              description: Error
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.get('/logout', AuthController.checkAdminLogin, AuthController.logoutAdmin);
/**
 * @swagger
 * /api/admin/allUserAdmin:
 *  get: 
 *      summary: Return the list of all the user admin
 *      tags: [Only Role Admin]
 *      responses:
 *          200:
 *              description: The list of the user admin if role Admin
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              AllUserAdmin:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/UserAdmin'
 *          403:
 *              description: Role Manager, CTV not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.get('/allUserAdmin', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.getAdllUserAdmin);
/**
 * @swagger
 * /api/admin/allUser:
 *  get: 
 *      summary: Return the list of all the user
 *      tags: [Only Role Admin]
 *      responses:
 *          200:
 *              description: The list of the user if role Admin
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              AllUser:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Donator'
 *          403:
 *              description: Role Manager, CTV not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.get('/allUser', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.getAdllUser);
/**
 * @swagger
 * /api/admin/userAdmin/{id}:
 *  get: 
 *      summary: Return the user admin by ID
 *      tags: [Only Role Admin]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 60fa7d01fc2d3530cc87aa81
 *      responses:
 *          200:
 *              description: The the user admin by ID
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              UserAdmin:
 *                                  $ref: '#/components/schemas/UserAdmin'
 *                                      
 *          403:
 *              description: Role Manager, CTV not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.get('/userAdmin/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.getUserAdmin);
/**
 * @swagger
 * /api/admin/postID/{id}:
 *  get: 
 *      summary: Return the post by ID
 *      tags: [Role Manager and CTV]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 60fa7acd10dbfc3edc7264e0
 *      responses:
 *          200:
 *              description: Get the post by ID
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              PostID:
 *                                  $ref: '#/components/schemas/DonateEvent'
 *                                      
 *          403:
 *              description: Role Admin not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.get('/postID/:id', AuthController.checkAdminLogin, AdminController.getPostId);

/**
 * @swagger
 * /api/admin/addPost:
 *  post: 
 *      summary: Return result of donation action
 *      description: Donate
 *      tags: [Role Manager and CTV]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              $ref: '#/components/schemas/DonateEventTodo'
 *      responses:
 *          200:
 *              description: Add post success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              Post:
 *                                  $ref: '#/components/schemas/DonateEvent'
 *          400:
 *              description: Add post Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: fail
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.post('/addPost', AuthController.checkAdminLogin, AdminController.postAddpost);
/**
 * @swagger
 * /api/admin/login:
 *  post: 
 *      summary: Login
 *      description: Login user admin
 *      tags: [User Admin]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: tam
 *                          password:
 *                              type: string
 *                              example: 123456789
 *      responses:
 *          200:
 *              description: Login success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              token:
 *                                  type: string
 *                              data:
 *                                  $ref: '#/components/schemas/UserAdmin'
 *              headers:
 *                  Set-Cookie:
 *                      description: Set cookie jwtAdmin   
 *                      schema:
 *                      type: string
 *          301:
 *              description: Is Login
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: Is Login
 *                              data:
 *                                  $ref: '#/components/schemas/UserAdmin'
 *          400:
 *              description: Login Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: fail
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.post('/login', AuthController.loginAdmin);
/**
 * @swagger
 * /api/admin/addUserAdmin:
 *  post: 
 *      summary: Add user admin
 *      description: Add user admin, only role Admin can add
 *      tags: [Only Role Admin]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/UserAdminTodo'
 *      responses:
 *          200:
 *              description: Add success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              UserAdmin:
 *                                  $ref: '#/components/schemas/UserAdmin'
 *          400:
 *              description: Add Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.post('/addUserAdmin', AuthController.checkAdminLogin, AuthController.restrictTo,AdminController.postAddUserAdmin);
/**
 * @swagger
 * /api/admin/addHappiness/{id}:
 *  post: 
 *      summary: Return result add happiness of the post
 *      description: Add happiness of the post
 *      tags: [Role Manager and CTV]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 60fa7acd10dbfc3edc7264e0
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              type: object
 *                              properties:
 *                                  happinessContent:
 *                                      type: string
 *                                  imageHappiness:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *      responses:
 *          200:
 *              description: Add happiness success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              Post:
 *                                  $ref: '#/components/schemas/DonateEvent'
 *          400:
 *              description: Add happiness Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: fail
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.post('/addHappiness/:id', AuthController.checkAdminLogin, AdminController.postHappiness);
/**
 * @swagger
 * /api/admin/editUserAdmin/{id}:
 *  put: 
 *      summary: Update profile user admin
 *      description: Update profile user admin
 *      tags: [User Admin]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: tom123@gmail.com
 *                          role:
 *                              type: string
 *                              enum: [Manager, CTV]
 *                              example: CTV
 *      responses:
 *          200:
 *              description: Update success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              UserAdmin:
 *                                  $ref: '#/components/schemas/UserAdmin'
 *                                  
 *          400:
 *              description: Update Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.put('/editUserAdmin/:id', AuthController.checkAdminLogin, AdminController.postEditUserAdmin);
/**
 * @swagger
 * /api/admin/changeActiveUserAdmin/{id}:
 *  put: 
 *      summary: Change active user admin
 *      description: Change active user admin
 *      tags: [Only Role Admin]
 *      responses:
 *          200:
 *              description: Change success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              UserAdmin:
 *                                  $ref: '#/components/schemas/UserAdmin'
 *                                  
 *          400:
 *              description: Update Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 *          403:
 *              description: Role Manager, CTV not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: Fail
 *                              error:
 *                                  type: string
 *                                  example: Bạn không có quyền sử dụng tính năng này!
 */
router.put('/changeActiveUserAdmin/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postChangeActive);
/**
 * @swagger
 * /api/admin/changeActiveUser/{id}:
 *  put: 
 *      summary: Change active user
 *      description: Change active user
 *      tags: [Only Role Admin]
 *      responses:
 *          200:
 *              description: Change success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              UserAdmin:
 *                                  $ref: '#/components/schemas/Donator'
 *                                  
 *          400:
 *              description: Update Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 *          403:
 *              description: Role Manager, CTV not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: Fail
 *                              error:
 *                                  type: string
 *                                  example: Bạn không có quyền sử dụng tính năng này!
 */
router.put('/changeActiveUser/:id', AuthController.checkAdminLogin, AuthController.restrictTo, AdminController.postChangeActiveDonator);
/**
 * @swagger
 * /api/admin/changeActiveUserAdmin/{id}:
 *  put: 
 *      summary: Change active user admin
 *      description: Change active user admin
 *      tags: [Only Role Manager]
 *      responses:
 *          200:
 *              description: Change success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              UserAdmin:
 *                                  $ref: '#/components/schemas/UserAdmin'
 *                                  
 *          400:
 *              description: Update Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 *          403:
 *              description: Role Admin and CTV not have access
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: Fail
 *                              error:
 *                                  type: string
 *                                  example: Bạn không có quyền sử dụng tính năng này!
 *          401:
 *              description: No Login
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: No Login
 */
router.put('/changeStatusPost/:id', AuthController.checkAdminLogin, AdminController.postChangeStatusPost);
/**
 * @swagger
 * /api/admin/changePassword:
 *  put: 
 *      summary: Change password of user admin
 *      description: Change password of user admin
 *      tags: [User Admin]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          oldPassword:
 *                              type: string
 *                              example: 123456789
 *                          newPassword:
 *                              type: string
 *                              example: tam12346789
 *                          passwordConfirm:
 *                              type: string
 *                              example: tam12346789
 *      responses:
 *          200:
 *              description: Change password success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *          401:
 *              description: Change password Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              error:
 *                                  type: string
 */
router.put('/changePassword', AuthController.checkAdminLogin, AdminController.putChangePassword)
module.exports = router;