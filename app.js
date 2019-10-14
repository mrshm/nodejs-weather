const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './template/views')
const partialPath = path.join(__dirname, './template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'provide an address'
        })
    }

    geocode (req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        } else {
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorMessage: 'Not found!'
    })
})

app.listen(3000, () => {
    console.log('server running on 3000')
})