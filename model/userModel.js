//requiring mongoose dependency
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   surname:{
      type:String,
      // required: true
   },
   givenName:{
      type:String,
      // required:true
   },
   gender:{
      type:String,
      num:['male','female']
   },
   dob:{type:Date},
   place_of_residence:{
      type: String
   },
   email:{type:String},
   paymentPlan:{type:Number}
   
   // skills:{type:String},
   // project:{type:String}

})


const UserModel = mongoose.model('UserModel',userSchema);
module.exports = UserModel;
