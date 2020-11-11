# CDC CSV Exporter

This is a script to use as a bookmarklet. 

Use this for your bookmarklet. Thanks to [Mr Coles](https://mrcoles.com/bookmarklet/).

```javascript
javascript:(function()%7Bfunction%20callback()%7Bwindow.cdc()%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FConorIA%2Fcdc-csv%40master%2Fcdc.min.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```

The code above is equivalent to: 

```javascript
(function() {
  function callback() {
    window.cdc()
  }
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/gh/ConorIA/cdc-csv@master/cdc.min.js";
  if (s.addEventListener) {
    s.addEventListener("load", callback, false)
  } else if (s.readyState) {
    s.onreadystatechange = callback
  }
  document.body.appendChild(s);
})()
```