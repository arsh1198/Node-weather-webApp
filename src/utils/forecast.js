const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b0422226b6861e4c519e5a9de9945162/'+latitude+','+longitude+'?units=si'

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to the weather provider!', undefined)
        }
        else if (body.error){
            callback('Unable to find location!', undefined)
        }
        else{
            const temp = body.currently.temperature
            const precip = body.currently.precipProbability
            callback(undefined, body.daily.data[0].summary + ' It is currently '+temp+' degrees out. There is a '+precip+'% chance of rain.')
        }
    })
}


module.exports = forecast
