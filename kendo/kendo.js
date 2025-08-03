$(document).ready(function() {
  $("#datepicker").kendoDatePicker();
  $("#basicTable").kendoGrid({
    height: 550,
    sortable: true
  });
});
$("#createTable").click(function() {
  var myDataSource = new kendo.data.DataSource({
      data: [
          { id: 1, name: "Alice", age: 4 },
          { id: 2, name: "Bob", age: 30 },
          { id: 3, name: "Charlie", age: 35 }
      ],
      schema: {
          model: {
              id: "id",
              fields: {
                  name: { type: "string" },
                  age: { type: "number" }
              }
          }
      },
      pageSize: 5
  });

  // Step 2: Create Grid and bind DataSource
  $("#grid2").kendoGrid({
      dataSource: myDataSource,
      pageable: true,
      sortable: true,
      columns: [
          { field: "name", title: "Name" },
          { field: "age", title: "Age" }
      ]
  });
});