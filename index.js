const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
app.listen("3000");
app.use(express.json());

const URL =
  "mongodb+srv://admin:admin123@loopacc.vzozr5w.mongodb.net/?retryWrites=true&w=majority&appName=loopacc";
/// API to create Mentor
app.post("/creatementor", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collection = db.collection("mentors");
    await collection.insertOne(req.body);
    await connection.close();
    res.json({ message: "Mentor Created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});
// API To Create Student
app.post("/createstudent", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collection = db.collection("students");
    await collection.insertOne(req.body);
    await connection.close();
    res.json({ message: "Student Created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});
// Write API to assign a student to mentor
app.put("/assingmentor/", async (req, res) => {
    const mentorname = req.body.mentorname;
    const students  =   req.body.students;
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");        
  try { 
        for (const stuname of students) {
            const collectionstu = db.collection("students");
            const collectionment = db.collection("mentors");
            const mentorAvail = await collectionment.findOne({ name: mentorname });
            const studentAvail = await collectionstu.findOne({ name: stuname });
            if(!mentorAvail && !studentAvail){
                await connection.close();
                return res.status(504).json({message: `${mentorname} and ${stuname} Both are Not Available Create Before Asigning`})
            }else if(!mentorAvail && studentAvail){
                await connection.close();
                return res.status(504).json({message: `${mentorname} Mentor is Not Available Create Before Asigning`})
            }else if(mentorAvail && !studentAvail){
                await connection.close();
                return res.status(504).json({message: `${stuname} Student is Not Available Create Before Asigning`})
            }else{
                await collectionstu.updateOne(
                    { name: stuname },
                    { $set: { mentor: mentorAvail._id } }
                  );
            }
        }
        await connection.close();
        return res.json({ message: `Studenst Assigned to Mentor ${mentorname}` });    
} catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went wrong" });
  }
});
