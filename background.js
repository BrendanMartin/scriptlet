let prevHostname = ''

function getHostname(url) {
    let u = new URL(url)
    return u.protocol + '//' + u.hostname
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url !== undefined) {
        let hostname = getHostname(changeInfo.url)
        if (hostname == prevHostname) {
            return;
        }
        chrome.storage.sync.get([hostname], (result) => {
            console.log("result:", result)
            chrome.tabs.executeScript({
                code: result[hostname]
            });
        });
        prevHostname = hostname
    }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action !== undefined) {
        switch(msg.action) {
            case 'openNewEditor':
                chrome.tabs.create({
                    url: '/main.html',
                    active: true,
                });
               return
        }
    } else if (msg.save !== undefined) {
        let data = JSON.parse(msg.save)
        let hostname = getHostname(data.runOnURL)
        let script = data.script
        chrome.storage.sync.set({[hostname]: script})
    }
});



