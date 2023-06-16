let stage1 = {

    page: 1
};


if(window.location.href.includes("stage")){
    
    const searchParams = new URLSearchParams(window.location.href);

    stage1.page = searchParams.get("stage")


}else{
    var theForm = document.forms['form1'];
    theForm.action = theForm.action+"&stage=1"; 
}



stage1.parse = ()=>{


    chrome.runtime.sendMessage({
        type: "get",
        name: "json"
    }, (response) => {
        console.log(response)

    });


    

    let p = parse();
    //console.log(p)
    //download(p);

    let data = window.localStorage.getItem("stage")
    if(!data){
        //window.localStorage.setItem("stage", {})
        data = {}

    }else{
        data = JSON.parse(data);
    }

    //data = JSON.parse(window.localStorage.getItem("stage"))

    data["page"+stage1.page] = p
    window.localStorage.setItem("stage", JSON.stringify(data))
    
    

    

    $("#lblPage").text("")

    if(stage1.page == 1){
        window.localStorage.setItem("totalPages", $(".table_title.tabelPages table td").length);
        window.localStorage.setItem("urlPages", JSON.stringify(stage1.doPages()));
        
        console.log("doPages", stage1.doPages())
    }
    
    window.localStorage.setItem("actualPage", stage1.page);

    let pagelinks = JSON.parse(window.localStorage.getItem("pageLinks") || "{}");
    

    let links = getLinks();
    pagelinks[stage1.page] = links;

    window.localStorage.setItem("pageLinks", JSON.stringify(pagelinks));

    console.log(pagelinks);


    stage1.doPages().forEach(e => {


        let ele =  document.createElement("span");
        ele.className="link1"
        $(ele).text(e.part2)
        
        $(ele).on("click", ()=>{

            
            var theForm = document.forms['form1'];

            let oldTarget = theForm.target;

            if (!theForm) {
                theForm = document.form1;
            }
            
            console.log(theForm)
            
            theForm.target = "";

            doPostBack(e.part1, e.part2);

            theForm.target = oldTarget;
        })
        $("#lblPage").append($(ele))
        
    });


    let runner = new Runner();
    runner.run();

}

stage1.doPages=()=>{
    return $(".table_title.tabelPages a").toArray().map(e=>{
        let aux = $(e).attr("href");
        
        let part1 = aux.split("'")[1]
        let part2 = aux.split("'")[3]

        return {
            part1, part2
        }
    })
}


//stage1.parse()