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
 

  // matchMedia() method returns results of the specified media query string.
  var mediaQuery = window.matchMedia(mediaQueryString);
  // console.log("mediaQuery.matches", mediaQuery.matches);

  if (mediaQuery.matches) {


      vizOptions.device = 'phone';

      // Destroy existing viz object, then initialize new one

      if (viz != undefined) {
        viz.dispose();

      }

      
      initializeViz(vizDiv, vizUrl, vizOptions);
      currentWidth = vizDiv.offsetWidth;
      scaleViz(currentWidth, maxWidth, 'phone');
      console.log("vizOptions", vizOptions);

    } else {

      

      vizOptions.device = 'desktop';

      // Destroy existing viz object, then initialize new one
      if (viz != undefined) {
        viz.dispose();

      }
      initializeViz(vizDiv, vizUrl, vizOptions);
      currentWidth = vizDiv.offsetWidth;
      scaleViz(currentWidth, maxWidth, 'desktop');
      console.log("vizOptions", vizOptions);

    }

  

  window.addEventListener('resize', () => {

    // scaleViz();
    console.log("screen size is changing");
    console.log("mediaQuery.matches", mediaQuery.matches);
    
    currentWidth = vizDiv.offsetWidth;
    console.log("currentWidth--> " + currentWidth);
    
    
    if (mediaQuery.matches) {


      vizOptions.device = 'phone';

      // Destroy existing viz object, then initialize new one

      if (viz != undefined) {
        viz.dispose();

      }

      
      initializeViz(vizDiv, vizUrl, vizOptions);
      console.log("vizOptions", vizOptions);
      scaleViz(currentWidth, maxWidth, 'phone');

    } else {

      if (vizOptions.device === 'phone') {

        vizOptions.device = 'desktop';

        // Destroy existing viz object, then initialize new one
        if (viz != undefined) {
          viz.dispose();

        }
        initializeViz(vizDiv, vizUrl, vizOptions);
        console.log("vizOptions", vizOptions);
      }
      else {
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
 


  vizDiv.style.transformOrigin = 'left top';
  scalingFactor = currentWidth / maxWidth;
  
  
  
  if (scalingFactor > 1) {
    scalingFactor = 1;
  }

  if (deviceType === 'phone') {
    scalingFactor = 1;
  }

  vizDiv.style.transform = "scale(" + scalingFactor + ")";
  
}