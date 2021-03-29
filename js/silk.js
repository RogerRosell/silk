// Apertura formulario
$("#formLink").click(function (e) {
  e.preventDefault();
  var p = $( ".silk-logo" );
var position = p.position();
var width = p.width();
var height = p.height();
alert( "left: " + position.left + ", top: " + position.top + ", width: " + width + ", height: " + height);
  $("#formLink").addClass("active");
  var silkLogo = document.getElementById("silkLogo");
  silkLogo.style.transform = "rotate(-7deg) translate(0, -40vh)";
  silkLogo.style.transition = "all .6s ease-out";

  // setTimeout(function () {
  //   var formContainer = document.getElementById("formJune");
  //   formContainer.style.transition = "opacity .3s ease-in";
  //   formContainer.style.opacity = 1;
  //   formContainer.style.right = 0;
  //   formContainer.style.transform = "translate(0, 0)";
  //   formContainer.style.transition = "all .5s ease-out";
  // }, 400);
});
// Envío del formulario
$(".form button").click(function (e) {
  e.preventDefault();
  // Validación campos
  formFields = ["name", "surname", "email"];

  formFields.map((field) => {
    if (!$(`#${field}`).val()) {
      $(`#${field}`)
        .val(`${$(`#${field}`).attr("placeholder")} CANNOT BE EMPTY`)
        .addClass("alerta");
      $(`#${field}`).click(function () {
        if ($(this).hasClass("alerta")) {
          $(this).val("").removeClass("alerta");
        }
      });
    }
  });
  var form = document.getElementById("signUpForm");
  form.style.transition = "opacity .3s ease-in";
  form.style.opacity = 0;
  setTimeout(function () {
    $(".form").html("<h1>THANK YOU</h1><h1>YOU'LL HEAR FROM US SOON</h1>");
    form.style.opacity = 1;
  }, 1000);
});
