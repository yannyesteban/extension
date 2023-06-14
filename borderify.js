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
chrome.runtime.sendMessage(ChromeExtId, {hello: 1});


chrome.runtime.onMessage.addListener((request) => {
    console.log("Message from the background script:");
    console.log(request.greeting);
    return Promise.resolve({ response: "Hi from content script" });
  });