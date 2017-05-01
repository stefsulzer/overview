// MAIN OVERVIEW FUNCTIONALITY:
/*
Inject stylesheet, hideContent, AddWells, handleClicks,
unhideSection, removeOverview
*/

/* Missing: Case where title is not a sibling to content!
          How to test for case?
         find first header that is sibling to content, under title
         find previousElementSibling and removeAttribute('hidden')
           repeat until find header or previousElementSibling === null */

(function() {
  let content = 'p, img, pre, ul, ol';
  let headers = 'h1, h2, h3, h4, h5, h6';
  let overview = 'uniqueVariableTogglingOverview';
  let handleClicks = 'uniqueVariableStoringListener';
  if (!window[overview]) {
    let log = console.log;
    window[overview] = true;
    addStyle();
    function addStyle() {
      let style = document.createElement('style');
      style.setAttribute('overviewStyle', 'text/css');
      style.setAttribute('type', 'text/css');
      style.setAttribute('style', 'display: none');
      style.innerHTML = `
        .overview-well {
        background-color: #f5f5f5;
        border: 1px solid #030303;
        border-radius: 3px;
        letter-spacing: 1px;
        padding: 19px;
        }`;
      document.body.appendChild(style);
    }
    hideContent();
    function hideContent() {
      let collection = document.querySelectorAll(content);
      for (let i in Object.keys(collection)) {
        collection[i].setAttribute('hidden', 'true');
      }
    }
    addWells();
    function addWells() {
      let collection = document.querySelectorAll(headers);
        for (let i in Object.keys(collection)) {
        collection[i].className += ' overview-well';
        collection[i].setAttribute('hiddingSection', 'true');
      }
    }
    window[handleClicks] = function(e) {
      if (e.target.matches(headers)) {
        toggleSection();
      }
      else if (e.target.parentElement
               && e.target.parentElement.matches(headers)){
        toggleSection(e.target.parentElement.nextElementSibling);
      } else if (e.target.parentElement.previousSiblingElement
                 && e.target.parentElement.previousSiblingElement.matches(headers)) {
        toggleSection(e.target.parentElement.firstElementChild);
      }
      function toggleSection(point){
        let toggle = 'unhide';
        point = point || e.target.nextElementSibling;
        if (point.previousElementSibling && point.previousElementSibling.matches(headers)) {
          let header = point.previousElementSibling;
          toggle = alternateToggle(header, toggle);
        } else if (point.parentElement.previousSiblingElement && point.parentElement.previousSiblingElement.matches(headers)) {
          let header = point.parentElement.previousSiblingElement;
          toggle = alternateToggle(header, toggle);
        }
        if (!point) { return; }
        while (!point.matches(headers)) {
          if (point.matches(content)) {
            toggle === 'unhide' ?
              point.removeAttribute('hidden') : point.setAttribute('hidden', 'true');
          }
          if (point.querySelectorAll(content).length > 0) {
            toggle === 'unhide' ?
              unhide(point.querySelectorAll(content)) : hide(point.querySelectorAll(content));
          }
          point = point.nextElementSibling;
          if (!point) { return; }
        }
      }
      function unhide(collection) {
        for (let idx in Object.keys(collection)) {
          collection[idx].removeAttribute('hidden');
        }
      }
      function hide(collection) {
        for (let idx in Object.keys(collection)) {
          collection[idx].setAttribute('hidden', 'true');
        }
      }
      function alternateToggle(header, toggle) {
        if (header.hasAttribute('hiddingSection')) {
          toggle = 'unhide';
          header.removeAttribute('hiddingSection');
        } else {
          toggle = 'hide';
          header.setAttribute('hiddingSection', 'true');
        }
        return toggle;
      }
    };
    document.body.addEventListener('click', window[handleClicks]);
  }
  else {
    removeOverview();
    function removeOverview() {
      delete window[overview];
      document.body.removeEventListener('click', window[handleClicks]);
      delete window[handleClicks];
      removeWells();
      function removeWells() {
        let collection = document.querySelectorAll(headers);
          for (let i in Object.keys(collection)) {
          collection[i].classList.remove('overview-well');
          if (collection[i].hasAttribute('hiddingSection')) {
            collection[i].removeAttribute('hiddingSection');
          }
        }
      }
      unhideAll();
      function unhideAll() {
        let hiddenCollection = document.querySelectorAll('[hidden=true]');
        for (let idx in Object.keys(hiddenCollection)) {
          hiddenCollection[idx].removeAttribute('hidden');
        }
      }
      removeStyle();
      function removeStyle() {
        let styleScript = document.querySelector(
          'style[overviewStyle="text/css"]');
        document.body.removeChild(styleScript);
      }
    }
  }
})()
