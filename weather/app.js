window.addEventListener("load", () => {
  /* addEventListener paired with 'load' loads the code inside it when the page is loaded for
    the first time or when it is reloaded */

  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegrees = document.querySelector(".temperature-degrees");
  let locationTimezone = document.querySelector(".location-timezone");
  let time = document.querySelector(".time");
  let locationIcon = document.querySelector("#location-icon");
  let degrees = document.querySelector(".degrees");
  let degreesSpan = document.querySelector(".degrees span");

  if (navigator.geolocation) {
    // will prompt the user to allow access to the location of the browser
    navigator.geolocation.getCurrentPosition((positionUser) => {
      // gets the current position of the browser
      //console.log(positionUser);
      long = positionUser.coords.longitude;
      lat = positionUser.coords.latitude;

      const api = `http://api.weatherapi.com/v1/current.json?key=382f415e4e2e41c2804140118210612&q=${lat},${long}`;

      /* provided an API that only allows cross-origin refereing i.e. does not allow access from a localhost,
      use a proxy server to bypass that error.
      
      Eg: const proxy = '*link to cors-anywhere live*'
            const api = `${proxy}*api link*` */

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_c, temp_f } = data.current; // pulls out the specified metric from the data returned
          const { text, icon } = data.current.condition;
          const { name, localtime } = data.location;
          console.log(icon);

          //Specifiy the DOM elements from the document

          temperatureDegrees.textContent = temp_c + " °";
          temperatureDescription.textContent = text;
          locationTimezone.textContent = name;
          time.textContent = localtime;
          locationIcon.src = icon;

          degrees.addEventListener("click", () => {
            if (degreesSpan.textContent === "C") {
              degreesSpan.textContent = "F";
              temperatureDegrees.textContent = temp_f + " °";
            } else {
              degreesSpan.textContent = "C";
              temperatureDegrees.textContent = temp_c + " °";
            }
          });
        });
    });
  }
});
