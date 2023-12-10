function fnTest(numPage, id) {
  const log_DOM = document.getElementById("log");
  log_DOM.innerHTML = `${id}: ${numPage} | ${new Date()}`;
}

tpaginator.fnConfig({
  showInfoMessage: false,
});

tpaginator.fnClearAll();

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-1",
  totalPages: 10,
  numPagesToShow: 1
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-2",
  buttons: {
    FIRST: `Inicio`,
    PREV: `Anterior`,
    NEXT: `Siguiente`,
    LAST: `Fin`,
  },
  currentPage: 2,
  totalPages: 10,
  numPagesToShow: 2
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-3",
  buttons: {
    FIRST: `<<`,
    PREV: `<`,
    NEXT: `>`,
    LAST: `>>`,
  },
  currentPage: 3,
  totalPages: 10,
  numPagesToShow: 3
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-4",
  buttons: {
    FIRST: `⏮`,
    PREV: `⏪`,
    NEXT: `⏩`,
    LAST: `⏭`,
  },
  currentPage: 4,
  hiddenButtons: {
    PREV: true,
    NEXT: true,
  },
  totalPages: 10,
  numPagesToShow: 4
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-5",
  buttons: {
    FIRST: `<pre>First</pre>`,
    PREV: `<pre>Prev</pre>`,
    NEXT: `<pre>Next</pre>`,
    LAST: `<pre>Last</pre>`,
  },
  hiddenButtons: {
    FIRST: true,
    LAST: true,
  },
  currentPage: 5,
  totalPages: 10,
  numPagesToShow: 5
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-6",
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
  totalPages: 10,
  numPagesToShow: 6,
  currentPage: 6
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-7",
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
  totalPages: 10,
  numPagesToShow: 7,
  currentPage: 7
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-8",
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
  totalPages: 10,
  numPagesToShow: 8,
  currentPage: 8
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-9",
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
  totalPages: 10,
  numPagesToShow: 9,
  currentPage: 9
});

tpaginator.fnInit({
  fnOnClick: fnTest,
  id: "tpaginator-id-10",
  hiddenButtons: {
    FIRST: true,
    PREV: true,
    NEXT: true,
    LAST: true,
  },
  totalPages: 10,
  numPagesToShow: 10,
  currentPage: 10
});
