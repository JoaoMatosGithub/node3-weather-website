const request = require('request');

const forecast = (longitude,latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a5901ea7328f4f146f5d8844dfbb121e/'+ longitude +',' + latitude +'?units=si'
    
    request({ url, json : true} , (error, {body}) => {
      if (error){
        callback('Unable to connect to weather services!', undefined)
      }else if(body.error){
        callback("Unable to find location!", undefined)
      }else{
        callback( undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' celsius degrees with ' + body.currently.precipProbability + '% chance of rain in ' + body.timezone  );
      }
     })
  }

  module.exports = forecast;