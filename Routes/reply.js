const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}))

const RepData=require('../Models/ReplyData');

router.get('/get/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const data = await RepData.find({commentid:id});
        console.log("data is "+data)
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})


router.post('/add',async(req,res)=>{
    try {
        var item=req.body;
        const Data = new RepData(item);
        const saveData= await Data.save();
        console.log("saveed : "+saveData);
        // res.status(200).send({message:'success',id:insertedId});
        res.status(200).send({message:'saved'});
    } catch (error) {
        console.log("error")
        res.status(400).send({massage:'error'})
    }
})

router.delete('/remove/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        const savedata= await RepData.findByIdAndDelete(id);
        res.status(200).send('Deleted Successfully')
    } catch (error) {
        res.status(404).send('Error!!');
    }
})

module.exports=router;