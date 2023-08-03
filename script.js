var res = fetch("https://restcountries.com/v2/all");
res
  .then((data) => data.json())
  .then((data1) => {
    for (let i = 0; i < data1.length; i++) {
      const div = document.createElement("div");
      div.classList.add("card-container");
      div.setAttribute("data-name", data1[i].name);
      div.innerHTML = `
        <div class="row row-cols-1 row-cols-md-3">
          <div class="col mb-4">
            <div class="card">
              <img src="${data1[i].flag}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data1[i].capital}</h5>
                <p class="card-text">${data1[i].name}</p>
                <p class="card-text">${data1[i].region}</p>
                <p class="card-text">Latitude/Longitude: ${data1[i].latlng}</p>
                <p class="card-text">Country Code: ${data1[i].alpha3Code}</p>
                <button type="button" class="btn btn-primary" onclick="getWeatherData('${data1[i].name}')">click for weather</button>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.append(div);
    }
  });

const getWeatherData = (name) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=ced45ad404fa1f614b8b8ca12ae174ae`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const card = document.querySelector(`[data-name="${name}"]`);
      card.innerHTML = `
      <div class="type">Coordinates: Lat ${data.coord.lat}, Lon ${data.coord.lon}</div>
      <p class="type">Base: ${data.base}</p>
      <p class="type">Weather: ${data.weather[0].description}</p>
    `;
    });
};
