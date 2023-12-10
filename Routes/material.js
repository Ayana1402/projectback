const express = require('express');
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}))

const MetData=require('../Models/MaterialData');

router.post('/getData',async(req,res)=>{
    try {
        const { topic_Id, refn } = req.body;
        console.log("topicid is:"+topic_Id+" ref:"+refn)
        const data = await MetData.find({"topicId":topic_Id,"ref":refn});
        //console.log("material data is "+data)
        res.status(200).send(data);
    } catch (error) {
        console.log("error is "+error)
        res.status(400).send(error);
    }
})


router.post('/add',async(req,res)=>{
    try {
        var item=req.body;
        const Data = new MetData(item);
        const saveData= await Data.save();
        console.log("saveed : "+saveData);
        // res.status(200).send({message:'success',id:insertedId});
        res.status(200).send({message:'saved'});
    } catch (error) {
        console.log("error")
        res.status(400).send({massage:'error'})
    }
})


module.exports=router;