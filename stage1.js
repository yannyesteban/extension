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





    let p = parse();
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
    stage1.doPages().forEach(e => {
        let ele =  document.createElement("span");
        ele.className="link1"
        $(ele).text(e.part2)
        
        $(ele).on("click", ()=>{
            doPostBack(e.part1, e.part2)
        })
        $("#lblPage").append($(ele))
        
    });


    ;
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