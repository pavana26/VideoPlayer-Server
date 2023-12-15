const pool = require('../../db');
const queries = require('./queries')

const getUsers = (req,res)=>{
    pool.query(queries.getUsers,(error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}
const authenticateUser = (req,res)=>{
    const { username,password } = req.body;
   
    pool.query(queries.getUserByName,[username,password],(error,results) =>{
        if(error) throw error;
        const returnname = results.rows.length > 0 ? username :null;
        res.status(200).json({"username":returnname});
    })
}

const addUser = (req,res) => {
    const { username,email,password } = req.body;
    
    //add user to database
        pool.query(queries.addUser,[username,email,password],(error,results) =>{
            if (error) throw error;
            res.status(201).json({message:"User created successfully"});
        })
    
}
module.exports = {
    getUsers,
    authenticateUser,
    addUser,
}