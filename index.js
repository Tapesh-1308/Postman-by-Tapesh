// no of parameters 
let addedParamsCount = 0;

// utility function 

// to get dom element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//hiding parameters box 
let requestJsonBox = document.getElementById('requestJsonBox');
requestJsonBox.style.display = 'none';

// if content type = param box hide json
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})

// if content type = json box hide param 
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'flex';
    document.getElementById('parametersBox').style.display = 'none';
})

// plus button functionality 
let addParams = document.getElementById('addParams');
addParams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div id="parametersBox " class="my-2">
                    <div class="row">
                        <label for="url" class="col-sm-2 col-form-label">Parameters ${addedParamsCount + 2}</label>
                        <div class="col">
                            <input type="text" id="parameterKey${addedParamsCount + 2}" class="form-control" placeholder="Enter Parameter ${addedParamsCount + 2} Key">
                        </div>
                        <div class="col">
                            <input type="text" id="parameterValue${addedParamsCount + 2}" class="form-control" placeholder="Enter Parameter ${addedParamsCount + 2} Value">
                        </div>
                        <button class="col-1 btn btn-primary deleteParam">-</button>
                    </div>
                </div>`;


    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // removeing element 
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        });
    }
    addedParamsCount++;

})

//submit button functionality
let submit = document.getElementById('submit');
let responsePrism = document.getElementById('responsePrism');
submit.addEventListener('click', () => {
    // loading...
    responsePrism.innerHTML = "Please Wait... Fetching Response..."

    // fetching all values
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;



    // params option
    let data = {};
    if (contentType == 'params') {
        for (let i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }

    else {
        data = document.getElementById('requestJsonText').value;
    }

    // console.log
    //  console.log("url is", url);
    //  console.log("request", requestType);
    //  console.log("content type", contentType);
    //  console.log("data", data);

    //get request type 
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }

    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            })
    }
});
