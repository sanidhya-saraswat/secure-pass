const PasswordFormatModel=require('./../models/PasswordFormat');

//initialize predifinedPasswords collection
exports.initializePreDefinedPasswords=function(){
    PasswordFormatModel.deleteMany({},function(err){
      PasswordFormatModel.insertMany([
          {image:'/assets/icons/default.png',type:'Default',url:''},
          {image:'/assets/icons/facebook.png',type:'Facebook',url:'http://www.facebook.com'},
          {image:'/assets/icons/instagram.png',type:'Instagram',url:'http://www.instagram.com'},
          {image:'/assets/icons/google.png',type:'Google',url:'http://www.google.com'},
          {image:'/assets/icons/twitter.png',type:'Twitter',url:'http://www.twitter.com'},
          {image:'/assets/icons/linkedin.png',type:'Linkedin',url:'http://www.linkedin.com'},
          {image:'/assets/icons/soundcloud.png',type:'Soundcloud',url:'http://www.soundcloud.com'}
/*           {image:'/assets/icons/amazon.png',type:'Amazon',url:'http://www.amazon.com'},
          {image:'/assets/icons/flipkart.png',type:'Flipkart',url:'http://www.flipkart.com'},
          {image:'/assets/icons/paytm.png',type:'Paytm',url:'http://www.paytm.com'}, */
        ],function(err,obj){
      })
    })
}