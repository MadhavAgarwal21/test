const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const foreCast = require('./utils/forecast')
const geoCode = require('./utils/geocode')
const port = process.env.PORT || 3000
// Define Paths
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Handlers & View Locations
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Static Directory 
app.use(express.static(publicDirPath))

app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather' ,
        age: '21',
        name: 'Madhav'
    })
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title : 'About' ,
        age: '21',
        name: 'Madhav'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help!',
        name: 'Madhav',
        age:'21'
        })
} )

app.get('/weather', (req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geoCode( req.query.address , (error , { latitude , longitude , location } = {}) => {
        if(error)
        {
            return res.send({error})
        }
        foreCast( latitude, longitude , (error , forecastData) => {
            if(error)
            {
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        } )
    } )
} )

app.get('/help/*' , (req,res) =>{
    res.render('404' , {
        title: 'Help Not Found',
        name: 'Madhav',
        age: '21'
    })
})
app.get('*' , (req,res) =>{
    res.render('404' , {
        title: 'Page Not Found',
        name: "Madhav",
        age: '21'
    })
})


app.listen(port,()=>{
    console.log('Server is up on port' + port)
})