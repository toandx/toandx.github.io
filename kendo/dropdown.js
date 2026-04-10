var categories = [
    { id: 1, name: "Food" },
    { id: 2, name: "Clothing" }
  ];
var brands = [
    { id: 1, name: "Starbucks", categoryId:1 },
    { id: 2, name: "Highland", categoryId:1 },
    { id: 3, name: "Adidas", categoryId:2 },
    { id: 4, name: "Nike", categoryId:2 },
  ];
function drawGrid3() {
  $("#grid3").kendoGrid({
  dataSource: {
    data: [
      { productName: "Apple", categoryId: 1,brandId:1 },
      { productName: "Laptop", categoryId: 2,brandId:2 }
    ],
    schema: {
      model: {
        id: "productName",
        fields: {
          productName: { editable: true },
          categoryId: { editable: true }
        }
      }
    }
  },
  editable: true,
  columns: [
    { field: "productName", title: "Product" },
    {
      field: "categoryId",
      title: "Category",
      editor: categoryDropDownEditor,
      template: function(dataItem) {
        var item = categories.find(c => c.id === dataItem.categoryId);
        return item ? item.name : "";
      }
    },
    {
      field: "brandId",
      title: "Brand",
      editor: brandEditor,
      template: function(dataItem) {
        var item = brands.find(c => c.id === dataItem.brandId);
        return item ? item.name : "";
      }
    }
  ]
});
  $('#editGridBtn').click(function() {
    var grid = $("#grid3").data("kendoGrid");

    // Focus first editable cell
    var firstCell = grid.tbody.find("td:editable:first");
    grid.current(firstCell);
    grid.editCell(firstCell);

    // Optional: add visual "editing mode"
    grid.tbody.find("td").addClass("k-state-selected");
  });
  $('#saveGridBtn').click(function() {
    const grid = $("#grid3").data("kendoGrid");
    const allData = grid.dataSource.data();
    console.log('All data:'+JSON.stringify(allData));
    const updatedData = grid.dataSource.data().filter(item => item.dirty);
    alert('Updated Data:'+JSON.stringify(updatedData));
  });
}
function categoryDropDownEditor(container, options) {
  $('<input required name="'+options.field+'" id="cate"/>') // need name=options.field to grid update data from drop down selection
    .appendTo(container)
    .kendoDropDownList({
      dataTextField: "name",
      dataValueField: "id",
      dataSource: categories,
      change: function() {
        console.log('select '+this.value());
        //options.model.set(options.field, this.value());

      }
    });
}
function brandEditor(container, options) {
  var model = options.model;
  console.log('Brand Model:'+JSON.stringify(model));
  $('<input name="' + options.field + '" id="brand"/>')
    .appendTo(container)
    .kendoDropDownList({
      dataTextField: "name",
      dataValueField: "id",
      dataSource: {
        transport: {
          read: function(e) {
            var filtered = brands.filter(b => b.categoryId == model.categoryId);
            e.success(filtered);
          }
        }
      },
      //cascadeFrom: "cate",          // 👈 IMPORTANT
      //cascadeFromField: "categoryId",     // 👈 match field in countries
      optionLabel: "Select Brand"
    });
}
$(document).ready(function() {
  drawGrid3();
  //filter();
  // drawGrid2();
});