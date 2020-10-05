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
            
            connection.query('select * from utilisateur where email=?',[email],(err,row,next)=>{
                
                if(row.length===0)
                  {
                      connection.query('insert into utilisateur (email,nom) values(?,?)',[email,nom],(err,result)=>{
                        console.log("hello")
                          if(err)
                              console.log(err)
                      
                     
              
                          
                      })
              
                  }
                  {connection.query('insert into groupe_mumber (id_groupe,momber_email) values(?,?)',[groupeId,email],
                      
                  (err,result)=>{
                      if(err)
                         {
                             
                          if(err.errno==1062)
                          {res.send({"success":false,"message":"le membre existe "})
                        console.log("xx")
                        }
                          else
                          {   console.log(err)
                              res.send({"success":false,"message":"probleme de connection2"})}
                          } 
                          else
                          res.send({"success":true,"message":"member ajouter avec success"})     
                  
          
          
                  }
                  
                  
                  
                  
                  
                  )
      
                
              }
                  
                  
          
          
          
          
          
              })
          
          
               
            
            

    })
   



    

    

  



router.post('/getList',function(req,res){

    var owner=req.body.owner;
 
    connection.query('select * from groupe where owner=? and etat=1',[owner],(error,row)=>
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
console.log(groupeId)
connection.query('SELECT * FROM utilisateur WHERE email in(select momber_email from groupe_mumber where `id_groupe`= ?)',[groupeId],
(errur,row)=>{
console.log(row)
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

router.post('/getAutreGroupe',(req,res)=>{

    var email=req.body.email
console.log(email)
        connection.query('select * from groupe where id in( select id_groupe from groupe_mumber where etat= 1 and momber_email =?)',[email],
            (erreur,rows)=>{
                console.log("erreur"+erreur)
                if(erreur!=null)
                    res.send({"success":false,"message":"erreur de connection"})
                else
                    res.send({"success":true,"data":rows})


            }
        
        )



})

router.post('/mesGroupes',(req,res)=>{

    var email=req.body.email
console.log(email)
        connection.query('select * from groupe where etat=1 and owner=?',[email],
            (erreur,rows)=>{
                console.log("erreur"+erreur)
                if(erreur!=null)
                    res.send({"success":false,"message":"erreur de connection"})
                else
                    res.send({"success":true,"data":rows})


            }
        
        )



})
router.post('/delete',(req,res)=>{

    var id=req.body.id;
console.log(id)
connection.query('update  groupe set etat=0 where id=?',[id],
            (erreur,rows)=>{
                console.log("erreur"+erreur)
                if(erreur!=null)
                    res.send({"success":false,"message":"erreur de connection"})
                else
                    res.send({"success":true,"message ":"type supprimer avec success"})


            }
        
        )

})


module.exports=router