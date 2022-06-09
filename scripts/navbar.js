$(window).scroll(function () {
  if ($(document).scrollTop() > 50) {
    $(".navbar").addClass("bg-light");
  } else {
    $(".navbar").removeClass("bg-light");
  }
});
