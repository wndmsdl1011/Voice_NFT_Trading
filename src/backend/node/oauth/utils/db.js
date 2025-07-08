const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('❌ MONGO_URI is undefined!');
    process.exit(1);
}

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose;
