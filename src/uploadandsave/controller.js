const pool = require('../../db');
const queries = require('./queries')

const multer = require('multer');
const fs = require('fs');

const storeFile = (req,res) => {
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
            cb(null,  file.originalname)
        }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('file');
    //add video info to database
    upload(req,res,function(err){
        const  file  = req.file;
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        pool.query(queries.addVideo,[file,file.originalname,file.destination],(error,results) =>{
            if (error) throw error;
        })
        pool.query(queries.getLastAddedVideoId,(error,results) =>{
            if(error) throw error;
            res.status(200).send({"result":"success","fileId":  results.rows[0].max });
        })
       
    })
    
}

const retrieveVideo = (req,res)=>{
    const videoname= req.params.videoname;
    const filepath = './uploads/'+`${videoname}`;
    if(!filepath){
        return res.status(400).send('File not found');
    }
    try {
        var stats = fs.statSync(filepath);
        console.log('it exists');
      }
      catch(err) {
          console.log('it does not exist');
      }
   
    const fileSize =stats.size;
    const range = req.headers.range;
    if(range){
        const parts = range.replace(/bytes=/,'').split('-')
        const start =parseInt(parts[0],10);
        const end =parts[1]? parseInt(parts[1],10):fileSize-1;
        
        const chunksize = end -start+1;
        const file = fs.createReadStream(filepath,{start,end});
        const head = {
            'Content-Range':`bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type':'video/mp4'
        
        };
        res.writeHead(206,head);
        file.pipe(res);
    }else{
        const head = {
           'Content-Length': fileSize,
            'Content-Type':'video/mp4'
        
        };
        res.writeHead(200,head);
        fs.createReadStream(filepath).pipe(res);
    }

}
module.exports = {
    storeFile,
    retrieveVideo
}