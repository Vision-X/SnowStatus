$(document).ready(function() {
    $('select').material_select();
});

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('select').onchange=changeEventHandler;
}, false);

function changeEventHandler(event) {
  event.preventDefault();
  let selected = event.target.value;
  if (event.target.tagName == 'SELECT') {
    selection = selected.toLowerCase().replace(/ /g,'');
    console.log(selection.toLowerCase().replace(/ /g,''));
    let imageDump = document.querySelector('#container-list');
    imageDump.innerHTML = '';
    getInstagramImages(selection);
  }
};

function getInstagramImages(string) {
  var url = "https://www.instagram.com/explore/tags/" + selection + "/?__a=1";
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(buildEls)
};

function getWeather() {
  fetch(url)
    .then(res => res.json())
    .then()
    .catch(console.log("FAIL"))
}

function buildEls(res) {
  var slider = $(".carousel");
  slider.carousel();
  const toNodeKey = res.graphql.hashtag.edge_hashtag_to_media.edges;
  const container2 = document.querySelector('#container-list');
  let hashArray = ["#one!", "#two!", "#three!", "#four!", "#five!", "#six!", "#seven!", "#eight!", "#nine!"];
  let count = 0;
  loopThrough(toNodeKey, container2, hashArray, count);
  sliderClassCheck();
};

function loopThrough(toNodeKey, container2, hashArray, count) {
  for (var i = 0; i < 9; i++) {
      let topImage = toNodeKey[i].node.display_url;
      container2.innerHTML +=
      `<a class="carousel-item" href="${hashArray[count]}"><img src="${topImage}"></a>`
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
