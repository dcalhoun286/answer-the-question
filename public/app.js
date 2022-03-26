'use strict';

const form = document.getElementById('scenario');

/*
  Documentation for future reference for code below: 
    - https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript
    - https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
*/

const sendData = (data) => {
  console.log('Sending data');

  const XHR = new XMLHttpRequest();

  let urlEncodedData = '',
      urlEncodedDataPairs = [],
      name;
  
  for ( name in data ) {
    urlEncodedDataPairs.push( encodeURIComponent( name ) + '=' + encodeURIComponent( data[name] ));
  }

  urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

  XHR.addEventListener( 'load', (event) => {
    alert( 'Success: data sent and response loaded' );
  });

  XHR.addEventListener('error', (event) => {
    alert( 'Something went wrong' );
  });

  XHR.open( 'POST', '/' );

  XHR.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

  XHR.send( urlEncodedData );
};

form.addEventListener( 'submit', (event) => {
  sendData() ;
});
