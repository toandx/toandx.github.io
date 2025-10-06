function drawGrid1() { // Rows template
  var myDataSource = new kendo.data.DataSource({
    data: [
      { school: 'HQV', firstName:'Toan',lastName:'Dong', score:9},
      { school: 'HQV', firstName:'Oanh',lastName:'Dong', score:8},
      { school: 'HSGS', firstName:'Dat',lastName:'Vu', score:10}
    ],
    pageSize: 5
  });

  // Step 2: Create Grid and bind DataSource
  $("#grid1").kendoGrid({
      dataSource: myDataSource,
      pageable: true,
      sortable: true,
      /* #: school # = <field school> */
      columns: [
          { field: "school", title: "School"},
          {
            title:'Name',
            columns: [
              { field: 'firstName', title:'First name'},
              { field: 'lastName', title:'Last name'},
            ]
          },
          { field:'score', title:'Score'}
      ],
      rowTemplate: function(data) {
        return formatRow(data);
      }
  });
}
function formatRow(data) {
  if (data.score<9) {
    return "<tr><td>"+data.school+'</td></tr>';
  } else if (data.score>9) {
    return "<tr><td>"+data.firstName+'</td></tr>';
  } else {
    return "<tr><td>"+data.score+'</td></tr>';
  }
}
function drawGrid2() { // Column template
  var myDataSource = new kendo.data.DataSource({
      data: [
          { school: 'HQV', firstName:'Toan',lastName:'Dong', score:9},
          { school: 'HQV', firstName:'Oanh',lastName:'Dong', score:8},
          { school: 'HSGS', firstName:'Dat',lastName:'Vu', score:10}
      ],
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
  $("#grid2").kendoGrid({
      dataSource: myDataSource,
      pageable: true,
      sortable: true,
      /* #: school # = <field school> */
      columns: [
          { field: "school", title: "School", 
            template: function(data) {
              return formatSchool(data);
            }
          },
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
function formatSchool(data) {
  if (data.score<9) {
    return "<p> Good student learn at "+data.school+'</p>';
  } else if (data.score>9) {
    return "<p> Excellent student learn at "+data.school+'</p>';
  } else {
    return "<p> Best student learn at "+data.school+'</p>';
  }
}
$("#show1").click(function() {
    let cntRowSpan = 0;
    $('#hqv tr[data-st="IP"]').each(function(index,row) {
      cntRowSpan += 1;
    });
    $('#hqv tr[data-st="IP"]').each(function(index,row) {
      $(row).attr("rowspan",cntRowSpan+1);
      // Do something with each row
      console.log('List tr:'+$(row).text());
    });
    $("#hqv tr").each(function(index) {
      let st = $(this).data("st");
      console.log('Status '+st);
      if(st != null && st == 'DO'){
        $(this).hide();
      } else {
        $(this).show();
      }
    });
  });
$(document).ready(function() {
  drawGrid1();
  drawGrid2();
});