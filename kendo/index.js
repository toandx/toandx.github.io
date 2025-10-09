var prevRow = null;
var hideSchoolSet = new Set();
var maxOrderSchool = new Map();
var numDoneTask = new Map();
var originalData;
var myData = [
  { school: 'HQV', name:'Toan', status:'IP',order:1},
  { school: 'HQV', name:'Oanh', status:'DO',order:2},
  { school: 'HQV', name:'Loc', status:'DO',order:3},
  { school: 'HQV', name:'Quang Linh', status:'DO',order:4},
  { school: 'HQV', name:'me Thoi', status:'IP',order:5},
  { school: 'HQV', name:'cau Loi', status:'DO',order:6},
  { school: 'HQV', name:'cau Thang', status:'DO',order:7},
  { school: 'HSGS', name:'Duy Anh', status:'DO',order:1},
  { school: 'HSGS', name:'anh Dat', status:'DO',order:2},
  { school: 'HSGS', name:'Tien K61T', status:'DO',order:3},
  { school: 'HSGS', name:'Tat Dung', status:'DO',order:4}
];
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
  var grid = $("#grid1").data("kendoGrid");
  originalData = grid.dataSource.data();
  console.log('Original '+JSON.stringify(originalData));
  for(let e of originalData) {
    console.log('LOOP order school ',e.school, ' ',e.order);
    maxOrderSchool.set(e.school, e.order);
  }
  grid.refresh();
}
function formatRow(data) {
  let html = '<tr>';
  if (prevRow == null || data.school != prevRow.school) {
    var grid = $("#grid1").data("kendoGrid");
    var viewData = grid.dataSource.view();
    let cnt = 0;
    for(const e of viewData) {
      if (e.school === data.school) cnt++;
    }
    html += '<td rowspan="'+(cnt+1)+'">'+data.school+'</td>';
  }
  html += '<td>'+data.name+'</td>';
  html += '<td>'+data.status+'</td>';
  html += '</tr>';
  console.log('Add button ',data.order,' ',maxOrderSchool.get(data.school));
  if (data.order == maxOrderSchool.get(data.school)) {
    html +='<tr><td style="background: red;" colspan="2" onclick="hideMp(\''+data.school+'\')">Hide/Show</td></tr>';
  }
  prevRow = data;
  return html;
}
function filter() {
  var grid = $("#grid1").data("kendoGrid");
  let filteredData = originalData.filter(hideCondition);
  grid.dataSource.data(filteredData);
}
function hideMp(mpNo) {
  console.log('Hide MP %s',mpNo);
  prevRow = null;
  maxOrderSchool.clear();
  numDoneTask.clear();
  if (!hideSchoolSet.has(mpNo)) {
    hideSchoolSet.add(mpNo);
    var grid = $("#grid1").data("kendoGrid");
    var filteredData = originalData.filter(filterCondition);
    grid.dataSource.data(filteredData);
  } else {
    hideSchoolSet.delete(mpNo);
    var grid = $("#grid1").data("kendoGrid");
    var filteredData = originalData.filter(filterCondition);
    grid.dataSource.data(filteredData);
  }
}
function filterCondition(item) {
  let show = !hideSchoolSet.has(item.school) || item.status != 'DO';
  let doneTaskCnt = numDoneTask.get(item.school) || 0;
  if (!show && doneTaskCnt<3) {
    show = true;
    doneTaskCnt ++;
    numDoneTask.set(item.school, doneTaskCnt);
  }
  if (show) {
    if (!maxOrderSchool.has(item.school) || maxOrderSchool.get(item.school)<item.order) {
      maxOrderSchool.set(item.school, item.order);
    }
  }
  prevRow = item;
  return show;
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
  //filter();
  // drawGrid2();
});