$(window).scroll(function () {
  if ($(document).scrollTop() > 50) {
    $(".navbar").addClass("bg-light");
  } else {
    $(".navbar").removeClass("bg-light");
  }
});

$("#collapse-button").on("click", function () {
  if ($(".navbar").hasClass("bg-light")) {
    $(".navbar").removeClass("bg-light");
  } else {
    $(".navbar").addClass("bg-light");
  }
});

$("#collapse-button-home").on("click", function () {
  if ($(".navbar").hasClass("bg-dark")) {
    $(".navbar").removeClass("bg-dark");
  } else {
    $(".navbar").addClass("bg-dark");
  }
});
