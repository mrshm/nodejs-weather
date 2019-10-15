const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/5a3d212e585a5bea0135dac700ad1bb6/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(
                undefined,
                'Current Temp: ' + body.currently.temperature + ', ' + body.daily.summary + ' High Temp Today: ' + body.daily.data[0].temperatureHigh + ' Low Temp Today: ' + body.daily.data[0].temperatureLow
            )
        }
    })
}

module.exports = forecast