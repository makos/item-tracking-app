$(document).ready(() => {
  $(".edit-controls").hide();
  $(".edit-controls#check").on("click ", () => {
    $("#edit-form").submit();
  });
});


function prompt(id) {
  var go = confirm("Are you sure?");
  if (go == true) {
    window.location="/del/" + id;
  }
}

function edit(id) {
  $(".edit-controls").show();
  var amount = ".amount-" + id;
  var price = ".price-" + id;
  var amountVal = $(amount).text();
  var priceVal = $(price).text();
  $(amount).html(
    "<input type='number' name='amount' min='0' value=" + amountVal + " form='edit-form'></input>");
  $(price).html(
    "<input type='number' name='price' min='0' step='.01' value=" + priceVal + " form='edit-form'></input>");
}
