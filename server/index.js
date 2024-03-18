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
            // res.json(username)
            res.json('User Registered')
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

app.get('/movie-reviews', async (req, res) => {
    try {
        const reviews = await Review.findAll()
        res.json(reviews)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Internal server error' })
    }
})

app.get('/personal-reviews', async (req, res) => {
    const { username } = req.query
    try {
        const personal_review = await Review.findAll({ where: { name: username } })
        res.json(personal_review)
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Internal server error' })

    }
})

app.delete('/delete-review/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deletedReview = await Review.destroy({ where: { id: id } })
        if (deletedReview) {
            res.json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Internal server error' })
    }
})


app.delete('/delete-user', async (req, res) => {
    const { email } = req.query
    try {
        const deletedUser = await User.destroy({ where: { email: email } })
        if (deletedUser) {
            res.send('User deleted')
        } else {
            res.send('User not deleted yet')
        }
    } catch (err) {
        console.error(err);
    }
})

app.get('/get-review/:id', async (req, res) => {
    const id = req.params.id
    console.log(id);
    try {
        const review = await Review.findOne({ where: { id: id } })
        res.json(review)
    } catch (err) {
        console.error(err);
    }
})

app.put('/update-review/:id', async (req, res) => {
    const reviewId = req.params.id
    const { title, review } = req.body
    console.log(reviewId);

    try {
        const existingReview = await Review.findByPk(reviewId)
        if (!existingReview) {
            return res.status(404).json({ error: 'Review not found' });
        }
        await existingReview.update({ title: title, review: review })

        // existingReview.title = title
        // existingReview.review = review

        // await existingReview.save()

        return res.status(200).json({ message: 'Review updated successfully' });
    } catch (err) {
        console.error(err);
    }
})


db.sequelize.sync().then((req) => {
    app.listen(2002, () => {
        console.log('I am running on port 2002');
    })
})
