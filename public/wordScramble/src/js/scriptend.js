
 var score;
 var totalquest;
const shareButton = document.querySelector('.share-button');

window.onload 
{ 
  score = localStorage.getItem("storageName");
  totalquest = localStorage.getItem("totalquestion");  
  if(score<6)
    {
      $("#riskdata").append("<div class='child'><p id='risk-status'>You are a COVID-19 beginner.</p></div><div class='child'><span class='fa fa-star checked'></span><span class='fa fa-star'></span><span class='fa fa-star'></span><p id='risk-status'>You need to learn a lot more and take precautions to combat COVID-19.</p></div>");
    }
    else if(score>5 && score<8)
    {
      $("#riskdata").append("<div class='child'><p id='risk-status'>You’re a COVID-19 soldier.</p></div><div class='child'><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star'></span><p id='risk-status'>A little more awareness will help you take the right precautions.</p></div>");
    }
    else
    {   
      $("#riskdata").append("<div class='child'><p id='risk-status'>You’re a COVID-19 fighter!</p></div><div class='child'><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><span class='fa fa-star checked'></span><p id='risk-status'>You have the right know-how to combat COVID-19.</p></div>");
    }
  /*  if(score<10)
    {      
     // document.getElementById("score_board").innerHTML= score+"/"+totalquest;
    setTimeout(function(){
      if(document.getElementById('score_board') !== null)
        document.getElementById("score_board").innerHTML = "Paragraph changed!";
     
    },10);
      //console.log( document.getElementById("score_board"));
    //  document.getElementById("score_board").innerHTML= 0+"&nbsp;&nbsp;"+score;
    }
 	else
   document.getElementById("scoreboard").innerHTML= 1+"&nbsp;&nbsp;"+0;*/
   setTimeout(function(){
    if(document.getElementById('score_board') !== null)
      document.getElementById("score_board").innerHTML = score+"/"+totalquest;
      UpdateScrore(score,'wordscramble_game');   
  },10);
}
// shareButton.addEventListener('click', event => {	
//   if (navigator.share) {
//     navigator.share({
//       title: 'Western Digital',
//       url: 'https://bit.ly/2Uoh6Ls', 
//       text: "Hi! Do you know enough to protect yourself against coronavirus? Play this game to find out. I scored "+score+"/10. What about you\n"

//     }).then(() => {
//       console.log('Thanks for sharing!');
//       location.replace("index.html")
//     })
//     .catch(console.error);
//   } else {
//      alert("your browser does not support sharing");
//   }
// });

function RestartApp()
{
	 location.replace("index.html")
}
/*
function Share()
{
	
if (navigator.share) {
    navigator.share({
      title: 'WebShare API Demo',
      url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  } else {
    alert("your browser does not support sharing");
  }
}*/

/*
if (window.performance) {
  console.info("window.performance works fine on this browser");
}
  if (performance.navigation.type ==  performance.navigation.TYPE_RELOAD) {
    location.replace("index.html")
  } else {
    console.info( "This page is not reloaded");
  }*/

