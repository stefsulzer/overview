(function() {
  let content = 'p, img, pre, ul, ol';
  let headers = 'h1, h2, h3, h4, h5, h6';
  let overview = 'uniqueVariableTogglingOverview';
  if (window.uniqueVariableTogglingOverview === undefined) {
    window.uniqueVariableTogglingOverview = false;
  }
  if (!window[overview]) {
    let log = console.log;
    window[overview] = true;
    addFlatly();
    function addFlatly() {
      if (!document.querySelector('link[href="https://bootswatch.com/flatly/bootstrap.min.css"]')) {
        let script = document.createElement('link');
        script.setAttribute('rel', 'stylesheet');
        script.setAttribute('href', 'https://bootswatch.com/flatly/bootstrap.min.css');
        document.body.appendChild(script);
      }
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
        collection[i].className += ' well overviewWell';
        collection[i].setAttribute('hiddingSection', 'true');
      }
    }
    document.getElementsByTagName('body')[0].addEventListener('click', handleClicks);
    function handleClicks(e){
      if (e.target.matches(headers)) {
        toggleSection();
      }
      else if (e.target.parentElement.matches(headers)){
        toggleSection(e.target.parentElement.nextElementSibling);
      } else {
      }

      function toggleSection(point){
        let toggle = 'unhide';
        point = point || e.target.nextElementSibling;
        if (point.previousElementSibling === null) {
        }
        if (point.previousElementSibling && point.previousElementSibling.matches(headers)) {
          let header = point.previousElementSibling;
          if (header.hasAttribute('hiddingSection')) {
            toggle = 'unhide';
            header.removeAttribute('hiddingSection');
          } else {
            toggle = 'hide';
            header.setAttribute('hiddingSection', 'true');
          }
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
    }
  }
  else {
    let overview = 'uniqueVariableTogglingOverview';
    window[overview] = undefined;
    removeOverview();
    function removeOverview() {
      removeWells();
      function removeWells() {
        let collection = document.querySelectorAll(headers);
          for (let i in Object.keys(collection)) {
          collection[i].classList.remove('well');
          collection[i].classList.remove('overviewWell');
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
      removeFlatly();
      function removeFlatly() {
        let stylesheet = document.querySelector(
          'link[href="https://bootswatch.com/flatly/bootstrap.min.css"]');
        document.body.removeChild(stylesheet);
      }
    }
  }
})()
