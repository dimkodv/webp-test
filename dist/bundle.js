(()=>{"use strict";function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var t=function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),console.log("init Modal")}var a,n;return a=t,n=[{key:"init",value:function(e,t,a){document.getElementsByClassName("popup--".concat(a))[0]?this.openModal(a):(this.initPopup=this.renderModal(e,t,a),document.body.insertAdjacentHTML("afterbegin",this.initPopup))}},{key:"openModal",value:function(e){document.getElementsByClassName("popup--".concat(e))[0].classList.add("open")}},{key:"renderModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Заглавие попапа"+"".concat(a),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"Описание попапа",a=arguments.length>2?arguments[2]:void 0;return'\n            <div class="popup popup--unique open popup--'.concat(a,'">\n                <div class="popup__block">\n                    <span class="popup__close" data-id="').concat(a,'"></span>\n                    <div class="popup__title">').concat(e,'</div>\n                    <div class="popup__descr">').concat(t,"</div>\n                </div>                           \n            </div>\n        ")}},{key:"closeModal",value:function(e){document.getElementsByClassName("popup--".concat(e))[0].classList.remove("open")}},{key:"removeModal",value:function(e){document.getElementsByClassName("popup--".concat(e))[0]&&document.getElementsByClassName("popup--".concat(e))[0].remove()}},{key:"removeAllinstances",value:function(e){for(var t=document.querySelectorAll(".popup--unique:not(.popup--".concat(e,")")),a=0;a<t.length;a++)t[a].remove()}}],n&&e(a.prototype,n),Object.defineProperty(a,"prototype",{writable:!1}),t}();function a(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var n=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.ROOT_SPINNER=""}var t,n;return t=e,(n=[{key:"showLoader",value:function(e,t){var a=this;a.loaderHtml=this.renderLoader(t),e&&(e.insertAdjacentHTML("afterbegin",a.loaderHtml),a.hideLoader(t))}},{key:"hideLoader",value:function(e){setTimeout((function(){if(document.getElementById("loader-"+e)&&document.getElementById("loader-"+e).remove(),!document.getElementById("loader-"+e))for(var t=document.querySelectorAll(".loader"),a=0;a<t.length;a++)t[a].remove()}),1e3)}},{key:"renderLoader",value:function(e){return this.ROOT_SPINNER=document.getElementById("loader-"+e),'\n           <div id="loader-'.concat(e,'" class="loader" data-id="').concat(e,'"></div>\n        ')}}])&&a(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function r(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var o=new t,c=new n,d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.addCardBtn=document.getElementsByClassName("add")[0],this.resetGridBtn=document.getElementsByClassName("reset")[0],this.fillGridBtn=document.getElementsByClassName("fill")[0],this.cardHtml="",this.cardId=0,this.title="Заглавие попапа:",this.descr="Описание попапа:"}var t,a;return t=e,(a=[{key:"init",value:function(){localStorage.removeItem("contentHistory"),this.cardWrap=document.createElement("div"),this.cardWrap.classList.add("card-grid"),document.body.append(this.cardWrap),this.getDataFromLocalStorage(),this.setDataToLocalStorage(),this.navigationEvents()}},{key:"navigationEvents",value:function(){for(var e=this,t=document.querySelectorAll(".card"),a=0;a<t.length;a++)c.hideLoader(t[a].dataset.id);setTimeout((function(){e.setDataToLocalStorage()}),1600),this.resetGridBtn.addEventListener("click",(function(t){t.preventDefault(),e.resetGrid()})),this.addCardBtn.addEventListener("click",(function(t){t.preventDefault(),e.addCard(),e.enableFillBtn()})),this.fillGridBtn.addEventListener("click",(function(t){t.preventDefault(),e.fillWrap(),this.classList.add("disabled")})),document.addEventListener("click",(function(t){if(t.target.matches(".remove")){t.preventDefault();var a=e.cardWrap.lastElementChild;if(a){var n=a.lastElementChild;e.setDeletedCardsToLocalStorage(n.parentNode.outerHTML),e.removeSingleCard(n),o.removeModal(a.dataset.id)}e.enableFillBtn(),e.checkGridAlignment()}}),!1),document.addEventListener("click",(function(t){t.target.matches("body > .card-grid .card__remove")&&(t.preventDefault(),e.setDeletedCardsToLocalStorage(document.querySelectorAll('[data-ids="'.concat(t.target.dataset.id,'"]'))[0].outerHTML),e.removeSingleCard(t.target),o.removeModal(t.target.dataset.id),e.enableFillBtn(),e.checkGridAlignment())}),!1),document.addEventListener("click",(function(t){if(t.target.matches(".card__modal")){t.preventDefault();var a=t.target.dataset.id;o.init(e.title+a,e.descr+a,a)}}),!1),document.addEventListener("click",(function(e){if(e.target.matches(".history")){e.preventDefault(),o.init("История удаления карточек","Список удаленных карточек:",777);var t=document.querySelectorAll(".popup--777 .popup__block")[0];if(!document.querySelector(".popup--777 .card-grid")){var a=document.createElement("div");a.classList.add("card-grid"),t.append(a),c.hideLoader("777")}setTimeout((function(){localStorage.getItem("contentHistory")&&(document.querySelectorAll(".popup--777 .card-grid")[0].innerHTML=localStorage.getItem("contentHistory"))}),500)}}),!1),document.addEventListener("click",(function(e){e.target.matches(".popup__close")&&o.closeModal(e.target.dataset.id)}),!1),this.checkGridAlignment(),document.addEventListener("click",(function(t){t.target.matches(".card__reestablish")&&e.reestablish(t.target.parentNode)}),!1)}},{key:"addCard",value:function(){var e=this;this.cardHtml=this.renderCard(),e.cardWrap.insertAdjacentHTML("beforeend",e.cardHtml);var t=document.querySelectorAll('[data-ids="'.concat(e.cardId,'"]'))[0];c.showLoader(t,e.cardId),e.checkGridAlignment(),e.setDataToLocalStorage()}},{key:"removeSingleCard",value:function(e){e.parentNode.remove(),this.checkGridAlignment(),this.setDataToLocalStorage()}},{key:"resetGrid",value:function(){var e=this;this.cardId=0;for(var t=document.querySelectorAll("body > .card-grid .card"),a="",n=1;n<t.length;n++)t[n].remove(),a+=t[n].outerHTML;e.setDeletedCardsToLocalStorage(a),o.removeAllinstances(this.cardWrap.querySelectorAll("body > .card-grid .card")[0].dataset.id),e.fillGridBtn.classList.remove("disabled"),e.checkGridAlignment(),e.setDataToLocalStorage()}},{key:"enableFillBtn",value:function(){this.fillGridBtn.classList.contains("disabled")&&this.fillGridBtn.classList.remove("disabled")}},{key:"checkGridAlignment",value:function(){document.querySelectorAll("body > .card-grid .card").length<4?this.cardWrap.classList.add("center"):this.cardWrap.classList.remove("center")}},{key:"fillWrap",value:function(){var e,t=this,a=document.querySelectorAll("body > .card-grid .card").length;e=a<=4?4-a:4-a%4,setTimeout((function(){for(var a=0;a<e;a++)t.addCard();t.setDataToLocalStorage(),t.checkGridAlignment()}),100)}},{key:"getRandomIntInclusive",value:function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}},{key:"renderCard",value:function(){var e=this;return e.cardId=e.getRandomIntInclusive(1e3,1e5),'\n            <div class="card" data-id="'.concat(e.cardId,'" data-ids="').concat(e.cardId,'">              \n                <div class="card__title">Заглавие карточки ').concat(e.cardId,'</div>\n                <div class="card__descr">Описание карточки ').concat(e.cardId,'</div>\n                <a href="#" class="card__modal" data-id="').concat(e.cardId,'">Открыть модальное окно</a>\n                <a href="#" class="card__remove" data-id="').concat(e.cardId,'">Удалить карточку</a>\n                <a style="display: none;" href="#" class="card__reestablish" data-id="').concat(e.cardId,'">Восстановить карточку</a>\n            </div>\n        ')}},{key:"reestablish",value:function(e){document.querySelectorAll("body > .card-grid")[0].insertAdjacentHTML("beforeend",e.outerHTML),e.remove(),localStorage.removeItem("contentHistory"),this.setDataToLocalStorage(),this.checkGridAlignment()}},{key:"setDataToLocalStorage",value:function(){localStorage.setItem("contentGrid",document.querySelectorAll("body > .card-grid")[0].innerHTML)}},{key:"getDataFromLocalStorage",value:function(){localStorage.getItem("contentGrid")&&(document.querySelectorAll(".card-grid")[0].innerHTML=localStorage.getItem("contentGrid"),localStorage.removeItem("contentGrid"))}},{key:"setDeletedCardsToLocalStorage",value:function(e){var t="";t+=e,null===localStorage.getItem("contentHistory")&&localStorage.setItem("contentHistory",""),localStorage.setItem("contentHistory",t+localStorage.getItem("contentHistory"))}}])&&r(t.prototype,a),Object.defineProperty(t,"prototype",{writable:!1}),e}();document.addEventListener("DOMContentLoaded",(function(){(new d).init()}))})();
//# sourceMappingURL=bundle.js.map