const mongoose = require('mongoose');


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


mongoose.connect(
    process.env.DB_CONNECT
).then(( res ) => console.log("DB Connected"))
.catch(err => console.log('DB connection error' + err))


