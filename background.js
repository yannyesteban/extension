function listener(details) {
  console.log(details, ".......")
 
}

function onGot(tabInfo) {
  console.log(tabInfo);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

const gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGot, onError);


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.hello) {
      console.log('hello received');
    }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {


    chrome.runtime.sendMessage({ msg: "Fill elements", data:888 }, (response) => {
      // response will be received from the background script, but originally sent by filler.js
      if (response) {
        console.log("XXXXXXX")
        // do cool things with the response
        // ...
      }
  });
    var tmp = "ONE...";
  
    let filter = browser.webRequest.filterResponseData(details.requestId);
    var decoder = new TextDecoder("utf-8");
    var encoder = new TextEncoder();
    filter.ondata = event => {

      let str = decoder.decode(event.data, {stream: true});
    // Just change any instance of Example in the HTTP response
    // to WebExtension Example.
    //str = str.replace(/Example/g, 'WebExtension Example');
    filter.write(encoder.encode(str));
    //filter.disconnect();
    filter.onstop = event => {
      //console.log('komplete ' + tmp);
      filter.disconnect();
    };
      /*var str = decoder.decode(event.data, {stream: true});
      console.log('part ' + str);
      filter.write(encoder.encode(str));
      filter.onstop = event => {
        console.log('komplete ' + tmp);
        filter.disconnect();
      };
      tmp = tmp + str;*/
      tmp = str
    };
  

    //console.log(tmp)
    console.log(details, browser.runtime.getURL("a.jpg"))
    return{}
    //return { redirectUrl: browser.runtime.getURL("a.jpg") ,cancel:true};
},
  {urls: ["<all_urls>"], types: ["script", "xmlhttprequest", "main_frame"]},
  ["blocking", "requestBody"]
);
