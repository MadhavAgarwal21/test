const request = require('postman-request')

const foreCast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e5bf9f61d448b9446920fdfaf31e0c9b&query='+latitude+','+longitude+'&units=f'
    
    request({url , json:true},(error,{body})=>{
           if(error)
           {
               callback('Unable to connect!' , undefined)
           }
           else if(body.error)
            {
                callback("Invalid Location! Try another one",undefined)
            }
           else {
               callback(undefined, `Temperature is ${body.current.temperature} and humidity is ${body.current.humidity} ` )
           }
    })
    }
    module.exports = foreCast