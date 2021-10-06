
console.log('Client side javascript file is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
// const messagetwo = document.querySelector('#message-2')
const date = document.querySelector('#date')
const time = document.querySelector('#time')
const week = document.querySelector('#week')
const pressure = document.querySelector('#pressure')
const humidity = document.querySelector('#humidity')
const speed = document.querySelector('#speed')
const temp = document.querySelector('#temp')
const visibility = document.querySelector('#visibility')
const feels = document.querySelector('#feels')
const des = document.querySelector('#des')
const printTime = document.querySelector('#printTime')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value;
    messageone.textContent = 'Loading'
    // messagetwo.textContent = ""

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
                messageone.textContent = data.error
                
            }else{
                console.log(data.location)
                console.log(data.data)
                
                messageone.textContent = location
                date.textContent = data.data[0][0][0]+ " " + data.data[0][0][1]+ " " + data.data[0][0][2]
                time.textContent = data.data[0][0][3]+ ":" + data.data[0][0][4] + ":" + data.data[0][0][5]
                week.textContent = data.data[0][0][6]
                pressure.textContent = data.data[0][2] 
                humidity.textContent = data.data[0][3]
                speed.textContent = data.data[0][4] 
                temp.textContent = data.data[0][1]
                visibility.textContent = data.data[0][5]
                feels.textContent = data.data[0][6]
                des.textContent = data.data[0][7]
                document.querySelector("#imageid").src="http://openweathermap.org/img/wn/" + data.data[0][9] +".png";



            
            for(var i = 0; i < 48; i++) {
                const fill = document.getElementById("fill");
                // const date = document.getElementById("printarray");
                // const time = document.getElementById("printTime");
                // const temp = document.getElementById("printTemp")
                 fill.innerHTML +='<span style="margn:10px; font-size:15px; color:rgba(108, 122, 137, 1); border-radius:10px; text-align:center;  margin-left:20px; padding:20px;box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">'+
                 '<div style="font-weight:bold;">'+data.data[2][i]+ '°C'+ '<br>'+'</div>'+
                 '<div style="font-size:10px; width:100px;">'+data.data[3][i]+ '<br>'+'</div>'+
                 data.data[1][i][3] + ":"+ data.data[1][i][4]  + ":"+ data.data[1][i][5]+ '<br>'+
                 data.data[1][i][0] + " " + data.data[1][i][1] +  '<br>'+
                '</span>'
          
            }
            
            for(var i=10; i<18; i++){
                const daily = document.getElementById('daily')
                daily.innerHTML +=data.data[0][i][0][0] + " " + data.data[0][i][0][1]  + "min :" + data.data[0][i][1] + "max :" + data.data[0][i][2] + '<br>'
            }
                
            }
        })
    })
})