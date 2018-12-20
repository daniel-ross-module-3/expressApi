const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const Employee = require("../models/Employee");


// -==--=-==--=-=-=-starts employee signup-=-==-=-=--=-=
router.post('/employeeCreate', (req, res, next) => {
  Employee.create({
    employeeName: req.body.employeeName,
    employeeKey: req.body.employeeKey,
    payRate: req.body.payRate,
    position: req.body.position,
    employer: req.user._id,
    shifts: [],
    active: false

  })
    .then((employee) => {
      res.json(employee)
    })
    .catch((err) => {
      res.json(err)
    })
})
// -== --=-==--=-=-=-ends employee signup -=-==-=-= --=-=
// -== --=-==--=-=-=-starts employee editing-=-==-=-= --=-=
router.post('/employeeUpdate/:id', (req, res, next) => {
  Employee.findByIdAndUpdate(req.params.id, {
    employeeName: req.body.employeeName,
    employeeKey: req.body.employeeKey,
    payRate: req.body.payRate,
    position: req.body.position,
    shifts: []
  })
    .then((employee) => {
      res.json(employee)
    })
    .catch((err) => {
      res.json(err)
    })
})

  // -== --=-==--=-=-=-ends employee editing-=-==-=-= --=-=

  router.get("/employeeList",(req,res,next)=>{
    Employee.find({employer:req.user._id})
    .then((employeeList)=>{
      res.json(employeeList)
    })
    .catch((err)=>{
      res.json(err)
    })
  })

  // =-=--=-=-==-clock in and out routes below =--=-==-=-
  router.get("/employeeFind/:key",(req,res,next)=>{
    //isLoggedIn
    // console.log(req.user)
    Employee.findOne({ employeeKey: req.params.key, employer:req.user._id})
    .then((employeeDetail)=>{
      res.json(employeeDetail)
    })
    .catch((err)=>{
      res.json(err)
    })
  })


router.post("/employeeFind/delete/:key", (req, res, next) => {
  Employee.remove({employeeKey: req.params.key})
    .then(deletedItem => {
      if (deletedItem === null) {
        res.json({ message: "sorry this Item could not be found" });
        return;
      }

      res.json([{ message: "Item succesfully deleted" }, deletedItem]);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post("/clockInAndOut/:id",(req,res,next)=>{


  Employee.findById(req.params.id)
  .then((employee)=>{ 
      if(!employee.active){
        //we want to clock them in

        Employee.findByIdAndUpdate(req.params.id, {
          active: true,
          currentShift:{ clockIn: new Date()}
        }, {new: true})
        .then((employeeInfo)=>{
          res.json(employeeInfo)
        })
        .catch((err)=>{
          res.json(err)
        })
      } else{
        const shiftOfTheMoment = employee.currentShift;
        shiftOfTheMoment.clockOut = new Date();

        // const lbah =  shiftOfTheMoment.clockout - shiftOFTheMoment.clockIn
        // shiftOfTheMoment.duration = lbah;



        Employee.findByIdAndUpdate(req.params.id,{
          active:false,
          currentShift:{},
          $push: { shifts: shiftOfTheMoment }


        }, {new: true}).then((something)=>{
          res.json(something)
        }).catch((err)=>{
          res.json(err)
        })
        

      }

  }).catch((err)=>{
    res.json(err)
  })
})

// router.post("/clockOut/:key", (req, res, next) => {

// })

module.exports = router;



