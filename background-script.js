// browser.runtime.onMessage.addListener(notify);

// function notify(message) {
//   browser.notifications.create({
//     "type": "basic",
//     "iconUrl": browser.extension.getURL("link.png"),
//     "title": "You clicked a link!",
//     "message": message.url
//   });
// }

browser.runtime.onInstalled.addListener(() => {
  browser.menus.create({
    "id": "ourContextMenu",
    "title": "Add tweeet to Photos",
    "contexts": ["all"],
    "documentUrlPatterns":['<all_urls>'] //*.twitter.com/*
  });
});

browser.menus.onClicked.addListener(async(info,tab)=>{
  browser.tabs.query({
    currentWindow:true,
    active:true
  })
  .then(
    browser.tabs.sendMessage(tab.id,{url:info.pageUrl})
    .then(response=>{
      console.log(response.message);
    })
  )
})

browser.runtime.onMessage.addListener(async(message)=>{
  if(message.authorizationUrl){
    let creating=browser.tabs.create({
      active:true,
      url:message.authorizationUrl
    })
  }
})



//(*://*.mozilla.org/*)



