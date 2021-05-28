chrome.devtools.panels.create(
  "element render time",
  "FontPicker.png",
  "./index.html"
);
// chrome.extension.onRequest.addListener(function() {
//   console.log(arguments)
// })
// chrome.devtools.panels.elements.createSidebarPane("Images", function(sidebar)
// {
//   console.log('img', sidebar)
// 	// sidebar.setPage('sidebar.html'); // 指定加载某个页面
// 	// sidebar.setExpression('document.querySelectorAll("img")', 'All Images'); // 通过表达式来指定
// 	sidebar.setObject({aaa: 111, bbb: 'Hello World!'}); // 直接设置显示某个对象
// });
// chrome.devtools.panels.elements.onSelectionChanged.addListener(function() {
//   console.log('%c elementsSelect', 'color: green', arguments)
// })

// chrome.devtools.panels.sources.createSidebarPane("sss", function(sidebar) {
//   console.log('sources', sidebar)
//   sidebar.setPage('sidebar.html')
// })
// chrome.devtools.panels.sources.onSelectionChanged.addListener(function() {
//   // console.log('%c sourceSelect', 'color: red', arguments)
// })

// chrome.devtools.network.getHAR(function() {
//   console.log('%cnetwork', 'color: blue', arguments)
// })

// chrome.notifications.create(null, {
//   title: '123',
//   message: 'asd',
//   type: 'basic',
//   iconUrl: './FontPicker.png'
// }, notificationId => {
//   console.log(notificationId)
// })
// chrome.notifications.onClicked.addListener((notificationId) => {
//   console.log(notificationId)
//   chrome.tabs.create({
//     url: 'http://www.baidu.com'
//   }, tab => {
//     console.log('tab', tab)
//   })
// }) 

// // chrome.webRequest.onBeforeRequest.addListener(
// //   detail => {
// //     if (/\/rest\/api\/content\/(.*)\?status=draft/.test(detail.url)) {
// //       console.log(detail)
// //     }
// //     // chrome.devtools.network.getHAR(harlog => {
// //     //   console.log('%charlog', 'color:#91c52a;', harlog)
// //     //   if (harlog.entries.length){
// //     //     harlog.entries[0].getContent((content, encoding) => {
// //     //       console.log(content)
// //     //       console.log(encoding)
// //     //     })
// //     //   }
// //     // })
// //   },
// //   {
// //     urls: ["<all_urls>"]
// //   }
// // )
// chrome.devtools.inspectedWindow.eval(
//   "jQuery.fn.jquery",
//   function(result, isException) {
//     console.log('inspectedWindow', arguments)
//     if (isException) {
//       console.log("the page is not using jQuery");
//     } else {
//       console.log("The page is using jQuery v" + result);
//     }
//   }
// );
