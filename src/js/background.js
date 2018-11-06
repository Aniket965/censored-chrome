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
	id: "selectedchromecensorArabic",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Arabic"
})
chrome.contextMenus.create({
	id: "selectedchromecensorChinese",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Chinese"
})
chrome.contextMenus.create({
	id: "selectedchromecensorCzech",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Czech"
})
chrome.contextMenus.create({
	id: "selectedchromecensorEnglish",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "English"
})
chrome.contextMenus.create({
	id: "selectedchromecensorFrench",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "French"
})
chrome.contextMenus.create({
	id: "selectedchromecensorGerman",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "German"
})
chrome.contextMenus.create({
	id: "selectedchromecensorItalian",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Italian"
})
chrome.contextMenus.create({
	id: "selectedchromecensorJapanese",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Japanese"
})
chrome.contextMenus.create({
	id: "selectedchromecensorPortuguese",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Portuguese"
})
chrome.contextMenus.create({
	id: "selectedchromecensorRussian",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Russian"
})
chrome.contextMenus.create({
	id: "selectedchromecensorSpanish",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Spanish"
})
chrome.contextMenus.create({
	id: "selectedchromecensorTurkish",
	parentId: "selectedchromecensor",
	contexts: ["selection"],
	title: "Turkish"
})
let langs = {
	"selectedchromecensorArabic" : "ar",
	"selectedchromecensorChinese" : "zh",
	"selectedchromecensorCzech" : "cs",
	"selectedchromecensorEnglish" : "en",
	"selectedchromecensorFrench" : "fr",
	"selectedchromecensorGerman" : "de",
	"selectedchromecensorItalian" : "it",
	"selectedchromecensorJapanese" : "ja",
	"selectedchromecensorPortuguese" : "pt",
	"selectedchromecensorRussian" : "ru",
	"selectedchromecensorSpanish" : "es",
	"selectedchromecensorTurkish" : "tr",
}
chrome.contextMenus.onClicked.addListener(function (e) {
    if (e.menuItemId in langs && e.selectionText) {
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
                        'translateTo': langs[e.menuItemId]
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
