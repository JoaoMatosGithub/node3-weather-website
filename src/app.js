const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode.js')
const forecast = require('./Utils/forecast.js')

const app = express()
const publicpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicpath))


app.get('' , (req, res) => {
  res.render('index',{
    title: 'Weather',
    name:'João Matos'
  })
})

app.get('/about' , (req, res) => {
    res.render('about', {
        name:'João Matos',
        title: 'About'
    })
  })

app.get('/help' , (req, res) => {
    res.render('help', {
        helpText:' How can i help?',
        title: 'Help',
        name:'João Matos'
    })
  })

app.get('/weather' , (req, res) => {
    if(!req.query.adress){
      return res.send({
            error: 'You must provide a location!'
        })
    }

    geocode(req.query.adress, (error, {latitude, longitude,location} = {    }) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }

        res.send({
            forecast: forecastData,
            location,
            adress: req.query.adress
        })

        
        })

    })
})

app.get('/help/*' , (req, res) => {
    res.render('404', {
        errorMessage: 'Article not found!',
        title: '404 Article',
        name:'João Matos'
    })
  })

app.get('*' , (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found!',
        title: '404 Page!',
        name:'João Matos'
    })
  })



//app.com
//app.com/help
//app.com/about

app.listen(3000, () =>{
    
    console.log('Server is Up on port 3000')

});