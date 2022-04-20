import {ModalModule} from "./modalModule";
import {LoaderModule} from "./loaderModule";

const modal = new ModalModule();
const loader = new LoaderModule();
class CardModule {
    constructor(props) {
        this.addCardBtn = document.getElementsByClassName("add")[0];
        this.resetGridBtn = document.getElementsByClassName("reset")[0];
        this.fillGridBtn = document.getElementsByClassName("fill")[0];
        this.cardHtml = "";
        this.cardId = 0;
        this.title = "Заглавие попапа:";
        this.descr = "Описание попапа:";
    }
    init() {
        localStorage.removeItem("contentHistory");
        this.cardWrap = document.createElement('div');
        this.cardWrap.classList.add("card-grid");
        document.body.append(this.cardWrap);
        this.getDataFromLocalStorage();
        this.setDataToLocalStorage();
        this.navigationEvents();
    }

    navigationEvents(){
        let ctx = this;


        let list = document.querySelectorAll(".card");
        for(let i = 0; i < list.length; i++) {
            loader.hideLoader(list[i].dataset.id );
        }
        setTimeout(function () {
            ctx.setDataToLocalStorage();
        },1600);

        this.resetGridBtn.addEventListener("click", function (e) {
            e.preventDefault();
            ctx.resetGrid();
        });

        this.addCardBtn.addEventListener("click", function (e) {
            e.preventDefault();
            ctx.addCard();
            ctx.enableFillBtn();
        });

        this.fillGridBtn.addEventListener("click", function (e) {
            e.preventDefault();
            ctx.fillWrap();
            this.classList.add("disabled");
        });

        document.addEventListener('click', function(event) {
            if (event.target.matches('.remove')) {
                event.preventDefault();
                let cardToRemove =  ctx.cardWrap.lastElementChild;
                if(cardToRemove) {
                    let toRemove =  cardToRemove.lastElementChild;
                    ctx.setDeletedCardsToLocalStorage(toRemove.parentNode.outerHTML);
                    ctx.removeSingleCard(toRemove);
                    modal.removeModal(cardToRemove.dataset.id);
                }
                ctx.enableFillBtn();
                ctx.checkGridAlignment();
            }
        }, false);

        document.addEventListener('click', function(event) {
            if (event.target.matches('body > .card-grid .card__remove')) {
                event.preventDefault();
                ctx.setDeletedCardsToLocalStorage(document.querySelectorAll(`[data-ids="${event.target.dataset.id}"]`)[0].outerHTML);
                ctx.removeSingleCard(event.target);
                modal.removeModal(event.target.dataset.id);
                ctx.enableFillBtn();
                ctx.checkGridAlignment();
            }
        }, false);

        document.addEventListener('click', function(event) {
            if (event.target.matches('.card__modal')) {
                event.preventDefault();
                let uniqId = event.target.dataset.id;
                modal.init(ctx.title + uniqId,ctx.descr + uniqId, uniqId);
            }
        }, false);

        document.addEventListener('click', function(event) {
            if (event.target.matches('.history')) {
                event.preventDefault();
                let uniqId = 777;
                modal.init("История удаления карточек","Список удаленных карточек:", uniqId);
                let popupHistory =  document.querySelectorAll(".popup--777 .popup__block")[0];
                if(!document.querySelector(".popup--777 .card-grid")){
                    let cardWrapPopup = document.createElement('div');
                    cardWrapPopup.classList.add("card-grid");
                    popupHistory.append(cardWrapPopup);
                    loader.hideLoader("777");

                }
                setTimeout(function () {
                    if(localStorage.getItem(`contentHistory`)) {
                        document.querySelectorAll(".popup--777 .card-grid")[0].innerHTML = localStorage.getItem(`contentHistory`);
                    }
                },500);

            }
        }, false);

        document.addEventListener('click', function(event) {
            if (event.target.matches('.popup__close')) {
                modal.closeModal(event.target.dataset.id);
            }
        }, false);
        this.checkGridAlignment();

        document.addEventListener('click', function(event) {
            if (event.target.matches('.card__reestablish')) {
               ctx.reestablish(event.target.parentNode);
            }
        }, false);
    }

    addCard() {
        let ctx = this;
        this.cardHtml = this.renderCard();
        ctx.cardWrap.insertAdjacentHTML('beforeend', ctx.cardHtml);
        let curCard = document.querySelectorAll(`[data-ids="${ctx.cardId}"]`)[0];
        loader.showLoader(curCard,ctx.cardId);
        ctx.checkGridAlignment();
        ctx.setDataToLocalStorage();
    }
    removeSingleCard(btn) {
        let ctx = this;
        btn.parentNode.remove();
        ctx.checkGridAlignment();
        ctx.setDataToLocalStorage();
    }
    resetGrid() {
        let ctx = this;
        this.cardId = 0;
        let list = document.querySelectorAll("body > .card-grid .card");
        let delList = "";
        for(let i = 1; i < list.length; i++) {
            list[i].remove();

            delList = delList + list[i].outerHTML;
        }
        ctx.setDeletedCardsToLocalStorage(delList);

        modal.removeAllinstances(this.cardWrap.querySelectorAll("body > .card-grid .card")[0].dataset.id);
        ctx.fillGridBtn.classList.remove("disabled");
        ctx.checkGridAlignment();
        ctx.setDataToLocalStorage();
    }
    enableFillBtn(){
        let ctx = this;
        ctx.fillGridBtn.classList.contains("disabled") ? ctx.fillGridBtn.classList.remove("disabled") : "";
    }
    checkGridAlignment() {
        let ctx = this;
        let cardsCount = document.querySelectorAll("body > .card-grid .card").length;
        (cardsCount < 4) ? ctx.cardWrap.classList.add("center") : ctx.cardWrap.classList.remove("center");
    }
    fillWrap() {
        let ctx = this,
            countCards = document.querySelectorAll("body > .card-grid .card").length,
            iterations = 0;

        iterations = (countCards <= 4 ? 4 - countCards :  4 - countCards % 4);
        setTimeout(function() {
            for (let i = 0; i < iterations; i++) {
                ctx.addCard();
            }
            ctx.setDataToLocalStorage();
            ctx.checkGridAlignment();
        }, 100);

    }
    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    renderCard() {
        let ctx = this;
        ctx.cardId =  ctx.getRandomIntInclusive(1000, 100000);

        return `
            <div class="card" data-id="${ctx.cardId}" data-ids="${ctx.cardId}">              
                <div class="card__title">Заглавие карточки ${ctx.cardId}</div>
                <div class="card__descr">Описание карточки ${ctx.cardId}</div>
                <a href="#" class="card__modal" data-id="${ctx.cardId}">Открыть модальное окно</a>
                <a href="#" class="card__remove" data-id="${ctx.cardId}">Удалить карточку</a>
                <a style="display: none;" href="#" class="card__reestablish" data-id="${ctx.cardId}">Восстановить карточку</a>
            </div>
        `
    }
    reestablish(item){
        let ctx = this;

        let cardWrap = document.querySelectorAll("body > .card-grid")[0];
        cardWrap.insertAdjacentHTML('beforeend', item.outerHTML);
        item.remove();
        localStorage.removeItem("contentHistory");
        ctx.setDataToLocalStorage();
        ctx.checkGridAlignment();
    }

    setDataToLocalStorage(){
        localStorage.setItem(`contentGrid`, document.querySelectorAll("body > .card-grid")[0].innerHTML);
    }

    getDataFromLocalStorage() {
        if(localStorage.getItem(`contentGrid`)) {
           document.querySelectorAll(".card-grid")[0].innerHTML = localStorage.getItem(`contentGrid`);
           localStorage.removeItem("contentGrid");
        }
    }

    setDeletedCardsToLocalStorage(content){
        let deletedCardsHtml = "";
        deletedCardsHtml = deletedCardsHtml+content;
        if(localStorage.getItem("contentHistory")===null) {
            localStorage.setItem("contentHistory","");
        }
        localStorage.setItem(`contentHistory`,deletedCardsHtml+localStorage.getItem("contentHistory"));
    }

}

export { CardModule }