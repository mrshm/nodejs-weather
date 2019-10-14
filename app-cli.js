const geocode = require('./geocode')
const forecast = require('./forecast')

const address = process.argv[2]

if (!address) {
    console.log('please provide an address')
} else {
    geocode (address, (error, {longitude, latitude, location}) => {
        if (error) {
            console.log('Error',error)
        } else {
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    console.log('Error',error)
                } else {
                    console.log(forecastData + ' in ' + location)
                }
            })
        }
    })
}