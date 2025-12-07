const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.getElementById("search");
const form = document.querySelector("form");

let target = "delhi,india";

const fetchData = async () => {
  const url = `https://api.weatherapi.com/v1/current.json?key=ab9787fdb7ad492f92b201526240404&q=${target}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const temp = data.current.temp_c;
  const city = data.location.name;
  const emoji = data.current.condition.icon;
  const text = data.current.condition.text;
  const datetimeString = data.location.localtime;
  const datetime = new Date(datetimeString);
  const country=data.location.country;
  updateDom(temp, city, emoji, text, datetime,country);
};


fetchData();
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    target = searchField.value;
    fetchData();
  });
  function updateDom(temp, city, icon, text, datetime,country) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = weekday[datetime.getDay()];
    const date = `${datetime.getDate()}-${datetime.getMonth() + 1}-${datetime.getFullYear()}`;
    const time = `${datetime.getHours()}:${datetime.getMinutes()}`;
    const formattedDatetime = `${time}-${day} ${date}`;
  
    // Concatenate the degree Celsius symbol with the temperature value
    const formattedTemp = `${temp}&deg;C`;
  
    temperatureField.innerHTML = formattedTemp;
    cityField.innerText =`${city},${country}`
    emojiField.src = 'https:' + icon;
    weatherField.innerText = text;
    dateField.innerText = formattedDatetime;
  }
