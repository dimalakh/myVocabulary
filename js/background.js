chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if(message.page === "diction"){
   chrome.tabs.create({url: chrome.extension.getURL('index.html')});
 }
 else if (message.page === "learn") {
   chrome.tabs.create({url: chrome.extension.getURL('learn.html')});
 }
});
