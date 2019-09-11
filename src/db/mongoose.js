const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// });

mongoose.connect('mongodb+srv://room:sU0ybEQQ2W6m2yJE@cluster0-vdfow.mongodb.net/room-reservation?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



