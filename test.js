// global
var vizParameters;
var viz;
var device;
var vizDiv = document.getElementById("tableauViz");
var vizUrl = 'https://demo.tableau.com/t/tableau/views/SuperstoreDeviceDashboards/Overview';
var vizOptions = {
  hideTabs: true,
  hideToolbar: true,
  onFirstInteractive: defaultOnFirstInteractive,
  // height: '800px',
  // width: '800px'
  // onFirstVizSizeKnown: resizeVizContainerDiv

};

var maxWidth = 1200;

// code to run after DOM is ready
$(document).ready(function() {

  var vizDiv = document.getElementById("tableauViz");

  // mediaQueryString is string representing the media query to parse.
  mediaQueryString = "(max-width: 500px)";
 

  // matchMedia() method returns object, that includes 'matches' property that will indicate (returns True/False) if it satisfies the media query string (e.g. "(max-width: 500px)")
  var mediaQuery = window.matchMedia(mediaQueryString);
  // console.log("mediaQuery.matches", mediaQuery.matches);

  // at first page load, load phone or desktop then scale
  if (mediaQuery.matches) {

      vizOptions.device = 'phone';

      // if a viz object exists, destroy it, then initialize new one
      if (viz != undefined) {
        viz.dispose();

      }

      initializeViz(vizDiv, vizUrl, vizOptions);
      currentWidth = vizDiv.offsetWidth;
      scaleViz(currentWidth, maxWidth, 'phone');
      console.log("vizOptions", vizOptions);

    } else {

      vizOptions.device = 'desktop';

      // if a viz object exists, destroy it, then initialize new one
      if (viz != undefined) {
        viz.dispose();

      }
      initializeViz(vizDiv, vizUrl, vizOptions);
      currentWidth = vizDiv.offsetWidth;
      scaleViz(currentWidth, maxWidth, 'desktop');
      console.log("vizOptions", vizOptions);

    }

  
  // on window 'resize' event, get current width, load phone or desktop then scale 
  window.addEventListener('resize', () => {

    console.log("screen size is changing");
    console.log("mediaQuery.matches", mediaQuery.matches);
    
    currentWidth = vizDiv.offsetWidth;
    console.log("currentWidth--> " + currentWidth);
    
    
    if (mediaQuery.matches) {

      // if device change (from desktop to phone), load 'phone' version and scale
      if (vizOptions.device === 'desktop') {

        vizOptions.device = 'phone';

        // if a viz object exists, destroy it, then initialize new one
        if (viz != undefined) {
          viz.dispose();

        }
        initializeViz(vizDiv, vizUrl, vizOptions);
        console.log("vizOptions", vizOptions);
        scaleViz(currentWidth, maxWidth, 'phone');

        // if no device chang, then just scale
      } else {
        scaleViz(currentWidth, maxWidth, 'phone');
      }


    } else {

      // if device change (from phone to desktop), load 'desktop' version and scale
      if (vizOptions.device === 'phone') {

        vizOptions.device = 'desktop';

        // if a viz object exists, destroy it, then initialize new one
        if (viz != undefined) {
          viz.dispose();

        }
        initializeViz(vizDiv, vizUrl, vizOptions);
        console.log("vizOptions", vizOptions);
        scaleViz(currentWidth, maxWidth, 'desktop');

        // if no device chang, then just scale
      } else {
        scaleViz(currentWidth, maxWidth, 'desktop');
      }

    }

    
  });



});

// viz object initialization
function initializeViz(vizDiv, vizUrl, vizOptions) {
  console.log("url:", vizUrl);
  viz = new tableau.Viz(vizDiv, vizUrl, vizOptions);
}

// onFirstInteractive callback function
function defaultOnFirstInteractive(v) {
  viz = v.getViz();
  activeWorkbook = viz.getWorkbook();
  activeSheet = activeWorkbook.getActiveSheet();
  activeSheetName = activeSheet.getName();

}



function scaleViz(currentWidth, maxWidth, deviceType) {
 

  // sets the origin to scale from
  vizDiv.style.transformOrigin = 'left top';

  // simple scaling factor
  // e.g. if currentWidth = 900 and maxWidth = 1200, scaling factor is .75 
  scalingFactor = currentWidth / maxWidth;
  
  
  // caps scaling factor so it only scales down; does not scale up (increase size of viz)
  if (scalingFactor > 1) {
    scalingFactor = 1;
  }

  // scaling is essentially disabled for mobile; will always be 1
  if (deviceType === 'phone') {
    scalingFactor = 1;
  }

  // scale the viz using the scalingFactor derived above
  vizDiv.style.transform = "scale(" + scalingFactor + ")";
  
}