var sidebar = document.getElementById('fileList')
// var editor = document.getElementById('script')

var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

chrome.storage.sync.get(null, (items) => {
    var allURLs = Object.keys(items)
    allURLs.forEach((url) => {
        console.log(url)
        let li = document.createElement('li')
        let text = document.createTextNode(url)
        li.appendChild(text)
        li.addEventListener('click', urlListItemListener(items[url]))

        sidebar.appendChild(li)
    }); 
});

function urlListItemListener(script) {
    return function() {
        editor.value = script
    }
}


document.getElementById('save').addEventListener('click', saveListener)

function saveListener() {
    let runOnURL = document.getElementById('runOnURL').value
    let script = document.getElementById('script').value

    let msg = {runOnURL: runOnURL, script: script}

    chrome.runtime.sendMessage({save: JSON.stringify(msg)})
}