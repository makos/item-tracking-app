$(document).ready(function() {
  $(".nav-link").on("click", function() {
    $(".nav-link.active").attr("class", "nav-link");
    $(this).attr("class", "nav-link active");
  });
  $(".nav-link").each(function() {
    if ($(this).attr("id") == window.location.pathname.replace("/", "")) {
      $(this).attr("class", "nav-link active");
    };
  });
});
