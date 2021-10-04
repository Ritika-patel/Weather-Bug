var requests = require('requests');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicml0aWthcGF0ZWwxODAiLCJhIjoiY2t1OWdrM2d2MDZueDJvbzIwcGVnNnZ2OSJ9.LS3zBukaQbU3tU6vyl0gWQ&limit=1"
     requests(url)
 .on('data', function (chunk) {
     const data = JSON.parse(chunk)
     if(data.features.length===0){
         callback('unable to find location try another search', undefined)
     }else{
        callback(undefined, {
          latitude: data.features[0].center[1],
          longitude: data.features[0].center[0],
          location: data.features[0].place_name      
         })
     }
   })
 
 .on('end', function (error) {
   if (error) callback('connection closed due to network errors', undefined);
 });
 }
 
 module.exports = geocode;