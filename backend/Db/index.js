import mongoose from "mongoose"
const mongo_uri = "mongodb+srv://pradum:pradum6120@pradum.cq0bj.mongodb.net/chatapp?retryWrites=true&w=majority&appName=chatapp"

//const mongo_uri = process.env.MONGO_URI; 
const Database = ()=>{
   mongoose.connect(mongo_uri)
.then(()=>{
  console.log("mongodb connected successfully")
}).catch((error)=>{
    console.log("unable to connect mongodb", error)
})

}

export default Database