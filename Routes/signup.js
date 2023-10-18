
const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
router.post('/signup', async (req, res) => {
    const { name, email, password, userType } = req.body
    if (!name || !email || !password || !userType) {
        return res.status(400).json({ error: "Please Enter all details" })
    }
    if (name.length >= 15 || name.length <= 3)
        return res.status(400).json({ error: "Enter correct Name" })
    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(email))
        return res.status(400).json({ error: "Enter correct Email" })

    if (password.length < 7)
        return res.status(400).json({ error: "Password length should be minimum 6 characters" })
    try {

        const response = await fetch(
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
                    collection: "Users",
                    filter: {
                        email: email,
                    },
                }),
            })
        const data = await response.json()
        if (data.document)
            return res.status(400).json({ error: "User already exists" })

        const hashPassword = await bcrypt.hash(password, 12)
        const savedoc = await fetch(
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
                    collection: "Users",
                    document: {
                        name, email, password: hashPassword, userType
                    },
                }),
            })
        const insertedId = await savedoc.json()
        return res.status(200).json(insertedId.insertedId)


    } catch (error) {
        console.log(error)
    }
})

module.exports = router
