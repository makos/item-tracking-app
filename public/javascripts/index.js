$(document).ready(() => {
  $(".edit-controls").hide();
  $(".edit-controls#check").on("click", () => {
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
  if ($(".control-" + id).is(":visible")) {
    return;
  }
  $(".control-" + id).show();
  var amount = ".amount-" + id;
  var price = ".price-" + id;
  var amountVal = $(amount).text();
  var priceVal = $(price).text();
  $(amount).html(
    "<input type='number' class='amount-" + id + "' name='amount' min='0' value='" + amountVal + "' form='edit-form'></input>");
  $(price).html(
    "<input type='number' class='price-" + id + "' name='price' min='0' step='.01' value='" + priceVal + "' form='edit-form'></input>");
}
