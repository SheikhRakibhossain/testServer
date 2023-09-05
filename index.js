const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json())

 const users = [
    {id:1, name:'Rakib',age:27, status:'unemployment', email:'rakib@gamil.com'},
    {id:2, name:'Sakib',age:28, status:'employment', email:'sakib@gamil.com'},
    {id:3, name:'Akib',age:37, status:'uemployment', email:'akib@gamil.com'},
    {id:4, name:'Nakib',age:25, status:'unemployment', email:'nakib@gamil.com'},
 ]

app.get('/',(req, res)=>{
    res.send(`<h2>Hello Backend world<h2/>`)
})

app.get('/users',(req, res)=>{
res.send(users);
})

//get data from client site api
app.post('/users',(req, res)=>{
   const newUsers = req.body;
   newUsers.id = users.length + 1;
   users.push(newUsers);
   res.send(newUsers);

})

app.listen(port, ()=>{
    console.log(`We are running on ${port}`)
})