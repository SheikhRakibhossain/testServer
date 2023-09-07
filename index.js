const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middle ware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`<h2>Hello Backend world<h2/>`)
})

const uri = "mongodb+srv://sonaly:sonalyrakib@cluster0.dracezw.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //user data api
        const userCollection = client.db("sonalyDB").collection("users");

        //data save function for post and save user
        app.post('/user', async(req, res)=>{
            const user = req.body;
            console.log(user)
            const result = await userCollection.insertOne(user);
            res.send(result)
        })

        //data show using this api
        app.get('/user', async(req, res)=>{
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // user or database update system
        app.get('/user/:id',async(req, res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)}
            const user = await userCollection.findOne(query)
            res.send(user);
        })

        //delete api here
        app.delete('/user/:id', async(req, res)=>{
            const id = req.params.id;
            const query = { _id: new ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            res.send(result)
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);



app.listen(port, () => {
    console.log(`We are running on ${port}`)
})