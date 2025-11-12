const mongoose = require("../db/mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;



const caseSchema = new mongoose.Schema({
    caseNumber: {type: String, required: true},
    caseType: {type: String, required: true},
    caseStatus: {type: String, required: true},
    caseNotes: {type: String, required: true},
    user: {type: ObjectId, ref: 'user', required: true},
},
{
    timestamps: true
}
);

const Case = mongoose.model('case', caseSchema);

module.exports = mongoose.models.case || Case;
