const express = require('express')
const cors = require("cors");
const userRoutes = require('./src/users/routes')
const uploadRoutes = require('./src/uploadandsave/routes')

const app = express()
const port = 3000;

app.use(express.json());

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/uploadVideo',uploadRoutes);




app.listen(port,()=> {console.log("Server started on port 3000")})