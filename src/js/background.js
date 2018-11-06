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
    id:"selectedchromecensor",
    title: "Comprehend and translate",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id:"selectedchromecensorenglish",
    parentId:"selectedchromecensor",
    title: "English",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id:"selectedchromecensorfrench",
    parentId:"selectedchromecensor",
    title: "French",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id:"selectedchromecensorgerman",
    parentId:"selectedchromecensor",
    title: "German",
    contexts: ["selection"]
});

chrome.contextMenus.create({
    id:"selectedchromecensorjapense",
    parentId:"selectedchromecensor",
    title: "Japanese",
    contexts: ["selection"]
});
