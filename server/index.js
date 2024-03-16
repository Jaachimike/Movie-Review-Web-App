const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./models')
const { User, Review } = require('./models')

const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body
    bcrypt.hash(password, 10).then((hash) => {
        User.create({
            username: username,
            email: email,
            password: hash
        }).then(() => {
            res.json('USER REGISTERED')
        }).catch((err) => {
            if (err) {
                res.status(400).json({ error: err })
            }
        })
    })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user) { res.status(400).json({ error: 'User does not exist' }); }
    const dbPassword = user.password
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.status(400).json({ error: "Wrong password" })
        } else {
            res.json(user.username)
        }
    })

})

app.post('/post-review', (req, res) => {
    const { title, review, name } = req.body
    Review.create({
        title: title,
        review: review,
        name: name
    }).then(() => {
        res.json('POST ADDED')
    }).catch((err) => {
        if (err) {
            res.status(400).json({ error: err })
        }
    })
})


db.sequelize.sync().then((req) => {
    app.listen(2002, () => {
        console.log('I am running on port 2002');
    })
})
