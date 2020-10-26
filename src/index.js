import "./css/style.css"
import $ from 'jquery'
const fullpage = require("fullpage.js")
console.log(API_URL)
new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: true,
  onLeave:function(index,nextindex){
    console.log(index.index,nextindex.index);
    if (nextindex.index==4) {
      document.querySelector(".footer-arrow").style.display="none";
    }else{
      document.querySelector(".footer-arrow").style.display="block";
    }
  }
});

var ua = navigator.userAgent.toLowerCase();
document.querySelector(".downLoadGame").onclick = function (){
  if(ua.indexOf("like mac os x") > 0 || (ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 1 && ua.indexOf("android") < 1)){
    $.ajax({
      type: "get",
      url: `${API_URL}/Api/DownloadGame.do`,
      data: {
        gameId: "76sy001",
        deviceType: 2,
        mcId:"M0",
        scId:"M0_S0",
        iosSystemVersion: ""
      },
      dataType: "json",
      success: function (data) {
        location.href =
          "itms-services://?action=download-manifest&url=" +
          data.downloadUrl["1"];
        setTimeout(() => {
          location.href =
            "itms-services://?action=download-manifest&url=" +
            data.downloadUrl["1"];
        }, 2000);
      }
    });
  }else{
    var data = {
      gameId: "76sy001",
      deviceType: 1,
      mcId:"M0",
      scId:"M0_S0",
      iosSystemVersion: ""
    }
    location.href = `${API_URL}/Api/DownloadGame.do?gameId=${data.gameId}&deviceType=${data.deviceType}&mcId=${data.mcId}&scId=${data.scId}&iosSystemVersion=${data.iosSystemVersion}`

  }
}
$(function(){
  if(ua.match(/MicroMessenger\/[0-9]/i)) {
    $('.popup-overlay').fadeOut();
    showFilter();
  } else if (ua.match(/QQ\/[0-9]/i)) {
    $('.popup-overlay').fadeOut();
    showFilter();
  }else{
    document.querySelector(".popup-overlay").style.display = "none";
  }
})
function showFilter() {
  var filter = document.getElementById('weixin-tip');
  var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;
  filter.style.height = winHeight + "px";
  filter.style.display = 'block';
}
