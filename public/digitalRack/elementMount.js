
var mainContainer = document.querySelector(".mainContainer");
function mountElements() {

  let el = window.location.href.split('?')[1] 
  el = el ? el : Object.keys(elements)[0]
  console.log(el);
  elements[el].forEach(element => {

    switch (element.type) {
      case "title":
        document.getElementById("heading").innerText=element.title;
        break;
      case "Pdf":
        makePDF(element)
        break;
      case "video":
        if(element.provider === "vimeo")
        {
          makeVimeoVideoContainer(element);
        }else if(element.provider === "youtube")
        {
          makeYoutubeVideoContainer(element);
        }
        break;
    }
  });
  SetupButtonInteractions();
}

function makePDF(element) {
  var firstElement = document.createElement('div');
  firstElement.classList.add("col-md-4");
  firstElement.innerHTML = `
    <div class="card mb-4 box-shadow">
      <img class="card-img-top"
        data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
        alt="Thumbnail [100%x225]" style="height: auto; width: 100%; display: block;" src=${element.thumbnail}
        data-holder-rendered="true">
      <div class="card-body">
        <p class="card-text">${element.title}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary vimeo-video-view" data-toggle="modal"
            data-target="#vimeo-Modal" video-url=/web/viewer.html?file=${element.link}
            id="vimeo-video-view-a">View</button>
          
            <a type="button" class="btn btn-sm btn-outline-secondary actionButton download-pdf"
              href=${element.link} target="_blank" download=${element.downloadFileName}>Download</a>
          </div>
        </div>
      </div>
    </div>`;
  mainContainer.appendChild(firstElement);
}

function makeVimeoVideoContainer(element) {
  var firstElement = document.createElement('div');
  firstElement.classList.add("col-md-4");
  firstElement.innerHTML = `
            <div class="card mb-4 box-shadow">
              <img class="card-img-top"
                data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
                alt="Thumbnail [100%x225]" src=${element.thumbnail} data-holder-rendered="true"
                style="height: auto; width: 100%; display: block;">
              <div class="card-body">
                <p class="card-text">${element.title}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                   
                  <button type="button" class="btn btn-sm btn-outline-secondary vimeo-video-view" data-toggle="modal"
                      data-target="#vimeo-Modal" video-url=${element.link}
                      id="vimeo-video-view-a">View</button>
                     
                      ${ element.downloadLink ? (
      `<button type="button" class="btn btn-sm btn-outline-secondary download-video actionButton"
                    url=${element.downloadLink}>Download</button>`
    ) : ("")}
                    
                  </div>
                </div>
              </div>
            </div>`;
  mainContainer.appendChild(firstElement);
}

function makeYoutubeVideoContainer(element) {
  var firstElement = document.createElement('div');
  firstElement.classList.add("col-md-4");
  firstElement.innerHTML = `
  <div class="card mb-4 box-shadow">
    <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
     alt="Thumbnail [100%x225]" src=${element.thumbnail} data-holder-rendered="true" style="height: auto; width: 100%; display: block;">
    <div class="card-body">
      <p class="card-text">${element.title}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary youtube-video-view" data-toggle="modal" data-target="#youTubeModal" video-url=${element.link} id="vimeo-video-view-d">View</button>
          
        </div>
      </div>
    </div>
  </div>`;
  mainContainer.appendChild(firstElement);
}


function SetupButtonInteractions() {
  let getVimeoIframe = document.getElementById('videoPlayerIframe');
  let youtubeIframe = document.getElementById('youtube-iframe-for-modal');

  $('.vimeo-video-view').on("click", function () {
    let url = $(this).attr("video-url");
    getVimeoIframe.src = url;
  });

  $('.youtube-video-view').on("click", function () {
    let url = $(this).attr("video-url");
    youtubeIframe.src = url;
  });


  $('.close').on("click", function () {
    getVimeoIframe.src = "";
    youtubeIframe.src = ""
  });

  $('.modal').on("click", function () {
    getVimeoIframe.src = "";
    youtubeIframe.src = ""
  });

  $('.download-video').on("click", function () {
    let url = $(this).attr("url");
    console.log(url);
    download(url);
  });

  $('.download-pdf').on("click", function (event) {
    event.preventDefault();
    let url = $(this).attr("href");
    let downloadName = $(this).attr("download");

    let fileName = downloadName.split(".")
    addDownloadAnalytics(fileName[0]);
   
    var oReq = new XMLHttpRequest();
    // The Endpoint of your server 
    var URLToPDF = url;//"https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

    // Configure XMLHttpRequest
    oReq.open("GET", URLToPDF, true);

    // Important to use the blob response type
    oReq.responseType = "blob";

    // When the file request finishes
    // Is up to you, the configuration for error events etc.
    oReq.onload = function () {
      // Once the file is downloaded, open a new window with the PDF
      // Remember to allow the POP-UPS in your browser
      var file = new Blob([oReq.response], {
        type: 'application/pdf'
      });

      // Generate file download directly in the browser !
      saveAs(file, downloadName);
    };

    oReq.send();
  });
}


mountElements();