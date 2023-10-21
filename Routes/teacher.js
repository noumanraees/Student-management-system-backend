const express = require('express');
const { InsertData } = require('moongose/controller/post_controller');
const router = express.Router()

router.post('/add_teacher', async (req, res) => {
    const{
        teacher_name,
        teacher_cnic,
        teacher_education,
        teacher_gender,
        teacher_doj,
        teacher_address,
        teacher_phone_no,
        teacher_designation,
        teacher_salary
    }=req.body;
    if(!teacher_name || !teacher_cnic || !teacher_education || !teacher_gender || !teacher_doj || !teacher_phone_no || !teacher_designation || !teacher_salary || !teacher_address )
        return res.status(400).json({ error: "Please Enter all details" })
    if(teacher_phone_no.length!==11)
        return res.status(400).json({ error: "Enter correct Phone Number" })
        const cnicReg =
        /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/;
        if (!cnicReg.test(teacher_cnic))
        return res.status(400).json({ error: "Enter correct CNIC" })
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
                    collection: "Teachers",
                    filter: {
                        teacher_cnic
                    },
        }),  
   })
   const data=await response.json();
   if(data.document){
       return res.status(400).json({error:"Teacher already exists"})
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
        collection: "Teachers",
        document: {
            teacher_name,
            teacher_cnic,
            teacher_education,
            teacher_gender,
            teacher_doj,
            teacher_address,
            teacher_phone_no,
            teacher_designation,
            teacher_salary        }
    })
})
    const insertedId=await saveDoc.json();
    
    if(!insertedId.insertedId){
       
        return res.status(400).json({error:"Teacher not added"})
    }
    
    return res.status(200).json({message:"Teacher added successfully"})
   }catch(error){
       console.log(error)
   }});
router.put('/update_teacher', async (req, res) => {
    const{
        teacher_name,
        teacher_cnic,
        teacher_education,
        teacher_gender,
        teacher_doj,
        teacher_address,
        teacher_phone_no,
        teacher_designation,
        teacher_salary
    }=req.body;
    if(!teacher_name || !teacher_cnic || !teacher_education || !teacher_gender || !teacher_doj || !teacher_phone_no || !teacher_designation || !teacher_salary || !teacher_address )
    return res.status(400).json({ error: "Please Enter all details" })
    if(teacher_phone_no.length!==11)
        return res.status(400).json({ error: "Enter correct Phone Number" })
        const cnicReg =
        /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/;
        if (!cnicReg.test(teacher_cnic))
        return res.status(400).json({ error: "Enter correct CNIC" })
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
                    collection: "Teachers",
                    filter: {
                        teacher_cnic
                    },
 })
})
const data=await response.json();
if(!data.document)
    return res.status(400).json({error:"Teacher not found"});
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
            collection: "Teachers",
            filter: {
                teacher_cnic
            },
            update: {
                $set: {
                    teacher_name,
                    teacher_cnic,
                    teacher_education,
                    teacher_gender,
                    teacher_doj,
                    teacher_address,
                    teacher_phone_no,
                    teacher_designation,
                    teacher_salary
                }
            },
        }),
    })
const result=await updatedDoc.json();
console.log(result)
if(updatedDoc.modifiedCount)
    return res.status(400).json({error:"Teacher not updated"})
return res.status(200).json({message:"Teacher updated successfully"})
    }catch(error){
        console.log(error)
    }
})
router.delete('/delete_teacher', async (req, res) => {
    const{teacher_cnic}=req.body;
    if(!teacher_cnic)
      return res.status(400).json({ error: "Please Enter Admission Number" })
      const cnicReg =
      /^([0-9]{5})[\-]([0-9]{7})[\-]([0-9]{1})+/;
      if (!cnicReg.test(teacher_cnic))
      return res.status(400).json({ error: "Enter correct CNIC" })
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
                  collection: "Teachers",
                  filter: {
                      teacher_cnic
                  },
              })},
      )
  const data=await response.json();
  if(!data.document)  
      return res.status(400).json({error:"Teacher not found"});
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
              collection: "Teachers",
              filter: {
                  teacher_cnic
              },
          }),
      })
  const result=await deletedDoc.json();
  if(deletedDoc.deletedCount)
      return res.status(400).json({error:"Teacher not deleted"})
  return res.status(200).json({message:"Teacher deleted successfully"})
  }catch(error){
          console.log(error)
      }

})
router.delete('/delete_teachers', async (req, res) => {
    const { teacher_cnics } = req.body;
    if (!teacher_cnics || !Array.isArray(teacher_cnics) || teacher_cnics.length === 0) {
      return res.status(400).json({ error: 'Please provide multiple valid Teacher Id' });
    }
    try {  
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
              collection: 'Teachers',
              filter: {
                teacher_cnic: {
                    $in: teacher_cnics
                }
            },
            }),
          }
        );
        const data = await response.json();
        if (!data.documents) {
            return res.status(400).json({ error: 'Taecher not found' });
          
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
              collection: 'Teachers',
              filter: {
                teacher_cnic: {
                    $in: teacher_cnics
                }
            },
            }),
          }
        ); 
        const result = await deletedDoc.json();
        if (result.deletedCount) {
            return res.status(200).json({
              message: 'Teachers deleted successfully',
            })

        } else {
          return res.status(400).json({ error: 'Teachers not deleted' });
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
    module.exports=router
    