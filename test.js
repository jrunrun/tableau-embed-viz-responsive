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

// code to run after DOM is ready
$(document).ready(function() {

  // mediaQueryString is string representing the media query to parse.
  mediaQueryString = "(max-width: 400px)";

  // matchMedia() method returns results of the specified media query string.
  var mediaQuery = window.matchMedia(mediaQueryString);
  console.log("mediaQuery.matches", mediaQuery.matches);

  // at initial page load, check media query
  if (mediaQuery.matches) {

    // set phone device specific properties in vizOptions (height, width, device)
    // vizOptions.width = '375px';
    // vizOptions.height = '812px';
    vizOptions.device = 'phone';
    initializeViz(vizDiv, vizUrl, vizOptions);
    console.log("vizOptions", vizOptions);

    var iframe = document.querySelectorAll('iframe')[0];
    var widthPx = iframe.clientWidth + "px";
    var heightPx = iframe.clientHeight + "px";
    console.log("Current iframe width @ initial load: " + widthPx);
    console.log("Current iframe height @ initial load: " + widthPx);

  } else {

    // set desktop device specific properties in vizOptions (height, width, device)
    // vizOptions.width = '800px';
    // vizOptions.height = '800px';
    vizOptions.device = 'desktop';
    initializeViz(vizDiv, vizUrl, vizOptions);
    console.log("vizOptions", vizOptions);

    var iframe = document.querySelectorAll('iframe')[0];
    var widthPx = iframe.clientWidth + "px";
    var heightPx = iframe.clientHeight + "px";
    console.log("Current iframe width @ initial load: " + widthPx);
    console.log("Current iframe height @ initial load: " + widthPx);

  }

  // after initial page load, leverage event listener added to media query
  mediaQuery.addListener(function(e) {

    if (e.matches) {

      // set phone device specific properties in vizOptions (height, width, device)
      // vizOptions.width = '375px';
      // vizOptions.height = '812px';
      vizOptions.device = 'phone';

      // Destroy existing viz object, then initialize new one
      viz.dispose();
      initializeViz(vizDiv, vizUrl, vizOptions);
      console.log("vizOptions", vizOptions);

    } else {

      // set desktop device specific properties in vizOptions (height, width, device)
      // vizOptions.width = '800px';
      // vizOptions.height = '800px';
      vizOptions.device = 'desktop';

      // Destroy existing viz object, then initialize new one
      viz.dispose();
      initializeViz(vizDiv, vizUrl, vizOptions);
      console.log("vizOptions", vizOptions);

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

  var iframe = document.querySelectorAll('iframe')[0];
  var widthPx = iframe.clientWidth + "px";
  var heightPx = iframe.clientHeight + "px";
  console.log("Current iframe width @ onFirstInteractive: " + widthPx);
  console.log("Current iframe height @ onFirstInteractive: " + widthPx);

}

//
// /*
//  * Viz resizing algorithm - based on TabScale
//  */
// function resizeVizContainerDiv(VizResizeEvent) {
//
//   // Get sheet size
//   var size = VizResizeEvent.getVizSize().sheetSize;
//   //console.log(size);
//   // Get the iframe size for Viz (note -- only for 1 viz in a page)
//   var iframe = document.querySelectorAll('iframe')[0];
//   //console.log(iframe);
//
//   if (size.behavior == 'automatic' || vizOptions.device == 'phone') {
//     // If automatic, then get iframe size
//     // console.log('Automatically sized viz');
//     var maxSize = size.maxSize;
//     var minSize = size.minSize;
//     console.log("@ line 136");
//     console.log("Reported viz width: " + maxSize.width);
//     console.log("Reported viz height: " + maxSize.height);
//     var widthPx = iframe.clientWidth + "px";
//     var heightPx = iframe.clientHeight + "px";
//     console.log("@ line 136");
//     console.log("Current iframe width: " + widthPx);
//     console.log("Current iframe height: " + widthPx);
//   }
//
//   // else {
//   //   // If not automatic, theng get max and min from viz
//   //   var maxSize = size.maxSize;
//   //   var minSize = size.minSize;
//   //   console.log("@ line 143");
//   //   console.log("Reported viz width: " + maxSize.width);
//   //   console.log("Reported viz height: " + maxSize.height);
//   //   var widthPx = maxSize.width + "px";
//   //   var heightPx = maxSize.height + "px";
//   //   console.log("@ line 148");
//   //   console.log("New iframe width: " + widthPx);
//   //   console.log("New iframe height: " + heightPx);
//   //   iframe.style.width = widthPx;
//   //   iframe.style.height = heightPx;
//   // }
//
//   //console.log(iframe);
//
//
//   // vizDiv.style.width = widthPx;
//   // vizDiv.style.height = heightPx;
//
//
//   //console.log(vizDiv);
//   //console.log('Resizing finished');
//
//   // Scale it to match the viewport
//   scaleViz();
//
//   // Set the resizing event after the first time it's been scaled
//   window.addEventListener('resize', scaleViz);
// }
//
// function scaleViz() {
//   console.log('Rescaling the viz');
//   var iframe = document.querySelectorAll('iframe')[0];
//   var vizDiv = document.getElementById("tableauViz");
//
//   // Height Logic
//   // This is the size of the window
//   var browserHeight = document.documentElement.clientHeight;
//   console.log("browserHeight:", browserHeight);
//   console.log("iframe height:", iframe.clientHeight);
//   // Our site has a consistently sized toolbar to account for in Height
//   // var toolbarHeight = document.getElementById('header').clientHeight;
//   // Additional margin accounts for lower boundary / padding/margin
//   // var additionalHeightMargin = 75;
//
//   // var effectiveHeight = browserHeight - toolbarHeight - additionalHeightMargin;
//   var effectiveHeight = browserHeight;
//
//   //console.log("There's about this much height for a viz: " + effectiveHeight);
//   var vizScaleToWindowHeight = iframe.clientHeight / effectiveHeight;
//   console.log("vizScaleToWindowHeight", vizScaleToWindowHeight);
//
//   console.log('Scale factor of the viz to the available space based on height ' + vizScaleToWindowHeight);
//
//   // Width Logic
//   var browserWidth = document.documentElement.clientWidth;
//   console.log("browserWidth:", browserWidth);
//   console.log("iframe width:", iframe.clientWidth);
//   // Sidebar takes up space
//   // var sidebarWidth = document.getElementById('sidebar-visible').clientWidth;
//   // var additionalWidthMargin = 50;
//
//   // var effectiveWidth = browserWidth - sidebarWidth - additionalWidthMargin;
//   var effectiveWidth = browserWidth;
//
//   //console.log("There's about this much width for a viz: " + effectiveWidth);
//   // Is the viz Width larger than the viewport?
//   var vizScaleToWindowWidth = iframe.clientWidth / effectiveWidth;
//   console.log("vizScaleToWindowWidth", vizScaleToWindowWidth);
//
//   console.log('Scale factor of the viz to the available space based on width ' + vizScaleToWindowWidth);
//
//   // Use the smaller scale factor
//   var vizScaleToWindow = vizScaleToWindowHeight;
//   if (vizScaleToWindowWidth > vizScaleToWindowHeight) {
//     vizScaleToWindow = vizScaleToWindowWidth;
//   }
//
//   var flipScale = 1 / vizScaleToWindow;
//   console.log("device:", vizOptions.device);
//   console.log("flipScale", flipScale);
//   //console.log("Now rescaling the whole thing");
//   vizDiv.style.transform = "scale(" + flipScale + ")";
//   vizDiv.style.transformOrigin = 'left top';
// }