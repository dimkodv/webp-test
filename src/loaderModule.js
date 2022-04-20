class LoaderModule {
    constructor() {
        this.ROOT_SPINNER = "";
    }

    showLoader(container,id){
        let ctx = this;
        ctx.loaderHtml = this.renderLoader(id);
        if(container) {
            container.insertAdjacentHTML('afterbegin', ctx.loaderHtml);
            ctx.hideLoader(id);
        }
    }
    hideLoader(id) {
        setTimeout(function () {
            document.getElementById("loader-"+id) ? document.getElementById("loader-"+id).remove() : "";

            if(!document.getElementById("loader-"+id)) {
                let list = document.querySelectorAll(".loader");
                for(let i = 0; i < list.length; i++) {
                    list[i].remove();
                }
            }
        },1000);
    }
    renderLoader(id) {
        this.ROOT_SPINNER = document.getElementById("loader-"+id);
        return `
           <div id="loader-${id}" class="loader" data-id="${id}"></div>
        `
    }

}

export { LoaderModule }