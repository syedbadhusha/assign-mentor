const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require('cors')
const app = express();
app.use(cors());
app.listen("3000");
app.use(express.json());

const URL =
  "mongodb+srv://admin:admin123@loopacc.vzozr5w.mongodb.net/?retryWrites=true&w=majority&appName=loopacc";
/// Write API to create Mentor
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
// Write API to create Student
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
// Write API to Assign a student to Mentor
//Select one mentor and Add multiple Student
app.put("/assingmentor/:mentorobjid", async (req, res) => {
  const mentorid = req.params.mentorobjid;
  const students = req.body;
  const connection = await MongoClient.connect(URL);
  const db = connection.db("mentorandstudent");
  try {
    for (const stuname of students) {
      const collectionstu = db.collection("students");
      await collectionstu.updateOne(
        { _id: new ObjectId(stuname._id) },
        { $set: { mentor: new ObjectId(mentorid) } }
      );
    }
    await connection.close();
    return res.json({ message: `Studenst Assigned to Mentor ${mentorid}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went wrong" });
  }
});
// A student who has a mentor should not be shown in List
app.get("/nonassignedstudents", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collection = db.collection("students");
    const nonassignedstudents = await collection
      .find({ mentor: { $exists: false } })
      .toArray();
    await connection.close();
    res.json(nonassignedstudents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});
// Write API to Assign or Change Mentor for particular Student
// Select One Student and Assign one Mentor
app.put("/assingonestudent/:studentobjid", async (req, res) => {
  const studentid = req.params.studentobjid;
  const selectedmentorid = req.body._id;
  const connection = await MongoClient.connect(URL);
  const db = connection.db("mentorandstudent");
  try {
    const collectionstu = db.collection("students");
    await collectionstu.updateOne(
      { _id: new ObjectId(studentid) },
      { $set: { mentor: new ObjectId(selectedmentorid) } }
    );
    await connection.close();
    return res.json({
      message: `Studenst Assigned to Mentor ${selectedmentorid}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went wrong" });
  }
});
//Write API to show all students for a particular mentor
app.get("/studentsundermentor/:mentorid", async (req, res) => {
  const mentorid = req.params.mentorid;
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collection = db.collection("students");
    const allstudentsparticularmentor = await collection
      .find({ mentor: new ObjectId(mentorid) })
      .toArray();
    await connection.close();
    res.json(allstudentsparticularmentor);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});
//Write an API to show the previously assigned mentor for a particular student.
app.get("/assignedstudent/:studentid", async (req, res) => {
  const studentid = req.params.studentid;
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collection = db.collection("students");
    const assignedstudent = await collection
      .find({ _id: new ObjectId(studentid) })
      .toArray();
    const collectionment = db.collection("mentors");
    const assignedmentorDetails = await collectionment
      .find({ _id: new ObjectId(assignedstudent[0].mentor) })
      .toArray();
    await connection.close();
    res.json(assignedmentorDetails);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});
// Get All students
app.get("/students", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collection = db.collection("students");
    const allstudent = await collection
      .find()
      .toArray();
    await connection.close();
    res.json(allstudent);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});
// Mentor Assigned Students
app.get("/assignedstudents", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collection = db.collection("students");
    const assignedstudents = await collection
      .find({ mentor: { $exists: true } })
      .toArray();
    await connection.close();
    res.json(assignedstudents);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});
// get All Mentors
app.get("/mentors", async (req, res) => {
  try {
    const connection = await MongoClient.connect(URL);
    const db = connection.db("mentorandstudent");
    const collectionment = db.collection("mentors");
    const mentors = await collectionment
      .find()
      .toArray();
    await connection.close();
    res.json(mentors);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "somthing went werong" });
  }
});

