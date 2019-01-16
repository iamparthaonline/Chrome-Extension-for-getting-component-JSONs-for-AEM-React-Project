chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        createMarkupForAttributes(request.source);
    }
});

function errorHandler(msg) {
    var message = document.querySelector('#message');
    message.innerText = msg;
}
function successHandler(markup){
    var results = document.querySelector('#results');
    errorHandler('');
    results.innerHTML = markup;
}

function createMarkupForAttributes(componentList) {
    if (componentList && componentList.length > 0) {
        var componentListMarkup = '<ul>';
        componentList.map(function (component, index) {
            componentListMarkup += `<li> <span> ${index + 1}. ${component.type} - ${ (document.getElementsByClassName(component.type) ? "<span class='ssr-success'>&#10004;</span>": "<span class='ssr-fail'>✘</span>" )} </span> <textarea>${JSON.stringify(component)}</textarea> </li>`;
        });
        componentListMarkup += '</ul>'
        successHandler(componentListMarkup);
    } else {
        errorHandler(" Components not Found!")
    }
}


function onWindowLoad() {

    chrome.tabs.executeScript(null, {
        file: "getSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            errorHandler('There was an error injecting script : \n' + chrome.runtime.lastError.message);
        }
    });

}

window.onload = onWindowLoad;