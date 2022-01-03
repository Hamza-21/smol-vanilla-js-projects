setInterval(setClock, 1000); //Runs the function every specified miliseconds

function setClock() {
  const currentTime = new Date();

  const seconds = currentTime.getSeconds() / 60;
  //the ratio of time, suppose 0.5 is 30s, this allows for smoother transitions
  //like being in the middle and shit
  const minutes = (seconds + currentTime.getMinutes()) / 60;
  const hours = (minutes + currentTime.getHours()) / 12;

  const handHour = document.querySelector(".hour");
  const handMinute = document.querySelector(".minute");
  const handSecond = document.querySelector(".second");

  setRotation(handSecond, seconds);
  setRotation(handMinute, minutes);
  setRotation(handHour, hours);
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360); //selecting the actual element from CSS, kinda like DOM elements
}

setClock();
