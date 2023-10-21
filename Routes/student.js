const express = require('express');
const { InsertData } = require('moongose/controller/post_controller');
const router = express.Router()

router.post('/add_student', async (req, res) => {
    const{
        std_name,
        std_class,
        std_section,
        adm_num,
        std_gender,
        std_dob,
        std_address,
        std_phone_no,
        std_guardian_phone_no,
        std_subjects
    }=req.body;
    if(!std_name || !std_class || !std_section || !adm_num || !std_gender || !std_dob || !std_address || !std_phone_no || !std_guardian_phone_no || !std_subjects)
        return res.status(400).json({ error: "Please Enter all details" })
    if(std_phone_no.length!==11)
        return res.status(400).json({ error: "Enter correct Phone Number" })
    if(std_guardian_phone_no.length!==11)
        return res.status(400).json({ error: "Enter correct Guardian Phone Number" })
    try{
        const response=await fetch(
            "https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/findOne",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     apiKey: "zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq",
                },
                body: JSON.stringify({
                    dataSource: "Cluster0",
                    database: "SMS",
                    collection: "Students",
                    filter: {
                        adm_num
                    },
        
        }),      
   })
   const data=await response.json();
   if(data.document){
       return res.status(400).json({error:"Student already exists"})
   }
   const saveDoc=await fetch(
    "https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/insertOne",
    {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
         apiKey: "zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq",
    },
    body: JSON.stringify({
        dataSource: "Cluster0",
        database: "SMS",
        collection: "Students",
        document: {
            std_name,std_class,std_section,adm_num,std_gender,std_dob,std_address,std_phone_no,std_guardian_phone_no,std_subjects
        }
    })
})
    const insertedId=await saveDoc.json();
    if(!insertedId.insertedId){
       
        return res.status(400).json({error:"Student not added"})
    }
    
    return res.status(200).json({message:"Student added successfully"})
   }catch(error){
       console.log(error)
   }});

router.put('/update_student', async (req, res) => {
    const{
        std_name,
        std_class,
        std_section,
        adm_num,
        std_gender,
        std_dob,
        std_address,
        std_phone_no,
        std_guardian_phone_no,
        std_subjects
    }=req.body;
    if(!std_name || !std_class || !std_section || !adm_num || !std_gender || !std_dob || !std_address || !std_phone_no || !std_guardian_phone_no || !std_subjects)
        return res.status(400).json({ error: "Please Enter all details" })
    if(std_phone_no.length!==11)
        return res.status(400).json({ error: "Enter correct Phone Number" })
    if(std_guardian_phone_no.length!==11)
        return res.status(400).json({ error: "Enter correct Guardian Phone Number" })
    try{
        const response=await fetch(
            "https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/findOne",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     apiKey: "zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq",
                },
                body: JSON.stringify({
                    dataSource: "Cluster0",
                    database: "SMS",
                    collection: "Students",
                    filter: {
                        adm_num
                    },   
            })
        })
const data=await response.json();
if(!data.document)
    return res.status(400).json({error:"Admission Number not found"});
const updatedDoc=await fetch(
    "https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/updateOne",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
             apiKey: "zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq",
        },
        body: JSON.stringify({
            dataSource: "Cluster0",
            database: "SMS",
            collection: "Students",
            filter: {
                adm_num
            },
            update: {
                $set: {
                    std_name,std_class,std_section,adm_num,std_gender,std_dob,std_address,std_phone_no,std_guardian_phone_no,std_subjects
                }
            },
        }),
    })
const result=await updatedDoc.json();
console.log(result)
if(updatedDoc.modifiedCount)
    return res.status(400).json({error:"Student not updated"})
return res.status(200).json({message:"Student updated successfully"})
    }catch(error){
        console.log(error)
    }
})

router.delete('/delete_student', async (req, res) => {
      const{adm_num}=req.body;
      if(!adm_num)
        return res.status(400).json({ error: "Please Enter Admission Number" })
      try{
        const response=await fetch(
            "https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/findOne",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                     apiKey: "zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq",
                },
                body: JSON.stringify({
                    dataSource: "Cluster0",
                    database: "SMS",
                    collection: "Students",
                    filter: {
                        adm_num
                    },
                })},
        )
    const data=await response.json();
    if(!data.document)  
        return res.status(400).json({error:"Admission Number not found"});
    const deletedDoc=await fetch(
        "https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/deleteOne",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 apiKey: "zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq",
            },
            body: JSON.stringify({
                dataSource: "Cluster0",
                database: "SMS",
                collection: "Students",
                filter: {
                    adm_num
                },
            }),
        })
    const result=await deletedDoc.json();
    if(deletedDoc.deletedCount)
        return res.status(400).json({error:"Student not deleted"})
    return res.status(200).json({message:"Student deleted successfully"})
    }catch(error){
            console.log(error)
        }
})
router.delete('/delete_students', async (req, res) => {
    const { adm_nums } = req.body;
    if (!adm_nums || !Array.isArray(adm_nums) || adm_nums.length === 0) {
      return res.status(400).json({ error: 'Please provide multiple valid admission numbers' });
    }
    try {   
      const deletionResults = [];
        const response = await fetch(
          'https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/find',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apiKey: 'zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq',
            },
            body: JSON.stringify({
              dataSource: 'Cluster0',
              database: 'SMS',
              collection: 'Students',
              filter: {
                adm_num: {
                    $in: adm_nums
                }
            },
            }),
          }
        );
        const data = await response.json();
        if (!data.documents) {
            return res.status(400).json({ error: 'Admission number not found' });
          
        }
        const deletedDoc = await fetch(
          'https://ap-south-1.aws.data.mongodb-api.com/app/data-wldsm/endpoint/data/v1/action/deleteMany',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apiKey: 'zruqIthJ2APAElTxdLMWUAe5E6DpGhojKVkIljGfdIUylZU4F96c9PngpuWVEbUq',
            },
            body: JSON.stringify({
              dataSource: 'Cluster0',
              database: 'SMS',
              collection: 'Students',
              filter: {
                adm_num: {
                    $in: adm_nums
                }
            },
            }),
          }
        ); 
        const result = await deletedDoc.json();
        if (result.deletedCount) {
            return res.status(200).json({
              message: 'Students deleted successfully',
            })

        } else {
          return res.status(400).json({ error: 'Students not deleted' });
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });

module.exports = router
