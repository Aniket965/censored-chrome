
console.log('### content.js loded from censor chrome !')
chrome.runtime.onMessage.addListener(gotMessage);
function gotMessage(message, sender, sendResponse) {
    console.log(message);
    let paragraphs = document.getElementsByTagName('p');
    for (elt of paragraphs) {
        sendDataToAws(elt.textContent)
    }
    let images = document.getElementsByTagName('img');
    for(img of images) {
       sendImgsToAws(img.src)
    }
}

let score_matric = {
    "NEUTRAL": 0,
    "NEGATIVE":-1,
    "POSITIVE":1,
    "MIXED":0
}

let score = 0;

function sendDataToAws(data) {
let headers = new Headers()
  headers.append('Content-Type', 'application/json')
    fetch('https://fs22b8rq04.execute-api.us-east-1.amazonaws.com/Prod/',{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "elements": [
                {
                    "type": "text",
                    "content": data
                }
            ]
        })
      }).then(data => {
          data.json().then(d => {
              score += score_matric[d.message[0].score]
              console.log(d.message,score)
              chrome.runtime.sendMessage({
                score: score // or whatever you want to send
            
              });
          })
      }).catch(err => console.log(err))
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