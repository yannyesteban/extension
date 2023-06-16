let info = {
  json: null,
  stagex: {
    d: 5,
  },
};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {

    let message = "";
    let sc = "null";
    

    if (details.url != "https://nadlan.taxes.gov.il/svinfonadlan2010/InfoNadlanPerutWithMap.aspx/GetPoints") {
      return;
    }

    

    

    
    

    let formData = details.requestBody;
    //console.log("------------>", formData)

    let filter = chrome.webRequest.filterResponseData(details.requestId);
    var decoder = new TextDecoder("utf-8");
    var encoder = new TextEncoder();
   
    let str = ""

    filter.ondata = (event) => {

      message = ""+decoder.decode(event.data, { stream: true });
      str +=  message;
      
      filter.write(encoder.encode(message));

      console.log(message)
      
      filter.disconnect();
      //filter.close();

      
    };

    filter.onstop = (event) => {
      filter.close();
    };

    console.log(details.url);
    console.log(details);


    console.log("xxxxxxxxxxxxxxxx\nxxxxxxxxxxxx\n\n", str.substring(0, 20), message)


    info.json = message;
    
    chrome.tabs.query(
      {
        //active: true,
        url: "https://nadlan.taxes.gov.il/*",
        currentWindow: true,
      },
      (tabs) => {
        console.log(tabs);
        chrome.tabs.sendMessage(


          tabs[0].id,
          {
            sc,
            jscript: message,
            tabs: tabs[0],
          },
          function (response) {

            console.log("response", response)
          }
        );
      }
    );
    
    return {};
    // return { redirectUrl: browser.runtime.getURL("a.jpg") ,cancel:true};
  },
  {
    urls: ["<all_urls>"],
    types: ["script", "xmlhttprequest", "main_frame", "object"],
  },
  ["blocking", "requestBody"]
);






const user = {
  username: "demo-user",
};
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(info);
  // 2. A page requested user data, respond with a copy of `user`
  if (message === "get-user-data") {
    sendResponse(user);
  }

  if (message["type"] == "new") {
    info[message["name"]] = message["data"];
    sendResponse(info[message["name"]]);
  }

  if (message["type"] == "get") {
    console.log("....", info[message["name"]]);
    sendResponse(info[message["name"]]);
  }
});

var contextItemProperties = {};
contextItemProperties.id = "test2023";
contextItemProperties.title = "context menu item";
chrome.contextMenus.create(contextItemProperties);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("WAITING");
  if (request.msg == "Fill elements") {
    console.log("HEEEEEELO");
  }
  return true;
});
function listener(details) {
  console.log(details, ".......");
}

function onGot(tabInfo) {
  console.log(tabInfo);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

const gettingCurrent = browser.tabs.getCurrent();
gettingCurrent.then(onGot, onError);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.hello) {
    console.log("hello received");
  }
});

function loga(data) {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          upps: data,
        },
        function (response) { }
      );
    }
  );
}





