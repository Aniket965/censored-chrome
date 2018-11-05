document.addEventListener('DOMContentLoaded', () => {
    let el = document.getElementById('mk');
    el.addEventListener('click',e => {
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
