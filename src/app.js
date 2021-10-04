const path = require('path')
const express = require('express')
const ejs = require('ejs')
const app = express()
const geocode = require('./utils/geocode')
const weatherreq = require('./utils/weatherreq')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')


app.set('view engine', 'ejs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        forecast: 'It is snowing',
        location: 'Philadelphia'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address',
        })
    }

    geocode(req.query.address, (error, ans={}) => {
        if(error){
            return res.send({ error })
        }

        weatherreq(ans.latitude, ans.longitude, (error, data) => {
            if(error){
                res.send({error})
            }

            res.send({
                data: data,
                location: ans.location
            })
        })
    })
    
})

app.get('/output', (req, res) => {
    res.render('output')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})