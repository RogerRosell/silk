function esMobile() {
  if ($(window).width() > 768) {
    return false;
  }
  return true;
}

function posicionLogo() {
  posicion = [];
  var height = $(window).height();
  var horizontalPos = (height * 5.6) / 100;
  if (height < 800) horizontalPos -= 1;
  if (height < 700) horizontalPos -= 1;
  if (height < 500) horizontalPos -= 1;
  posicion["vertical"] = height / 2 - 46;
  posicion["horizontal"] = horizontalPos;
  return posicion;
}

function textoDiagonal() {
  var arr = $(".holder").text().split(" ");
  var result =
    '<span class="rotate"> ' +
    arr.join(' </span><span class="rotate">') +
    "</span>";
  $(".holder h1").html(result);
}

function animacion(elem) {
  switch (elem) {
    case "logo":
      var posicion = posicionLogo();
      var horizontalPos = posicion["horizontal"];
      var verticalPos = posicion["vertical"];
      var silkLogo = document.getElementById("silkLogo");
      silkLogo.style.transform =
        "translate(" + horizontalPos + "px, -" + verticalPos + "px)";
      silkLogo.style.transition = "all .5s ease-out";
      break;
    case "formulario":
      var formContainer = document.getElementById("formJune");
      formContainer.style.display = "grid";
      formContainer.style.transition = "opacity .3s ease-in";
      formContainer.style.opacity = 1;
      break;
    case "movil":
      var posicion = posicionLogo();
      var horizontalPos = posicion["horizontal"] - 34;
      var verticalPos = posicion["vertical"] - 80;

      var silkLogo = document.getElementById("silkLogo");
      var lineaAzul = document.getElementById("lineaAzul");

      lineaAzul.style.transition = "left .4s ease-out";
      silkLogo.style.transition = "all .4s ease-out";

      lineaAzul.style.left = "-25px";
      silkLogo.style.transform =
        "translate(" + horizontalPos + "px, -" + verticalPos + "px)";
      break;
  }
}

// Apertura formulario
$("#formLink").click(function (e) {
  e.preventDefault();
  $("#formLink").addClass("active");
  textoDiagonal();
  if (esMobile()) {
    animacion("movil");
  } else {
    animacion("logo");
  }
  setTimeout(function () {
    animacion("formulario");
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
    formOk = true;
  });
  if (formOk == true) {
    var form = document.getElementById("signUpForm");
    var $inputs = $("#signUpForm :input");
    var values = {};
    $inputs.each(function () {
      values[this.name] = $(this).val();
    });

    $.post("https://silkofficial.us1.list-manage.com/subscribe/post", values);
    form.style.transition = "opacity .3s ease-in";
    form.style.opacity = 0;
    setTimeout(function () {
      $(".form").html("<h1>THANK YOU</h1><h1>YOU'LL HEAR FROM US SOON</h1>");
      form.style.opacity = 1;
    }, 1000);
  }
});
