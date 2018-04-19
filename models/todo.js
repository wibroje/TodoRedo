const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
	description: {
		type: String,
		required: true
	}
		
});

module.exports = mongoose.model('Todo', todoSchema);