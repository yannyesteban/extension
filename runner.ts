


let dataRunner = {
    totalPages: 0,
    pages: {

    },


}

class Runner {
    totalPages = 0;
    actualPage = 0;
    pages: [];
    process = 0;
    urlPages = {};
    pageLinks = {};
    public name = "runner";
    constructor(data) {

        console.log("RUNNER");

        this.totalPages = + window.localStorage.getItem("totalPages");
        this.actualPage = + window.localStorage.getItem("actualPage");
        this.urlPages = JSON.parse(window.localStorage.getItem("urlPages"));
        this.pageLinks = JSON.parse(window.localStorage.getItem("pageLinks"));
        console.log(this.pageLinks, this.urlPages);
    }

    start() {
        let value = window.localStorage.getItem(this.name);
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        this.totalPages = value["totalPages"]

    }

    run() {
        console.log("RUN: ", this.actualPage, this.totalPages)
        if (this.actualPage < this.totalPages) {
            let index = this.actualPage - 1;
            console.log("INDEX: ", index, this.urlPages);
            if (this.urlPages[index]) {
                console.log("Do SUBMIT")
                setTimeout(()=>{
                    console.log(this.urlPages[index])
                    this.submit(this.urlPages[index].part1, this.urlPages[index].part2);
                }, 20000)
                
            }

        }


    }

    doPages() {

    }

    doLines() {

    }

    submit(eventTarget, eventArgument) {
        var theForm = document.forms['form1'];
        if (!theForm) {
            theForm = document['form1'];
        }



        if (!theForm.onsubmit || (theForm.onsubmit() != false)) {

            if (eventArgument) {
                let url = theForm.action;
                url = url.replace(/stage=.*/ig, "stage=" + (eventArgument.replace(/[^0-9]+/ig, "")))




                theForm.action = url;
            }
            theForm.__EVENTTARGET.value = eventTarget;
            theForm.__EVENTARGUMENT.value = eventArgument;


            theForm.submit();
        }
    }
}