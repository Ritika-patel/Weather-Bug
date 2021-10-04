var requests = require('requests');

const weatherreq = (latitude, longitude, callback) => {
const urlW = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude +  '&lon=' + longitude + '&exclude=minutely&appid=631f9d32214d1d13cc91815d655e1d41&units=metric'
requests(urlW)
.on('data', function (chunk) {
const data = JSON.parse(chunk)  
const ans =  Object.values(data);
if(data.message){
    callback(data.message + 'dont have data of this location', undefined)
}
else{
function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[a.getDay()]
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = [date,month,year,hour,min,sec,dayOfWeek]
    return time;
  }
    
    const output = [
      (timeConverter(data.current.dt)),
      data.current.temp,
      data.current.pressure,
      data.current.humidity,
      data.current.wind_speed,
      data.current.pressure,
      data.current.weather[0].description,
      data.current.weather[0].main,
      data.current.weather[0].icon,
      [ timeConverter(data.daily[0].dt),  data.daily[0].temp.min, data.daily[0].temp.max],
      [ timeConverter(data.daily[1].dt),  data.daily[1].temp.min, data.daily[1].temp.max],
      [ timeConverter(data.daily[2].dt),  data.daily[2].temp.min, data.daily[2].temp.max],
      [ timeConverter(data.daily[3].dt),  data.daily[3].temp.min, data.daily[3].temp.max],
      [ timeConverter(data.daily[4].dt),  data.daily[4].temp.min, data.daily[4].temp.max],
      [ timeConverter(data.daily[5].dt),  data.daily[5].temp.min, data.daily[5].temp.max],
      [ timeConverter(data.daily[6].dt),  data.daily[6].temp.min, data.daily[6].temp.max],
      [ timeConverter(data.daily[7].dt),  data.daily[7].temp.min, data.daily[7].temp.max]
    ]
    
    const ATime = [];
    const ATemp = [];
    for(var i=0; i<data.hourly.length; i++){
      
      ATime.push(timeConverter(data.hourly[i].dt))
      ATemp.push(data.hourly[i].temp)
    }
    final = [output, ATime, ATemp]
    callback(undefined, final);


}
})
.on('end', function (err) {
  if (err){
      callback('connection closed due to network errors', undefined);
  }
 
});
}

// weatherreq(26.4499, 80.3319, (error, data) => {
// console.log(error);
// console.log(data);
// })


module.exports = weatherreq;