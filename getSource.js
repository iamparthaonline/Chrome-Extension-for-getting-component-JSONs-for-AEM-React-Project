function processPageSource(source) {
    var regX = /(<script>)\n(SR.components.data.push).*(\}\);\n(<\/script>))/g
    var result = [];
    var myArray;
    while ((myArray = regX.exec(source)) !== null) {
        var msg = myArray[0].substring(33, myArray[0].length - 12);
        result.push(JSON.parse(msg));
    }
    chrome.runtime.sendMessage({
        action: "getSource",
        source: result
    });
}

function getSource(url) {
    var xmlhttp;

    if ("XMLHttpRequest" in window)
        xmlhttp = new XMLHttpRequest();
    if ("ActiveXObject" in window)
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4)
            return processPageSource(xmlhttp.responseText);
        else
            return "Something went wrong";
    };
    xmlhttp.send(null);
}

getSource(window.location.href);