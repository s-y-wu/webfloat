function makeVisible(input) {
    var table = document.getElementById(input);
    if (table.style.display === "none") {
      table.style.display = "table";
    }
  }
  function makeInvisible(input) {
    var table = document.getElementById(input);
    if (table.style.display !== "none") {
      table.style.display = "none";
    }
  }

  function makeAllOptionalInvisible() {makeInvisible('second-input-table'); makeInvisible('third-input-table'); makeInvisible('convert-table');};
  function makeOneTalbeVisible() {makeAllOptionalInvisible(); makeVisible('input-precision-table')};
  function makeTwoTablesVisible() {makeAllOptionalInvisible(); makeVisible('second-input-table'); makeVisible('input-precision-table')};
  function makeThreeTablesVisible() {makeInvisible('convert-table'); makeVisible('second-input-table'); makeVisible('third-input-table'); makeVisible('input-precision-table')};

