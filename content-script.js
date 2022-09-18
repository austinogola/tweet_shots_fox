// window.addEventListener("click", notifyExtension);

// function notifyExtension(e) {
//   if (e.target.tagName !== "A") {
//     return;
//   }
//   browser.runtime.sendMessage({"url": e.target.href});
// }

// browser.runtime.onMessage.addListener(makeCall)

// function makeCall(message) {
//   console.log(message);
// }


browser.runtime.onMessage.addListener((request) => {
  
  
  const url=request.url

  const pattern=/https:\/\/twitter\.com\/(.*)\/status\/(.*)/

  if(url.match(pattern)){
    fetch('http://localhost:5000/save_tweet/',{
      method:'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({twtUrl:url})
    })
    .then(res=>res.json())
    .then(result=>{
      const authorizationUrl=result.authorizationUrl
      console.log(authorizationUrl);
      browser.runtime.sendMessage({authorizationUrl:authorizationUrl});
    })
    .catch(err=>{
      showNotification('Err ',err.message)
      console.log(err.message);
    })

  }else{
    console.log("It doesn't");
    showNotification('No',"Please select tweet")
  }

  return Promise.resolve({ message: "Url received,processed..." });

});














const showNotification=(sign,text)=>{
  let notiParent=document.createElement('div')
  notiParent.style.width='250px'
  notiParent.style.height='30px'
  notiParent.style.padding='10px'
  notiParent.style.background='#323232'
  notiParent.style.border='#CAE0D0 1px solid'
  notiParent.style.borderRadius='10px'
  notiParent.style.display='flex'
  notiParent.style.justifyContent='center'
  notiParent.style.alignItems='center'
  notiParent.style.display='none'
  // notiParent.style.animation='10s'

  let notiText = document.createElement("p");
  let mark=document.createElement('p')
  // mark.innerText='✓'
  mark.innerText=sign
  mark.style.fontSize='18px'
  mark.style.marginRight='10px'
  mark.style.color='white'
  // notiText.innerText='Successfully uploaded'
  notiText.innerText=text
  notiText.style.fontSize='16px'
  notiText.style.color = 'white';


  notiParent.style.position='sticky'
  notiParent.style.bottom='5px'
  notiParent.style.left='20px'
  notiParent.appendChild(mark)
  notiParent.appendChild(notiText)
  notiParent.className='notificationBtn'
  // notiParent.style.bottom='100px'

  document.body.appendChild(notiParent)

  function moveNoti(){
    let id = null;
    const elem=document.querySelector('.notificationBtn')
    notiParent.style.display='flex'
    notiParent.style.bottom='5px'
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame(){
      if(pos==100){
        clearInterval(id)
        const dis=setTimeout(disappear,2000)
      }else{
        pos+=10
        elem.style.bottom = pos + "px";
      }

    }

    function disappear(){
      elem.style.display='none'
      elem.remove()
    }
  }

  moveNoti()
}
