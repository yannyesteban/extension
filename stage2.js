let stage2 = {};



stage2.parse = ()=>{
    console.log("STAGE 2")


    
    let r = parse3();

    let id = r.details.numberId;

    let stage = window.localStorage.getItem("lines");

    if(stage){
        stage = JSON.parse(stage)
    }else{
        stage = {}
    }

    
    stage[id] = r

    

    window.localStorage.setItem("lines", JSON.stringify(stage))

    document.title = $("#ContentUsersPage_lblGush").text();
    


    //download(r);
    /*
    chrome.runtime.sendMessage({
        type:"get",
        name:"stage1"
    }, (response) => { 

        //console.log(r)
        //console.log(response.rows)
        response.rows.forEach((row)=>{
            if(r.details?.numberId == row.numberId){
                r.details = {...row, ...r.details} 
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
 */   
}