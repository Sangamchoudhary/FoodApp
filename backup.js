// const express = require("express");
// const userModel = require("./myApp/Models/userModel");
// const app = express();

// app.use(express.json()); // middle  ware
// app.listen(3000);

// const userRouter = express.Router();
// const authRouter = express.Router();

// app.use('/user',userRouter); // base url, router-to-use
// app.use('/auth',authRouter); // base url, router-to-use

// userRouter.route('/').get(getUser).post(postUser).patch(updateUser).delete(deleteUser)

// userRouter.route('/:id').get(getUserById)

// authRouter.route('/signUp').get(middleware,getSignUp).post(postSignUp)

// function middleware(req,res,next){
//     console.log("I am middleware");
//     next();
// }

// function getSignUp(req,res){
//     res.sendFile("/Public/signup.html",{root:__dirname});
// }

// function postSignUp(req,res){
//     let obj = req.body;
//     console.log(obj);
//     res.json({
//         "message" : "Data receiver from frontend",
//         data : obj
//     })
// }

// // Express.js way 👇
// async function getUser(req,res){
//     let allUsers = await userModel.find();
//     res.json({
//         message : "All users fetched",
//         users : allUsers
//     });
// }
// async function postUser(req,res){
//     let user = req.body;
//     let createdUser = await userModel.create(user);
//     res.json({
//         message : "User Created",
//         users : createdUser
//     });
// }
// async function updateUser(req,res){
//     let updatedData = req.body;
//     let updatedUser = await userModel.findOneAndUpdate({email:"admin@gmail.com"},updatedData);
//     res.status(203).json({
//         message : "Data Update Successfully",
//         data : updatedUser
//     })
// }
// async function deleteUser(req,res){
//     let userToBeDeleted = req.body;
//     let deletedUser = await userModel.findOneAndDelete(userToBeDeleted);
//     res.status(203).json({  
//         message : "User Deleted Successfully",
//         data : deletedUser
//     })
// }
// function getUserById(req,res){
//     let name = "user not found";
//     for(val of users){
//         if(val.id == req.params.id) name = val.name;     
//     }
//     res.json({
//         "message" : "User found",
//         "user name is" : name
//     });
// }

// // Node.js way 👇

// // app.get('/users', (req,res) => res.send(users)); // read

// // app.post('/users',(req,res)=>{
// //     users = req.body;
// //     res.json({
// //         message : "good",
// //         users : req.body
// //     });
// // }); // write

// // app.patch('/users',(req,res)=>{
// //     let data = req.body;
// //     for(key in data) users[key] = data[key];
// //     res.status(203).json({
// //         message : "Data Update Successfully"
// //     })
// // }); // update

// // app.delete('/users',(req,res)=>{
// //     res.send("user deleted");
// // }) // delete

// // app.get('/users/:id',(req,res)=>{
// //     res.send(users[req.params.id]);
// // }) // get user by id

