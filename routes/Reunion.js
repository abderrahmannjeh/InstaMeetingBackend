var express=require('express')
var router=express.Router()
var connection =require('../config')


router.post('/',function(req,res){

   const titre=req.body.titre;
   const  respPv=req.body.respPv;
   const  respVe=req.body.respVe;
   const  commentaire=req.body.commentaire;
   const   groupeId=req.body.groupeId;
   const  date=req.body.date
   const   duree=req.body.duree;
    const  lieu=req.body.lieu;
    const  debut=req.body.debut
    const  fin=req.body.fin;

connection.query('insert into reunion (title, date,  id_groupe, duree, lieu, debut, fin, respPv, respVe) values(?,?,?,?,?,?,?,?,?)',
                        [titre,date,groupeId,duree,lieu,debut,fin,respPv,respVe],
                        (errur,result)=>{

                            if(errur)
                            {   console.log(errur)
                                res.send({success:false,message:'errur de connection'}) 
                        }   
                            else
                            res.send({success:true,message:'Reunion ajouter avec success'})
                        
                        }
                        
                        )




})

router.post('/getUtilisateurRenion',(req,res)=>{

const email='njeh.abderrahman@gmail.com'
const date=req.body.date;

connection.query('select * from reunion where date=? and  id_groupe in(select id from groupe where owner=? or id in(select id_groupe from groupe_mumber where momber_email=?) ) ',[date,email,email],
(errur,row)=>
{
  
    
      for(var e of row)
      {    e["date"]=new Date(e["date"])
      e["date"].setDate(e["date"].getDate() +1);
          
      }
res.send({success:true, data:row})


}


)
})

router.post('/getById',(req,res)=>{

const id=req.body.id;
connection.query('select * from reunion where id=?',[id],(errur,row)=>{

    if(row.length>0)
    {row[0]["date"]=new Date(row[0]["date"])
    row[0]["date"].setDate(row[0]["date"].getDate()+1)
        res.send({success:true,data:row[0]});
    

    }


})




})

router.post('/update',(req,res)=>{
console.log("hi")
    const titre=req.body.titre;
    const  respPv=req.body.respPv;
    const  respVe=req.body.respVe;
    const  commentaire=req.body.commentaire;
    const   groupeId=req.body.groupeId;
    const  date=req.body.date
    const   duree=req.body.duree;
     const  lieu=req.body.lieu;
     const  debut=req.body.debut
     const  fin=req.body.fin;
     
    const id=req.body.id;
     connection.query('update reunion set title=?, date=?,  id_groupe=?, duree=?, lieu=?, debut=?, fin=?, respPv=?, respVe=? where id=? ',[titre,date,groupeId,duree,lieu,debut,fin,respPv,respVe,id],
     (errur,res)=>{
        console.log(res)

     }
     )



})
module.exports=router