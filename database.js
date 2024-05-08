const kush=require('pg').Pool;

const pool=new kush({

    user: 'postgres',
    host: 'localhost',
    database: 'Practice',
    password: 'AdvEnt4pgSQL',
    port: 5432,

})

pool.connect((err)=>{
    if(!err){
        console.log('database is connected')
    }
})

module.exports=pool;