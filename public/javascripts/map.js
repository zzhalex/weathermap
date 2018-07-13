let locationlist = [{
    id: 0,
    name: 'Dease Lake',
    pos: {
      lat: 58.436926,
      lng: -129.999421
    }
  },
  {
    id: 1,
    name: 'Fort Nelson',
    pos: {
      lat: 58.804472,
      lng: -122.702494
    }
  },
  {
    id: 2,
    name: 'Terrace',
    pos: {
      lat: 54.505160,
      lng: -128.602320
    }
  },
  {
    id: 3,
    name: 'Prince George',
    pos: {
      lat: 53.908723,
      lng: -122.749427
    }
  },
  {
    id: 4,
    name: 'Whistler',
    pos: {
      lat: 50.116182,
      lng: -122.955082
    }
  },
  {
    id: 5,
    name: 'Revelstoke',
    pos: {
      lat: 51.005568,
      lng: -118.209352
    }
  },
  {
    id: 6,
    name: 'Creston',
    pos: {
      lat: 49.095201,
      lng: -116.514637
    }
  }
]

for (var i = 0; i < locationlist.length; i++) {
//   var content;
//   var index;
  var info = document.getElementsByClassName('input')[0].children[i];
//   console.log(info);
  console.log(info.id);
  console.log(info.innerText);
  locationlist[info.id].content =info.innerText;  
}
console.log(locationlist);



function setMarkers(map) {
 
  for (var i = 0; i < locationlist.length; i++) {
    var location = locationlist[i];
    var marker = new google.maps.Marker({
      position: location.pos,
      map: map,
      title: location.name
    });

     var infoWindow = new google.maps.InfoWindow();
     infoWindow.setContent(location.content);
     infoWindow.open(map, marker);
    
     google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        marker.infowindow.open(map, marker);
      }
    })(marker, i));
    
  }
}

function initMap() {
  var core = {
    lat: 55.081712,
    lng: -125.489735
  };

  // var DeaseLake ={lat:58.436926, lng:-129.999421};
  // var FortNelson = {lat:58.804472, lng:-122.702494}; 
  // var Terrace ={lat:54.505160, lng:-128.602320};
  // var  PrinceGeorge ={lat:53.908723, lng:-122.749427};
  // var  Whistler = {lat:50.116182, lng:-122.955082};
  // var  Revelstoke ={lat:51.005568, lng:-118.209352};
  // var  Creston ={lat:49.095201, lng:-116.514637};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: core
  });


  setMarkers(map);

}
