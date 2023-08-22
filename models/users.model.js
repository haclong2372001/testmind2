const mongoose = require('mongoose');
const User = mongoose.Schema({
    username: {
        type : 'String',
        required: true
    },
    password : {
        type : 'String',
        require : true
    },
})
module.exports = mongoose.model('test',User)