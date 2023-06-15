let info = {
  stagex: {
    d: 5,
  },
};

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
let message = "A";
let sc = "null";



chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    /*chrome.tabs.query({
    active: true,
    currentWindow: true
}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        action: "open_dialog_box"
    }, function (response) {});
});
*/
if(details.url!="https://nadlan.taxes.gov.il/svinfonadlan2010/InfoNadlanPerutWithMap.aspx/GetPoints"){
        //filter.disconnect();
        //return {redirectUrl: details.url};
        return;
      }
    

    if (!details.url.includes("InfoNadlanPerutWithMap")) {
      //return;
    }

    console.log(details);
    //
    this.message = "NOTHINGGGGG";

    let tmp = "ONE...";

    sc = "ok";
    let str = "200000000000005";

    let formData = details.requestBody;
    //console.log("------------>", formData)

    let filter = chrome.webRequest.filterResponseData(details.requestId);
    var decoder = new TextDecoder("utf-8");
    var encoder = new TextEncoder();
    let x = {
      a: 1,
    };

    
    filter.ondata = (event) => {

      
      str = decoder.decode(event.data, { stream: true });
      message = "" + str;
      // Just change any instance of Example in the HTTP response
      // to WebExtension Example.
      // str = str.replace(/Example/g, 'WebExtension Example');
      filter.write(encoder.encode(str));

      //loga(str)
      //console.log(str)

      x.result = str;
      tmp = str.toString();
      filter.disconnect();
      //filter.close();

      /*filter.onstop = event => {
  //console.log('komplete ' + tmp);

  filter.disconnect();
};


/*
/*var str = decoder.decode(event.data, {stream: true});
console.log('part ' + str);
filter.write(encoder.encode(str));
filter.onstop = event => {
  console.log('komplete ' + tmp);
  filter.disconnect();
};
tmp = tmp + str;*/
    };

    filter.onstop = (event) => {
      filter.close();
    };
    console.log("xxxxxxxxxxxxxxxx\nxxxxxxxxxxxx\n\n", message)

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            sc,
            jscript: message,
            tabs: tabs[0],
          },
          function (response) { }
        );
      }
    );
    //onsole.log(details, browser.runtime.getURL("a.jpg"))
    return {};
    // return { redirectUrl: browser.runtime.getURL("a.jpg") ,cancel:true};
  },
  {
    urls: ["<all_urls>"],
    types: ["script", "xmlhttprequest", "main_frame", "object"],
  },
  ["blocking", "requestBody"]
);
