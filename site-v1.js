const CONSOLE_LOG_ID_DOM = document.getElementById("console-log-id");

function testFnOnButtonClick(numPage, totalPages, id) {
  const log = `<p>numPage: ${numPage}/${totalPages}, id: ${id}, date: ${new Date()}</p>`;
  
  const logDOM = CONSOLE_LOG_ID_DOM.querySelector(".log");
  const p = document.createElement("p");
  
  p.innerHTML = log;
  logDOM.insertBefore(p, logDOM.firstChild);
}


tPaginator.fnInitPaginator({
  id: "paginator-test-1",
  totalItemsCount: 500000,
  pageSize: 100,
  currentPage: 1,
  numPagesToShow: 7,
  fnOnButtonClick: testFnOnButtonClick,
});

tPaginator.fnInitPaginator({
  id: "paginator-test-2",
  totalItemsCount: 145300,
  pageSize: 25,
  currentPage: 1,
  numPagesToShow: 13,
  textButtons: {
    FIRST: "Inicio",
    PREVIOUS: "Anterior",
    NEXT: "Siguiente",
    LAST: "Última",
  },
  fnOnButtonClick: testFnOnButtonClick,
});

tPaginator.fnInitPaginator({
  id: "paginator-test-3",
  totalItemsCount: 145300,
  pageSize: 3000,
  currentPage: 47,
  numPagesToShow: 9,
  textButtons: {
    FIRST: "«",
    PREVIOUS: "‹",
    NEXT: "›",
    LAST: "»",
  },
  fnOnButtonClick: testFnOnButtonClick,
});

tPaginator.fnInitPaginator({
  id: "paginator-test-4",
  totalItemsCount: 10,
  pageSize: 10,
  currentPage: 1,
  numPagesToShow: 3,
  fnOnButtonClick: testFnOnButtonClick,
});

tPaginator.fnInitPaginator({
  id: "paginator-test-5",
  totalItemsCount: 300,
  pageSize: 10,
  currentPage: 1,
  numPagesToShow: 5,
  textButtons: {
    FIRST: "Ini<strong>ci</strong>o",
    PREVIOUS: "⬅",
    NEXT: "😉",
    LAST: "La<strong>s</strong>t 😎",
  },
  fnOnButtonClick: testFnOnButtonClick,
});
