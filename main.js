

chrome.runtime.onMessage.addListener((request) => {
    console.log("Message from the background script:");

    return
    if (request.sc == "ok") {
        let query = JSON.parse(request.jscript);

        window.localStorage.setItem("query", JSON.stringify(query));
        console.log(query)
        return;
        console.log(proccessResultsUsingTagResponse(query.d))


        /*let dlAnchorElem = document.createElement("a");
        //a.id = "downloadAnchorElem"
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(JSON.parse(request.jscript)));

        
        //console.log(query, query.d);
        
        
        
        //var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
        console.log("---------")
        */
    }


    return Promise.resolve({ response: "Hi from content script" });
});

let input = {}

input.page = 1;
input.save = false;


if (window.location.href.includes("nadlan.taxes.gov.il/svinfonadlan2010/startpageNadlanNewDesign.aspx")) {
    document.body.style.border = "4px solid yellow";
    stage0.parse();
} else if (window.location.href.includes("nadlan.taxes.gov.il/svinfonadlan2010/InfoNadlanPerutWithMap.aspx")) {
    
    document.body.style.border = "4px solid blue";
    stage1.parse();
} else if (window.location.href.includes("nadlan.taxes.gov.il/svinfonadlan2010/perutOfDira.aspx")) {
    stage2.parse();
    document.body.style.border = "4px solid red";
}


var cases = {
    index: 0
};

function send(msg) {
    chrome.runtime.sendMessage(msg, (response) => { // 3. Got an asynchronous response with the data from the service worker
        console.log('received user data', response);

        return response
        // initializeUI(response);
    });
}


function download(data) {
    let dlAnchorElem = document.createElement("a");
    //a.id = "downloadAnchorElem"
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));


    //console.log(query, query.d);



    //var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "scene.json");
    dlAnchorElem.click();

}




function pause(s) {

    setTimeout(() => {
        console.log("Pause", s)
    }, s)
}

function newButton(value, position) {
    let button3 = document.createElement("button");

    button3.id = "button" + value
    button3.innerHTML = value
    document.body.appendChild(button3)

    button3.style.position = "absolute";
    button3.style.left = position;
    button3.style.top = "0px";
    button3.style.zIndex = "5000000";
    button3.style.width = "10%";
    button3.style.height = "10%";
    return button3
}

function wait(fn, delay) {


    setTimeout(fn, delay);
}

//document.body.style.border = "5px solid yellow";

function start() {
    let button = document.createElement("button");

    button.id = "button"
    button.innerHTML = "Filters"
    document.body.appendChild(button)

    button.style.position = "absolute";
    button.style.left = "0px";
    button.style.top = "0px";
    button.style.zIndex = "5000000";
    button.style.width = "10%";
    button.style.height = "10%";

    let button2 = document.createElement("button");

    button2.id = "button2"
    button2.innerHTML = "Stage1"
    document.body.appendChild(button2)

    button2.style.position = "absolute";
    button2.style.left = "12%";
    button2.style.top = "0px";
    button2.style.zIndex = "5000000";
    button2.style.width = "10%";
    button2.style.height = "10%";


    let button3 = document.createElement("button");

    button3.id = "button3"
    button3.innerHTML = "parse"
    document.body.appendChild(button3)

    button3.style.position = "absolute";
    button3.style.left = "24%";
    button3.style.top = "0px";
    button3.style.zIndex = "5000000";
    button3.style.width = "10%";
    button3.style.height = "10%";

    let b1 = newButton("NEW TARGET", "36%")

    var theForm = document.forms['form1'];
    if (!theForm) {
        theForm = document.form1;
    }
    

    b1.addEventListener("click", (e) => {

        document.querySelector("#form1").target = "v_blank";
        /*
    
        r = getLinks()
        console.log(".....", r)
        let delay = 0;
        r.forEach(link => {
    
            setTimeout((e=>{
                let aux  = link.href.split("'")
           
                console.log(aux[1])
                doPostBack(aux[1], '')
            }), delay)
    
            delay += 20000
            
    
    
        })
        */
    });

    let scriptEle = null


    if ($("#ContentUsersPage_GridMultiD1")) {
        //document.querySelector("#form1").target = "v_blank";
    }


    

    button.addEventListener("click", () => {


        document.querySelector("#rbMegush").click()

        Val("#txtmegusha", "39510");
        Val("#txthelka", "1");
        Val("#txtadGush", "39510");
        Val("#txtadHelka", "500");

        Val("#ContentUsersPage_DDLTypeNehes", "2");
        pause(5000)
        Val("#ContentUsersPage_DDLTypeNehes", "1");
        pause(1000)

        // Create a new 'change' event
        var change = new Event('change');

        document.querySelector("#ContentUsersPage_DDLTypeNehes").dispatchEvent(change)
        setTimeout(() => {

            Val("#ContentUsersPage_DDLMahutIska", "999");
            Val("#ContentUsersPage_DDLDateType", "2");
            document.querySelector("#ContentUsersPage_DDLDateType").dispatchEvent(change)
        }, 5000)



        //document.querySelector("#ContentUsersPage_btnHipus").click()


        /*
        $("#txtmegusha").val("39510")
        $("#txthelka").val("1")
        $("#txtadGush").val("39510")
        $("#txtadHelka").val("500")
     
        $("#ContentUsersPage_DDLTypeNehes").val("1")
        $("#ContentUsersPage_DDLMahutIska").val("999")
        $("#ContentUsersPage_DDLDateType").val("2")
     
        $("#ContentUsersPage_btnHipus").click();
        */

    })

    button2.addEventListener("click", () => {
        console.log("stage 1")
        let p = parse();
        download(p);

        send({
            type: "new",
            name: "stage1",
            data: p
        })

    })

    button3.addEventListener("click", () => {

        chrome.runtime.sendMessage({
            type: "get",
            name: "json"
        }, (response) => {
            console.log(response)

        });

        return;
        console.log("parse3", cases.index++)
        let r = parse3();

        chrome.runtime.sendMessage({
            type: "get",
            name: "stage1"
        }, (response) => {

            //console.log(r)
            //console.log(response.rows)
            response.rows.forEach((row) => {
                if (r.details?.numberId == row.numberId) {
                    r.details = { ...row, ...r.details }
                }
            })



            //console.log('received user data', response);
            console.log(r)
            download(r);
            //console.log("stage1", response)
            //console.log(r, response)

            return response
            // initializeUI(response);
        });



    })
}















