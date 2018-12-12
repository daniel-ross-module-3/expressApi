const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
  username: String,
  password: String,
  companyName: String,
  isDeleted: { type: Boolean, default: false }
})


const User = mongoose.model('User', userSchema)


module.exports = User;