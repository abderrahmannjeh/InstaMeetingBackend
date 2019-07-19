var express=require('express')
var router=express.Router();
var connection=require('../config');


router.post('/',function(req,res,next){

    var owner=req.body.owner
     var nom=req.body.nom
     var desc=req.body.description 

    connection.query('insert into groupe (owner,name,description) values(?,?,?)',[owner,nom,desc],
    (err,result)=>{
      if(err)
      { console.log(err)
          
        res.send({"success":false,"message":"probleme de connection"})
    
    }
      else
        {var groupeId=result.insertId
            
            res.send({"success":true,"message":"groupe ajouter avec succes","groupeId":groupeId})
        }
    
        }
    );









})
router.post('/addMemberGroupe',(req,res)=>
    {
            var groupeId= req.body.groupeId
            var email=req.body.email
            var nom=req.body.nom
            
            verifUser(email,nom)
               
            
            connection.query('insert into groupe_mumber (id_groupe,momber_email) values(?,?)',[groupeId,email],
            
            (err,result)=>{
                if(err)
                   {
                       
                    if(err.errno==1062)
                    res.send({"success":false,"message":"le membre existe "})
                    else
                    {   console.log(err)
                        res.send({"success":false,"message":"probleme de connection2"})}
                    } 
                    else
                    res.send({"success":true,"message":"member ajouter avec success"})     
            
    
    
            }
            
            
            
            
            
            )

          
        

    })
    addUser=(email,nom)=>{
       


    }



    

    

  
   // 

   verifUser=(email,nom)=>{
    connection.query('select * from utilisateur where email=?',[email],(err,row,next)=>{

      if(row.length===0)
        {
            connection.query('insert into utilisateur (email,nom) values(?,?)',[email,nom],(err,result)=>{

                if(err)
                    console.log(err)
    
    
    
            })
            return true
    
        }
        else
      return false;
        





    })



}


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

router.post('/deleteMemeber',(req,res)=>{

    var groupId=req.body.groupeId
    var email=req.body.email

    connection.query('update groupe_mumber set etat=0 where id_groupe=? and momber_email=?',[groupId,email],
        (err,row)=>{
            if(err!=null)
            {console.log(err)
                res.send({"success":false,"message":"probleme de connection "})}
            else
            res.send({"success":true,"message":"memebre supprimer avec success "})
        }
    )



})
module.exports=router