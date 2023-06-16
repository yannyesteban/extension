

class Store{

    public values;

    constructor(){

    }

    start (name, value) {

        if(typeof value == "object"){
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(name, value);
        
    }

    get = (name)=> {

        let value = window.localStorage.getItem(name);
        if(value){
            return JSON.parse(value);
        }
        return null;
        
        
    }
}

