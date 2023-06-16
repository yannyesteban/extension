window.addEventListener("load", (event) => {


    createLayer()
});


function createLayer() {
    /*
    "input": {
          "blockFrom": 6122,
          "blockUntil": 6122,
          "parcelFrom": 68,
          "parcelUntil": 9999,
          "type": "General | Everything",
          "period": "1-3",
          "owner": false,
          "project": "בני ברק"
        }
    */


    let layer = document.createElement("div")
    layer.id = "layer_main"
    layer.innerHTML = `<div class="layer">
    <div>
        <div id="t1">Scrapper</div>
        <div>
            <label for="blockFrom">blockFrom</label>
            <input type="text" name="" value="6122" id="blockFrom">
        </div>

        <div>
            <label for="blockUntil">blockUntil</label>
            <input type="text" name="" value="6122"  id="blockUntil">
        </div>
        <div>
            <label for="parcelFrom">parcelFrom</label>
            <input type="text" name="" value="68" id="parcelFrom">
        </div>
        <div>
        <label for="parcelUntil">parcelUntil</label>
        <input type="text" name="" value="9999" id="parcelUntil">
    </div>
        <div>
            <label for="type">type</label>
            <input type="text" name="" value="General | Everything" id="type">
        </div>

        <div>
            <label for="period">period</label>
            <input type="text" name="" value="1-3" id="period">
        </div>

        <div>
            <label for="owner">owner</label>
            <input type="text" name="" value="true" id="owner">
        </div>

        <div>
            <label for="project">project</label>
            <input type="text" name="" value="מגדלי שיר" id="project">
        </div>


        <div>
            <label for="project">New TAB</label>
            <input type="checkbox" id="newtab">
        </div>
        <div class="nav">
            <button type="button" id="sb1">Start 1</button>
            <button type="button" id="sb2">Download</button>
            <button type="button" id="sb3">Op 3</button>
            <button type="button" id="sb4">Op 4</button>
            <button type="button" id="sb5">Op 5</button>
            <button type="button" id="sb6">Op 6</button>

        </div>

       
    </div>
</div>`;
    document.body.appendChild(layer)

    //$("#t1").text(window.location.href )

    $("#newtab").on("click", (e) => {
        var theForm = document.forms['form1'];
        if (!theForm) {
            theForm = document.form1;
        }


        


        //console.log(links);

        if (document.getElementById('newtab').checked) {
            theForm.target = "newtab_blank";
        }else{
            theForm.target = "";
        }

    });

    $("#sb1").on("click", (e) => {

        $("#ContentUsersPage_btnHipus").css("display", "block");
        stage0.setInput()
    });

    $("#sb2").on("click", (e) => {

        doDownload()



    });





}






