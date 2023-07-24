// background.js

// Function to send a message to the content script
function sendMessageToContentScript(tabId, message) {
  chrome.tabs.sendMessage(tabId, message);
}

// Listener for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.enabled === true && sender.tab) {
    sendMessageToContentScript(sender.tab.id, { enabled: true });
  }
});
