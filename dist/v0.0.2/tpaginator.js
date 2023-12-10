var tpaginator=tpaginator||(function () {
  const _PAGINATOR = {};
  let _showErrorMessage = true;
  let _showInfoMessage = false;

  function fnSetNewPage({
    id = "",
    numPage = 1
  } = {}) {
    try {
      _PAGINATOR[id].currentPage = numPage;
      _PAGINATOR[id].fnOnClick(numPage, id);
  
      fnPaginatorCalcExtraConfig({ id: id });
      fnUpdateDOM({ id: id });
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnSetNewPage - "${id}"`);
        console.error(error);
      }
    }
  }

  function fnBtnOnClick({
    id = "",
    btnEvent = null
  } = {}) {
    let res_numPage = 1;
    try {
      const src_DOM = btnEvent.srcElement;
      const dataSet = src_DOM.dataset;
      const numPage = dataSet.numPage;
      res_numPage = parseInt(numPage);
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnBtnOnClick - "${id}"`);
        console.error(error);
      }
    }
    fnSetNewPage({ id: id, numPage: res_numPage });
  }

  function fnEventsDOM({
    id = "",
  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnEventsDOM - "${id}"`);
      }

      const dom = _PAGINATOR[id].DOM;
      const btnList = dom.querySelectorAll("button.btn");
      btnList.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          requestAnimationFrame(() => {
            fnBtnOnClick({ id: id, btnEvent: e });
          });
        });
      });

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnEventsDOM - "${id}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnEventsDOM - "${id}"`);
        console.error(error);
      }
    }
  }

  function fnPagesButtonsDOM({
    id = "",
  } = {}) {
    let btnPagesHTML = "";

    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnPagesButtonsDOM - "${id}"`);
      }

      const numList = _PAGINATOR[id].numPage.CENTER;
      const totalPages = _PAGINATOR[id].totalPages;
      const currentPage = _PAGINATOR[id].currentPage;
      btnPagesHTML = numList.reduce((result, current) => {
        const btnClassList = ["btn"];
        const title = `${current} / ${totalPages}`;
        if(current == currentPage) {
          btnClassList.push("active");
        }
        const btnClassResult = btnClassList.join(" ");
        const btn_Page = `
          <button class="${btnClassResult}" type="button" title="${title}" data-num-page=${current}>${current}</button>
        `;
        result += btn_Page;
        return result;
      }, "");

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnPagesButtonsDOM - "${id}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnPagesButtonsDOM - "${id}"`);
        console.error(error);
      }
    }

    return btnPagesHTML;
  }

  function fnLeftRightButtonDOM({
    id = "",
    btnClass = "",
    content = "",
    isHidden = false,
    numPage = 1,
    title = "",
  } = {}) {
    let btnHTML = "";

    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnLeftRightButtonDOM - "${id} ${btnClass}"`);
      }

      const btnClassList = ["btn", btnClass];
      if(isHidden) {
        btnClassList.push("hidden");
      }
      const btnClassResult = btnClassList.join(" ");

      btnHTML = `
        <button class="${btnClassResult}" type="button" title="${title}" data-num-page="${numPage}">${content}</button>
      `;

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnLeftRightButtonDOM - "${id} ${btnClass}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnLeftRightButtonDOM - "${id}"`);
        console.error(error);
      }
    }

    return btnHTML;
  }

  function fnRenderDOM({
    id = "",
  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnRenderDOM - "${id}"`);
      }

      const tpaginator = _PAGINATOR[id];
      _PAGINATOR[id].DOM.innerHTML = "";
      const btnFirstHTML = fnLeftRightButtonDOM({ id: id, btnClass: "first", content: tpaginator.buttons.FIRST, isHidden: tpaginator.hiddenButtons.FIRST, numPage: tpaginator.numPage.FIRST, title: `${tpaginator.numPage.FIRST} / ${tpaginator.totalPages}` });
      const btnPrevHTML = fnLeftRightButtonDOM({ id: id, btnClass: "prev", content: tpaginator.buttons.PREV, isHidden: tpaginator.hiddenButtons.PREV, numPage: tpaginator.numPage.PREV, title: `${tpaginator.numPage.PREV} / ${tpaginator.totalPages}` });
      const btnNextHTML = fnLeftRightButtonDOM({ id: id, btnClass: "next", content: tpaginator.buttons.NEXT, isHidden: tpaginator.hiddenButtons.NEXT, numPage: tpaginator.numPage.NEXT, title: `${tpaginator.numPage.NEXT} / ${tpaginator.totalPages}` });
      const btnLastHTML = fnLeftRightButtonDOM({ id: id, btnClass: "last", content: tpaginator.buttons.LAST, isHidden: tpaginator.hiddenButtons.LAST, numPage: tpaginator.numPage.LAST, title: `${tpaginator.numPage.LAST} / ${tpaginator.totalPages}` });
      const btnCenterHTML = fnPagesButtonsDOM({ id: id });
      _PAGINATOR[id].DOM.innerHTML = `
        <div class="left">
          ${btnFirstHTML}
          ${btnPrevHTML}
        </div>

        <div class="center">
          ${btnCenterHTML}
        </div>

        <div class="right">
          ${btnNextHTML}
          ${btnLastHTML}
        </div>
      `;

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnRenderDOM - "${id}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnRenderDOM - "${id}"`);
        console.error(error);
      }
    }
  }

  function fnUpdateDOM({
    id = "",
  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnUpdateDOM - "${id}"`);
      }

      fnRenderDOM({
        id: id,
      });
      fnEventsDOM({
        id: id,
      });

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnUpdateDOM - "${id}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnUpdateDOM - "${id}"`);
        console.error(error);
      }
    }
  }

  function fnArrayRange({
    start = 0,
    end = 10,
    step = 1,
  } = {}) {
    let res_array = [];

    try {
      res_array = Array.from({ length: (end - start)/step + 1}, (value, index) => start + index * step);
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnArrayRange`);
        console.error(error);
      }
    }

    return res_array;
  }

  function fnPaginatorCalcExtraConfig({
    id = "",
  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnPaginatorCalcExtraConfig - "${id}"`);
      }

      let tpaginator = _PAGINATOR[id];
      _PAGINATOR[id].numPage = {
        FIRST: 1,
        PREV: 1,
        NEXT: 1,
        LAST: 1,
        CENTER: [1],
      };
      _PAGINATOR[id].numPage.FIRST = 1;
      let res_numPagePrev = tpaginator.currentPage - 1;
      if(res_numPagePrev < 1) {
        res_numPagePrev = 1;
      }
      _PAGINATOR[id].numPage.PREV = res_numPagePrev;
      let res_numPageNext = tpaginator.currentPage + 1;
      if(res_numPageNext > tpaginator.totalPages) {
        res_numPageNext = tpaginator.totalPages;
      }
      _PAGINATOR[id].numPage.NEXT = res_numPageNext;
      _PAGINATOR[id].numPage.LAST = tpaginator.totalPages;

      if(_PAGINATOR[id].numPagesToShow > _PAGINATOR[id].totalPages) {
        _PAGINATOR[id].numPagesToShow = _PAGINATOR[id].totalPages;
      }

      tpaginator = _PAGINATOR[id];
      if(tpaginator.numPagesToShow % 2 != 0) {
        let numPagesToShow_HALF = tpaginator.numPagesToShow / 2;
        numPagesToShow_HALF_FLOOR = Math.floor(numPagesToShow_HALF);
  
        let numPage_Start = tpaginator.currentPage - numPagesToShow_HALF_FLOOR;
        let numPage_End = tpaginator.currentPage + numPagesToShow_HALF_FLOOR;
        if(numPage_Start < 1) {
          numPage_Start = 1;
          numPage_End = numPage_Start + (numPagesToShow_HALF_FLOOR * 2);
        }
        if(numPage_End > tpaginator.totalPages) {
          numPage_End = tpaginator.totalPages;
          numPage_Start = numPage_End - (numPagesToShow_HALF_FLOOR * 2);
        }
        const numPage_LIST = fnArrayRange({ start: numPage_Start, end: numPage_End });
        _PAGINATOR[id].numPage.CENTER = numPage_LIST;
      } else {
        const numPage_Left_End = tpaginator.currentPage - 1;
        const numPage_Left_Start = numPage_Left_End - tpaginator.numPagesToShow;
        const numPage_Left_LIST = fnArrayRange({ start: numPage_Left_Start, end: numPage_Left_End });

        const numPage_Right_Start = tpaginator.currentPage + 1;
        const numPage_Right_End = numPage_Right_Start + tpaginator.numPagesToShow;
        const numPage_Right_LIST = fnArrayRange({ start: numPage_Right_Start, end: numPage_Right_End });

        const numPage_LIST = [...numPage_Left_LIST, tpaginator.currentPage, ...numPage_Right_LIST];
        const numPage_Filter_LIST = numPage_LIST.filter(item => item > 0 && item <= tpaginator.totalPages);
        _PAGINATOR[id].numPage.CENTER = numPage_Filter_LIST;
      }

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnPaginatorCalcExtraConfig - "${id}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnPaginatorCalcExtraConfig - "${id}"`);
        console.error(error);
      }
    }
  }

  function fnSaveInfoInit({
    id = "tpaginator-id",
    totalPages = 5,
    currentPage = 3,
    numPagesToShow = 3,
    buttons = {
      FIRST: "First",
      PREV: "Prev",
      NEXT: "Next",
      LAST: "Last",
    },
    hiddenButtons = {
      FIRST: false,
      PREV: false,
      NEXT: false,
      LAST: false,
    },
    fnOnClick = (numPage, id) => {},
  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnSaveInfoInit - "${id}"`);
      }

      const tpaginator_DOM = document.getElementById(id);
      _PAGINATOR[id] = {
        totalPages: totalPages,
        currentPage: currentPage,
        numPagesToShow: numPagesToShow,
        buttons: buttons,
        hiddenButtons: hiddenButtons,
        fnOnClick: fnOnClick,
        DOM: tpaginator_DOM
      };

      fnPaginatorCalcExtraConfig({
        id: id,
      });

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnSaveInfoInit - "${id}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnSaveInfoInit - "${id}"`);
        console.error(error);
      }
    }
  }

  function fnInit({
    id = "tpaginator-id",
    totalPages = 5,
    currentPage = 1,
    numPagesToShow = 3,
    buttons = {
      FIRST: "First",
      PREV: "Prev",
      NEXT: "Next",
      LAST: "Last",
    },
    hiddenButtons = {
      FIRST: false,
      PREV: false,
      NEXT: false,
      LAST: false,
    },
    fnOnClick = (numPage, id) => {},
  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log(`tpaginator: [start]fnInit - "${id}"`);
      }

      requestAnimationFrame(() => {
        fnSaveInfoInit({
          id: id,
          totalPages: totalPages,
          currentPage: currentPage,
          numPagesToShow: numPagesToShow,
          buttons: buttons,
          hiddenButtons: hiddenButtons,
          fnOnClick: fnOnClick,
        });
      });

      requestAnimationFrame(() => {
        fnUpdateDOM({
          id: id,
        });
      });

      if(_showInfoMessage) {
        console.log(`tpaginator: [ end ]fnInit - "${id}"`);
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error(`tpaginator: fnInit - "${id}"`);
        console.error(error);
      }
    }
  }

  function fnClearAll({

  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log("tpaginator: [start]fnClearAll");
      }

      const tpaginatorList_DOM = document.querySelectorAll(".tpaginator");
      const tpaginatorList = Array.from(tpaginatorList_DOM);
      tpaginatorList.forEach((item) => {
        item.innerHTML = "";
      });

      if(_showInfoMessage) {
        console.log("tpaginator: [ end ]fnClearAll");
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error("tpaginator: fnClearAll");
        console.error(error);
      }
    }
  }

  function fnConfig({
    showErrorMessage = true,
    showInfoMessage = false,
  } = {}) {
    try {
      if(_showInfoMessage) {
        console.log("tpaginator: [start]fnConfig");
      }

      _showErrorMessage = showErrorMessage;
      _showInfoMessage = showInfoMessage;

      if(_showInfoMessage) {
        console.log("tpaginator: [ end ]fnConfig");
      }
    } catch (error) {
      if(_showErrorMessage) {
        console.error("tpaginator: fnConfig");
        console.error(error);
      }
    }
  }

  return {
    PAGINATOR: _PAGINATOR,
    
    fnConfig,
    fnClearAll,
    fnInit,
    fnSetNewPage,
  }
})();
