
document.getElementById("new").addEventListener("click", openNewEditor)

function openNewEditor() {
    chrome.runtime.sendMessage({action: 'openNewEditor'})
}