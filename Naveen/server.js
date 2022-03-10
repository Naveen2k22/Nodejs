const express = require('express');
//const res = require('express/lib/response');
const bodyParser= require('body-parser')
const app = express();
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const hostelSchema = new Schema({
    hostel_no:Number,
    name:String,
    rooms:Number,
    warden_name:String,
    mess_capacity:Number,
    mess_Timing:String
  })
const hostel=mongoose.model('hostel',hostelSchema)
const url = 'mongodb://localhost:27017/hosteldb?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

mongoose.connect(url, { useNewUrlParser: true})

app.use(bodyParser.urlencoded({ extended: true }))
app.listen(3000, function(){
    console.log('listening on 3000')
})
app.get('/hostel',async (req,res) =>
{
    console.log('Hello Hollers')
    const hostellist = await hostel.find()
    console.log(hostellist)
    res.json(hostellist);
    //res.send ("Naveen")
});
app.post('/hostel', (req,res) =>
{
    console.log(req.body)
    const hostelobj=new hostel(req.body)
 hostelobj.save();
   // res.send ("naveen")
    res.json(req.body)
});
app.put('/hostel', async (req,res) =>
{
    console.log(req.body.hostel_no)

    let v = await hostel.findOne({'hostel_no':req.body.hostel_no})
    console.log(v)
    v.name = req.body.name
    v.rooms = req.body.rooms
    v.warden_name = req.body.warden_name
    v.mess_capacity = req.body.mess_capacity
    v.mess_Timing = req.body.mess_Timing
    v.save();
   // res.send ("Naveen")
   res.send('Updated Successfully')
});
app.delete('/hostel', async (req,res) =>
{
  let del = await hostel.findOneAndDelete({'hostel_no':req.body.hostel_no})
   res.send('Deleted Successfully')
});

