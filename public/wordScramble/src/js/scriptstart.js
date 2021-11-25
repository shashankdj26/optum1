
function StartGame()
{
    location.replace("quiz.html")
}

function ShowScore()
{
    location.replace("share.html")
}

function NextOnShare()
{
    $("#nextshare").empty().append("<img src='img/boost.jpg' alt='Snow' style='width:100%'><input id='btn' class='bt' type='image' src='img/check.png' style='width:60%' value='show score' alt='Submit' onmousedown='ShowScore();'>")
  //  $("#quickguide").append("<img src='img/boost.jpg' alt='Snow' style='width:100%'><input id='btn' class='bt' type='image' src='img/boost.png' value='show score' alt='Submit' onclick='ShowScore();'>");

}
if (window.performance) {
    console.info("window.performance works fine on this browser");
  }
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      location.replace("index.html")
    } else {
      console.info( "This page is not reloaded");
    }

   