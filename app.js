const express = require('express');
const app = express();
const userModel = require('./models/user');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req,res){
    res.render("index");
});

app.get("/read", async function(req,res){
    let users = await userModel.find();
    res.render("read", {users});
});

app.post("/create", async function(req,res){

    let{img, userName, email} = req.body;

    let createdUser = await userModel.create({
        img: img,
        userName,
        email
    });

    res.redirect("/read");

});
 

// app.get("/create", async (req,res) => {
//     let user1 = await userModel.create({
//         name: "thejasvini",
//         userName: "thejjjjjoooo",
//         email: "theju@gmail.com"
//     })

//     res.send(user1);
// })

// app.get("/read", async (req, res) => {
//     let users = await userModel.find();
//     res.send(users);
// })

app.get("/edit/:userId", async (req,res) => {
    let user = await userModel.findOne({_id: req.params.userId});
    // let updatedUser = await userModel.findOneAndUpdate({name: "thejas"}, {name: "thejuuuuu"}, {new: true})
    res.render("edit", {user});
});

app.post("/update/:userId", async (req,res) => {
    let{newImg, newName, newEmail} = req.body;
    await userModel.findOneAndUpdate(
        {_id: req.params.userId},
        {
            img: newImg,
            userName: newName,
            email: newEmail
        },
        {new:true}
    );
    res.redirect("/read");
});

app.get("/delete/:userEmail", async (req, res) => {
    let user = await userModel.findOneAndDelete({email: req.params.userEmail});
    res.redirect("/read");
});

app.listen(3000);