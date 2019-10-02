const path = require('path')
const express = require('express')
const hbs = require ('hbs')
const app = express()
const request =  require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Arsh'
    })
})
app.get('/weather',(req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
geocode(req.query.address,(error,{latitude, longitude, location} = {}) => {
    if(error){
        return res.send({ error })
    }
    forecast(latitude, longitude, (error, forecastData) =>{
        if (error){
            return res.send({ error })
        }
        res.send({
            location,
            forecastData,
            address: req.query.address
        })
    })
})
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About!',
        name: 'Arsh'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help!',
        name: 'Arsh'
    })
})
app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage: 'Help page Not found!'
    })
})
app.get('/*',(req,res) => {
    res.render('404',{
        errorMessage: '404 Page not found'
    })
})
app.listen(3000, () => {
    console.log('3000')
})

