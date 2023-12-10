function fnTest(numPage, id) {
  const log_DOM = document.getElementById("log");
  const _span = document.createElement("span");
  _span.innerHTML = `${id} : ${numPage} - ${new Date()}`;
  log_DOM.insertBefore(_span, log_DOM.firstChild);
}

tpaginator.fnConfig({
  showDebugMessage: false,
});

tpaginator.fnClear({ isAll: false });

tpaginator.fnInit({
  id: "tpaginator-id-1",
  totalPages: 5,
  currentPage: 1,
  numPagesToShow: 1,
  contentButtons: {
    FIRST: "First",
    PREV: "Prev",
    NEXT: "Next",
    LAST: "Last",
  },
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
  fnOnClick: fnTest,
});

tpaginator.fnInit({
  id: "tpaginator-id-2",
  totalPages: 5,
  currentPage: 2,
  numPagesToShow: 2,
  contentButtons: {
    FIRST: "Inicio",
    PREV: "Atras",
    NEXT: "Siguiente",
    LAST: "Final",
  },
  hiddenButtons: {
    FIRST: true,
    PREV: false,
    NEXT: false,
    LAST: true,
  },
  fnOnClick: fnTest,
});

tpaginator.fnInit({
  id: "tpaginator-id-3",
  totalPages: 5,
  currentPage: 3,
  numPagesToShow: 3,
  contentButtons: {
    FIRST: "|<<",
    PREV: "<",
    NEXT: ">",
    LAST: ">>|",
  },
  hiddenButtons: {
    FIRST: false,
    PREV: false,
    NEXT: true,
    LAST: true,
  },
  fnOnClick: fnTest,
});

tpaginator.fnInit({
  id: "tpaginator-id-4",
  totalPages: 5,
  currentPage: 4,
  numPagesToShow: 4,
  contentButtons: {
    FIRST: `⏮`,
    PREV: `⏪`,
    NEXT: `⏩`,
    LAST: `⏭`,
  },
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: false,
    LAST: false,
  },
  fnOnClick: fnTest,
});

tpaginator.fnInit({
  id: "tpaginator-id-5",
  totalPages: 5,
  currentPage: 5,
  numPagesToShow: 5,
  contentButtons: {
    FIRST: "<pre>First</pre>",
    PREV: "Atras",
    NEXT: "⏩",
    LAST: `<h1>Last</h1>`,
  },
  hiddenButtons: {
    FIRST: false,
    PREV: false,
    NEXT: false,
    LAST: false,
  },
  fnOnClick: fnTest,
});

tpaginator.fnInit({
  id: "tpaginator-id-6",
  totalPages: 5,
  currentPage: 1,
  numPagesToShow: 1,
  hiddenButtons: {
    FIRST: false,
    PREV: false,
    NEXT: false,
    LAST: false,
    CENTER: true,
  },
  fnOnClick: fnTest,
});

tpaginator.fnInit({
  id: "tpaginator-id-7",
  totalPages: 5,
  currentPage: 1,
  numPagesToShow: 3,
  fnOnClick: fnTest,
});

tpaginator.fnInit({
  id: "tpaginator-id-8",
  totalPages: 50,
  currentPage: 1,
  numPagesToShow: 10,
  fnOnClick: fnTest,
});
