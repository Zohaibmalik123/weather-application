const request = require('request')

const forecast = (latitude , longitude , callback) =>{
    const url="http://api.weatherstack.com/current?access_key=314e977293f4e9e48bc1a4ab10f5cfb3&query=" + latitude + ',' + longitude + ',' + '&units=f'
 
    request({ url  , json:true} , (error, { body }) =>{
            if(error){
                callback('Unable to connect to weather service!' , undefined)
            } else if(body.error){
                callback('unable to find location' , undefined)
            }
            
            else{
                callback(undefined, body.current.weather_descriptions[0] + '.It is currently ' + body.current.temperature +'%' + ' degree out. ' + ' There is a ' + body.current.precip + '%'  + ' chance of rain .' + ' its feelslike ' +  body.current.feelslike + '%' )
            }
         
        })
}

module.exports = forecast