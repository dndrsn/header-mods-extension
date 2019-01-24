/* global chrome */


const filter = { urls: [ '<all_urls>' ] };

const opt_extraInfoSpec = [ 'blocking', 'responseHeaders' ];


const updateResponseHeaders = responseDetails => {

  const { url, responseHeaders } = responseDetails;

  // force URLs that end in .json but have other "application" type content-types to json content-type
  if(url.match(/\.json$/)) {
    const contentTypeHeader = responseHeaders.find(header => header.name.toLowerCase() === 'content-type');
    if(contentTypeHeader) {
      if(!contentTypeHeader.value || contentTypeHeader.value.startsWith('application/')) {
        contentTypeHeader.value = 'application/json';
      }
    }
    else {
      responseHeaders.push({ name: 'content-type', value: 'application/json'});
    }
  }

  return {
    responseHeaders: responseHeaders,
  };
};


chrome.webRequest.onHeadersReceived.addListener(updateResponseHeaders, filter, opt_extraInfoSpec);

