const express = require('express');
const DonateEnvent = require('../controllers/donateEventController');
const AuthController = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      DonateEvent:
 *          type: object    
 *          required:
 *              - title
 *              - summary
 *              - content
 *              - startDay
 *              - endDay
 *              - setAmount
 *              - poster
 *              - categoryPost
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the DonateEvent
 *              title:
 *                  type: string
 *                  description: Title of the DonateEvent
 *              image:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: URL image of DonateEvent
 *              summary:
 *                  type: string
 *                  description: Content synopsis of DonateEvent
 *              content:
 *                  type: string
 *                  description: Content of DonateEvent
 *              startDay: 
 *                  type: string
 *                  description: Start day of DonateEvent
 *              endDay: 
 *                  type: string
 *                  description: End day of DonateEvent
 *              setAmount: 
 *                  type: string
 *                  description: Amount to donate
 *              currentAmount: 
 *                  default: "0"
 *                  type: string
 *                  description: Current amount donated
 *              status:
 *                  type: string
 *                  enum: ['Chưa đủ', 'Đã đủ', 'Dừng nhận donate']
 *                  default: 'Chưa đủ'
 *                  description: Status of the DonateEvent
 *              hotPost:
 *                  type: boolean
 *                  description: Hot post
 *              poster:
 *                  type: string
 *                  description: ID user post
 *              categoryPost:
 *                  type: string
 *                  description: Post type id
 *              numberOfDonations: 
 *                  type: number
 *                  default: "0"
 *                  description: Number of donations
 *              happinessContent:
 *                  type: string
 *                  description: ID user post
 *              imageHappiness:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: URL image happiness
 *              requestChangeStatus:
 *                  type: boolean
 *                  description: Request change status donate event
 *          example:
 *              id: 60cc8c820f1cb916ac385f24
 *              title: Chung tay viết tiếp “Ước mơ của Thúy” dành tặng các bệnh nhi ung thư
 *              image: [https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521141255-637572031756842528.jpg?alt=media&token=d3d543cd-26d7-4b8b-b7de-9c6df813ae30, https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521141310-637572031909191724.jpg?alt=media&token=a9e1677e-3b39-465c-a41e-1fa0f19cf715, https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521140734-637572028540633606.jpg?alt=media&token=9a7daa24-e204-4bd5-b9f6-089527d9817f]
 *              summary: Chương trình “Ước mơ của Thúy” chăm sóc và hỗ trợ bệnh nhi ung thư đang điều trị bệnh nhằm giúp các em có thêm niềm vui, động lực sống.
 *              content: chương trình đã hỗ trợ kinh phí điều trị cho hàng ngàn bệnh nhi ung thư khó khăn khắp đất nước thông nhiều hoạt động như chạy bộ, bán đồ gây quỹ, triển lãm ảnh, hiến máu… nhằm vận động, quyên góp giúp đỡ các em. Không chỉ dừng lại ở đó, chương trình còn tổ chức thường niên các hoạt động hỗ trợ tinh thần cho các em vào các dịp Tết, Giáng Sinh, Quốc tế thiếu nhi, hay Sinh nhật… Bên cạnh đó, vô vàn những suất ăn trị giá từ 300,000 - 500,000 VNĐ và những món quà đặc biệt đều được trao tận tay các em và gia đình.
 *              startDay: 2021-06-18
 *              endDay: 2021-07-26
 *              setAmount: 300000000
 *              currentAmount: 0
 *              status: Chưa đủ
 *              hotPost: false
 *              poster: 60ef0107b1b81a22d878f54f
 *              categoryPost: 60b7a9fe9a127331a8e5b085
 *              numberOfDonations: 0
 *              happinessContent: Các bệnh nhân đã được điều trị và có khởi sắc
 *              imageHappiness: [https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521141255-637572031756842528.jpg?alt=media&token=d3d543cd-26d7-4b8b-b7de-9c6df813ae30, https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521141310-637572031909191724.jpg?alt=media&token=a9e1677e-3b39-465c-a41e-1fa0f19cf715, https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521140734-637572028540633606.jpg?alt=media&token=9a7daa24-e204-4bd5-b9f6-089527d9817f]
 *              requestChangeStatus: false
 *      DonateEventTodo:
 *          type: object    
 *          required:
 *              - title
 *              - image
 *              - summary
 *              - content
 *              - startDay
 *              - endDay
 *              - setAmount
 *              - categoryPost
 *              - hotPost
 *          properties:
 *              title:
 *                  type: string
 *                  description: Title of the DonateEvent
 *              image:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: URL image of DonateEvent
 *              summary:
 *                  type: string
 *                  description: Content synopsis of DonateEvent
 *              content:
 *                  type: string
 *                  description: Content of DonateEvent
 *              startDay: 
 *                  type: string
 *                  description: Start day of DonateEvent
 *              endDay: 
 *                  type: string
 *                  description: End day of DonateEvent
 *              setAmount: 
 *                  type: string
 *                  description: Amount to donate
 *              categoryPost:
 *                  type: string
 *                  description: Post type id
 *              hotPost:
 *                  type: boolean
 *                  description: Hot post
 *          example:
 *              title: Chung tay viết tiếp “Ước mơ của Thúy” dành tặng các bệnh nhi ung thư
 *              image: [https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521141255-637572031756842528.jpg?alt=media&token=d3d543cd-26d7-4b8b-b7de-9c6df813ae30, https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521141310-637572031909191724.jpg?alt=media&token=a9e1677e-3b39-465c-a41e-1fa0f19cf715, https://firebasestorage.googleapis.com/v0/b/fashionshop-11d42.appspot.com/o/img_post%2Fmomo-upload-api-210521140734-637572028540633606.jpg?alt=media&token=9a7daa24-e204-4bd5-b9f6-089527d9817f]
 *              summary: Chương trình “Ước mơ của Thúy” chăm sóc và hỗ trợ bệnh nhi ung thư đang điều trị bệnh nhằm giúp các em có thêm niềm vui, động lực sống.
 *              content: chương trình đã hỗ trợ kinh phí điều trị cho hàng ngàn bệnh nhi ung thư khó khăn khắp đất nước thông nhiều hoạt động như chạy bộ, bán đồ gây quỹ, triển lãm ảnh, hiến máu… nhằm vận động, quyên góp giúp đỡ các em. Không chỉ dừng lại ở đó, chương trình còn tổ chức thường niên các hoạt động hỗ trợ tinh thần cho các em vào các dịp Tết, Giáng Sinh, Quốc tế thiếu nhi, hay Sinh nhật… Bên cạnh đó, vô vàn những suất ăn trị giá từ 300,000 - 500,000 VNĐ và những món quà đặc biệt đều được trao tận tay các em và gia đình.
 *              startDay: 2021-06-18
 *              endDay: 2021-07-26
 *              setAmount: 300000000
 *              categoryPost: 60b7a9fe9a127331a8e5b085
 *              hotPost: false
 *      Donator:
 *          type: object    
 *          required:
 *              - username
 *              - fullName
 *              - email
 *              - password
 *              - passwordConfirm
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the UserCustomer
 *              username:
 *                  type: string
 *                  description: Username
 *              fullName:
 *                  type: string
 *                  description: Full name of the UserCustomer
 *              email:
 *                  type: string
 *                  description: Email of the UserCustomer
 *              password:
 *                  type: string
 *                  description: Password
 *              passwordConfirm:
 *                  type: string
 *                  description: Password confirm
 *              active:
 *                  type: boolean
 *                  default: true
 *          example:
 *              id: 60e2b5ab8d79370e185a257d
 *              username: nhan0302
 *              fullName: Quách Trọng Nhân
 *              email: dhnhan19999@gmail.com
 *              password: nhan1234
 *              passwordConfirm: nhan1234
 *              active: true
 *      DonatorTodo:
 *          type: object    
 *          required:
 *              - username
 *              - fullName
 *              - email
 *              - password
 *              - passwordConfirm
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username
 *                  example: "tam"
 *              fullName:
 *                  type: string
 *                  description: Full name of the UserCustomer
 *                  example: Đoàn Văn Duy Tâm
 *              email:
 *                  type: string
 *                  description: Email of the UserCustomer
 *                  example: tam123@gmail.com
 *              password:
 *                  type: string
 *                  description: Password
 *                  example: 123456789
 *              passwordConfirm:
 *                  type: string
 *                  description: Password confirm
 *                  example: 123456789
 *      DonateAction:
 *          type: object    
 *          required:
 *              - amountToDonate
 *              - donateEvent
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the UserCustomer
 *              fullName:
 *                  type: string
 *                  description: Full name of the UserCustomer donated
 *              phone:
 *                  type: string
 *                  default: ""
 *              message:
 *                  type: string
 *                  description: Message
 *              amountToDonate:
 *                  type: string
 *                  description: Donation amount
 *              donateEvent:
 *                  type: string
 *                  description: ID Donate Event
 *              donator: 
 *                  type: string
 *                  description: ID UserCustomer donated
 *          example:
 *              id: 60e4810f6a587529c0525ce1
 *              fullName: Nhà hảo tâm
 *              phone: 0333833407
 *              message: Chúc sức khỏe vượt qua bệnh tật
 *              amountToDonate: 10000
 *              donateEvent: 60d01d0c2d3f4512b0d2f9cc
 *              donator: 60d01d0c2d3f4512g0d5f7cd
 *      donateActionTodo:
 *          type: object
 *          properties:
 *              donateEvent:
 *                  type: string
 *                  description: ID donateEvent
 *                  example: 60e4810f6a587529c0525ce1
 *              amountToDonate:
 *                  type: string
 *                  description: Amount donate
 *                  example: 10000
 *              message:
 *                  type: string
 *                  description: Message
 *                  example: Chúc sức khỏe vượt qua bệnh tật
 *              checked:
 *                  type: boolean
 *                  description: Anonymous or not
 *                  example: false
 *              fullName:
 *                  type: string
 *                  description: Full name userCustomer donate
 *                  example: Quách Trọng Nhân
 *      CategoryDonateEvent:
 *          type: object
 *          required:
 *              - CategoryName
 *          properties:
 *              id:
 *                  type: string
 *                  description: ID donateEvent
 *                  example: 60e4810f6a587529c0525ce1
 *              CategoryName:
 *                  type: string
 *                  description: Category donate events name
 *                  example: Ủng hộ cho hoàn cảnh khó khăn
 *      UserAdmin:
 *          type: object    
 *          required:
 *              - username
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: string
 *                  description: The auto-generated id of the UserCustomer
 *              username:
 *                  type: string
 *                  description: Username
 *                  example: "tam"
 *              email:
 *                  type: string
 *                  description: Email of the UserCustomer
 *                  example: tam123@gmail.com
 *              role:
 *                  type: string
 *                  enum: [Admin, Manager, CTV]
 *                  default: 'Manager'
 *                  description: Role of User Admin
 *                  example: Manager
 *              password:
 *                  type: string
 *                  description: Password
 *                  example: 123456789
 *      UserAdminTodo:
 *          type: object    
 *          required:
 *              - username
 *              - email
 *              - role
 *              - password
 *              - passwordConfirm
 *          properties:
 *              username:
 *                  type: string
 *                  description: Username
 *                  example: "tam"
 *              email:
 *                  type: string
 *                  description: Email of the UserCustomer
 *                  example: tam123@gmail.com
 *              role:
 *                  type: string
 *                  enum: [Admin, Manager, CTV]
 *                  default: 'Manager'
 *                  description: Role of User Admin
 *                  example: Manager
 *              password:
 *                  type: string
 *                  description: Password
 *                  example: 123456789
 *              passwordConfirm:
 *                  type: string
 *                  description: Password confirm
 *                  example: 123456789
 *          
 */

/**
 * @swagger
 * tags:
 *  name: DonateEvents
 *  description: The DonateEvents managing API
 */

/**
 * @swagger
 * tags:
 *  name: UserCustomer
 *  description: The UserCustomer managing API
 */

/**
 * @swagger
 * tags:
 *  name: Only Role Admin
 *  description: The Role Admin managing API
 */

/**
 * @swagger
 * tags:
 *  name: Only Role Manager
 *  description: The Role Manager managing API
 */

/**
 * @swagger
 * tags:
 *  name: Role Manager and CTV
 *  description: The Role Manager managing API
 */

/**
 * @swagger
 * tags:
 *  name: User Admin
 *  description: The User Admin managing API
 */

/**
 * @swagger
 * /api/donateEvents:
 *  get: 
 *      summary: Return the list of all the DonateEvents
 *      tags: [DonateEvents]
 *      responses:
 *          200:
 *              description: The list of the DonateEvents
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              DonateEnvents:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/DonateEvent'
 */

router.get('/donateEvents', DonateEnvent.getDonateEvents);

/**
 * @swagger
 * /api/categoryDonateEvents:
 *  get: 
 *      summary: Return the list of all the Category Donate Events
 *      tags: [DonateEvents]
 *      responses:
 *          200:
 *              description: The list of the Category Donate Events
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              CategoryDonateEvents:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/CategoryDonateEvent'
 */
router.get('/categoryDonateEvents', DonateEnvent.getCategoryDonateEvents);
router.post('/payMomo', DonateEnvent.postPayMomo);
router.get('/payMomoSusess', DonateEnvent.postPayMomoSusess);

/**
 * @swagger
 * /api/donateEvent/{id}:
 *  get:
 *      summary: Return the donate event by id
 *      tags: [DonateEvents]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 60cc8c820f1cb916ac385f24
 *      responses:
 *          200:
 *              description: The list of the Category Donate Events
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              DonateEnvent:
 *                                  type: object
 *                                  $ref: '#/components/schemas/DonateEvent'
 */
router.get('/donateEvent/:id', DonateEnvent.getDonateEvent);
/**
 * @swagger
 * /api/logout:
 *  get: 
 *      summary: Logout
 *      description: Logout user customer
 *      tags: [UserCustomer]
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
 *                      description: Set cookie jwt = loggedout
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
 */
router.get('/logout', AuthController.checkUserLogin, AuthController.logoutCustomer);
/**
 * @swagger
 * /api/allDonate:
 *  get: 
 *      summary: All donte
 *      description: Return all the donate of User Customer
 *      tags: [UserCustomer]
 *      responses:
 *          200:
 *              description: Get success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              AllDonate:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/DonateAction'
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
router.get('/allDonate', DonateEnvent.getAllDonate);
/**
 * @swagger
 * /api/allDonator/{id}:
 *  get: 
 *      summary: Return all donater of donate event by id donate event
 *      description: Return all the donater of donate event
 *      tags: [DonateEvents]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 60fa709210dbfc3edc7264d3
 *      responses:
 *          200:
 *              description: Get success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              AllDonater:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/DonateAction'
 */
router.get('/allDonator/:id', DonateEnvent.getAllDonater);
/**
 * @swagger
 * /api/50Donator/{id}:
 *  get: 
 *      summary: Return top 50 donater of donate event by id donate event
 *      description: Return top 50 the donater of donate event
 *      tags: [DonateEvents]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          example: 60fa709210dbfc3edc7264d3
 *      responses:
 *          200:
 *              description: Get success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              AllDonater:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/DonateAction'
 */
router.get('/50Donator/:id', DonateEnvent.get50Donater);
router.get('/relatedPost/:id', DonateEnvent.getRelatedPost);
/**
 * @swagger
 * /api/donate:
 *  post: 
 *      summary: Return result of donation action
 *      description: Donate
 *      tags: [UserCustomer]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          data:
 *                              $ref: '#/components/schemas/donateActionTodo'
 *      responses:
 *          200:
 *              description: Donate success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *          400:
 *              description: Donate Fail
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: fail
 */
router.post('/donate', DonateEnvent.postDonate);
/**
 * @swagger
 * /api/login:
 *  post: 
 *      summary: Login
 *      description: Login user customer
 *      tags: [UserCustomer]
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
 *                                  $ref: '#/components/schemas/Donator'
 *              headers:
 *                  Set-Cookie:
 *                      description: Set cookie jwt   
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
 *                                  $ref: '#/components/schemas/Donator'
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
 */
router.post('/login', AuthController.loginCustomer);
/**
 * @swagger
 * /api/signup:
 *  post: 
 *      summary: Register
 *      description: Register
 *      tags: [UserCustomer]
 *      requestBody:
 *          required: true
 *          content: 
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/DonatorTodo'
 *      responses:
 *          200:
 *              description: Register success
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *          400:
 *              description: Register Fail
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
router.post('/signup', DonateEnvent.postRegister);
/**
 * @swagger
 * /api/updateProfileUser:
 *  put: 
 *      summary: Update profile donator
 *      description: Update profile donator
 *      tags: [UserCustomer]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                              example: Đoàn Văn Duy Tâm
 *                          email:
 *                              type: string
 *                              example: tam1999@gmail.com
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
 *                              user:
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
 */
router.put('/updateProfileUser', AuthController.checkUserLogin, DonateEnvent.postUpdateProfileUser);
/**
 * @swagger
 * /api/changePassword:
 *  put: 
 *      summary: Change password of donator
 *      description: Change password of donator
 *      tags: [UserCustomer]
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
router.put('/changePassword', AuthController.checkUserLogin, DonateEnvent.putChangePassword);

module.exports = router;