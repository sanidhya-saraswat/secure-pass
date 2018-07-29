//module imports
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const passport = require('passport');
const helpers=require('./helpers/data.js');
const db=require('./config/database');
//variables
const port = process.env.PORT||3000; 
const app = express();
//db connection
mongoose.connect(db.mongoURI)
    .then(() => { console.log("mongodb connected...")
   helpers.initializePreDefinedPasswords();
})
    .catch(err => console.log("mongodb error:", err))
//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))
//cors
var corsSettings = {
    origin: true,
    methods: ['POST','GET','PUT','DELETE'],
    credentials: true
};
app.use(cors(corsSettings));
app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin, access-control-allow-headers");
    next();
});
app.use(passport.initialize());
app.use(passport.session());
//require('./config/passport')(passport);
const apiRoutes = require('./apiRoutes');
//routing

app.use('/api', apiRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
//starting the server
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
