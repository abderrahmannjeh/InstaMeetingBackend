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

router.post('/register',(req,res)=>{

const email=req.body.email;
const  nom=req.body.nom;
const prenom=req.body.prenom;
const password=req.body.password

connection.query('select email from compte where email=? ',[email],

(errur,rows)=>{
  if(errur!=null)
    res.send({success:false,message:"problem de connection"})

  if(rows.length>0)
    res.send({success:false,message:"email existe"})
    else
    ajouterUser(email,nom,prenom,password,res)



}

)



})
ajouterUser=(email,nom,prenom,password,res)=>{

  connection.query('select email from utilisateur where email=? ',[email],

  (errur,rows)=>{
    if(errur!=null)
      res.send({success:false,message:"problem de connection1"})
  
    if(rows.length>0)
      updateUser(email,nom,prenom)

    else
      {connection.query('insert into utilisateur (email,nom) values(?,?)',[email,nom+' '+prenom],
      
      
      (errur,result )=>{
        if(errur!=null)

        {
          console.log(errur)
          res.send({success:false,message:"problem de connection2"})}

      




      })}

      connection.query('insert  into compte (email,password) values(?,?)',[email,password],
      (erreur,result)=>{

          if(errur!=null)
          res.send({success:false,message:"problem de connection3"})
          else
          res.send({success:true,message:"compte ajouter avec success"})



      })
  
    
  
  
  
  }
  
  )
  
  



}

updateUser=(email,nom,prenom)=>{

  connection.query('update utilisateur set nom=? where email=? ',[nom+' '+prenom,email],

  (errur,rows)=>{
    if(errur!=null)
      //res.send({success:false,message:"problem de connection"})
    console.log("errur"+errur)
    
  
    
  
  
  
  }
  
  )




}




module.exports = router;
