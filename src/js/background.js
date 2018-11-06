chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);

    });
});
chrome.contextMenus.create({
    id: "selectedchromecensor",
    title: "Comprehend and translate",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id: "selectedchromecensorenglish",
    parentId: "selectedchromecensor",
    title: "English",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id: "selectedchromecensorfrench",
    parentId: "selectedchromecensor",
    title: "French",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id: "selectedchromecensorgerman",
    parentId: "selectedchromecensor",
    title: "German",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id: "selectedchromecensorjapense",
    parentId: "selectedchromecensor",
    title: "Japanese",
    contexts: ["selection"]
});
chrome.contextMenus.onClicked.addListener(function (e) {
    if (e.menuItemId === "selectedchromecensorjapense" && e.selectionText) {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        fetch('https://fs22b8rq04.execute-api.us-east-1.amazonaws.com/Prod/', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                "elements": [
                    {
                        "type": "text",
                        "content": e.selectionText,
                        "action": "translate",
                        'translateTo': 'ja'
                    },
                ]
            })
        }).then(data => {
            data.json().then(d => {
                console.log(d);
                chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { toolobjec: d.message[0] }, function (response) {
  
                    });
                });

            })
        }).catch(err => console.log(err))
    }
})