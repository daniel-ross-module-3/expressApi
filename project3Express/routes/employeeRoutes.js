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
    shifts: []

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
    console.log(req.user)
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

module.exports = router;


