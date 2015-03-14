(function(exports) {
var FADE_DURATION = 400;
var appLayout = null;
var menuItemMap = {
  'resume' : 0,
  'portfolio' : 1,
  'applications' : 2,
  'blog' : 3
};

function fadeInContent(content, callback) {
    var player = content.animate([
        {opacity: 0.0, transform: "scale(0.5)"},
        {opacity: 1.0, transform: "scale(1)"}
    ], {
        direction: 'alternate',
        duration: FADE_DURATION,
        iterations: 1
    });

    if (typeof callback === "function") {
      setTimeout(function(){
        callback();
      }, FADE_DURATION - 100);
    }
}

function fadeOutContent(content, callback) {
    var player = content.animate([
        {opacity: 1.0, transform: "scale(1)"},
        {opacity: 0.0, transform: "scale(0.5)"}
    ], {
        direction: 'alternate',
        duration: FADE_DURATION,
        iterations: 1
    });

    if (typeof callback === "function") {
      setTimeout(function(){
        callback();
      }, FADE_DURATION - 100);
    }
}

function getDocumentDescription(document){
  var metas = document.getElementsByTagName('meta');
  for(var i=0;i<metas.length;i++){
    if (metas[i].getAttribute('name')) {
      if(metas[i].getAttribute('name').toLowerCase() == 'description'){
        return metas[i].getAttribute('content');
      }
    }
  }
  return null;
}

function setDocumentDescription(document, description){
  var metas = document.getElementsByTagName('meta');
  for(var i=0;i<metas.length;i++){
    if (metas[i].getAttribute('name')) {
      if(metas[i].getAttribute('name').toLowerCase() == 'description'){
        metas[i].content = description;
      }
    }
  }
}

function replaceScriptTagWithRunnableScript(node) {
  var script  = document.createElement('script');
  script.text = node.innerHTML;
  node.parentNode.replaceChild(script, node);
}

function selectAppLayoutMenuItem(appLayout, url) {
      $.map(menuItemMap, function(value, key) {
      if (url.indexOf(key) > -1) {
        appLayout.menuItem = value;
      }
    });
}

function injectPage(url, opt_addToHistory) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'document';
  xhr.overrideMimeType("text/html; charset=utf-8");
  xhr.onloadend = function(e) {
    if (e.target.status != 200) {
      console.error('Page fetch error', e.target.status, e.target.statusText);
      return;
    }

    fadeOutContent(document.querySelector('.content-container'), function(){
      var doc = e.target.response;

      document.title = doc.title;
      setDocumentDescription(document, getDocumentDescription(doc));


      // Update URL history now that title and URL are set.
      var addToHistory = opt_addToHistory == undefined ? true : opt_addToHistory;
      if (addToHistory) {
        history.pushState({url: url}, doc.title, url);
      }

      var docAppLayout = doc.querySelector('app-layout');

      selectAppLayoutMenuItem(appLayout, url);

      if (docAppLayout) {
        appLayout.innerHTML = docAppLayout.innerHTML;
      } else {
        location.href = url;
        return;
      }

      var CONTAINER_SELECTOR = '.content-container';
      var container = document.querySelector(CONTAINER_SELECTOR);
      var newDocContainer = doc.querySelector(CONTAINER_SELECTOR);
      container.innerHTML = newDocContainer.innerHTML;

      // .innerHTML doesn't eval script. Replace <script> in-page with runnable version.
      var scripts = container.querySelectorAll('script');
      Array.prototype.forEach.call(scripts, function(node, i) {
        replaceScriptTagWithRunnableScript(node);
      });
     
      fadeInContent(document.querySelector('.content-container'));
    });
  };

  xhr.send();    
}

function ajaxifySite() {
  document.addEventListener('click', function(e) {
    // Allow users to open new tabs.
    if (e.metaKey || e.ctrlKey || e.which == 2) {
      return;
    }

    for (var i = 0; i < e.path.length; ++i) {
      var el = e.path[i];
      if (el.localName == 'a') {
        wasRelativeAnchorClick = !!el.hash;
        if (!el.getAttribute('href').match(/^(https?:|javascript:|\/\/)/) &&
            (location.origin == el.origin) &&
            !(el.hash && (el.pathname == location.pathname)) &&
            (el.pathname.indexOf('/components') != 0) &&
            el.target == '') {
          injectPage(el.href);
          e.preventDefault();
          e.stopPropagation();
        }

        return;
      }
    }
  });

  exports.addEventListener('popstate', function(e) {
    Polymer.whenReady(function() {
      if (e.state && e.state.url) {
        injectPage(e.state.url, false);
      } else if (!wasRelativeAnchorClick && history.state) {
        history.back();
      }
    });
  });

}
document.addEventListener('polymer-ready', function(e) {
  fadeInContent(document.querySelector('.content-container'));
});

document.addEventListener('DOMContentLoaded', function(e) {
  appLayout = document.querySelector('app-layout');

  selectAppLayoutMenuItem(appLayout, document.URL);

  ajaxifySite();

  // Insure add current page to history so back button has an URL for popstate.
  history.pushState({url: document.location.href}, document.title,
                    document.location.href);
});

})(window);