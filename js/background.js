document.addEventListener('DOMContentLoaded', function() {
  $("input").change(function(){
    localStorage[this.name] = this.value
    console.log(localStorage)
  })

}, false);

window.onload = function() {
  $("#contractor_name").val(localStorage["contractor_name"])
  $("#department_name").val(localStorage["department_name"])
  $("#contract_date").val(localStorage["contract_date"])
  $("#amount").val(localStorage["amount"])
  $("#purpose").val(localStorage["purpose"])
  $("#of_interest").val(localStorage["of_interest"])
  $("#contract_number").val(localStorage["contract_number"])
  $("#contracting_activity").val(localStorage["contracting_activity"])

}