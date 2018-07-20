function prompt(id) {
  var go = confirm("Are you sure?");
  if (go == true) {
    window.location="/del/" + id;
  }
}
