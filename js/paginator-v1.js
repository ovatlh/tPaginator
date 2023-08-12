const PAGINATOR_CONTAINER_ID_DOM = document.getElementById("paginator-container-id");

var tPaginator=tPaginator||(function () {
  const VERSION = "1.0.0";
  let PAGINATOR = {};
  
  function fnInitPaginator({
    id = "paginator-container-id",
    totalItemsCount = 300,
    pageSize = 17,
    currentPage = 13,
    numPagesToShow = 5,
    textButtons = {
      FIRST: "First",
      PREVIOUS: "Previous",
      NEXT: "Next",
      LAST: "Last",
    },
    fnOnButtonClick = (numPage, id) => {},
  } = {}) {
    const halfNumPagesToShow = numPagesToShow / 2;
    const halfMaxNumPagesToShowFloor = Math.floor(halfNumPagesToShow);
    const totalPages = totalItemsCount / pageSize;
    const totalPagesCeil = Math.ceil(totalPages);
    const numPageFIRST = 1;
    let numPagePREVIOUS = currentPage - 1;
    let numPageNEXT = currentPage + 1;
    if(numPagePREVIOUS < 1) {
      numPagePREVIOUS = 1;
    }
    if(numPageNEXT > totalPagesCeil){
      numPageNEXT = totalPagesCeil;
    }
    const numPageLAST = totalPagesCeil;
    
    const allNumPageList = Array.from({length: totalPagesCeil}, (_, index) => index + 1);
    let startNumPageToTake = currentPage - halfMaxNumPagesToShowFloor;
    let endNumPageToTake = currentPage + halfMaxNumPagesToShowFloor;

    if(startNumPageToTake < 1) {
      startNumPageToTake = numPageFIRST;
      endNumPageToTake = startNumPageToTake + (halfMaxNumPagesToShowFloor * 2);
    }
    if(endNumPageToTake > totalPagesCeil) {
      endNumPageToTake = totalPagesCeil;
      startNumPageToTake = endNumPageToTake - (halfMaxNumPagesToShowFloor * 2);
    }

    const indexStartNumPageToTake = allNumPageList.indexOf(startNumPageToTake);
    const indexEndNumPageToTake = allNumPageList.indexOf(endNumPageToTake);
    const indexEndNumPageToTakeNext = indexEndNumPageToTake + 1;

    const numPagesList = allNumPageList.slice(indexStartNumPageToTake, indexEndNumPageToTakeNext);

    PAGINATOR[id] = {
      totalItemsCount: totalItemsCount,
      pageSize: pageSize,
      currentPage: currentPage,
      totalPages: totalPagesCeil,
      numPagesToShow: numPagesToShow,
      numPagesToSides: halfMaxNumPagesToShowFloor,
      numPageFIRST: numPageFIRST,
      numPagePREVIOUS: numPagePREVIOUS,
      numPageNEXT: numPageNEXT,
      numPageLAST: numPageLAST,
      startNumPageToTake,
      endNumPageToTake,
      allNumPageList: allNumPageList,
      numPagesList: numPagesList,
      textButtons: textButtons,
      fnOnButtonClick: fnOnButtonClick,
    };
    
    fnRenderPaginator({ id: id });
  }

  function fnRenderPaginator({
    id = "paginator-container-id",
  } = {}) {
    try {
      const idDOM = document.getElementById(id);
      const centerNumPageButtons = PAGINATOR[id].numPagesList.reduce((result, current) => {
        const isActive = PAGINATOR[id].currentPage === current;
        const classActive = isActive ? " active" : "";
        result += `
          <button class="num-page${classActive}" data-num-page="${current}" title="to page: ${current}/${PAGINATOR[id].totalPages}">
            ${current}
          </button>
        `;
        return result;
      }, "");
      
      idDOM.innerHTML = `
        <div class="left">
          <button class="first" data-num-page="${PAGINATOR[id].numPageFIRST}" title="to page: ${PAGINATOR[id].numPageFIRST}/${PAGINATOR[id].totalPages}">${PAGINATOR[id].textButtons.FIRST}</button>
          <button class="previous" data-num-page="${PAGINATOR[id].numPagePREVIOUS}" title="to page: ${PAGINATOR[id].numPagePREVIOUS}/${PAGINATOR[id].totalPages}">${PAGINATOR[id].textButtons.PREVIOUS}</button>
        </div>

        <div class="center">
          ${centerNumPageButtons}
        </div>

        <div class="right">
          <button class="next" data-num-page="${PAGINATOR[id].numPageNEXT}" title="to page: ${PAGINATOR[id].numPageNEXT}/${PAGINATOR[id].totalPages}">${PAGINATOR[id].textButtons.NEXT}</button>
          <button class="last" data-num-page="${PAGINATOR[id].numPageLAST}" title="to page: ${PAGINATOR[id].numPageLAST}/${PAGINATOR[id].totalPages}">${PAGINATOR[id].textButtons.LAST}</button>
        </div>
      `;

      PAGINATOR[id].DOM = idDOM;

      fnInitOnClickEvents({ id: id });
    } catch (e) {
      console.log({ error: `fnRenderPaginator: ${id}`, e });
    }
  }

  function fnRefreshRenderPaginator({
    id = "paginator-container-id",
  } = {}) {
    const idPaginatorContainerDOM = document.getElementById(id);

    const previousButtonDOM = idPaginatorContainerDOM.querySelector(".previous");
    const nextButtonDOM = idPaginatorContainerDOM.querySelector(".next");
    const numPageButtonDOMList = idPaginatorContainerDOM.querySelectorAll(".num-page");
    
    previousButtonDOM.dataset.numPage = PAGINATOR[id].numPagePREVIOUS;
    previousButtonDOM.title = `to page: ${PAGINATOR[id].numPagePREVIOUS}/${PAGINATOR[id].numPageLAST}`;
    nextButtonDOM.dataset.numPage = PAGINATOR[id].numPageNEXT;
    nextButtonDOM.title = `to page: ${PAGINATOR[id].numPageNEXT}/${PAGINATOR[id].numPageLAST}`;

    numPageButtonDOMList.forEach((numPageButton, index, list) => {
      const currentPage = PAGINATOR[id].currentPage;
      const numPage = PAGINATOR[id].numPagesList[index];

      numPageButton.dataset.numPage = numPage
      numPageButton.title = `to page: ${numPage}/${PAGINATOR[id].numPageLAST}`;
      numPageButton.innerHTML = numPage;

      if(numPage === currentPage) {
        numPageButton.classList.add("active");
      }
      else {
        numPageButton.classList.remove("active");
      }
    });
  }

  function fnSetNewPage({
    id = "paginator-container-id",
    numPage = 1,
  } = {}) {
    try {
      const newCurrentPage = numPage;
      let newPreviousPage = newCurrentPage - 1;
      let newNextPage = newCurrentPage + 1;
      if(newPreviousPage < 1) {
        newPreviousPage = 1;
      }
      if(newNextPage > PAGINATOR[id].totalPages) {
        newNextPage = PAGINATOR[id].totalPages;
      }

      let newStartNumPageToTake = newCurrentPage - PAGINATOR[id].numPagesToSides;
      let newEndNumPageToTake = newCurrentPage + PAGINATOR[id].numPagesToSides;
      if(newStartNumPageToTake < 1) {
        newStartNumPageToTake = 1;
        newEndNumPageToTake = newStartNumPageToTake + (PAGINATOR[id].numPagesToSides * 2);
      }
      if(newEndNumPageToTake > PAGINATOR[id].totalPages) {
        newEndNumPageToTake = PAGINATOR[id].totalPages;
        newStartNumPageToTake = newEndNumPageToTake - (PAGINATOR[id].numPagesToSides * 2);
      }

      const newIndexStartNumPageToTake = PAGINATOR[id].allNumPageList.indexOf(newStartNumPageToTake);
      const newIndexEndNumPageToTake  = PAGINATOR[id].allNumPageList.indexOf(newEndNumPageToTake);
      const newIndexEndNumPageToTakeNext = newIndexEndNumPageToTake + 1;

      const newNumPagesList = PAGINATOR[id].allNumPageList.slice(newIndexStartNumPageToTake, newIndexEndNumPageToTakeNext);

      PAGINATOR[id].currentPage = newCurrentPage;
      PAGINATOR[id].numPagePREVIOUS = newPreviousPage;
      PAGINATOR[id].numPageNEXT = newNextPage;
      PAGINATOR[id].startNumPageToTake = newStartNumPageToTake;
      PAGINATOR[id].endNumPageToTake = newEndNumPageToTake;
      PAGINATOR[id].numPagesList = newNumPagesList;
      
      fnRefreshRenderPaginator({ id: id });
    } catch (e) {
      console.log({ error: `fnSetNewPage: ${id}`, e });
    }
  }

  function fnButtonClick(event) {
    try {
      const srcDOM = event.srcElement;
      const paginatorContainerDOM = srcDOM.closest(".paginator-container");
      const idPaginatorContainer = paginatorContainerDOM.id;
      const dataSet = srcDOM.dataset;
      const numPage = parseInt(dataSet.numPage);

      tPaginator.fnSetNewPage({ id: idPaginatorContainer, numPage: numPage });

      if(tPaginator.PAGINATOR[idPaginatorContainer].fnOnButtonClick) {
        const totalPages = PAGINATOR[idPaginatorContainer].totalPages;
        tPaginator.PAGINATOR[idPaginatorContainer].fnOnButtonClick(numPage, totalPages, idPaginatorContainer);
      }
    } catch (e) {
      console.log({ error: "fnButtonClick", e });
    }
  }

  function fnInitOnClickEvents({
    id = "paginator-container-id",
  } = {}) {
    const paginatorContainerDOM = document.getElementById(id);
    const buttonList = paginatorContainerDOM.querySelectorAll("button");
    buttonList.forEach((button) => {
      button.addEventListener("click", (e) => {
        tPaginator.fnButtonClick(e);
      });
    });
  }

  return {
    VERSION,
    PAGINATOR,
    fnInitPaginator,
    fnRenderPaginator,
    fnRefreshRenderPaginator,
    fnSetNewPage,
    fnButtonClick,
    fnInitOnClickEvents,
  };
})();
