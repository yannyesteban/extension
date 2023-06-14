console.log("Background")
chrome.runtime.sendMessage('get-user-data', (response) => { // 3. Got an asynchronous response with the data from the service worker
    console.log('received user data', response);
    // initializeUI(response);
});

/*
chrome.runtime.onMessage.addListener((request) => {
    console.log("Message from the background script:");
    console.log(request);
    console.log("NNNNNNNNNNNNNNN")
    if (request.sc == "ok") {
        console.log("SSSSSSSSSSSSS")
        let dlAnchorElem = document.createElement("a");
        //a.id = "downloadAnchorElem"
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JSON.parse(request.jscript)));
        //var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
        console.log("ZZZZZZZZZZZZ")
    }


    return Promise.resolve({response: "Hi from content script"});
});
*/

/*
var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {

  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    chrome.runtime.sendMessage({hello: 1});
  }
}, false);

document.body.style.border = "10px dotted red";
console.log("WAITING...")
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("WAITING")
    if (request.msg == "Fill elements") {
        console.log("HEEEEEELO")
    }
    return true;
})
chrome.runtime.sendMessage({hello: 1});


chrome.runtime.onMessage.addListener((request) => {
    console.log("Message from the background script:");
    console.log(request.greeting);
    return Promise.resolve({ response: "Hi from content script" });
  });*/
