window.onscroll = function() {
  makeHeaderSticky();
};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function makeHeaderSticky() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
// stickyheader
// vertical-slider
var swiper = new Swiper(".myVertical", {
  spaceBetween: 20,
  autoplay: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
// vertical-slider
// sharper-slider
var swiper = new Swiper(".mysharper", {
  spaceBetween: 20,
  autoplay: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
// sharper-slider
// mygallery-slider
var swiper = new Swiper(".mygallery", {
  spaceBetween: 10,
  autoplay: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    },
  },
});
// mygallery-slider

am5.ready(function() {

  // Create root element
  var root = am5.Root.new("chartdiv");

  // Set themes
  root.setThemes([am5themes_Animated.new(root)]);

  // Create the map chart with globe projection
  var chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "rotateY",
      projection: am5map.geoOrthographic()  // Use orthographic projection for the globe
    })
  );

  // Create series for background fill (optional)
  var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
  backgroundSeries.mapPolygons.template.setAll({
    fill: root.interfaceColors.get("alternativeBackground"),
    fillOpacity: 0.1,
    strokeOpacity: 0
  });

  // Add background polygon
  backgroundSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180)
  });

  // Create main polygon series for countries
  var polygonSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, {
      geoJSON: am5geodata_worldLow
    })
  );

  // Add custom data for each country (sharper and project values)
  var countryData = {
    "United States": { shapers: 20340, projects: 10456 },
    "France": { shapers: 15340, projects: 8940 },
    "Japan": { shapers: 23400, projects: 15430 },
    "Belgium": { shapers: 17340, projects: 9480 },
    "Denmark": { shapers: 12450, projects: 10330 },
    "Tokyo": { shapers: 12450, projects: 10330 }
    // Add more countries and their data as needed
  };

  // Country click event
  polygonSeries.mapPolygons.template.events.on("click", function(ev) {
    var countryName = ev.target.dataItem.dataContext.name; // Get clicked country's name
    var data = countryData[countryName]; // Get country data

    // Check if country data exists and update the boxes
    if (data) {
      document.querySelector(".box.border-primary h4").textContent = data.shapers.toLocaleString();  // Update total sharpers
      document.querySelector(".box.border-danger h4").textContent = data.projects.toLocaleString();  // Update total projects
    } else {
      // If no data, set default values or handle error
      document.querySelector(".box.border-primary h4").textContent = "N/A";
      document.querySelector(".box.border-danger h4").textContent = "N/A";
    }
  });

  // Create point series for markers
  var pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
  var colorset = am5.ColorSet.new(root, {});

  pointSeries.bullets.push(function() {
    var container = am5.Container.new(root, {
      tooltipText: "{title}",
      cursorOverStyle: "pointer"
    });

    var circle = container.children.push(
      am5.Circle.new(root, {
        radius: 4,
        tooltipY: 0,
        fill: colorset.next(),
        strokeOpacity: 0
      })
    );

    // Add marker animation
    circle.animate({
      key: "scale",
      from: 1,
      to: 5,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    });
    circle.animate({
      key: "opacity",
      from: 1,
      to: 0.1,
      duration: 600,
      easing: am5.ease.out(am5.ease.cubic),
      loops: Infinity
    });

    return am5.Bullet.new(root, {
      sprite: container
    });
  });

  // Add cities (without URLs)
  var cities = [
    { title: "Brussels", latitude: 50.8371, longitude: 4.3676 },
    { title: "Copenhagen", latitude: 55.6763, longitude: 12.5681 },
    { title: "Paris", latitude: 48.8567, longitude: 2.351 },
    { title: "Tokyo", latitude: 35.6785, longitude: 139.6823 },
    { title: "New York", latitude: 40.7128, longitude: -74.0060 }
  ];

  // Function to add city markers
  for (var i = 0; i < cities.length; i++) {
    var city = cities[i];
    addCity(city.longitude, city.latitude, city.title);
  }

  function addCity(longitude, latitude, title) {
    pointSeries.data.push({
      geometry: { type: "Point", coordinates: [longitude, latitude] },
      title: title
    });
  }

  // Make the globe animate on load
  chart.appear(1000, 100);

}); // end am5.ready()


