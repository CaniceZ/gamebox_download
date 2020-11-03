import "./css/style.css"
import "swiper/swiper-bundle.css"
import $ from 'jquery'
import { Pagination, Navigation } from 'swiper';
Swiper.use([Pagination, Navigation]);
// import 'swiper/swiper-min.css';
// var Swiper = require('swiper');   
import Swiper from "swiper"
const fullpage = require("fullpage.js")
console.log(API_URL)
new fullpage('#fullpage', {
  autoScrolling: true,
  scrollHorizontally: true,
  onLeave:function(index,nextindex){
    console.log(index.index,nextindex.index);
    if (nextindex.index==4) {
      document.querySelector(".footer-arrow").style.visibility="hidden";
      // document.querySelector(".footer").style.bottom="27%";
    }else{
      document.querySelector(".footer-arrow").style.visibility="visible";
      // document.querySelector(".footer").style.bottom="2%";
    }
  }
});

var ua = navigator.userAgent.toLowerCase();
document.querySelector(".downLoadGame").onclick = function (){
  if(ua.match(/MicroMessenger\/[0-9]/i)) {
    $('.popup-overlay').fadeOut();
    showFilter();
    document.querySelector(".guide-container").style.display="none";
    return false;
  } else if (ua.match(/QQ\/[0-9]/i)&&(ua.indexOf("like mac os x") > 0 || (ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 1 && ua.indexOf("android") < 1))) {
    $('.popup-overlay').fadeOut();
    showFilter();
    document.querySelector(".guide-container").style.display="none";
    return false;
  }else{
    document.querySelector(".popup-overlay").style.display = "none";
  }
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
        document.querySelector(".popup-overlay").style.display = "block";
        document.querySelector(".guide-container").style.opacity = "1";
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
    window.open(`${ANDRIOD_URL}/76sy.apk`)
    document.querySelector(".popup-overlay").style.display = "none";
  }
}
document.querySelector("#weixin-tip").onclick = function (){
  document.querySelector(".popup-overlay").style.display = "none";
  document.querySelector("#weixin-tip").style.display = "none";
}
document.querySelector(".popup-overlay").onclick = function (){
  document.querySelector(".popup-overlay").style.display = "none";
  document.querySelector(".guide-container").style.opacity = "0";
}
function showFilter() {
  var filter = document.getElementById('weixin-tip');
  var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;
  filter.style.height = winHeight + "px";
  filter.style.display = 'block';
  return false;
}

// $(document).ready(function () {
  var swipe = new Swiper('.guide-container', {
    spaceBetween: 30,
       // 如果需要分页器
       pagination: {
        el: '.swiper-pagination',
      },
      
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
  });

