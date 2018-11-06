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
    title: "Comprehend this text",
    contexts: ["selection"]
});
