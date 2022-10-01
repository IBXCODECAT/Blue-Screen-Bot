const mongoose = require('mongoose');

export = mongoose.connect('mongodb://localhost:27017/bssdb', {
    useNewUrlParser: true,
})