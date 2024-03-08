var tpaginator=tpaginator||(function () {
  const _PAGINATOR = {};
  let _show_Error_Message = true;
  let _show_Debug_Message = false;

  function fnArrayRange({
    start = 1,
    end = 10,
    step = 1,
  } = {}) {
    let res_array = [1];

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

  function fnRefreshDOM({
    id = "",
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnRefreshDOM - ${id}`);
      }

      const btn_First_DOM = _PAGINATOR[id].DOM.querySelector("button.btn.first");
      const btn_Prev_DOM = _PAGINATOR[id].DOM.querySelector("button.btn.prev");
      const btn_Next_DOM = _PAGINATOR[id].DOM.querySelector("button.btn.next");
      const btn_Last_DOM = _PAGINATOR[id].DOM.querySelector("button.btn.last");
      const btn_left_DOM = _PAGINATOR[id].DOM.querySelector(".left");
      const btn_right_DOM = _PAGINATOR[id].DOM.querySelector(".right");
      const btn_Page_List_DOM = _PAGINATOR[id].DOM.querySelectorAll("button.btn.page");
      const btn_Center_DOM = _PAGINATOR[id].DOM.querySelector(".center");

      btn_First_DOM.dataset.numPage = _PAGINATOR[id].numPage.FIRST;
      btn_Prev_DOM.dataset.numPage = _PAGINATOR[id].numPage.PREV;
      btn_Next_DOM.dataset.numPage = _PAGINATOR[id].numPage.NEXT;
      btn_Last_DOM.dataset.numPage = _PAGINATOR[id].numPage.LAST;

      btn_First_DOM.classList.remove("hidden");
      btn_Prev_DOM.classList.remove("hidden");
      btn_Next_DOM.classList.remove("hidden");
      btn_Last_DOM.classList.remove("hidden");
      btn_left_DOM.classList.remove("hidden");
      btn_right_DOM.classList.remove("hidden");
      btn_Center_DOM.classList.remove("hidden");
      if(_PAGINATOR[id].hiddenButtons.FIRST) {
        btn_First_DOM.classList.add("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.PREV) {
        btn_Prev_DOM.classList.add("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.NEXT) {
        btn_Next_DOM.classList.add("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.LAST) {
        btn_Last_DOM.classList.add("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.CENTER) {
        btn_Center_DOM.classList.add("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.FIRST && _PAGINATOR[id].hiddenButtons.PREV) {
        btn_left_DOM.classList.add("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.NEXT && _PAGINATOR[id].hiddenButtons.LAST) {
        btn_right_DOM.classList.add("hidden");
      }

      btn_First_DOM.title = `${_PAGINATOR[id].numPage.FIRST} / ${_PAGINATOR[id].totalPages}`;
      btn_Prev_DOM.title = `${_PAGINATOR[id].numPage.PREV} / ${_PAGINATOR[id].totalPages}`;
      btn_Next_DOM.title = `${_PAGINATOR[id].numPage.NEXT} / ${_PAGINATOR[id].totalPages}`;
      btn_Last_DOM.title = `${_PAGINATOR[id].numPage.LAST} / ${_PAGINATOR[id].totalPages}`;

      btn_Page_List_DOM.forEach((btn, index) => {
        const _numPage = _PAGINATOR[id].numPage.CENTER[index];

        btn.dataset.numPage = _numPage;
        btn.title = `${_numPage} / ${_PAGINATOR[id].totalPages}`;
        btn.innerHTML = _numPage;
        btn.classList.remove("active");

        if(_numPage === _PAGINATOR[id].currentPage) {
          btn.classList.add("active");
        }
      });

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnRefreshDOM - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnRefreshDOM - ${id}`);
        console.error(error);
      }
    }
  }

  function fnSetNewPage({
    id = "",
    numPage = 1,
  } = {}) {
    let _numPage = 1;
    try {
      _numPage_temp = parseInt(numPage);
      if(isNaN(_numPage_temp)) {
        if(_show_Error_Message) {
          console.error(`tpaginator: fnSetNewPage - numPage: ${numPage}[NotInt]`);
        }
      } else {
        _numPage = _numPage_temp;
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnSetNewPage - ${id} - numPage: ${numPage}`);
        console.error(error);
      }
    }

    if( _PAGINATOR[id]) {
      try {
        if(_numPage > _PAGINATOR[id].totalPages) {
          _numPage = _PAGINATOR[id].totalPages;
        }
        _PAGINATOR[id].currentPage = _numPage;
        if(_show_Debug_Message) {
          console.log(`tpaginator: [start] fnSetNewPage(fnOnClick) - ${id}`);
        }
        _PAGINATOR[id].fnOnClick(_numPage, id);
        if(_show_Debug_Message) {
          console.log(`tpaginator: [ end ] fnSetNewPage(fnOnClick) - ${id}`);
        }
  
        fnCalcExtraConfig({ id: id });
        fnRefreshDOM({ id: id });
      } catch (error) {
        if(_show_Error_Message) {
          console.error(`tpaginator: fnSetNewPage - ${id}`);
          console.error(error);
        }
      }
    } else {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnSetNewPage - id: ${id}[NotFound]`);
      }
    }
  }

  function fnBtnOnClick({
    id = "",
    btnEvent = null,
  } = {}) {
    let _numPage = 1;

    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnBtnOnClick - ${id}`);
      }

      const src_DOM = btnEvent.srcElement;
      const dataSet = src_DOM.dataset;
      const numPage = dataSet.numPage;
      _numPage = parseInt(numPage);
      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnBtnOnClick - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnBtnOnClick - ${id}`);
        console.error(error);
      }
    }

    fnSetNewPage({ id: id, numPage: _numPage });
  }

  function fnEventsDOM({
    id = "",
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnEventsDOM - ${id}`);
      }

      const dom = _PAGINATOR[id].DOM;
      const btn_List = dom.querySelectorAll("button.btn");
      btn_List.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          fnBtnOnClick({ id: id, btnEvent: e });
        });
      });

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnEventsDOM - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnEventsDOM - ${id}`);
        console.error(error);
      }
    }
  }

  function fnPagesButtonsHTML({
    id = "",
  } = {}) {
    let btnPagesHTML = "";

    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnPagesButtonsHTML - ${id}`);
      }

      const numPage_List = _PAGINATOR[id].numPage.CENTER;
      btnPagesHTML = numPage_List.reduce((result, current) => {
        const title = `${current} / ${_PAGINATOR[id].totalPages}`;
        const btn_Page = `
          <button class="btn page" type="button" title="${title}" data-num-page="${current}">${current}</button>
        `;
        result += btn_Page;
        return result;
      }, "");

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnPagesButtonsHTML - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnPagesButtonsHTML - ${id}`);
        console.error(error);
      }
    }

    return btnPagesHTML;
  }

  function fnLeftRightButtonHTML({
    id = "",
    btnClass = "",
    content = "",
    isHidden = false,
    numPage = 1,
    title = "",
  } = {}) {
    let btnHTML = "";

    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnLeftRightButtonHTML - ${id}`);
      }

      const btnClassList = ["btn", btnClass];
      if(isHidden) {
        btnClassList.push("hidden");
      }
      const btnClassListResult = btnClassList.join(" ");
      btnHTML = `
        <button class="${btnClassListResult}" type="button" title="${title}" data-num-page="${numPage}">${content}</button>
      `;

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnLeftRightButtonHTML - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnLeftRightButtonHTML - ${id}`);
        console.error(error);
      }
    }

    return btnHTML;
  }

  function fnSetDOM({
    id = "",
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnSetDOM - ${id}`);
      }

      const tpaginator = _PAGINATOR[id];
      _PAGINATOR[id].DOM.innerHTML = "";
      const btn_First_HTML = fnLeftRightButtonHTML({ id: id, btnClass: "first", content: tpaginator.contentButtons.FIRST, isHidden: tpaginator.hiddenButtons.FIRST, numPage: tpaginator.numPage.FIRST, title: `${tpaginator.numPage.FIRST} / ${tpaginator.totalPages}` });
      const btn_Prev_HTML = fnLeftRightButtonHTML({ id: id, btnClass: "prev", content: tpaginator.contentButtons.PREV, isHidden: tpaginator.hiddenButtons.PREV, numPage: tpaginator.numPage.PREV, title: `${tpaginator.numPage.PREV} / ${tpaginator.totalPages}` });
      const btn_Next_HTML = fnLeftRightButtonHTML({ id: id, btnClass: "next", content: tpaginator.contentButtons.NEXT, isHidden: tpaginator.hiddenButtons.NEXT, numPage: tpaginator.numPage.NEXT, title: `${tpaginator.numPage.NEXT} / ${tpaginator.totalPages}` });
      const btn_Last_HTML = fnLeftRightButtonHTML({ id: id, btnClass: "last", content: tpaginator.contentButtons.LAST, isHidden: tpaginator.hiddenButtons.LAST, numPage: tpaginator.numPage.LAST, title: `${tpaginator.numPage.LAST} / ${tpaginator.totalPages}` });
      const btn_Center_HTML = fnPagesButtonsHTML({ id: id });

      const btnClassList_Left = ["left"];
      const btnClassList_Right = ["right"];
      const btnClassList_Center = ["center"];

      if(_PAGINATOR[id].hiddenButtons.FIRST && _PAGINATOR[id].hiddenButtons.PREV) {
        btnClassList_Left.push("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.NEXT && _PAGINATOR[id].hiddenButtons.LAST) {
        btnClassList_Right.push("hidden");
      }
      if(_PAGINATOR[id].hiddenButtons.CENTER) {
        btnClassList_Center.push("hidden");
      }

      const btnClassList_Left_Result = btnClassList_Left.join(" ");
      const btnClassList_Right_Result = btnClassList_Right.join(" ");
      const btnClassList_Center_Result = btnClassList_Center.join(" ");

      _PAGINATOR[id].DOM.innerHTML = `
        <div class="${btnClassList_Left_Result}">
          ${btn_First_HTML}
          ${btn_Prev_HTML}
        </div>

        <div class="${btnClassList_Center_Result}">
          ${btn_Center_HTML}
        </div>

        <div class="${btnClassList_Right_Result}">
          ${btn_Next_HTML}
          ${btn_Last_HTML}
        </div>
      `;

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnSetDOM - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnSetDOM - ${id}`);
        console.error(error);
      }
    }
  }

  function fnCalcExtraConfig({
    id = "",
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnCalcExtraConfig - ${id}`);
      }

      _PAGINATOR[id].numPage = {
        FIRST: 1,
        PREV: 1,
        NEXT: 1,
        LAST: _PAGINATOR[id].totalPages,
        CENTER: [1],
      };
      _PAGINATOR[id].numPage.PREV = _PAGINATOR[id].currentPage - 1;
      if(_PAGINATOR[id].numPage.PREV < 1) {
        _PAGINATOR[id].numPage.PREV = 1;
      }
      _PAGINATOR[id].numPage.NEXT = _PAGINATOR[id].currentPage + 1;
      if(_PAGINATOR[id].numPage.NEXT > _PAGINATOR[id].totalPages) {
        _PAGINATOR[id].numPage.NEXT = _PAGINATOR[id].totalPages;
      }

      let numPagesToShow = _PAGINATOR[id].numPagesToShow;
      if(numPagesToShow > _PAGINATOR[id].totalPages) {
        numPagesToShow = _PAGINATOR[id].totalPages;
      }
      if(numPagesToShow % 2 == 0) {
        let numPagesToShow_Prev = numPagesToShow - 1;
        if(numPagesToShow_Prev < 1) {
          numPagesToShow_Prev = 1;
        }
        _PAGINATOR[id].numPagesToShow = numPagesToShow_Prev;
      }

      const numPagesToShow_HALF = _PAGINATOR[id].numPagesToShow / 2;
      const numPagesToShow_HALF_FLOOR = Math.floor(numPagesToShow_HALF);

      let numPage_START = _PAGINATOR[id].currentPage - numPagesToShow_HALF_FLOOR;
      let numPage_END = _PAGINATOR[id].currentPage + numPagesToShow_HALF_FLOOR;

      if(numPage_START < 1) {
        numPage_START = 1;
        numPage_END = numPage_START + (numPagesToShow_HALF_FLOOR * 2);
      }
      if(numPage_END > _PAGINATOR[id].totalPages) {
        numPage_END = _PAGINATOR[id].totalPages;
        numPage_START = numPage_END - (numPagesToShow_HALF_FLOOR * 2);
      }

      const numPage_LIST = fnArrayRange({ start: numPage_START, end: numPage_END });
      _PAGINATOR[id].numPage.CENTER = numPage_LIST;

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnCalcExtraConfig - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnCalcExtraConfig - ${id}`);
        console.error(error);
      }
    }
  }

  function fnSaveInfoUpdate({
    id = "",
    totalPages = null,
    currentPage = null,
    numPagesToShow = null,
    contentButtons = {
      FIRST: null,
      PREV: null,
      NEXT: null,
      LAST: null,
    },
    hiddenButtons = {
      FIRST: null,
      PREV: null,
      NEXT: null,
      LAST: null,
      CENTER: null,
    },
    fnOnClick = null,
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`${id}                                     `);
        console.log(`tpaginator: [start] fnSaveInfoUpdate - ${id}`);
      }

      if(id.length > 0) {
        if(totalPages && totalPages != null && totalPages != undefined) {
          _PAGINATOR[id].totalPages = totalPages;
          if(totalPages < _PAGINATOR[id].numPagesToShow) {
            _PAGINATOR[id].numPagesToShow = totalPages;
          }
          if(totalPages < _PAGINATOR[id].currentPage) {
            _PAGINATOR[id].currentPage = totalPages;
            fnSetNewPage({ id: id, numPage: _PAGINATOR[id].currentPage });
          }
        }

        if(currentPage && currentPage != null && currentPage != undefined) {
          _PAGINATOR[id].currentPage = currentPage;
          fnSetNewPage({ id: id, numPage: _PAGINATOR[id].currentPage });
        }

        if(numPagesToShow && numPagesToShow != null && numPagesToShow != undefined) {
          _PAGINATOR[id].numPagesToShow = numPagesToShow;
        }

        if(contentButtons && contentButtons != null && contentButtons != undefined) {
          if(contentButtons.FIRST && contentButtons.FIRST != null && contentButtons.FIRST != undefined) {
            _PAGINATOR[id].contentButtons.FIRST = contentButtons.FIRST;
          }
          if(contentButtons.PREV && contentButtons.PREV != null && contentButtons.PREV != undefined) {
            _PAGINATOR[id].contentButtons.PREV = contentButtons.PREV;
          }
          if(contentButtons.NEXT && contentButtons.NEXT != null && contentButtons.NEXT != undefined) {
            _PAGINATOR[id].contentButtons.NEXT = contentButtons.NEXT;
          }
          if(contentButtons.LAST && contentButtons.LAST != null && contentButtons.LAST != undefined) {
            _PAGINATOR[id].contentButtons.LAST = contentButtons.LAST;
          }
        }

        if(hiddenButtons && hiddenButtons != null && hiddenButtons != undefined) {
          if(hiddenButtons.FIRST != null && hiddenButtons.FIRST != undefined) {
            _PAGINATOR[id].hiddenButtons.FIRST = hiddenButtons.FIRST;
          }
          if(hiddenButtons.PREV != null && hiddenButtons.PREV != undefined) {
            _PAGINATOR[id].hiddenButtons.PREV = hiddenButtons.PREV;
          }
          if(hiddenButtons.NEXT != null && hiddenButtons.NEXT != undefined) {
            _PAGINATOR[id].hiddenButtons.NEXT = hiddenButtons.NEXT;
          }
          if(hiddenButtons.LAST != null && hiddenButtons.LAST != undefined) {
            _PAGINATOR[id].hiddenButtons.LAST = hiddenButtons.LAST;
          }
          if(hiddenButtons.CENTER != null && hiddenButtons.CENTER != undefined) {
            _PAGINATOR[id].hiddenButtons.CENTER = hiddenButtons.CENTER;
          }
        }

        if(fnOnClick && fnOnClick != null && fnOnClick != undefined) {
          _PAGINATOR[id].fnOnClick = fnOnClick;
        }
      }

      if(_show_Debug_Message) {
        console.log(`${id}                                     `);
        console.log(`tpaginator: [ end ] fnSaveInfoUpdate - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnSaveInfoUpdate - ${id}`);
        console.error(error);
      }
    }
  }

  function fnSaveInfoInit({
    id = "tpaginator-id",
    totalPages = 1,
    currentPage = 1,
    numPagesToShow = 1,
    contentButtons = {
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
      CENTER: false,
    },
    fnOnClick = (numPage, id) => {},
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`tpaginator: [start] fnSaveInfoInit - ${id}`);
      }

      const tpaginator_DOM = document.getElementById(id);
      _PAGINATOR[id] = {
        totalPages: totalPages,
        currentPage: currentPage,
        numPagesToShow: numPagesToShow,
        contentButtons: contentButtons,
        hiddenButtons: hiddenButtons,
        fnOnClick: fnOnClick,
        DOM: tpaginator_DOM,
      };

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnSaveInfoInit - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnSaveInfoInit - ${id}`);
        console.error(error);
      }
    }
  }

  function fnUpdate({
    id = "",
    totalPages = null,
    currentPage = null,
    numPagesToShow = null,
    contentButtons = {
      FIRST: null,
      PREV: null,
      NEXT: null,
      LAST: null,
    },
    hiddenButtons = {
      FIRST: null,
      PREV: null,
      NEXT: null,
      LAST: null,
      CENTER: null,
    },
    fnOnClick = null,
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`${id}                                     `);
        console.log(`tpaginator: [start] fnUpdate - ${id}`);
      }

      if(id.length <= 0) {
        console.error(`tpaginator: fnUpdate - ID required: ${id}`);
        return;
      }

      fnSaveInfoUpdate({
        id: id,
        totalPages: totalPages,
        currentPage: currentPage,
        numPagesToShow: numPagesToShow,
        contentButtons: contentButtons,
        hiddenButtons: hiddenButtons,
        fnOnClick: fnOnClick,
      });

      fnCalcExtraConfig({ id: id });

      fnSetDOM({ id: id });

      fnEventsDOM({ id: id });

      fnRefreshDOM({ id: id });

      if(_show_Debug_Message) {
        console.log(`${id}                                     `);
        console.log(`tpaginator: [ end ] fnUpdate - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnUpdate - ${id}`);
        console.error(error);
      }
    }
  }

  function fnInit({
    id = "tpaginator-id",
    totalPages = 1,
    currentPage = 1,
    numPagesToShow = 1,
    contentButtons = {
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
      CENTER: false,
    },
    fnOnClick = (numPage, id) => {},
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log(`${id}                                     `);
        console.log(`tpaginator: [start] fnInit - ${id}`);
      }

      fnSaveInfoInit({
        id: id,
        totalPages: totalPages,
        currentPage: currentPage,
        numPagesToShow: numPagesToShow,
        contentButtons: contentButtons,
        hiddenButtons: hiddenButtons,
        fnOnClick: fnOnClick,
      });

      fnCalcExtraConfig({ id: id });

      fnSetDOM({ id: id });

      fnEventsDOM({ id: id });

      fnRefreshDOM({ id: id });

      if(_show_Debug_Message) {
        console.log(`tpaginator: [ end ] fnInit - ${id}`);
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error(`tpaginator: fnInit - ${id}`);
        console.error(error);
      }
    }
  }

  function fnClear({
    id = "",
    isAll = false,
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log("tpaginator: [start] fnClear");
      }

      if(isAll) {
        const tpaginatorList_DOM = document.querySelectorAll(".t-paginator-container");
        const tpaginatorList = Array.from(tpaginatorList_DOM);
        tpaginatorList.forEach((item) => {
          item.innerHTML = "";
        });
      } else {
        const tpaginator_DOM = document.getElementById(id);
        if(tpaginator_DOM) {
          tpaginator_DOM.innerHTML = "";
        }
      }

      if(_show_Debug_Message) {
        console.log("tpaginator: [ end ] fnClear");
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error("tpaginator: fnClear");
        console.error(error);
      }
    }
  }

  function fnConfig({
    showErrorMessage = true,
    showDebugMessage = false,
  } = {}) {
    try {
      if(_show_Debug_Message) {
        console.log("tpaginator: [start] fnConfig");
      }

      _show_Error_Message = showErrorMessage;
      _show_Debug_Message = showDebugMessage;

      if(_show_Debug_Message) {
        console.log("tpaginator: [ end ] fnConfig");
      }
    } catch (error) {
      if(_show_Error_Message) {
        console.error("tpaginator: fnConfig");
        console.error(error);
      }
    }
  }

  return {
    PAGINATOR: _PAGINATOR,

    fnConfig,
    fnClear,
    fnInit,
    fnSetNewPage,
    fnUpdate,
  }
})();
