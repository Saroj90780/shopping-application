const express = require("express")
const cors = require("cors")
const app = express()
const path=require("path")
const bodyParser = require("body-parser")
const { default: mongoose } = require("mongoose")
app.use(express.static("public"))
app.use(express.static('node_modules'));
const mongoClient = require("mongodb").MongoClient;
constmongoose=require("mongoose")
const url = "mongodb://localhost:27017"
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


// app.get("/",async(req,res)=>{
//   res.sendFile(path.join(__dirname,"./public/backend-ui.html"))
// })
app.get("/",(req,res)=>{
  console.log("saroj")
  mongoClient.connect(url).then(clientObj=>{
    var database=clientObj.db("shopCrazze");
    database.collection("Admin").find({}).toArray().
    then(document =>{
        res.send(document);
        res.end();
    })
  })
})


// app.get("/", (req, res) => {
//   const { name, age } = req.body
//   const client = new mongoClient(url, { useUnifiedTopology: true });
//   client.connect(client => {
//       const db = client.db("shopCrazze")
//       const collection = db.collection("Admin")
//       collection.insertOne({ name, age }, (err, result) => {
//           res.send("Data inserted successfully")
        
//       })
//     })
//   })
// mongoClient.connect(url,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(()=>{
//   const db = mongoClient.db("shopCrazze")
//   const collection = db.collection("Admin")


// })

mongoose.connect(url,{
  }).then(()=>{
    console.log("database connected")
    }).catch((err)=>{
      console.log(err)
      })
  
const Schema = mongoose.Schema;
const dataschema =new Schema({
  category:String,
  product:String,
  price:Number,
  quantity:Number,
  Status:String,
  description:String,
  img:String,
  offers:[
    {
      bankOffer:String,
      axisOffer:String,
      hdfcOffer:String,
      specialOffer:String
    }
  ]
}
)

const Data = mongoose.model('Data',dataschema)
app.post("/submit",(req,res)=>{
  const {
  category,
  productName,
  price,
  quantity,
  status,
  description,
  img,
  bankOffer,
  axisOffer,
   hdfcOffer,
   specialOffer
  }=req.body
  console.log(req.body)
  mongoClient.connect(url).then(clientObj=>{
  var database=clientObj.db("shopCrazze");
  var newdata={
    category:category,
    product:productName,
    price:price,
    quantity:quantity,
    status:status,
    description:description,
    img:img,
    offers:{
        bankOffer:bankOffer,
        axisOffer:axisOffer,
        hdfcOffer:hdfcOffer,
        specialOffer:specialOffer
        }
  };
  database.collection("Admin").insertOne(newdata).then(
      res.end()
  )
})
res.redirect('/');
})
app.listen(4001)
console.log(`Server Started http://127.0.0.1:4007`);