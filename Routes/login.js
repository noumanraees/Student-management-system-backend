const express = require('express')
const bcrypt = require('bcrypt')

const router = express.Router()
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password)
        return res.status(400).json({ error: "Please Enter all details" })
    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(email))
        return res.status(400).json({ error: "Enter correct Email" })
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
    if (!data.document) {
        return res.status(400).json({ message: "User doesnt exists" })
    }
    const doesPasswordMatch = await bcrypt.compare(password, data.document.password)
        if (!doesPasswordMatch)
        return res.status(400).json(
            { error: "Please enter correct password"}
            )
        const payload = {
            _id: data.document._id,
            

        }
        const token = jwt.sign(
            payload, 
            "675hytrhhklifghghyfhghgjhjdgtgjghkjgnb",
            { expiresIn: '1h' }
        )
        const user = {
            ...data.document, password: undefined

        }
        return res.status(200).json(
            {token, user}
        )
    

})

module.exports = router;
