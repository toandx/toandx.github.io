var prevData = null;
var myData = [
  { school: 'HQV', name:'Toan', status:'IP'},
  { school: 'HQV', name:'Oanh', status:'DO'},
  { school: 'HQV', name:'Loc', status:'DO'},
  { school: 'HQV', name:'Quang Linh', status:'DO'},
  { school: 'HSGS', name:'Anh', status:'DO'},
  { school: 'HSGS', name:'Dat', status:'IP'},
  { school: 'HSGS', name:'Tien', status:'IP'}
];
var hideMp = new Set();
function drawGrid1() { // Rows template
  var myDataSource = new kendo.data.DataSource({
    data: myData,
    pageSize: 100
  });
  console.log(JSON.stringify(myDataSource.data()));
  // Step 2: Create Grid and bind DataSource
  $("#grid1").kendoGrid({
      dataSource: myDataSource,
      pageable: true,
      sortable: true,
      /* #: school # = <field school> */
      columns: [
          { field: "school", title: "School"},
          { field: 'name', title:'Name'},
          { field:'status', title:'Status'}
      ],
      rowTemplate: (data) => formatRow(data)
  });
}
function formatRow(data) {
  let html = '<tr>';
  if (prevData == null || data.school != prevData.school) {
    var grid = $("#grid1").data("kendoGrid");
    var viewData = grid.dataSource.view();
    let cnt = 0;
    for(const e of viewData) {
      if (e.school === data.school) cnt++;
    }
    html += '<td rowspan="'+cnt+'">'+data.school+'</td>';
  }
  html += '<td>'+data.name+'</td>';
  html += '<td>'+data.status+'</td>';
  html += '</tr>';
  prevData = data;
  return html;
}
function filter() {
  var grid = $("#grid1").data("kendoGrid");
  /*grid.dataSource.filter({
    field: "status",
    operator: "eq",
    value: "IP"
  });*/
  var originalData = grid.dataSource.data();
  var filteredData = originalData.filter(myCustomFilter);
  grid.dataSource.data(filteredData);
}
function hideMp(mpNo) {
  if (!hideMp.has(mpNo)) {
    hideMp.add(mpNo);
  }
}
function myCustomFilter(item) {
  return item.school != 'HQV' || item.status == 'IP';
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
  filter();
  // drawGrid2();
});