// Apertura formulario
$("#formLink").click(function (e) {
  e.preventDefault();
var height = $(window).height();
var verticalPos = (height/2)-46;
var horizontalPos = ((height*5.6)/100);
if(height < 800) horizontalPos -= 1;
if(height < 700) horizontalPos -= 1;
if(height < 500) horizontalPos -= 1;

$("#formLink").addClass("active");
  var silkLogo = document.getElementById("silkLogo");
  silkLogo.style.transform = "translate("+horizontalPos+"px, -"+verticalPos+"px)";
  silkLogo.style.transition = "all .5s ease-out";

  setTimeout(function () {
    var formContainer = document.getElementById("formJune");
    formContainer.style.transition = "opacity .3s ease-in";
    formContainer.style.opacity = 1;
  }, 300);
});
// Envío del formulario
$(".form button").click(function (e) {
  e.preventDefault();
  // Validación campos
  formFields = ["name", "surname", "email"];
  var formOk = false;

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
  if( formOk == true) {
  var form = document.getElementById("signUpForm");
  form.style.transition = "opacity .3s ease-in";
  form.style.opacity = 0;
  setTimeout(function () {
    $(".form").html("<h1>THANK YOU</h1><h1>YOU'LL HEAR FROM US SOON</h1>");
    form.style.opacity = 1;
  }, 1000);
}
});
