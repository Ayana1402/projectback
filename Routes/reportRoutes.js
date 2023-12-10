const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()
const multer = require('multer'); 
require('../Models/FinalReport')

router.use("/file",express.static("fileuploaded"))
const fileSchema = mongoose.model("reportdatas")



const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './fileuploaded')
	},
	filename: function (req, file, cb) {
	  const uniqueSuffix = Date.now()
	  cb(null, uniqueSuffix+file.originalname)
	}
  })
  
  const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), async function (req, res, next) {
	
	const filename=req.file.filename
	const username=req.body.username

	try{
		const existingUser = await fileSchema.findOne({ username: username });

		if (existingUser) {
			return res.json({ status: "error", message: "Username already exists" });
		}
		await fileSchema.create({ filename: filename, username: username });
		res.send({ status: "ok" });
		// fileSchema.create({filename:filename,username:username})
		// res.send({status : "ok"})
	}catch(error){
		res.json({status: "error"})

	}
  })

  router.get('/filedata',async(req,res)=>{
	try{
		fileSchema.find({}).then((data)=>{
			res.send({status: "ok",data:data})
		})
	}catch(error){
		res.json({status: "error"})

	}
  })


 

router.get('/',async(req,res)=>
{
	res.send('sucess!!!!')
})



  module.exports = router;