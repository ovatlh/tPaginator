var tpaginator=tpaginator||(function () {
  const VERSION = "0.0.1";
  let PAGINATOR = {};

  function fnRefresh({
    id = "paginator-container-id",
  } = {}) {
    try {
      const numPage_PREV = PAGINATOR[id].numPagePREV;
      const numPage_NEXT = PAGINATOR[id].numPageNEXT;
      const totalPages = PAGINATOR[id].totalPages;
      const currentPage = PAGINATOR[id].currentPage;
      const numPageLIST = PAGINATOR[id].numPageLIST;

      const paginator_DOM = document.getElementById(id);

      const btn_PREV_DOM = paginator_DOM.querySelector(".prev");
      const btn_NEXT_DOM = paginator_DOM.querySelector(".next");
      const btn_NumPage_LIST = paginator_DOM.querySelectorAll(".num-page");

      btn_PREV_DOM.dataset.numPage = numPage_PREV;
      btn_PREV_DOM.title = `${numPage_PREV} / ${totalPages}`;
      btn_NEXT_DOM.dataset.numPage = numPage_NEXT;
      btn_NEXT_DOM.title = `${numPage_NEXT} / ${totalPages}`;

      btn_NumPage_LIST.forEach((btn, index, list) => {
        const numPage = numPageLIST[index];

        btn.dataset.numPage = numPage;
        btn.title = `${numPage} / ${totalPages}`;
        btn.innerHTML = numPage;

        btn.classList.remove("active");

        if(numPage === currentPage) {
          btn.classList.add("active");
        }
      });
    } catch (e) {
      console.log({ error: `fnRefresh: ${id}`, e });
    }
  }

  function fnSetNewPage({
    id = "paginator-container-id",
    numPage = 1,
  } = {}) {
    try {
      const numPage_NEW = numPage;
      const totalPages = PAGINATOR[id].totalPages;
      const numPageToSides = PAGINATOR[id].numPagesToSides;
      const numPage_ALL_LIST = PAGINATOR[id].numPageAllLIST;
      let numPage_PREV = numPage_NEW - 1;
      let numPage_NEXT = numPage_NEW + 1;

      numPage_PREV = numPage_PREV < 1 ? 1 : numPage_PREV;
      numPage_NEXT = numPage_NEXT > totalPages ? totalPages : numPage_NEXT;

      let numPage_StartToTake_NEW = numPage_NEW - numPageToSides;
      let numPage_EndToTake_NEW = numPage_NEW + numPageToSides;
      if(numPage_StartToTake_NEW < 1) {
        numPage_StartToTake_NEW = 1;
        numPage_EndToTake_NEW = numPage_StartToTake_NEW + (numPageToSides * 2);
      }
      if(numPage_EndToTake_NEW > totalPages) {
        numPage_EndToTake_NEW = totalPages;
        numPage_StartToTake_NEW = numPage_EndToTake_NEW - (numPageToSides * 2);
      }

      const numPage_StartToTake_INDEX_NEW = numPage_ALL_LIST.indexOf(numPage_StartToTake_NEW);
      const numPage_EndToTake_INDEX_NEW = numPage_ALL_LIST.indexOf(numPage_EndToTake_NEW);
      const numPage_EndToTake_INDEX_NEW_NEXT = numPage_EndToTake_INDEX_NEW + 1;

      const numPage_LIST_NEW = numPage_ALL_LIST.slice(numPage_StartToTake_INDEX_NEW, numPage_EndToTake_INDEX_NEW_NEXT);

      PAGINATOR[id].currentPage = numPage_NEW;
      PAGINATOR[id].numPagePREV = numPage_PREV;
      PAGINATOR[id].numPageNEXT = numPage_NEXT;
      PAGINATOR[id].numPageStartToTake = numPage_StartToTake_NEW;
      PAGINATOR[id].numPageEndToTake = numPage_EndToTake_NEW;
      PAGINATOR[id].numPageLIST = numPage_LIST_NEW;

      fnRefresh({ id: id });
    } catch (e) {
      console.log({ error: `fnSetNewPage: ${id}`, e });
    }
  }

  function fnBtnOnClick(event) {
    try {
      const src_DOM = event.srcElement;
      const paginator_DOM = src_DOM.closest(".paginator-container");
      const paginator_ID = paginator_DOM.id;
      const dataSet = src_DOM.dataset;
      const resNumPage = dataSet.numPage;
      const numPage = parseInt(resNumPage);

      tpaginator.fnSetNewPage({ id: paginator_ID, numPage: numPage });

      if(tpaginator.PAGINATOR[paginator_ID].fnOnClick) {
        tpaginator.PAGINATOR[paginator_ID].fnOnClick(numPage, paginator_ID);
      }
    } catch (e) {
      console.log({ error: `fnBtnOnClick`, e });
    }
  }

  function fnInit({
    id = "paginator-container-id",
    totalPages = 10,
    currentPage = 3,
    numPagesToShow = 5,
    buttonTexts = {
      FIRST: "First",
      PREV: "Prev",
      NEXT: "Next",
      LAST: "Last",
    },
    fnOnClick = (numPage, id) => {},
  } = {}) {
    try {
      if(totalPages <= numPagesToShow) {
        numPagesToShow = totalPages - 1;
        numPagesToShow = numPagesToShow < 1 ? 1 : numPagesToShow;
      }

      const numPages_ToShow_HALF = numPagesToShow / 2;
      const numPages_ToShow_HALF_FLOOR = Math.floor(numPages_ToShow_HALF);
      const numPage_FIRST = 1;
      let numPage_PREV = currentPage - 1;
      let numPage_NEXT = currentPage + 1;
      const numPage_LAST = totalPages;

      numPage_PREV = numPage_PREV < 1 ? 1 : numPage_PREV;
      numPage_NEXT = numPage_NEXT > totalPages ? totalPages : numPage_NEXT;

      let numPage_StartToTake = currentPage - numPages_ToShow_HALF_FLOOR;
      let numPage_EndToTake = currentPage + numPages_ToShow_HALF_FLOOR;
      if(numPage_StartToTake < 1){
        numPage_StartToTake = numPage_FIRST;
        numPage_EndToTake = numPage_StartToTake + (numPages_ToShow_HALF_FLOOR * 2);
      }
      if(numPage_EndToTake > totalPages) {
        numPage_EndToTake = totalPages;
        numPage_StartToTake = numPage_EndToTake - (numPages_ToShow_HALF_FLOOR * 2);
      }

      const numPage_ALL_LIST = Array.from({ length: totalPages }, (_, index) => index + 1);

      const numPage_StartToTake_INDEX = numPage_ALL_LIST.indexOf(numPage_StartToTake);
      const numPage_EndToTake_INDEX = numPage_ALL_LIST.indexOf(numPage_EndToTake);
      const numPage_EndToTake_INDEX_NEXT = numPage_EndToTake_INDEX + 1;

      const numPage_LIST = numPage_ALL_LIST.slice(numPage_StartToTake_INDEX, numPage_EndToTake_INDEX_NEXT);

      PAGINATOR[id] = {
        totalPages: totalPages,
        currentPage: currentPage,
        numPagesToShow: numPagesToShow,
        numPagesToSides: numPages_ToShow_HALF_FLOOR,
        numPageFIRST: numPage_FIRST,
        numPagePREV: numPage_PREV,
        numPageNEXT: numPage_NEXT,
        numPageLAST: numPage_LAST,
        numPageStartToTake: numPage_StartToTake,
        numPageEndToTake: numPage_EndToTake,
        numPageAllLIST: numPage_ALL_LIST,
        numPageLIST: numPage_LIST,
        buttonTexts: buttonTexts,
        fnOnClick: fnOnClick,
      };

      fnRender({ id: id });
    } catch (e) {
      console.log({ error: `fnInit: ${id}`, e });
    }
  }

  function fnRender({
    id = "paginator-container-id",
  } = {}) {
    try {
      const id_DOM = document.getElementById(id);

      const numPage_BUTTON_LIST_CENTER = PAGINATOR[id].numPageLIST.reduce((result, current) => {
        const classList = ["num-page"];
        const isActive = PAGINATOR[id].currentPage === current;
        if(isActive) {
          classList.push("active");
        }

        const numPage_BTN = `
          <button class="${classList.join(" ")}" data-num-page="${current}" title="${current} / ${PAGINATOR[id].totalPages}">
            ${current}
          </button>
        `;

        result += numPage_BTN;

        return result;
      }, "");
      const center_BTN = `
        <div class="center">
          ${numPage_BUTTON_LIST_CENTER}
        </div>
      `;

      const left_BTN = `
        <div class="left">
          <button class="first" data-num-page="${PAGINATOR[id].numPageFIRST}" title="${PAGINATOR[id].numPageFIRST} / ${PAGINATOR[id].totalPages}">
            <div>
              ${PAGINATOR[id].buttonTexts.FIRST}
            </div>
          </button>
          <button class="prev" data-num-page="${PAGINATOR[id].numPageFIRST}" title="${PAGINATOR[id].numPageFIRST} / ${PAGINATOR[id].totalPages}">
            <div>
              ${PAGINATOR[id].buttonTexts.PREV}
            </div>
          </button>
        </div>
      `;

      const right_BTN = `
        <div class="right">
          <button class="next" data-num-page="${PAGINATOR[id].numPageNEXT}" title="${PAGINATOR[id].numPageNEXT} / ${PAGINATOR[id].totalPages}">
            <div>
              ${PAGINATOR[id].buttonTexts.NEXT}
            </div>
          </button>
          <button class="last" data-num-page="${PAGINATOR[id].numPageLAST}" title="${PAGINATOR[id].numPageLAST} / ${PAGINATOR[id].totalPages}">
            <div>
              ${PAGINATOR[id].buttonTexts.LAST}
            </div>
          </button>
        </div>
      `;

      const paginator_HTML = `
        ${left_BTN}
        ${center_BTN}
        ${right_BTN}
      `;

      id_DOM.innerHTML = paginator_HTML;

      fnOnClickEvents({ id: id });
    } catch (e) {
      console.log({ error: `fnRender: ${id}`, e });
    }
  }

  function fnOnClickEvents({
    id = "paginator-container-id",
  } = {}){
    try {  
      const paginator_DOM = document.getElementById(id);
      const btn_LIST = paginator_DOM.querySelectorAll("button");
      btn_LIST.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          tpaginator.fnBtnOnClick(e);
        });
      })
    } catch (e) {
      console.log({ error: `fnOnClickEvents: ${id}`, e });
    }
  }

  return {
    VERSION,
    PAGINATOR,
    fnRefresh,
    fnSetNewPage,
    fnBtnOnClick,
    fnInit,
    fnRender,
    fnOnClickEvents,
  };
})();
