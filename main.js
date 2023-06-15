let input = {}

input.page = 1;
input.save = false;


if(window.location.href.includes("nadlan.taxes.gov.il/svinfonadlan2010/startpageNadlanNewDesign.aspx")){
    document.body.style.border = "4px solid yellow";
    stage0.parse();
}else if(window.location.href.includes("nadlan.taxes.gov.il/svinfonadlan2010/InfoNadlanPerutWithMap.aspx")){
    stage1.parse();
    document.body.style.border = "4px solid blue";
}else if(window.location.href.includes("nadlan.taxes.gov.il/svinfonadlan2010/perutOfDira.aspx")){
    stage2.parse();
    document.body.style.border = "4px solid red";
}


var cases = {
    index:0
};

function send(msg){
    chrome.runtime.sendMessage(msg, (response) => { // 3. Got an asynchronous response with the data from the service worker
        console.log('received user data', response);

        return response
        // initializeUI(response);
    });
}


function download(data){
    let dlAnchorElem = document.createElement("a");
        //a.id = "downloadAnchorElem"
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));

        
        //console.log(query, query.d);
        
        
        
        //var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "scene.json");
        dlAnchorElem.click();
    
}

chrome.runtime.onMessage.addListener((request) => {
    console.log("Message from the background script:");
    
    
    if (request.sc == "ok") {
        let query = JSON.parse(request.jscript);
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


    return Promise.resolve({response: "Hi from content script"});
});


function pause(s) {

    setTimeout(() => {
        console.log("Pause", s)
    }, s)
}

function newButton(value, position) {
    let button3 = document.createElement("button");

    button3.id = "button"+value
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
function doPostBack(eventTarget, eventArgument) {
    if (!theForm.onsubmit || (theForm.onsubmit() != false)) {

        if(eventArgument){
            let url = theForm.action;
            url = url.replace(/stage=.*/ig, "stage="+(eventArgument.replace(/[^0-9]+/ig, "")))
            
            
            
            
            theForm.action = url; 
        }
        theForm.__EVENTTARGET.value = eventTarget;
        theForm.__EVENTARGUMENT.value = eventArgument;
        theForm.submit();
    }
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


if($("#ContentUsersPage_GridMultiD1")){
    //document.querySelector("#form1").target = "v_blank";
}


function Val(id, value) {
    document.querySelector(id).value = value;
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
        type:"new",
        name:"stage1",
        data: p
    })
    
})

button3.addEventListener("click", () => {
    
    
    console.log("parse3", cases.index++)
    let r = parse3();

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

    
    
})


function parse() {

    class Output {
        data = {}
        sample = {}
        constructor() { }
        /**
         * Set output data.
         * @param {string} name - name of the data field.
         * @param {*} value - value of the data field. 
         * @param {*} defaultValue - default value.
         * @param {*} sampleValue - sample value.
         * @returns object - output object.
         */

        set(name, value, defaultValue = undefined, sampleValue = undefined) {
            this.data[name] = value || defaultValue;
            this.sample[name] = sampleValue || defaultValue;
            return this;
        }

        get(name) {
            return this.data[name];
        }

        getAll() {
            return this.data;
        }

        getSample() {
            return this.sample;
        }
    }//end class Output

    /**
     * Generates a random UUID (Universally Unique IDentifier) string.
     *
     * @return {string} A random UUID string.
     */
    function generateUUID() {
        let uuid = '';
        for (let i = 0; i < 32; i++) {
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += Math.floor(Math.random() * 16).toString(16);
        }
        return uuid;
    };

    /**
     * Computes a hash value for a given string.
     *
     * @param {string} s - The string to hash.
     * @return {string} A 10-digit hash value for the string.
     */

    function hash(s) {
        let hash = 0;

        for (let i = 0; i < s.length; i++) {
            hash = (hash + s.charCodeAt(i) * (i + 1)) % 1000000007;
        }

        return ("0000000000" + hash.toString()).slice(-10);
    }

    /**
     * Converts a string in a format with commas and decimal points to a number.
     *
     * @param {string} value - The string to convert.
     * @ * @return {number} The number represented by the string.
     */

    function convertStringToNumber(value) {
        const newValue = value.replace(/\,/g, '');
        return parseFloat(newValue);
    }

    /**
     *  Converts a string in 'DD/MM/YY' format to a Date object.
     * @param {*} value 
     * @returns {Date} a Date object
     */
    function convertStringToDate(value) {
        return new Date(value.split('/').reverse().join('.'));
    }


    class Prop extends Output {
        constructor() {
            super();
            this
                // Dynamic Content
                .set('key-value', this.getPropertyValueArray(), [], [])

                // Basic Data
                .set('numberId', $('#ContentUsersPage_lblGush').text().trim(), '', '006717-0204-042-00') //"Gush" (גוּשׁ) se refiere a una "zona" o un "distrito". En el contexto de bienes raíces, se utiliza para describir una zona geográfica o área específica que se caracteriza por un conjunto de propiedades inmobiliarias similares.
                .set('transactionType', $('#ContentUsersPage_lblSugIska ').text().trim(), '', 'sale') //"Sug Iska" (סוּג אִסְכָּה) se refiere a un tipo de contrato de inversión utilizado en el mundo financiero islámico.
                .set('transactionDate', String($('#ContentUsersPage_lblTarIska').text().trim()), '', '07/05/2023') // "TarIska" (תַּרְיִסְכָּה) es un término técnico utilizado en el ámbito financiero para referirse a un contrato de inversión que combina elementos de dos tipos de contratos diferentes: el "Targuil" y el "Iska".
                .set('contractualCompliance', $('#ContentUsersPage_lblMofaGush ').text().trim(), '', '') //"Mofa Gush" (מוֹפָע גוּש) se refiere a un "plan de construcción" o "planificación urbana".

                .set('rights', $('#ContentUsersPage_lblMahutZchut ').text().trim(), '', 'ownership') //"Mahut Zchut" (מַהוּת זְכוּת) se refiere al "derecho de propiedad"

                // Prop Type and subtype

                .set('unitFunction', $('#ContentUsersPage_lblTifkudYhida ').text().trim(), '', '') //"Tifkud Yachid" (תפקוד יחיד) es una expresión en hebreo que se traduce al español como "función individual"
                .set('buildingFunction', $('#ContentUsersPage_lblTifkudBnyn ').text().trim(), '', '') //En hebreo, "Binyan" significa "edificio" y "Tifkud" se refiere a la función    


                .set('distributionOfParts', $('#ContentUsersPage_lblShumaHalakim ').text().trim(), '', '(1/1 ליחידה בשלמותה)')
                // "Sho'ma Chelakim" (שומה חלקים) se refiere al "reparto de partes" o "distribución de partes".
                // "1/1 L'yechida Bishlemuta" (1/1 ליחידה בשלמותה) significa "1 de 1 para la unidad en su totalidad"


                // Address

                .set('settlement', String($('#ContentUsersPage_lblYeshuv ').text().trim()), '--', 'Dimona') //En hebreo, "Yeshuv" (יְשׁוּב) se refiere a un "asentamiento" o una "comunidad".
                .set('neighborhood', String($('#ContentUsersPage_lblShchuna ').text().trim()), '--', 'HaZayit') // "Shchuna" (שכונה) se refiere a un "vecindario" o un "barrio". 
                .set('street', String($('#ContentUsersPage_lblRechov ').text().trim()), '', 'HaGefen Street') //"Rechov" (רחוב) se refiere a una "calle"
                .set('house', Number(parseInt($('#ContentUsersPage_lblBayit ').text().trim())), 0, 0) //En hebreo, "Bayit" (בית) significa "casa"
                .set('apartment', $('#ContentUsersPage_lblDira ').text().trim(), '', '') //"Dira" (דירה) se refiere a un "apartamento" o "piso".
                .set('floor', $('#ContentUsersPage_lblKoma').text().trim(), 0, 1) // "Koma" (קומה) se refiere a una "planta" o "piso" en un edificio. 

                // Prices

                .set('valueInDollarsDeclaredPrice', parseFloat($('#ContentUsersPage_lblMcirMozharDlr ').text().trim().replace(/\,/g, '')), 0, 0)  //"valor en dólares"
                .set('valueInNISDeclaredPrice', parseFloat($('#ContentUsersPage_lblMcirMozhar ').text().trim().replace(/\,/g, '')), 0, 0) // "valor en NIS"
                .set('valueInDollarsEstimatedPrice', parseFloat($('#ContentUsersPage_lblMcirMorachDlr ').text().trim().replace(/\,/g, '')), 0, 0) // "valor en dólares"
                .set('valueInNISEstimatedPrice', parseFloat($('#ContentUsersPage_lblMcirMorach ').text().trim().replace(/\,/g, '')), 0, 0) //  "valor en NIS"

                // Features

                //.set('frontLength'	, Number(parseFloat($('#ContentUsersPage_lblOrechHazit ').text().trim()))	,0,1)  //"Orech Hazit" (אורך הזמן) se refiere al "tiempo" o a la "duración".     
                .set('numberOfEntrances', Number(parseInt($('#ContentUsersPage_lblKnisa ').text().trim())), 1, 1) //"Knisa" (כניסה) se refiere a una "entrada" o "ingreso".
                .set('numberOfFloors', parseInt($('#ContentUsersPage_lblMisKomot ').text().trim()), '', '') //"Mis Komot" (מסכומות) se refiere a "sumas" o "cantidades" En este caso de pisos.
                .set('parking', Number(parseInt($('#ContentUsersPage_lblHanaya ').text().trim())), 0, 1) // "Hanaya Tzmuda Le: 2 Rechavim" (חניה צמודה ל: 2 רכבים) significa "Estacionamiento adyacente para 2 autos"

                //
                .set('lot', Number(parseInt($('#ContentUsersPage_lblMgrash ').text().trim())), 0, 1) // "Mgrash" (מגרש) se refiere a un "terreno baldío" o "terreno no cultivado".
                .set('roof', Number(parseInt($('#ContentUsersPage_lblGag ').text().trim())), 0, 1) //"Gag" (גג) se refiere a un "techo" o "azotea".
                .set('warehouse', Number(parseInt($('#ContentUsersPage_lblMachsan ').text().trim())), 0, 1) // "Machsan" (מחסן) se refiere a un "almacén" o "depósito".
                .set('yard', Number(parseInt($('#ContentUsersPage_lblHazer ').text().trim())), 0, 1) //"חצר" se refiere a un área abierta dentro o alrededor de una casa que sirve como un patio o jardín interior.
                .set('elevators', Number(parseInt($('#ContentUsersPage_lblMalit ').text().trim())), 0, 1) //"מעלית" (ma'alit) en hebreo, que significa "ascensor" en español.

                // Area

                .set('area', Number(parseFloat($('#ContentUsersPage_lblEzor').text().trim().replace(/\,/g, ''))), 0, 50) // "Ezor" es "área". "Shetach" (שטח) es una palabra en hebreo que se traduce al español como "superficie" o "área"
                .set('propTaxArea', this.getPropertyValue("Property Tax Area") ? parseFloat($('#ContentUsersPage_lblShetachBruto ').text().trim()) : 0, 0, 50) //"Shetach Bruto" es una expresión en hebreo que se refiere al área total de un terreno o propiedad, incluyendo tanto la superficie edificable como la no edificable.
                .set('registeredArea', this.getPropertyValue("Registered Area") ? parseInt($('#ContentUsersPage_lblShetachNeto ').text().trim()) : 0, 0, 50) //"Shetach Neto" es una expresión en hebreo que se refiere al área edificable de un terreno o propiedad.
                .set('grossArea', parseFloat(this.getPropertyValue("Gross Area")?.match(/\d+|\.{1}/g).join('')), 0, 0) //"Gross Area, se refiere al area total o bruta
                .set('netArea', parseFloat(this.getPropertyValue("Net Area")?.match(/\d+|\.{1}/g).join('')), 0, 0) //Net Area, se refiere al area de neta usable.
                .set('builtUpArea', parseFloat(this.getPropertyValue("Built-Up Area")?.match(/\d+|\.{1}/g).join('')), 0, 0) //"Built-Up Area" es un término en el campo de los bienes raíces que se refiere al área total construida de una propiedad,

                .set('pricePerSquereMeter', Number(parseFloat($('#ContentUsersPage_lblMechirLmr ').text().trim().replace(/\,/g, ''))), 0, 50) //  (מחיר למ"ר) en hebreo. Esta es una expresión común en el mercado inmobiliario y se utiliza para describir el precio de una propiedad en función de su tamaño.
                .set('yearOfConstruction', Number(parseInt($('#ContentUsersPage_lblShnatBniya ').text().trim())), 0, 1960) //"Shnat Bniya" (שנת בנייה) es una expresión en hebreo que se traduce al español como "año de construcción". 

                .set('id', hash(JSON.stringify(this.getAll())));

        }


        translations = {
            "אזור": "Area",
            "שטח ארנונה": "Property Tax Area",
            "שטח מבונה": "Built-Up Area",
            "שטח ברוטו": "Gross Area",
            "שטח רשום": "Registered Area",
            "שטח נטו": "Net Area",


            "גו\"ח": "Parcel Number",
            "תאריך העסקה": "Transaction Date",
            "ישוב": "City",
            "שכונה": "Neighborhood",
            "רחוב": "Street",
            "מחיר למ\"ר": "Price per Square Meter",
            "אחוזי בניה": "Building Percentage",
            "גמר בניה": "Construction Finish",
            "שנת בניה": "Year of Construction",
            "חזית": "Frontage",
            "מגרש": "Lot",
            "ייעוד": "Type",

            "מחיר לחדר": "Price per Room",
            "מחיר למט\"ר": "Price per square meter",
            "מספר חדרים": "Number of Rooms",
            "קומה": "Floor",
            "מספר קומות": "Number of Floors",
            "דירות בבנין": "Apartments in Building",
            "חניה צמודה ל": "Attached Parking to",
            "מעלית": "Elevator",
            "גג": "Roof",
            "מחסן": "Storage",
            "חצר": "Yard",
            "גלריה": "Gallery",

        };

        /**
         * getPropertyValueArray method - returns an array of property values.
         * @returns {array}
         */

        getPropertyValueArray() {
            return $('.BoxB .col-sm-3, .BoxB.col-sm-10 > *').map((index, el) => {
                var property = $(el).find('strong').text().trim().replace(':', '');
                var value = $(el).find('span').text().trim();
                return { index, property, translate: this.translations?.[property], value };
            }).toArray();
        }

        /**
         * getPropertyValue method - get the value of a property.
         * @param {string} name 
         * @returns {string} value.
         */
        getPropertyValue(name) {
            return this.get('key-value')?.filter(obj => obj.translate === name).slice(0, 1).pop()?.value
        }

    }//end class



    const of = 'מתוך';
    const recordsPerPage = 12; //pages

    let page = input.page || 1; //page number to redirect.
    let records = $('#lblresh').text().replace(/[^0-9]/g, '') || recordsPerPage; // Number of records found.
    let lastPage = Math.ceil(records / recordsPerPage) || 1; // Last page of page navigator.
    let current = $('#lblPage').text().split(of, 1).pop().replace(/[^0-9]/g, '').trim() || 1; //Current page.
    let error = $('#ContentUsersPage_LblAlert').text().trim() || ''; //Error message on page.



    class DataTable {

        constructor(tableSelector, rowSelector) {
            this.table = $(tableSelector);
            this.rows = this.table.find(rowSelector);
            this.columnSelectors = {};
        }

        /**
         * Sets the selector for a column.
         * 
         * @param {string} columnName - Name of the column.
         * @param {string} selector - Selector for the column's cell.
         * @param {any} defaultValue - Default value for the column. Optional.
         * @param {function} processValue - Function to process the column value. Optional.
         */

        set(columnName, selector, defaultValue = null, processValue = null) {
            this.columnSelectors[columnName] = { selector, defaultValue, processValue };
        };

        setValue(row, columnName, value) {
            const columnData = this.columnSelectors[columnName];
            if (columnData) {
                const { selector, processValue } = columnData;
                const cell = $(row).find(selector)[0];
                if (cell) {
                    const newValue = processValue ? processValue(value) : value;
                    $(cell).text(newValue);
                }
            }
        }


        setColumnValue(columnName, value) {
            this.rows.each((index, row) => {
                if (typeof (value) == 'function') {
                    this.setValue(row, columnName, value(index, row));
                } else {
                    this.setValue(row, columnName, value);
                }

            });
        }

        /**
         * Gets the value of a specific cell in a row.
         * 
         * @param {object} row - Row object.
         * @param {string} selector - Selector for the cell.
         * @param {any} defaultValue - Default value for the cell. Optional.
         * @param {function} processValue - Function to process the cell value. Optional.
         * 
         * @returns {string} The value of the cell.
         */

        getColumnValue(row, selector, defaultValue = null, processValue = null) {
            const cell = $(row).find(selector)[0];
            if (cell) {
                const text = $(cell).text().trim();
                if (text) {
                    const value = isNaN(text) ? text : parseFloat(text.replace(/[^0-9.-]+/g, ""));
                    return processValue ? processValue(cell) : value;
                }
            }
            return defaultValue;
        };

        /**
         * Gets the data from the table.
         * 
         * @returns {array} Array of objects containing the data from the table.
         */

        getData() {
            return this.rows.map((index, row) => {
                const data = Object.entries(this.columnSelectors).reduce((obj, [columnName, columnData]) => {
                    const { selector, defaultValue, processValue } = columnData;
                    obj[columnName] = this.getColumnValue(row, selector, defaultValue, processValue);
                    return obj;
                }, {});


                return data;
            }).get();
        };

    } //end class DataTable

    let table = new DataTable('table.table', 'tr[class*="row"], tr[class*="Box"]');

    table.set('linkId', 'td:nth-child(2) a', '', value => $(value).attr('id'));
    table.set('numberId', 'td:nth-child(2)', '');
    table.set('transactionDate', 'td:nth-child(3)', '', value => $(value).text().trim());
    table.set('declaredValueInNIS', 'td:nth-child(4)', 0, value => convertStringToNumber($(value).text().trim()));
    table.set('salesValueInNIS', 'td:nth-child(5)', 0, value => convertStringToNumber($(value).text().trim()));
    table.set('unitFunction', 'td:nth-child(6)', '(N/A)');
    table.set('soldParts', 'td:nth-child(7)', '0');
    table.set('settlement', 'td:nth-child(8)', '(N/A)');
    table.set('yearOfConstruction', 'td:nth-child(9)');
    table.set('registeredArea', 'td:nth-child(10)', 0);
    table.set('rooms', 'td:nth-child(11)', 0);

    let rows = [];

    if (input.save === true) { //Only save for.
        collect({ status: 'succeed', message: 'Saved' });
    }
    else {

        rows = table.getData();
        for (let i = 0; i < rows.length; i++) {
            rows[i]['id'] = hash(JSON.stringify(rows[i]));
            rows[i]['uuid'] = generateUUID();
            rows[i]['status'] = 'Successful';
            rows[i]['page'] = Number(current);
            rows[i]['line'] = Number(i);
            rows[i]['collectedDate'] = String((new Date()).toISOString());
        }

    }

    let prop = new Prop();
    let details = prop.getAll();
    return { error, rows, lastPage, records, current, details }

}



function parse2() {


    const of = 'מתוך';
    const recordsPerPage = 12; //pages

    let page = input.page || 1; //page number to redirect.
    let records = $('#lblresh').text().replace(/[^0-9]/g, '') || recordsPerPage; // Number of records found.
    let lastPage = Math.ceil(records / recordsPerPage) || 1; // Last page of page navigator.
    let current = $('#lblPage').text().split(of, 1).pop().replace(/[^0-9]/g, '').trim() || 1; //Current page.
    let error = $('#ContentUsersPage_LblAlert').text().trim() || ''; //Error message on page.

    /**
     * Generates a random UUID (Universally Unique IDentifier) string.
     *
     * @return {string} A random UUID string.
     */
    function generateUUID() {
        let uuid = '';
        for (let i = 0; i < 32; i++) {
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += Math.floor(Math.random() * 16).toString(16);
        }
        return uuid;
    };

    /**
     * Computes a hash value for a given string.
     *
     * @param {string} s - The string to hash.
     * @return {string} A 10-digit hash value for the string.
     */

    function hash(s) {
        let hash = 0;

        for (let i = 0; i < s.length; i++) {
            hash = (hash + s.charCodeAt(i) * (i + 1)) % 1000000007;
        }

        return ("0000000000" + hash.toString()).slice(-10);
    }

    /**
     * Converts a string in a format with commas and decimal points to a number.
     *
     * @param {string} value - The string to convert.
     * @ * @return {number} The number represented by the string.
     */

    function convertStringToNumber(value) {
        const newValue = value.replace(/\,/g, '');
        return parseFloat(newValue);
    }

    /**
     *  Converts a string in 'DD/MM/YY' format to a Date object.
     * @param {*} value 
     * @returns {Date} a Date object
     */
    function convertStringToDate(value) {
        return new Date(value.split('/').reverse().join('.'));
    }

    class DataTable {

        constructor(tableSelector, rowSelector) {
            this.table = $(tableSelector);
            this.rows = this.table.find(rowSelector);
            this.columnSelectors = {};
        }

        /**
         * Sets the selector for a column.
         * 
         * @param {string} columnName - Name of the column.
         * @param {string} selector - Selector for the column's cell.
         * @param {any} defaultValue - Default value for the column. Optional.
         * @param {function} processValue - Function to process the column value. Optional.
         */

        set(columnName, selector, defaultValue = null, processValue = null) {
            this.columnSelectors[columnName] = { selector, defaultValue, processValue };
        };

        setValue(row, columnName, value) {
            const columnData = this.columnSelectors[columnName];
            if (columnData) {
                const { selector, processValue } = columnData;
                const cell = $(row).find(selector)[0];
                if (cell) {
                    const newValue = processValue ? processValue(value) : value;
                    $(cell).text(newValue);
                }
            }
        }


        setColumnValue(columnName, value) {
            this.rows.each((index, row) => {
                if (typeof (value) == 'function') {
                    this.setValue(row, columnName, value(index, row));
                } else {
                    this.setValue(row, columnName, value);
                }

            });
        }

        /**
         * Gets the value of a specific cell in a row.
         * 
         * @param {object} row - Row object.
         * @param {string} selector - Selector for the cell.
         * @param {any} defaultValue - Default value for the cell. Optional.
         * @param {function} processValue - Function to process the cell value. Optional.
         * 
         * @returns {string} The value of the cell.
         */

        getColumnValue(row, selector, defaultValue = null, processValue = null) {
            const cell = $(row).find(selector)[0];
            if (cell) {
                const text = $(cell).text().trim();
                if (text) {
                    const value = isNaN(text) ? text : parseFloat(text.replace(/[^0-9.-]+/g, ""));
                    return processValue ? processValue(cell) : value;
                }
            }
            return defaultValue;
        };

        /**
         * Gets the data from the table.
         * 
         * @returns {array} Array of objects containing the data from the table.
         */

        getData() {
            return this.rows.map((index, row) => {
                const data = Object.entries(this.columnSelectors).reduce((obj, [columnName, columnData]) => {
                    const { selector, defaultValue, processValue } = columnData;
                    obj[columnName] = this.getColumnValue(row, selector, defaultValue, processValue);
                    return obj;
                }, {});


                return data;
            }).get();
        };

    } //end class DataTable

    let table = new DataTable('table.table', 'tr[class*="row"], tr[class*="Box"]');

    table.set('linkId', 'td:nth-child(2) a', '', value => $(value).attr('id'));
    table.set('numberId', 'td:nth-child(2)', '');
    table.set('transactionDate', 'td:nth-child(3)', '', value => String($(value).text().trim()));
    table.set('declaredValueInNIS', 'td:nth-child(4)', 0, value => convertStringToNumber($(value).text().trim()));
    table.set('salesValueInNIS', 'td:nth-child(5)', 0, value => convertStringToNumber($(value).text().trim()));
    table.set('unitFunction', 'td:nth-child(6)', '(N/A)');
    table.set('soldParts', 'td:nth-child(7)', '0');
    table.set('settlement', 'td:nth-child(8)', '(N/A)');
    table.set('yearOfConstruction', 'td:nth-child(9)');
    table.set('registeredArea', 'td:nth-child(10)', 0);
    table.set('rooms', 'td:nth-child(11)', 0);

    let rows = [];

    if (input.save === true) { //Only save for.
        collect({ status: 'succeed', message: 'Saved' });
    }
    else {

        rows = table.getData();
        for (let i = 0; i < rows.length; i++) {
            rows[i]['id'] = hash(JSON.stringify(rows[i]));
            rows[i]['uuid'] = generateUUID();
            rows[i]['status'] = 'Successful';
            rows[i]['page'] = Number(current);
            rows[i]['line'] = Number(i);
            rows[i]['collectedDate'] = String((new Date()).toISOString());
        }

    }
    console.log({ error, rows, lastPage, records, current })
    return { error, rows, lastPage, records, current };


}


function parse3() {
    class Output {
        data = {}
        sample = {}
        constructor() { }
        /**
         * Set output data.
         * @param {string} name - name of the data field.
         * @param {*} value - value of the data field. 
         * @param {*} defaultValue - default value.
         * @param {*} sampleValue - sample value.
         * @returns object - output object.
         */

        set(name, value, defaultValue = undefined, sampleValue = undefined) {
            this.data[name] = value || defaultValue;
            this.sample[name] = sampleValue || defaultValue;
            return this;
        }

        get(name) {
            return this.data[name];
        }

        getAll() {
            return this.data;
        }

        getSample() {
            return this.sample;
        }
    }//end class Output

    /**
     * Generates a random UUID (Universally Unique IDentifier) string.
     *
     * @return {string} A random UUID string.
     */
    function generateUUID() {
        let uuid = '';
        for (let i = 0; i < 32; i++) {
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += Math.floor(Math.random() * 16).toString(16);
        }
        return uuid;
    };

    /**
     * Computes a hash value for a given string.
     *
     * @param {string} s - The string to hash.
     * @return {string} A 10-digit hash value for the string.
     */

    function hash(s) {
        let hash = 0;

        for (let i = 0; i < s.length; i++) {
            hash = (hash + s.charCodeAt(i) * (i + 1)) % 1000000007;
        }

        return ("0000000000" + hash.toString()).slice(-10);
    }

    /**
     * Converts a string in a format with commas and decimal points to a number.
     *
     * @param {string} value - The string to convert.
     * @ * @return {number} The number represented by the string.
     */

    function convertStringToNumber(value) {
        const newValue = value.replace(/\,/g, '');
        return parseFloat(newValue);
    }

    /**
     *  Converts a string in 'DD/MM/YY' format to a Date object.
     * @param {*} value 
     * @returns {Date} a Date object
     */
    function convertStringToDate(value) {
        return new Date(value.split('/').reverse().join('.'));
    }


    class Prop extends Output {
        constructor() {
            super();
            this
                // Dynamic Content
                .set('key-value', this.getPropertyValueArray(), [], [])

                // Basic Data
                .set('numberId', $('#ContentUsersPage_lblGush').text().trim(), '', '006717-0204-042-00') //"Gush" (גוּשׁ) se refiere a una "zona" o un "distrito". En el contexto de bienes raíces, se utiliza para describir una zona geográfica o área específica que se caracteriza por un conjunto de propiedades inmobiliarias similares.
                .set('transactionType', $('#ContentUsersPage_lblSugIska ').text().trim(), '', 'sale') //"Sug Iska" (סוּג אִסְכָּה) se refiere a un tipo de contrato de inversión utilizado en el mundo financiero islámico.
                .set('transactionDate', String($('#ContentUsersPage_lblTarIska').text().trim()), '', '07/05/2023') // "TarIska" (תַּרְיִסְכָּה) es un término técnico utilizado en el ámbito financiero para referirse a un contrato de inversión que combina elementos de dos tipos de contratos diferentes: el "Targuil" y el "Iska".
                .set('contractualCompliance', $('#ContentUsersPage_lblMofaGush ').text().trim(), '', '') //"Mofa Gush" (מוֹפָע גוּש) se refiere a un "plan de construcción" o "planificación urbana".

                .set('rights', $('#ContentUsersPage_lblMahutZchut ').text().trim(), '', 'ownership') //"Mahut Zchut" (מַהוּת זְכוּת) se refiere al "derecho de propiedad"

                // Prop Type and subtype

                .set('unitFunction', $('#ContentUsersPage_lblTifkudYhida ').text().trim(), '', '') //"Tifkud Yachid" (תפקוד יחיד) es una expresión en hebreo que se traduce al español como "función individual"
                .set('buildingFunction', $('#ContentUsersPage_lblTifkudBnyn ').text().trim(), '', '') //En hebreo, "Binyan" significa "edificio" y "Tifkud" se refiere a la función    


                .set('distributionOfParts', $('#ContentUsersPage_lblShumaHalakim ').text().trim(), '', '(1/1 ליחידה בשלמותה)')
                // "Sho'ma Chelakim" (שומה חלקים) se refiere al "reparto de partes" o "distribución de partes".
                // "1/1 L'yechida Bishlemuta" (1/1 ליחידה בשלמותה) significa "1 de 1 para la unidad en su totalidad"


                // Address

                .set('settlement', String($('#ContentUsersPage_lblYeshuv ').text().trim()), '--', 'Dimona') //En hebreo, "Yeshuv" (יְשׁוּב) se refiere a un "asentamiento" o una "comunidad".
                .set('neighborhood', String($('#ContentUsersPage_lblShchuna ').text().trim()), '--', 'HaZayit') // "Shchuna" (שכונה) se refiere a un "vecindario" o un "barrio". 
                .set('street', String($('#ContentUsersPage_lblRechov ').text().trim()), '', 'HaGefen Street') //"Rechov" (רחוב) se refiere a una "calle"
                .set('house', Number(parseInt($('#ContentUsersPage_lblBayit ').text().trim())), 0, 0) //En hebreo, "Bayit" (בית) significa "casa"
                .set('apartment', $('#ContentUsersPage_lblDira ').text().trim(), '', '') //"Dira" (דירה) se refiere a un "apartamento" o "piso".
                .set('floor', $('#ContentUsersPage_lblKoma').text().trim(), 0, 1) // "Koma" (קומה) se refiere a una "planta" o "piso" en un edificio. 

                // Prices

                .set('valueInDollarsDeclaredPrice', parseFloat($('#ContentUsersPage_lblMcirMozharDlr ').text().trim().replace(/\,/g, '')), 0, 0)  //"valor en dólares"
                .set('valueInNISDeclaredPrice', parseFloat($('#ContentUsersPage_lblMcirMozhar ').text().trim().replace(/\,/g, '')), 0, 0) // "valor en NIS"
                .set('valueInDollarsEstimatedPrice', parseFloat($('#ContentUsersPage_lblMcirMorachDlr ').text().trim().replace(/\,/g, '')), 0, 0) // "valor en dólares"
                .set('valueInNISEstimatedPrice', parseFloat($('#ContentUsersPage_lblMcirMorach ').text().trim().replace(/\,/g, '')), 0, 0) //  "valor en NIS"

                // Features

                //.set('frontLength'	, Number(parseFloat($('#ContentUsersPage_lblOrechHazit ').text().trim()))	,0,1)  //"Orech Hazit" (אורך הזמן) se refiere al "tiempo" o a la "duración".     
                .set('numberOfEntrances', Number(parseInt($('#ContentUsersPage_lblKnisa ').text().trim())), 1, 1) //"Knisa" (כניסה) se refiere a una "entrada" o "ingreso".
                .set('numberOfFloors', parseInt($('#ContentUsersPage_lblMisKomot ').text().trim()), '', '') //"Mis Komot" (מסכומות) se refiere a "sumas" o "cantidades" En este caso de pisos.
                .set('parking', Number(parseInt($('#ContentUsersPage_lblHanaya ').text().trim())), 0, 1) // "Hanaya Tzmuda Le: 2 Rechavim" (חניה צמודה ל: 2 רכבים) significa "Estacionamiento adyacente para 2 autos"

                //
                .set('lot', Number(parseInt($('#ContentUsersPage_lblMgrash ').text().trim())), 0, 1) // "Mgrash" (מגרש) se refiere a un "terreno baldío" o "terreno no cultivado".
                .set('roof', Number(parseInt($('#ContentUsersPage_lblGag ').text().trim())), 0, 1) //"Gag" (גג) se refiere a un "techo" o "azotea".
                .set('warehouse', Number(parseInt($('#ContentUsersPage_lblMachsan ').text().trim())), 0, 1) // "Machsan" (מחסן) se refiere a un "almacén" o "depósito".
                .set('yard', Number(parseInt($('#ContentUsersPage_lblHazer ').text().trim())), 0, 1) //"חצר" se refiere a un área abierta dentro o alrededor de una casa que sirve como un patio o jardín interior.
                .set('elevators', Number(parseInt($('#ContentUsersPage_lblMalit ').text().trim())), 0, 1) //"מעלית" (ma'alit) en hebreo, que significa "ascensor" en español.

                // Area

                .set('area', Number(parseFloat($('#ContentUsersPage_lblEzor').text().trim().replace(/\,/g, ''))), 0, 50) // "Ezor" es "área". "Shetach" (שטח) es una palabra en hebreo que se traduce al español como "superficie" o "área"
                .set('propTaxArea', this.getPropertyValue("Property Tax Area") ? parseFloat($('#ContentUsersPage_lblShetachBruto ').text().trim()) : 0, 0, 50) //"Shetach Bruto" es una expresión en hebreo que se refiere al área total de un terreno o propiedad, incluyendo tanto la superficie edificable como la no edificable.
                .set('registeredArea', this.getPropertyValue("Registered Area") ? parseInt($('#ContentUsersPage_lblShetachNeto ').text().trim()) : 0, 0, 50) //"Shetach Neto" es una expresión en hebreo que se refiere al área edificable de un terreno o propiedad.
                .set('grossArea', parseFloat(this.getPropertyValue("Gross Area")?.match(/\d+|\.{1}/g).join('')), 0, 0) //"Gross Area, se refiere al area total o bruta
                .set('netArea', parseFloat(this.getPropertyValue("Net Area")?.match(/\d+|\.{1}/g).join('')), 0, 0) //Net Area, se refiere al area de neta usable.
                .set('builtUpArea', parseFloat(this.getPropertyValue("Built-Up Area")?.match(/\d+|\.{1}/g).join('')), 0, 0) //"Built-Up Area" es un término en el campo de los bienes raíces que se refiere al área total construida de una propiedad,

                .set('pricePerSquereMeter', Number(parseFloat($('#ContentUsersPage_lblMechirLmr ').text().trim().replace(/\,/g, ''))), 0, 50) //  (מחיר למ"ר) en hebreo. Esta es una expresión común en el mercado inmobiliario y se utiliza para describir el precio de una propiedad en función de su tamaño.
                .set('yearOfConstruction', Number(parseInt($('#ContentUsersPage_lblShnatBniya ').text().trim())), 0, 1960) //"Shnat Bniya" (שנת בנייה) es una expresión en hebreo que se traduce al español como "año de construcción". 

               // .set('id', hash(JSON.stringify(this.getAll())));
               //.set('id', );

        }


        translations = {
            "אזור": "Area",
            "שטח ארנונה": "Property Tax Area",
            "שטח מבונה": "Built-Up Area",
            "שטח ברוטו": "Gross Area",
            "שטח רשום": "Registered Area",
            "שטח נטו": "Net Area",


            "גו\"ח": "Parcel Number",
            "תאריך העסקה": "Transaction Date",
            "ישוב": "City",
            "שכונה": "Neighborhood",
            "רחוב": "Street",
            "מחיר למ\"ר": "Price per Square Meter",
            "אחוזי בניה": "Building Percentage",
            "גמר בניה": "Construction Finish",
            "שנת בניה": "Year of Construction",
            "חזית": "Frontage",
            "מגרש": "Lot",
            "ייעוד": "Type",

            "מחיר לחדר": "Price per Room",
            "מחיר למט\"ר": "Price per square meter",
            "מספר חדרים": "Number of Rooms",
            "קומה": "Floor",
            "מספר קומות": "Number of Floors",
            "דירות בבנין": "Apartments in Building",
            "חניה צמודה ל": "Attached Parking to",
            "מעלית": "Elevator",
            "גג": "Roof",
            "מחסן": "Storage",
            "חצר": "Yard",
            "גלריה": "Gallery",

        };

        /**
         * getPropertyValueArray method - returns an array of property values.
         * @returns {array}
         */

        getPropertyValueArray() {
            return $('.BoxB .col-sm-3, .BoxB.col-sm-10 > *').map((index, el) => {
                var property = $(el).find('strong').text().trim().replace(':', '');
                var value = $(el).find('span').text().trim();
                return { index, property, translate: this.translations?.[property], value };
            }).toArray();
        }

        /**
         * getPropertyValue method - get the value of a property.
         * @param {string} name 
         * @returns {string} value.
         */
        getPropertyValue(name) {
            return this.get('key-value')?.filter(obj => obj.translate === name).slice(0, 1).pop()?.value
        }

    }//end class



    const of = 'מתוך';
    const recordsPerPage = 12; //pages

    let page = input.page || 1; //page number to redirect.
    let records = $('#lblresh').text().replace(/[^0-9]/g, '') || recordsPerPage; // Number of records found.
    let lastPage = Math.ceil(records / recordsPerPage) || 1; // Last page of page navigator.
    let current = $('#lblPage').text().split(of, 1).pop().replace(/[^0-9]/g, '').trim() || 1; //Current page.
    let error = $('#ContentUsersPage_LblAlert').text().trim() || ''; //Error message on page.



    class DataTable {

        constructor(tableSelector, rowSelector) {
            this.table = $(tableSelector);
            this.rows = this.table.find(rowSelector);
            this.columnSelectors = {};
        }

        /**
         * Sets the selector for a column.
         * 
         * @param {string} columnName - Name of the column.
         * @param {string} selector - Selector for the column's cell.
         * @param {any} defaultValue - Default value for the column. Optional.
         * @param {function} processValue - Function to process the column value. Optional.
         */

        set(columnName, selector, defaultValue = null, processValue = null) {
            this.columnSelectors[columnName] = { selector, defaultValue, processValue };
        };

        setValue(row, columnName, value) {
            const columnData = this.columnSelectors[columnName];
            if (columnData) {
                const { selector, processValue } = columnData;
                const cell = $(row).find(selector)[0];
                if (cell) {
                    const newValue = processValue ? processValue(value) : value;
                    $(cell).text(newValue);
                }
            }
        }


        setColumnValue(columnName, value) {
            this.rows.each((index, row) => {
                if (typeof (value) == 'function') {
                    this.setValue(row, columnName, value(index, row));
                } else {
                    this.setValue(row, columnName, value);
                }

            });
        }

        /**
         * Gets the value of a specific cell in a row.
         * 
         * @param {object} row - Row object.
         * @param {string} selector - Selector for the cell.
         * @param {any} defaultValue - Default value for the cell. Optional.
         * @param {function} processValue - Function to process the cell value. Optional.
         * 
         * @returns {string} The value of the cell.
         */

        getColumnValue(row, selector, defaultValue = null, processValue = null) {
            const cell = $(row).find(selector)[0];
            if (cell) {
                const text = $(cell).text().trim();
                if (text) {
                    const value = isNaN(text) ? text : parseFloat(text.replace(/[^0-9.-]+/g, ""));
                    return processValue ? processValue(cell) : value;
                }
            }
            return defaultValue;
        };

        /**
         * Gets the data from the table.
         * 
         * @returns {array} Array of objects containing the data from the table.
         */

        getData() {
            return this.rows.map((index, row) => {
                const data = Object.entries(this.columnSelectors).reduce((obj, [columnName, columnData]) => {
                    const { selector, defaultValue, processValue } = columnData;
                    obj[columnName] = this.getColumnValue(row, selector, defaultValue, processValue);
                    return obj;
                }, {});


                return data;
            }).get();
        };

    } //end class DataTable

    let table = new DataTable('table.table', 'tr[class*="row"], tr[class*="Box"]');

    table.set('linkId', 'td:nth-child(2) a', '', value => $(value).attr('id'));
    table.set('numberId', 'td:nth-child(2)', '');
    table.set('transactionDate', 'td:nth-child(3)', '', value => $(value).text().trim());
    table.set('declaredValueInNIS', 'td:nth-child(4)', 0, value => convertStringToNumber($(value).text().trim()));
    table.set('salesValueInNIS', 'td:nth-child(5)', 0, value => convertStringToNumber($(value).text().trim()));
    table.set('unitFunction', 'td:nth-child(6)', '(N/A)');
    table.set('soldParts', 'td:nth-child(7)', '0');
    table.set('settlement', 'td:nth-child(8)', '(N/A)');
    table.set('yearOfConstruction', 'td:nth-child(9)');
    table.set('registeredArea', 'td:nth-child(10)', 0);
    table.set('rooms', 'td:nth-child(11)', 0);

    let rows = [];

    if (input.save === true) { //Only save for.
        collect({ status: 'succeed', message: 'Saved' });
    }
    else {

        rows = table.getData();
        for (let i = 0; i < rows.length; i++) {
            rows[i]['id'] = hash(JSON.stringify(rows[i]));
            rows[i]['uuid'] = generateUUID();
            rows[i]['status'] = 'Successful';
            rows[i]['page'] = Number(current);
            rows[i]['line'] = Number(i);
            rows[i]['collectedDate'] = String((new Date()).toISOString());
        }

    }

    let prop = new Prop();
    let details = prop.getAll();
    return { error, rows, lastPage, records, current, details };
}


function getLinks() {
    return $("#ContentUsersPage_GridMultiD1 a[id*='ContentUsersPage_GridMultiD1_LogShow']").toArray();
}


async function proccessResultsUsingTagResponse(points) {
   // console.log(points)


    if(points.length<=0){
        return;
    }

    console.log(JSON.stringify(points))
    
    try {
    
    
    
    



        console.log('points size: ' + points.length);
        
        // Ordenar los puntos por fecha
        /*
        points.sort(function (a, b) {
            return new Date(a._dateSell) - new Date(b._dateSell);
        });*/

        // Crear los objetos "rows" a partir del array ordenado de puntos
        const PAGE_SIZE = 12; // Tamaño de la página
        let rows = [];
        let lineNumber = 0;
        for (let i = 0; i < points.length; i++) {
            let obj = points[i];
            lineNumber = Number(i % PAGE_SIZE) || 0;
            rows.push({
                status: 'success',
                id: obj._isn,
                linkId: obj._crmn ? "ContentUsersPage_GridMultiD1_LogShow_".concat(lineNumber) : '',
                numberId: String(obj._gushHelka),
                transactionDate: String(obj._dateSell),
                declaredValueInNIS: parseFloat(obj._mutzharTemp),
                salesValueInNIS: parseFloat(obj._shoviTemp),
                unitFunction: String(obj._mahut),
                soldParts: parseFloat(obj._helekNimkar),
                settlement: String(obj._city),
                yearOfConstruction: parseInt(obj._year),
                registeredArea: parseFloat(obj._shetah),
                rooms: parseInt(obj._roms),
                page: String(Math.ceil((1 + i) / PAGE_SIZE)) || "1",
                line: String(lineNumber),
                collectedDate: String((new Date()).toISOString()),
            });
        }

        
        

        
        if (rows.length > 0) {

            console.log({
                ...input,
                            'numberId': row.numberId,
                            row: row,
                            url: location.href,
                            page: row.page,
                            cookies: cookies,
                            save: input.save,
            })
    
            // For each row, call a next stage function.
            for (let row of rows) {

                if (row.linkId) {
                    /*next_stage({
                        ...input,
                        'numberId': row.numberId,
                        row: row,
                        url: location.href,
                        page: row.page,
                        cookies: cookies,
                        save: input.save,
                    });
                    */
                } else {
                    /*
                    collect({
                        ...row,
                        project: input.project,
                        owner: input.owner,
                    });
                    */
                }
            }
        } else {
            collectError('No results found');
        }


    } catch (error) {
        const errorMessage = "TagResponseError: " + error.message;
        //collectError(errorMessage);
        throw new Error(errorMessage);
        //rerun_stage({ ...input, page });
    }
}
