$(".product").click(function() {
  alert('Select Dream');
});

$(document).ready(function() {
  $('#select td input').off('change').on('change', function() {
    console.log('Click check box '+this.checked);
    if (this.checked) {
      //console.log('Find other: ',$(this).closest("tr").find('input').not(this).get());
      console.log('Count object:',$(this).closest("tr").find('input').not(this).length);
      $(this).closest("tr").find('input').not(this).prop('checked',false);
    }
  })
});