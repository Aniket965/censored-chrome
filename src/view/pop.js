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

// Add event listener for mouseup (there is no event for selection)
document.addEventListener('mouseup', highlightSelectedBlock, false)

function highlightSelectedBlock () {
  // TODO Filter only selections

  // Get Node where selection starts
  let elementWhereSelectionStart = window.getSelection().anchorNode

  // TODO Get Node where selection ends with Selection.focusNode()
  // TODO Get Nodes in between start and end of selection

  // I've hardcoded finding closest block element for a simplicity
  let closestBlockElement = elementWhereSelectionStart.parentNode

  // Add non disturbing border to selected elements
  // For simplicity I've adding outline only for the start element
  closestBlockElement.style.outline = '1px solid blue'
  
  // TODO Clear outline on some event: saving selection, ending selection etc
  setTimeout(() => { closestBlockElement.style.outline = 'none' }, 2000)
}
