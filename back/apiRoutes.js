const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
var googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const router = express.Router();
const UserModel = require('./models/User');
const TokenModel = require('./models/Token');
const PasswordFormatModel=require('./models/PasswordFormat');
const reqLib = require('request');
var mailer = require("nodemailer");
var crypto = require('crypto');
class GlobalResponse {
  constructor(errorFlag = 'false', errors = [], response = {}) {
    this.errorFlag = errorFlag;
    this.errors = errors;
    this.response = response;
  }
}
//passport serializer and deserializer
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserModel.findById(id, function (err, user) {
    done(err, user);
  });
});

function isLoggedIn(req, resp, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return resp.status(401).json();
}
function isEmailVerified(req,resp,next)
{
  if(req.user.isVerified)
  {
return next();
  }
  return resp.json(new GlobalResponse(true,[10]))
}
/* passport strategies */
passport.use(new localStrategy({
  usernameField: "email"
}, (email, password, done) => {
  UserModel.findOne({ email: email }).then((user) => {
    if (user == null) {
      return done(null, false);
    }
    else {
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    }
  }).catch((err) => {
    console.log("500: ",err);
    //handle 500
  });
}))

passport.use(new googleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: "/api/loginGoogleCallback",
  proxy: true
},
  function (accessToken, refreshToken, profile, done) {
    UserModel.findOne({ email: profile.emails[0].value }, function (err, user) {
      if (err) {
        console.log("500: ",err);
        return resp.status(500).json();
      }
      if (user) return done(null, user);
      var newUser = new UserModel();
      newUser.email = profile.emails[0].value;
      newUser.name = profile.name.givenName;
      newUser.accountType = "GOOGLE";
      newUser.isVerified = true;
      newUser.save(function (err) {
        if (err)
        {
          console.log("500: ",err);
          return resp.status(500).json();
        }
        return done(null, newUser);
      });
    });
  }
));

/* GET api listing. */
router.post('/register', (req, resp) => {

  //verify captcha
  var captchaText = req.body.captchaText;
  if (captchaText === undefined || captchaText === '' || captchaText === null) {
    return resp.json(new GlobalResponse(true, [3]));
  }
  var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + keys.captchaSecret + "&response=" + captchaText;
  reqLib(verificationUrl, function (err, httpResponse, body) {
    if (err) {
      console.log("500: ",err);
      //handle 500
      return resp.status(500).json();
    }
    body = JSON.parse(body);
    if (!body.success) {
      return resp.json(new GlobalResponse(true, [3]));
    }

    //verify if user already exists
    UserModel.findOne({ email: (req.body.email + "").toLocaleLowerCase() }).then((user) => {
      if (user != null) {
        return resp.json(new GlobalResponse(true, [4]));
      }
      //saving user to db
      var newUser = new UserModel();
      newUser.email = (req.body.email + "").toLocaleLowerCase();
      newUser.password = req.body.password;
      newUser.accountType = "LOCAL";
      if (req.body.name != "") newUser.name = req.body.name;
      newUser.save(function (err) {
        if (err) {
          console.log("500 err: ", err);
          return resp.status(500).json();
        }
        //user added successfully. send verification mail to client
        var smtpTransport = mailer.createTransport({
          service: "Gmail",
          auth: {
            user: "securepassservice@gmail.com",
            pass: "123passSecure"
          }
        });
        var token = new TokenModel({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
        token.save(function (err) {
          if (err) { 
            console.log("500: ",err);
            return resp.status(500).json();
           }
          var link = "https://securepass.herokuapp.com/api/verify?id=" + token.token;
          mailOptions = {
            to: req.body.email,
            subject: "SecurePass - Email Confirmation",
            html: "Hello " + req.body.name + ",<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
          }
          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log("500 err: ", error);
              //send 500 error to client
              return resp.status(500).json();
            }
            req.logIn(newUser, function (err) {
              if (err) {
                console.log("500 err: ", err);
                return resp.status(500).json();
              }
              req.session.cookie.expires=false;
              return resp.json(new GlobalResponse(false));
            });
          });
        });
      });
    }).catch(err => {
      console.log("500 err: ", err);
      //send 500 error to client
    });
  });
});

router.get('/verify', (req, resp) => {
  TokenModel.findOne({ token: req.query.id }).then(tokenObj => {
    if (!tokenObj) {
      resp.redirect(keys.testingURLFront + '/verifyEmail/failure');
    }
    UserModel.findOne({ _id: tokenObj._userId }).then(user => {
      if (!user) {
        resp.redirect(keys.testingURLFront + '/verifyEmail/failure');
      }
      user.isVerified = true;
      user.save(err => {
        if (err) {
          console.log('500 err: ', err);
          //send 500 error to client
          return resp.status(500).json();
        }
        resp.redirect(keys.testingURLFront + '/verifyEmail/success');
      })
    })
  })
});
router.get('/verifyResend',isLoggedIn, (req, resp) => {
  UserModel.findOne({ email: req.user.email }).then(user => {
    if (!user) {
      //user with that email not registered
      return resp.json(new GlobalResponse(true, [7]));
    }
    if (user.isVerified == true) {
      //user already verified
      return resp.json(new GlobalResponse(true, [8]));
    }
    if (user.resendAllowed == false) {
      //resend mail not allowed.
      return resp.json(new GlobalResponse(true, [9]));
    }
    //send the mail again
    var smtpTransport = mailer.createTransport({
      service: "Gmail",
      auth: {
        user: "securepassservice@gmail.com",
        pass: "123passSecure"
      }
    });
    var token = new TokenModel({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    token.save(function (err) {
      if (err) { return resp.status(500).json(); }
      var link =keys.testingURLBack + "/api/verify?id=" + token.token;
      mailOptions = {
        to: req.user.email,
        subject: "SecurePass - Email Confirmation",
        html: "Hello " + req.user.name + ",<br> Please Click on the below link to verify your email address.<br><a href=" + link + ">Click here to verify</a>"
      }
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log("500 err: ", error);
          //send 500 error to client
          return resp.status(500).json();
        }
        user.resendAllowed = false;
        user.save(err => {
          if (err) {
            console.log("500 err: ", error);
            //send 500 error to client
            return resp.status(500).json();
          }
          return resp.json(new GlobalResponse(false));
        });
      });
    });
  });
});



router.post('/loginLocal', function (req, resp, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return resp.status(500).json();
    }
    if (!user) {
      //failed login
      return resp.json(new GlobalResponse(true, [6]));
    }
    req.logIn(user, function (err) {
      if (err) {
        return resp.status(500).json();
      }
      if(req.body.rememberMe)
      {
req.session.cookie.maxAge=30*24*60*60*1000;
      }
      else 
      {
        req.session.cookie.expires=false;
      }
      return resp.json(new GlobalResponse(false));
      
    });
  })(req, resp, next);
});

router.get('/loginGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/loginGoogleCallback', passport.authenticate('google', {
  failureRedirect: keys.testingURLFront + '/signIn',
  successRedirect: keys.testingURLFront + '/dashboard'
})
);

router.get('/logout', (req, resp) => {
  req.logout();
  req.session.destroy();
  return resp.json(new GlobalResponse(false));
});
router.get('/isLoggedIn', (req, resp) => {
  if(req.isAuthenticated())
  {
return resp.json(new GlobalResponse(false,[],{"isLoggedIn":true}));
  }
  else
  {
    return resp.json(new GlobalResponse(false,[],{"isLoggedIn":false}));
  }
});
router.get('/getBasicInfo',isLoggedIn,(req,resp)=>{
  return resp.json(new GlobalResponse(false,[],{"name":req.user.name}))
})

//CRUD
router.get('/passwordFormats',isLoggedIn,isEmailVerified,(req,resp)=>{
PasswordFormatModel.find({}).select('-_id').exec((err,list)=>{
if(err)
{
  console.log("err: ",err);
  resp.status(500).json();
}
return resp.json(new GlobalResponse(false,[],{"list":list}));
})
});
router.get('/passwords', isLoggedIn, isEmailVerified, (req, resp) => {
  resp.json(new GlobalResponse(false, [], {list: req.user.passwords }));
});
router.post('/password',isLoggedIn,isEmailVerified,(req,resp)=>{
  UserModel.findOne({ email: (req.user.email + "").toLocaleLowerCase() }).then((user) => {
    if (!user) {
      return resp.status(500).json();
    }
    user.passwords.push(req.body);
    user.save((err,obj)=>{
      if(err)
      {
        resp.status(500).json();
        console.log("err: ",err);
      }
      return resp.json(new GlobalResponse(false))
    })
  });
})
router.put('/password',isLoggedIn,isEmailVerified,(req,resp)=>{
  UserModel.update({
    email: (req.user.email + "").toLocaleLowerCase(),"passwords._id":ObjectId('"'+req.body._id+'"')}, {
      '$set': {
    'passwords.$.username': req.body.username,    
    'passwords.$.password': req.body.password,
    'passwords.$.url': req.body.url,
    'passwords.$.title': req.body.title      
}},null,(err,obj)=>{
});
  /* UserModel.findOne({ email: (req.user.email + "").toLocaleLowerCase() }).then((user) => {
    if (!user) {
      return resp.status(500).json();
    }
    for(var i=0;i<user.passwords.length;i++)
   {
      if(user.passwords[i]._id==req.body._id)
      {
        user.passwords[i].username=req.body.username;
        user.passwords[i].password=req.body.password;
        user.passwords[i].title=req.body.title;
        user.passwords[i].url=req.body.url;
        user.passwords[i].lastModifiedOn=Date.now();
        break;
      }
    }
    user.save((err,obj)=>{
      if(err)
      {
        resp.status(500).json();
        console.log("err: ",err);
      }
      return resp.json(new GlobalResponse(false))
    })
  }); */
})
router.delete('/password/:id',isLoggedIn,isEmailVerified,(req,resp)=>{

   UserModel.findOne({ email: (req.user.email + "").toLocaleLowerCase() }).then((user) => {
    if (!user) {
      return resp.status(500).json();
    }
   for(var i=0;i<user.passwords.length;i++)
   {
     if(user.passwords[i]._id==req.params.id)
     {
       user.passwords.splice(i,1);
       break;
     }
   }
    user.save((err,obj)=>{
      if(err)
      {
        resp.status(500).json();
        console.log("err: ",err);
      }
      return resp.json(new GlobalResponse(false))
    })
  });
})
module.exports = router;