const express=require('express')
const router=express.Router();
const connection=require('../config')

router.post('/add',(req,res)=>{

   var titre=req.body.titre
   var groupeId=req.body.groupeId
    var commentaire=req.body.commentaire
    
    var heure=req.body.heure
    var etat=1
    var animateur=req.body.animateur


    connection.query('insert into discute (groupe_id,titre,commentaire,heure,etat,animateur) values(?,?,?,?,?,?)',[groupeId,titre,commentaire,heure,etat,animateur],
    (erreur,result)=>{

        if(erreur!=null)
        {console.log(erreur)
            res.send({'success':false,'message':'erreur de connection'})
    
    
        }
        else
        res.send({'success':true,'message':'point aajouter avec success','id':result.insertId})



    }
    
    )

})
router.post('/delete',(req,res)=>{

   var id=req.body.id
    console.log(id)
 
     connection.query('update discute set etat =0  WHERE id=? ',[id],
     (erreur,result)=>{
 
         if(erreur!=null)
         {console.log(erreur)
             res.send({'success':false,'message':'erreur de connection'})
     
     
         }
         else
         res.send({'success':true,'message':'point supprimer'})
 
 
 
     }
     
     )
 
 })

module.exports=router