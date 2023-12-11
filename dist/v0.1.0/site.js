function fnTest(numPage, id) {
  const log_DOM = document.getElementById("log");
  const _span = document.createElement("span");
  _span.innerHTML = `${id} : ${numPage} - ${new Date()}`;
  log_DOM.insertBefore(_span, log_DOM.firstChild);
}

//tpaginator.fnConfig({ showDebugMessage: true });

//tpaginator.fnClear({ isAll: true });

tpaginator.fnInit({
  id: "tpaginator-id-1",
  totalPages: 50,
  currentPage: 1,
  numPagesToShow: 10,
  fnOnClick: fnTest,
});
tpaginator.fnInit({
  id: "tpaginator-id-2",
  totalPages: 50,
  currentPage: 2,
  numPagesToShow: 10,
  fnOnClick: fnTest,
  contentButtons: {
    FIRST: "<<",
    PREV: "<",
    NEXT: ">",
    LAST: ">>",
  },
  hiddenButtons: {
    FIRST: true,
    PREV: false,
    NEXT: false,
    LAST: true,
  },
});
tpaginator.fnInit({
  id: "tpaginator-id-3",
  totalPages: 50,
  currentPage: 3,
  numPagesToShow: 10,
  fnOnClick: fnTest,
  contentButtons: {
    FIRST: "First",
    PREV: "< Previous",
    NEXT: "Next >",
    LAST: "Last",
  },
  hiddenButtons: {
    FIRST: true,
    PREV: false,
    NEXT: false,
    LAST: true,
  },
});
tpaginator.fnInit({
  id: "tpaginator-id-4",
  totalPages: 50,
  currentPage: 4,
  numPagesToShow: 10,
  fnOnClick: fnTest,
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
});
tpaginator.fnInit({
  id: "tpaginator-id-5",
  totalPages: 50,
  currentPage: 46,
  numPagesToShow: 10,
  fnOnClick: fnTest,
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
});
tpaginator.fnInit({
  id: "tpaginator-id-6",
  totalPages: 50,
  currentPage: 47,
  numPagesToShow: 10,
  fnOnClick: fnTest,
  contentButtons: {
    FIRST: "<<",
    PREV: "<",
    NEXT: ">",
    LAST: ">>",
  },
});
tpaginator.fnInit({
  id: "tpaginator-id-7",
  totalPages: 50,
  currentPage: 48,
  numPagesToShow: 10,
  fnOnClick: fnTest,
  contentButtons: {
    FIRST: "first",
    PREV: "prev",
    NEXT: "next",
    LAST: "last",
  },
  hiddenButtons: {
    FIRST: true,
    PREV: false,
    NEXT: false,
    LAST: true,
  },
});
tpaginator.fnInit({
  id: "tpaginator-id-8",
  totalPages: 50,
  currentPage: 49,
  numPagesToShow: 10,
  fnOnClick: fnTest,
  contentButtons: {
    FIRST: "First",
    PREV: "< Previous",
    NEXT: "Next >",
    LAST: "Last",
  },
  hiddenButtons: {
    FIRST: true,
    PREV: false,
    NEXT: false,
    LAST: true,
    CENTER: true,
  },
});
tpaginator.fnInit({
  id: "tpaginator-id-9",
  totalPages: 50,
  currentPage: 50,
  numPagesToShow: 10,
  fnOnClick: fnTest,
});
