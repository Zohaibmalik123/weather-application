const request = require('request')

const geocode=(address , callback)=>{

const url='https://api.mapbox.com/geocoding/v5/mapbox.places/ ' + address + '.json?limit=1&access_token=pk.eyJ1Ijoiem9oYWlibWFsaWswMjAwMCIsImEiOiJja3NuaWlrdG0xcDdqMnlveHNhbTFjdHRiIn0.mNMwI2rjdXVRy6OkTiSElA'
request({url , json:true} , (error , { body }) =>{
    if(error){
        callback('unable to connect to location service!' , undefined)
    } else if(body.features.length === 0){
        callback('unable to find location Try another way.' , undefined)
    }
    
    else{ 
        callback(undefined,{
           latitude : body.features[0].center.latitude,
           longitude: body.features[0].center.longitude,
           location : body.features[0].place_name
        })
}
})
}

module.exports = geocode  