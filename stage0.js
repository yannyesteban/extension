let stage0 = {};



stage0.parse = ()=>{
    console.log("STAGE 0")
}
let Input = {};
stage0.setInput = ()=>{


    document.querySelector("#rbMegush").click()


    Input.blockFrom = $("#blockFrom").val();
    Input.parcelFrom = $("#parcelFrom").val();
    Input.blockUntil = $("#blockUntil").val();
    Input.parcelUntil = $("#parcelUntil").val();

    Input.type = $("#parcelUntil").val();
    Input.period = $("#period").val();
    Input.owner = $("#owner").val();
    Input.project = $("#project").val();


    localStorage.setItem("myCat", "Tom");

    localStorage.setItem("Input", JSON.stringify(Input));


    $("#txtmegusha").val($("#blockFrom").val());
    $("#txthelka").val($("#parcelFrom").val());
    $("#txtadGush").val($("#blockUntil").val());
    $("#txtadHelka").val($("#parcelUntil").val());
   

    Val("#ContentUsersPage_DDLTypeNehes", "1");
    pause(5000)
    Val("#ContentUsersPage_DDLTypeNehes", "9");
    pause(1000)

    // Create a new 'change' event
    var change = new Event('change');

    document.querySelector("#ContentUsersPage_DDLTypeNehes").dispatchEvent(change)
    setTimeout(() => {
        
        Val("#ContentUsersPage_DDLMahutIska", "999");
        Val("#ContentUsersPage_DDLDateType", "2");
        document.querySelector("#ContentUsersPage_DDLDateType").dispatchEvent(change)
    }, 5000)

    
    
}
//$("#form1").attr("action", $("#form1").attr("action")+ "&stage=1") 
$("#ContentUsersPage_btnHipus").css("display", "none");