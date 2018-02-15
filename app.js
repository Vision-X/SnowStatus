$(document).ready(function() {
    $('select').material_select();
    $('#container-list').css("display", "none");
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('select').onchange=changeEventHandler;
}, false);

var selection = '';
var superObj = {};

function changeEventHandler(event) {
  event.preventDefault();
  let selected = event.target.value;
  selection = selected.toLowerCase().replace(/ /g,'');
  let imageDump = document.querySelector('#container-list');
  imageDump.innerHTML = '';
  whatIsTheSelection(selection);
  getWeatherData(selection);
  getInstagramImages(selection);
};

function getInstagramImages(string) {
  $('#container-list').css("display", "block");
  var url = "https://www.instagram.com/explore/tags/" + selection + "/?__a=1";
  // console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(buildEls)
};

/////////////////////////////////////////

//Functions for sorting through the API
// getWeatherData();

function getWeatherData(selection) {
  console.log("getWeatherData", selection);
  let snowUrl = 'https://skiapp.onthesnow.com/app/widgets/resortlist?region=us&regionids=251&language=en&pagetype=skireport&direction=+1'
  fetch(snowUrl)
    .then(res => res.json())
    // .then(peek)
    .then(sortWeather)
    // .then(buildWeather)
}

function sortWeather(res) {
  var weatherContainer = document.querySelector('.weather');
  peek(res);
  var codeInsert = `<h2>{$superObj.resortName}</h2>`;
  // console.log("sortWeather", res.rows);
  let ary = res.rows;
  let resort = ary.filter((row) => {
    return row['resort_name_short'].toLowerCase().replace(/ /g,'') == resortChosen
  });

  for (var i = 0; i < resort.length; i++) {
    superObj.resortName = resort[i].resort_name;
    superObj.threeDayTotal = Math.round(resort[i].pastSnow.sum3/2.54);
    superObj.lastDayTotal = Math.round(resort[i].pastSnow.snow0day/2.54);
    console.log(superObj);
    weatherContainer.innerHTML =
    `<h2>${superObj.resortName}</h2>
       <ul> Snowfall
         <li> Last 72 Hrs: ${superObj.threeDayTotal} inches</li>
         <li> Last 24 Hrs: ${superObj.lastDayTotal} inches<li>
       </ul>`;
    //build HTML function
  }
}

function buildWeather(resortName, ) {

}

function whatIsTheSelection(selection) {
  console.log(selection);
  resortChosen = selection;
}

function peek(res) {
  console.log(res.rows, "res");
  // console.log(selection);
  //builds a loop that prints out all the resort names
  for (var i = 0; i < res.rows.length; i++) {
    let resort = res.rows[i].resort_name_short.toLowerCase().replace(/ /g,'');;
    console.log(resort);
  }
  // stretch: map/filter or FOR IN to make new obj of what I care about/reduce
}

function buildEls(res) {
  var slider = $(".carousel");
  slider.carousel();
  const toNodeKey = res.graphql.hashtag.edge_hashtag_to_media.edges;
  const container2 = document.querySelector('#container-list');
  let hashArray = ["#one!", "#two!", "#three!",
                   "#four!", "#five!", "#six!",
                   "#seven!", "#eight!", "#nine!"];
  let count = 0;
  loopThrough(toNodeKey, container2, hashArray, count);
  sliderClassCheck();
};

function loopThrough(toNodeKey, container2, hashArray, count) {
  superObj.urls = [];
  for (var i = 0; i < 9; i++) {
      let topImage = toNodeKey[i].node.display_url;
      superObj.urls.push(topImage);
      container2.innerHTML +=
      `<a class="carousel-item" href="${hashArray[count]}">
      <img src="${topImage}"></a>`;
      count++;
  };
};

function sliderClassCheck() {
  var slider = $(".carousel");
  if (slider.hasClass('initialized')) {
      slider.removeClass('initialized');
  }
  slider.carousel({
      autoplay: true
  });
};
