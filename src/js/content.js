
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

// Add bubble to the top of the page.
var bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection_bubble');
document.body.appendChild(bubbleDOM);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
  var selection = window.getSelection().toString();
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, selection);
  }
}, false);


// Close the bubble when we click on the screen.
document.addEventListener('mousedown', function (e) {
  bubbleDOM.style.visibility = 'hidden';
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  bubbleDOM.innerHTML = "⭐️ comprehend this";
  bubbleDOM.style.top = mouseY  + 20+ 'px';
  bubbleDOM.style.left = mouseX + 20 + 'px';
  bubbleDOM.style.visibility = 'visible';
}