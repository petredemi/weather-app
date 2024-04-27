
let temp = document.querySelector('#temp');
const wind = document.querySelector('div.wind');
let date = document.querySelector('div.date');
const humidity = document.querySelector('div.humidity');
const uvindex = document.querySelector('div.uv');
const condition = document.querySelector('#condition');
const img = document.querySelector('.status');
const arrea = document.querySelector('div.arrea');
let loc = JSON.parse(localStorage.getItem('weather'));

const btnsearch = document.querySelector('#lookfor');
let inputLocation = document.querySelector('#location');
inputLocation.value = loc;


// function getWeather(){
//   fetch(`https://api.weatherapi.com/v1/current.json?key=69b808bac1c14633a67231851242404&q=${loc}`,{mode:'cors'})
//       .then(function(response){
//           return response.json();
//       })
//       .then(function(response){
//           console.log(response);
//           temp.textContent = response.current.temp_c + '  ℃';
//           wind.textContent = response.current.wind_kph;
//           date.textContent = response.location.localtime;
//           humidity.textContent = response.current.humidity + ' %';
//           uvindex.textContent = response.current.uv;
//           condition.textContent = response.current.condition.text;
//         //  img.src = response.current.condition.icon;
//       })
//
//}
async function getWeather(){
    try{
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=69b808bac1c14633a67231851242404&q=${loc}`,{mode:'cors'});
        const getData = await response.json();
        if (!response.ok){
            throw new Error('did not find location');
        }
        console.log(getData);
        return getData;
        
        } catch(error){ 
           throw error;
        }
    }
function weatherToday(){
    getWeather()
        .then(getData =>{
            let name = getData.location.name.toLowerCase()
            temp.textContent = getData.current.temp_c + '  ℃';
            wind.textContent = getData.current.wind_kph + ' km/h';
            let x = new Date(getData.location.localtime);
            let y = x.toUTCString();
            // let y = x.split();
            
            console.log(y);
           // console.log(y.reverse());
            date.textContent = y;
 //           date.textContent = getData.location.localtime;

            humidity.textContent = getData.current.humidity + '  %';
            uvindex.textContent = getData.current.uv;
            condition.textContent = getData.current.condition.text;
            arrea.textContent = getData.location.region + ', ' + getData.location.tz_id
            img.src = 'https:'+ getData.current.condition.icon;
            localStorage.setItem('weather', JSON.stringify(inputLocation.value));
            console.log(getData);
            console.log(name);  
    })
        .catch(error => {
            console.log(error);
            inputLocation.value = error.message;
            console.log(error.message);
            temp.textContent = '℃';                                       
            wind.textContent = 'no data km/h';  
            date.textContent = 'no data';
            humidity.textContent = 'no data %';        
            uvindex.textContent = '';
            condition.textContent = 'no data';
            arrea.textContent = 'no location';
            img.src = 'https:'
        });
}
weatherToday();
    btnsearch.addEventListener('click', (e) => {
        if (inputLocation.value == '')return;
        loc = inputLocation.value;
        weatherToday();
    });
    inputLocation.addEventListener('click', (e) => {
        inputLocation.value = '';
    });
    inputLocation.addEventListener('keypress', function(event){
        if (event.key === 'Enter'){
            event.preventDefault();
            document.getElementById('lookfor').click();
        }
    });