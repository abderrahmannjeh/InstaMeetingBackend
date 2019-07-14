var express = require('express');
var router = express.Router();
var connection=require('../config');




router.post('/', function(req, res, next) {
  let email=req.body.email;
  let password=req.body.password;
  
  connection.query("SELECT * FROM `compte` WHERE email like ? and `password`=?",
  [email,password],
  (err,row,field)=>{

    if(err)
    {
      res.send({success:false,message:'errure de connection'})

    }
    
    if(row.length>0)
    { 
      res.send({success:true, user:row[0].email});
    }
    else
    res.send({success:false,message:"user not found"})


  }
  
  
  
  )
});






module.exports = router;
