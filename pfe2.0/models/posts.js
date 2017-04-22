var mongoose = require('mongoose');
  Schema = mongoose.Schema;

var post = new Schema({
  first_name: {type: String, required: true} ,
  last_name: {type: String, required: true} ,
  content:{type:String ,require:true},
  title:{type:String ,require:true},
  photo: { type: mongoose.Schema.Types.Mixed}

},
{versionKey: false}) ;

//Create post model
const postSchema = mongoose.model('post',post);



module.exports = postSchema;
