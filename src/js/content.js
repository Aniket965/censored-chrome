
console.log('### content.js loded from censor chrome !')
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
    console.log(message);
    let paragraphs = document.getElementsByTagName('p');
    for (elt of paragraphs) {
        sendDataToAws(elt.innerHTML)
    }
    let images = document.getElementsByTagName('img');
    for(img of images) {
       sendImgsToAws(img.src)
    }
}


function sendDataToAws(data) {
    console.log(`📃 :==> ${data}`)
}
function sendImgsToAws(data) {
    console.log(`🌄 :==> ${data}`)
}