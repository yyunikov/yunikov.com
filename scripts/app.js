(function(document) {
  'use strict';

  var app = document.querySelector('#app');

  app.addEventListener('dom-change', function() {
    console.log('Dom change event');
  });

  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  window.addEventListener('WebComponentsReady', function() {

  // We use Page.js for routing. This is a Micro
  // client-side router inspired by the Express router
  // More info: https://visionmedia.github.io/page.js/

  // Middleware
  function scrollToTop(ctx, next) {
    app.scrollPageToTop();
    next();
  }

  // Routes
  page('/', scrollToTop, function() {
    app.route = 'home';
  });

  page('/users', scrollToTop, function() {
    app.route = 'users';
  });

  page('/users/:name', scrollToTop, function(data) {
    app.route = 'user-info';
    app.params = data.params;
  });

  page('/contact', scrollToTop, function() {
    app.route = 'contact';
  });

  // add #! before urls
  page({
    hashbang: true
  });

});

  addEventListener('paper-header-transform', function(e) {
    var appName = document.querySelector('#mainToolbar .app-name');
    var middleContainer = document.querySelector('#mainToolbar .middle-container');
    var bottomContainer = document.querySelector('#mainToolbar .bottom-container');
    var detail = e.detail;
    var heightDiff = detail.height - detail.condensedHeight;
    var yRatio = Math.min(1, detail.y / heightDiff);
    var maxMiddleScale = 0.50;  // appName max size when condensed. The smaller the number the smaller the condensed size.
    var scaleMiddle = Math.max(maxMiddleScale, (heightDiff - detail.y) / (heightDiff / (1-maxMiddleScale))  + maxMiddleScale);
    var scaleBottom = 1 - yRatio;

    Polymer.Base.transform('translate3d(0,' + yRatio * 100 + '%,0)', middleContainer);
    Polymer.Base.transform('scale(' + scaleBottom + ') translateZ(0)', bottomContainer);
    Polymer.Base.transform('scale(' + scaleMiddle + ') translateZ(0)', appName);
  });

  app.onDataRouteClick = function() {
    var drawerPanel = document.querySelector('#paperDrawerPanel');
    if (drawerPanel.narrow) {
      drawerPanel.closeDrawer();
    }
  };

  app.scrollPageToTop = function() {
    document.getElementById('mainContainer').scrollTop = 0;
  };

})(document);

  function scrollToTop(ctx, next) {
    app.scrollPageToTop();
    next();
  }

  // Routes
  page('/', scrollToTop, function() {
    app.route = 'home';
  });

  page('/users', scrollToTop, function() {
    app.route = 'users';
  });

  page('/users/:name', scrollToTop, function(data) {
    app.route = 'user-info';
    app.params = data.params;
  });

  page('/contact', scrollToTop, function() {
    app.route = 'contact';
  });

  // add #! before urls
  page({
    hashbang: true
  });