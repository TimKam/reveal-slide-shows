const $form = $('form#test-form')
const url = 'https://script.google.com/macros/s/AKfycbxLqEjhQIMZzwrGdYmouQXmfWDcMSASIG0RFx7mTB6LYQrpPL4/exec'

$('#submit-form').on('click', function(e) {
  e.preventDefault();
  var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serialize()
  }).success(
    alert('Submitted!')
  );
})