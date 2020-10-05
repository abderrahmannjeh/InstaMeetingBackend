var mysql=require('mysql')

var connection =mysql.createConnection(
{
  host:'localhost',
  user:'root',
  password:'',
  database:'stage2'


}
)
module.exports=connection