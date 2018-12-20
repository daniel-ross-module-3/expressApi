const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  employeeName: String,
  employeeKey: String,
  payRate:Number,
  position:String,
  employer:{type: Schema.Types.ObjectId, ref:"User"},
  shifts:[{clockIn: Date, clockOut: Date }],
  active:Boolean,
  currentShift:{clockIn: Date, clockOut: Date, duration: Number}
  
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
