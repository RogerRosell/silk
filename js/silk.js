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
      var horizontalPos = posicion["horizontal"] - 60;
      var verticalPos = posicion["vertical"] - 75;

      var silkLogo = document.getElementById("silkLogo");
      var lineaAzul = document.getElementById("lineaAzul");

      lineaAzul.style.transition = "left .4s ease-out";
      silkLogo.style.transition = "all .4s ease-out";

      lineaAzul.style.left = "-50px";
      silkLogo.style.transform =
        "translate(" + horizontalPos + "px, -" + verticalPos + "px)";
      break;
  }
}



// Apertura formulario móvil
$('#formLinkMobile').click(function (e) {
  e.preventDefault();
  $("#menu-mobile").click();
  $("#formLinkMobile").addClass("active");
  textoDiagonal();
  animacion("movil");
  setTimeout(function () {
    animacion("formulario");
  }, 300);
})

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

// Menu Mobile
$(".menu-mobile").click((e) => {
  e.preventDefault();
  if($('#menuToggle').hasClass('open')) {
    $('#menuToggle').removeClass('open').addClass('closed');
    return;
  }
  if($('#menuToggle').hasClass('closed')) {
    $('#menuToggle').removeClass('closed').addClass('open');
    return;
  }

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

    $.post("../php/formData.php", { values }).done(function (status) {
      var message =
        status == "subscribed"
          ? "<h1>THANK YOU</h1><h1>YOU'LL HEAR FROM US SOON</h1>"
          : "<h1>OOPS THERE WAS A PROBLEM HERE.</h1><h1>TRY LATER OR CONTACT US!</h1>";
      form.style.transition = "opacity .3s ease-in";
      form.style.opacity = 0;
      setTimeout(function () {
        $(".form").html(message);
        form.style.opacity = 1;
      }, 1000);
    });
  }
});
