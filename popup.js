// Always set to true.
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, { enabled: true });
});
