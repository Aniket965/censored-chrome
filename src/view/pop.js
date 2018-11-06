document.addEventListener('DOMContentLoaded', () => {
    let el = document.getElementById('mk');
    el.addEventListener('click', e => {
        let params = {
            active: true,
            currentWindow: true
        }
        chrome.tabs.query(params, gotTabs);
        function gotTabs(tabs) {
            console.log("got tabs");
            console.log(tabs);
            // send a message to the content script
            let message = "yoyo!"
            let msg = {
                txt: message
            };
            chrome.tabs.sendMessage(tabs[0].id, msg);
        }
    })

}, false);
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        let ele = document.getElementById('score')
        let score = request.score

        if (score > 0) {
            ele.classList.add("positive");
            ele.classList.remove("neutral")
            ele.classList.remove("negative")
        } else if (score === 0) {
            ele.classList.add("neutral");
            ele.classList.remove("positive")
            ele.classList.remove("negative")
        } else {
            ele.classList.add("negative");
            ele.classList.remove("neutral");
            ele.classList.remove("positive");
        }
        ele.innerHTML = `Score: ${request.score}`
    }
);


