// MAIN OVERVIEW FUNCTIONALITY:
/*
Inject stylesheet, hideContentAddWells, handleClicks,
unhideSection.
TO COME: REVERT????
*/
(function() {
  let content = 'p, img, pre, ul, ol';
  let headers = 'h1, h2, h3, h4, h5, h6';
  let log = console.log;
  addCerulean();
  function addCerulean() {
    let script = document.createElement('script');
    script.setAttribute('src', 'https://bootswatch.com/cerulean/bootstrap.min.css');
    document.body.appendChild(script);
  }
  hideContent();
  function hideContent() {
    let collection = document.querySelectorAll(content);
    for (let i in Object.keys(collection)) {
      collection[i].setAttribute('hidden', 'true');
    }
  }
  document.getElementsByTagName('body')[0].addEventListener('click', handleClicks);
  function handleClicks(e){
    if (e.target.matches(headers)) {
      unhideSection();
    }
    else {
      // move up until find header? catchall of hitting body?
      // find next header
      // find previousElementSibling and removeAttribute('hidden')
        // repeat until find header or previousElementSibling === null
    }
    function unhideSection(){
      /*
        if no next sibling return OR! GO up and look?
        if next sibling has no content,
        move on until there is content
        unhide collection in sibling,
        else reached end of document
          where point is null and do nothing */
      let point = e.target.nextElementSibling;
      if (!point) { return; }
      while (!point.matches(headers)) {
        if (point.matches(content)) {
          point.removeAttribute('hidden');
        }
        if (point.querySelectorAll(content).length > 0) {
          unhide(point.querySelectorAll(content));
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
  }
})()
