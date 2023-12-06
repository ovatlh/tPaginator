const CONSOLE_LOG_ID_DOM = document.getElementById("console-log-id");

function testFnOnButtonClick(numPage, id) {
  const log = `<p>numPage: ${numPage}, id: ${id}, date: ${new Date()}</p>`;
  
  const logDOM = CONSOLE_LOG_ID_DOM.querySelector(".log");
  const p = document.createElement("p");
  
  p.innerHTML = log;
  logDOM.insertBefore(p, logDOM.firstChild);
}

tpaginator.fnInit({
  id: "paginator-test-1",
  totalPages: 300,
  currentPage: 1,
  numPagesToShow: 5,
  fnOnClick: testFnOnButtonClick,
});

tpaginator.fnInit({
  id: "paginator-test-2",
  totalPages: 10,
  currentPage: 1,
  numPagesToShow: 9,
  buttonTexts: {
    FIRST: "Inicio",
    PREV: "Anterior",
    NEXT: "Siguiente",
    LAST: "Final",
  },
  fnOnClick: testFnOnButtonClick,
});

tpaginator.fnInit({
  id: "paginator-test-3",
  totalPages: 5000,
  currentPage: 1,
  numPagesToShow: 9,
  buttonTexts: {
    FIRST: "«",
    PREV: "‹",
    NEXT: "›",
    LAST: "»",
  },
  fnOnClick: testFnOnButtonClick,
});

tpaginator.fnInit({
  id: "paginator-test-4",
  totalPages: 100,
  currentPage: 1,
  numPagesToShow: 3,
  buttonTexts:{
    FIRST: "😺",
    PREV: "🐶",
    NEXT: "🐵",
    LAST: "🐹",
  },
  fnOnClick: testFnOnButtonClick,
});

tpaginator.fnInit({
  id: "paginator-test-5",
  totalPages: 10,
  currentPage: 1,
  numPagesToShow: 1,
  buttonTexts:{
    FIRST: "First 🙂",
    PREV: "Atras",
    NEXT: "Sig",
    LAST: "Ú<strong>lti</strong>ma",
  },
  fnOnClick: testFnOnButtonClick,
});

tpaginator.fnInit({
  id: "paginator-test-6",
  totalPages: 5,
  currentPage: 1,
  numPagesToShow: 13,
  buttonTexts:{
    FIRST: "First 🙂",
    PREV: "Atras",
    NEXT: "Siguiente",
    LAST: "Ú<strong>lti</strong>ma",
  },
  fnOnClick: testFnOnButtonClick,
});
