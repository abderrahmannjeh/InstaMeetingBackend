var express=require('express')
var router=express.Router();
var connection=require('../config');


router.post('/',function(req,res,next){

    var owner=req.body.owner
    var memebers=req.body.memebers
      

    connection.query('insert into groupe (owner) values(?)',[owner],
    (err,result)=>{
      if(err)
      { 
          
        res.send({"success":false,"message":"probleme de connection"})
    
    }
      else
        {var groupeId=result.insertId
            addMemberGroupe(groupeId)
            res.send({"success":true,"message":"groupe ajouter avec succes"})
        }
    
        }
    );








addMemberGroupe=(groupeId)=>
    {
        for(var memeber in memebers)
        {  
            var email=memebers[memeber].email
            var nom=memebers[memeber].nom
            
            if(verifUser(email)!==true)
                {
                    
                    addUser(email,nom)
                
                }
            
            connection.query('insert into groupe_mumber (id_groupe,momber_email) values(?,?)',[groupeId,email],
            
            (err,result)=>{
                if(err)
                   {
                       
                    
                    res.send({"success":false,"message":"probleme de connection2"})
                    }      
            
    
    
            }
            
            
            
            
            
            )

          
        }

    }


    verifUser=(email)=>{
        connection.query('select * from utilisateur where email=?',[email],(err,row,next)=>{

          if(row.length===0)
            {
                return true;
            }
            else
          return false;
            





        })



    }


    addUser=(email,nom)=>{
        connection.query('insert into utilisateur (email,nom) values(?,?)',[email,nom],(err,result)=>{

            if(err)
                console.log(err)



        })



    }


  
   // 

   
})

router.post('/getList',function(req,res){

    var owner=req.body.owner;
 
    connection.query('select * from groupe where owner=?',[owner],(error,row)=>
    {
     /* if(error!=null)
        res.send({success:false,message:"erreur de connection"})
        else*/
        if(row.length>0)
        {
        res.send({success:true,data:row})

        }
  
  
  
  
    }
    
    
    
    )
  
})

router.post('/getGroupeMemebers',function(req,res){

const groupeId=req.body.groupeId

connection.query('SELECT * FROM utilisateur WHERE email in(select momber_email from groupe_mumber where `id_groupe`= ?)',[groupeId],
(errur,row)=>{

    if(errur)
    res.send({"success":false,"message":"probleme de connection"})
    else
    
    res.send({success:true,data:row})




}

)



})
module.exports=router