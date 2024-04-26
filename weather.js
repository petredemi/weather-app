
let temp = document.querySelector('#temp');
const wind = document.querySelector('div.wind');
const date = document.querySelector('div.date');
const humidity = document.querySelector('div.humidity');
const uvindex = document.querySelector('div.uv');
const condition = document.querySelector('#condition');
const img = document.querySelector('.status');
const arrea = document.querySelector('div.arrea');
let loc = JSON.parse(localStorage.getItem('weather'));
;
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
        let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=69b808bac1c14633a67231851242404&q=${loc}`,{mode:'cors'})
        let getData = await response.json()
   // await Promise.reject(new Error('woops'))
         temp.textContent = getData.current.temp_c + '  ℃';
         wind.textContent = getData.current.wind_kph;
         date.textContent = getData.location.localtime
         humidity.textContent = getData.current.humidity
         uvindex.textContent = getData.current.uv
         condition.textContent = getData.current.condition.text
         arrea.textContent = getData.location.region + ', ' + getData.location.tz_id
         img.src = 'https:'+ getData.current.condition.icon;
         console.log(getData);
 }
 
    getWeather()
    btnsearch.addEventListener('click', (e) => {
        if (inputLocation.value == '')return;
        loc = inputLocation.value;
        localStorage.setItem('weather', JSON.stringify(inputLocation.value));
        getWeather();
    })
    inputLocation.addEventListener('click', (e) => {
        inputLocation.value = '';
    })