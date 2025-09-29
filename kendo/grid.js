function drawTable() {
  var myDataSource = new kendo.data.DataSource({
      data: [
          { school: 'HQV', firstName:'Toan',lastName:'Dong', score:9},
          { school: 'HQV', firstName:'Oanh',lastName:'Dong', score:8},
          { school: 'HSGS', firstName:'Dat',lastName:'Vu', score:10}
      ],
      // group: {field: 'school'},
      sort: {field: 'school', dir:'asc'},
      schema: {
          model: {
              id: "id",
              fields: {
                  odm: { type: "string" }
              }
          }
      },
      pageSize: 5
  });

  // Step 2: Create Grid and bind DataSource
  $("#grid").kendoGrid({
      dataSource: myDataSource,
      pageable: true,
      sortable: true,
      dataBound: function() {
        var grid = this;
        var rows = grid.tbody.find("tr");
        var prevClass = null, rowspan = 1, firstCell;

        rows.each(function() {
            var cell = $(this).find("td:first"); // assuming className is first column
            var text = cell.text();

            if (text === prevClass) {
                cell.remove(); // remove duplicate cell
                rowspan++;
                firstCell.attr("rowspan", rowspan)
                        .css("vertical-align", "middle")
                        .css("text-align", "center");
            } else {
                prevClass = text;
                rowspan = 1;
                firstCell = cell;
            }
        });
      },
      columns: [
          { field: "school", title: "School" },
          {
            title:'Name',
            columns: [
              { field: 'firstName', title:'First name'},
              { field: 'lastName', title:'Last name'},
            ]
          },
          { field:'score', title:'Score'}
      ]
  });
}

$(document).ready(function() {
  drawTable();
});