$(document).ready(function() {
    $('.modal').modal();
    $('select').material_select();
    $('#container-list').css("display", "none");
    $('.slider').slider();
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('select').onchange=changeEventHandler
}, false);

var selection = '';
var superObj = {};

function changeEventHandler(event) {
  event.preventDefault();
  let imageDump = document.querySelector('#container-list');
  let selected = event.target.value;
  selection = selected.toLowerCase().replace(/ /g,'');
  imageDump.innerHTML = '';
  getWeatherData(selection);
  getInstagramImages(selection);
};

function getInstagramImages(string) {
  $('#container-list').css("display", "block");
  if (selection == "aspen/snowmass") {
    var url = "https://www.instagram.com/explore/tags/aspensnowmass/?__a=1";
  } else {
    var url = "https://www.instagram.com/explore/tags/" + selection + "/?__a=1";
  }
  fetch(url)
    .then(res => res.json())
    .then(buildEls)
    .catch()
};

function getWeatherData(selection) {
  let snowUrl = 'https://skiapp.onthesnow.com/app/widgets/resortlist?region=us&regionids=251&language=en&pagetype=skireport&direction=+1'
  fetch(snowUrl)
  .then(res => res.json())
  .then(sortWeather)
  .catch()
};

function sortWeather(res) {
  let resort = res.rows.filter((row) => {
    return row['resort_name'].toLowerCase().replace(/ /g,'') == selection
  });
  for (var i = 0; i < resort.length; i++) {
    superObj.resortName = resort[i].resort_name;
    superObj.threeDayTotal = Math.round(resort[i].pastSnow.sum3/2.54);
    superObj.lastDayTotal = Math.round(resort[i].pastSnow.snow0day/2.54);
    superObj.liftNum = resort[i].snowcone.lifts_open;
    superObj.liftTotal = resort[i].resortProfile.num_lifts;
    superObj.baseDepth = Math.round(resort[i].snowcone.base_depth_cm/2.54);
    superObj.topDepth = Math.round(resort[i].snowcone.top_depth_cm/2.54);
    buildWeather(superObj);
  };
};

function buildWeather() {
  var weatherContainer = document.querySelector('.weather');
  weatherContainer.innerHTML =
  `<h2>${superObj.resortName}</h2>
    <div class="weather-flex">
      <ul> <h3>Snowfall</h3>
        <li> 24 Hrs: ${superObj.lastDayTotal}"<li>
        <li> 72 Hrs: ${superObj.threeDayTotal}"</li>
      </ul>
      <ul> <h3>Base/Top</h3>
        <li> ${superObj.baseDepth}" - ${superObj.topDepth}" </li>
      </ul>
      <ul> <h3>Lifts</h3>
        <li> Open: ${superObj.liftNum} / ${superObj.liftTotal} </li>
      </ul>
    </div>`;
};


function buildEls(res) {
  const toNodeKey = res.graphql.hashtag.edge_hashtag_to_media.edges;
  const container2 = document.querySelector('#container-list');
  let count = 0;
  let hashArray = ["#one!", "#two!", "#three!",
                   "#four!", "#five!", "#six!",
                   "#seven!", "#eight!", "#nine!"];
  loopThrough(toNodeKey, container2, hashArray, count);
  sliderClassCheck();
};

function loopThrough(toNodeKey, container2, hashArray, count) {
  superObj.urls = [];
  for (var i = 0; i < 9; i++) {
      let topImage = toNodeKey[i].node.display_url;
      superObj.urls.push(topImage);
      container2.innerHTML +=
      `<li href="${hashArray[count]}">
        <img class="responsive-img" src="${topImage}">
      </li>`;
      count++;
  };
  $('.slider').slider();
};

function sliderClassCheck() {
  var slider = $('.slider');
  if (slider.hasClass('initialized')) {
      slider.removeClass('initialized');
  }
  slider.slider();
};
