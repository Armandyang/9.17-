
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var blogSchema = new Schema({
	author : {
			type : ObjectId,
			ref : 'users'
		},
		title : String,
		content : String
});
module.exports = mongoose.model('blog', blogSchema);