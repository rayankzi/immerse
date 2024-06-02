export {}

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL)
    chrome.tabs.create({ url: chrome.runtime.getURL("/tabs/welcome.html") })
})
