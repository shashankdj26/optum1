
var temp=navigator.userAgent;
var user = detect.parse(temp);
var ver=user.browser.version;
var browser=user.browser.family;

console.log(browser);
console.log(user.browser.major);
console.log(user.browser.minor);
console.log(ver);
console.log(temp);

//createCanvasApp();
if(user.device.type==="Desktop"){
    if(browser==="Chrome"){
      if(ver>=83)
        window.location.href = "/index.html";
    }
    else if(browser==="Safari"){
      if(ver>=13)
          window.location.href = "/index.html";
    }
    else if(browser==="Firefox"){
      if(ver>=77)
          window.location.href = "/index.html";
    }
}