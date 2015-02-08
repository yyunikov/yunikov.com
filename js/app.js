(function(exports) {
var appBar = null;

function replaceScriptTagWithRunnableScript(node) {
  var script  = document.createElement('script');
  script.text = node.innerHTML;
  node.parentNode.replaceChild(script, node);
}

/**
 * Replaces the main content of the page by loading the URL via XHR.
 *
 * @param {string} url The URL of the page to load.
 * @param {boolean} opt_addToHistory If true, the URL is added to the browser's
 *     history.
 */
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

    var doc = e.target.response;

    document.title = doc.title;

    // Update URL history now that title and URL are set.
    var addToHistory = opt_addToHistory == undefined ? true : opt_addToHistory;
    if (addToHistory) {
      history.pushState({url: url}, doc.title, url);
    }

    var docAppBar = doc.querySelector('app-layout');
    if (docAppBar) {
      appBar.innerHTML = docAppBar.innerHTML;
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

  };

  xhr.send();
}

function ajaxifySite() {

  document.addEventListener('click', function(e) {
    // Allow users to open new tabs.
    if (e.metaKey || e.ctrlKey || e.which == 2) {
      return;
    }

    // Inject page if <a> was in the event path and matches ajax criteria:
    // - was relative link and not javascript:
    // - not a #hash link within the same page
    // - is not going to a non-ajaxable page (index.html, apps, components, etc.)
    // - was not targeted at a new window
    for (var i = 0; i < e.path.length; ++i) {
      var el = e.path[i];
      if (el.localName == 'a') {
        wasRelativeAnchorClick = !!el.hash;
        if (!el.getAttribute('href').match(/^(https?:|javascript:|\/\/)/) &&
            (location.origin == el.origin) &&
            !(el.hash && (el.pathname == location.pathname)) &&
            (el.pathname.indexOf('/apps') != 0) &&
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
  // TODO(ericbidelman): Hacky solution to get anchors scrolled to correct location
  // in page. Layout of page happens later than the browser wants to scroll.
  if (location.hash) {
    window.setTimeout(function() {
      var scrollTargetEl = document.querySelector(location.hash);
      scrollTargetEl && scrollTargetEl.scrollIntoView(true, {behavior: 'smooth'});
    }, 200);
  }

});


document.addEventListener('DOMContentLoaded', function(e) {
  appBar = document.querySelector('app-layout');
    ajaxifySite();

    // Insure add current page to history so back button has an URL for popstate.
    history.pushState({url: document.location.href}, document.title,
                      document.location.href);
});

})(window);