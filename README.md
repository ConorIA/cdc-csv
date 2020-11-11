# CDC CSV Exporter

This is a script that can be called from a bookmarklet to export Crypto.com Exchange transaction history. 

Use this line of code as the URL for your bookmarklet.

```javascript
javascript:(function()%7Bfunction%20callback()%7Bwindow.cdc()%7Dvar%20s%3Ddocument.createElement(%22script%22)%3Bs.src%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FConorIA%2Fcdc-csv%40master%2Fcdc.js%22%3Bif(s.addEventListener)%7Bs.addEventListener(%22load%22%2Ccallback%2Cfalse)%7Delse%20if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```

The bookmarklet will load and run [`cdc.js`](https://gitlab.com/PXoYV1wbDJwtz5vf/cdc-csv/-/blob/master/cdc.js)

The bookmarklet was created with MrColes [Bookmarklet Creator with Script Includer](https://mrcoles.com/bookmarklet/).
