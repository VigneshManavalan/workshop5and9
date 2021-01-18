const mongoose = require("mongoose")
const Users = new mongoose.Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true }
	}
)

const model = mongoose.model('Users', Users)
module.exports = model