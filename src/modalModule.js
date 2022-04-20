class ModalModule {
    constructor() {
        console.log("init Modal");
    }
    init(title, descr, popupId) {
        if(!document.getElementsByClassName(`popup--${popupId}`)[0]) {
            this.initPopup = this.renderModal(title, descr,popupId);
            document.body.insertAdjacentHTML('afterbegin', this.initPopup);
        } else {
            this.openModal(popupId);
        }
    }
    openModal(popupId){
        document.getElementsByClassName(`popup--${popupId}`)[0].classList.add("open");
    }
    renderModal(t = "Заглавие попапа"+`${popupId}`, d = "Описание попапа", popupId) {
        return `
            <div class="popup popup--unique open popup--${popupId}">
                <div class="popup__block">
                    <span class="popup__close" data-id="${popupId}"></span>
                    <div class="popup__title">${t}</div>
                    <div class="popup__descr">${d}</div>
                </div>                           
            </div>
        `
    }
    closeModal(popupId) {
        document.getElementsByClassName(`popup--${popupId}`)[0].classList.remove("open");
    }
    removeModal(popupId){
        if( document.getElementsByClassName(`popup--${popupId}`)[0]) {
            document.getElementsByClassName(`popup--${popupId}`)[0].remove();
        }
    }
    removeAllinstances(notThisId){
        let popups = document.querySelectorAll(`.popup--unique:not(.popup--${notThisId})`);
        for(let i = 0; i < popups.length; i++) {
            popups[i].remove();
        }
    }

}

export { ModalModule }