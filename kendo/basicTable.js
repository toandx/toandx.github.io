function hideMp(mpId) {
  console.log('Hide MP %s',mpId);       
  const $tbody = $('#basicTable tbody[data-mp="'+mpId+'"]');
  const $tr = $tbody.find('tr[data-st="IP"]');
  let cntRowSpan = 0;
  $tr.each(function(index) {
    let st = $(this).data("st");
    console.log('Status '+st);
    $(this).hide();
  }); 
}
/*
Solution 1: Use 1 <tr> only has rowspan
Solution 2: Use rowspan col in <tr> data. Hide <tr> 
 */
$("#show1").click(function() {
  alert('bam button');
  let cntRowSpan = 0;
  $('tbody[data-mp="hqv"] tr[data-st="IP"]').each(function(index,row) {
    cntRowSpan += 1;
  });
  $('tbody[data-mp="hqv"] tr[data-st="IP"]').each(function(index,row) {
    $(row).attr("rowspan",cntRowSpan+1);
    // Do something with each row
    console.log('List tr:'+$(row).text());
  });
  $('tbody[data-mp="hqv"] tr').each(function(index) {
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
});