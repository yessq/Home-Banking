//Declaración de variables
var nombreUsuario = "Yesica Quispe";
var saldoCuenta = 10000;
var limiteExtraccion = 5000;
var valorAgua = "350";
var varTelefono = "425";
var varLuz = "210";
var valorInternet = "570";
var CuentaAmiga1 = "123456";
var cuentaAmiga2 = "7654321";
var codigoCuenta = 1234;
var usuarioLogueado = false;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
  iniciarSesion();
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
};

//Funciones que tenes que completar

function validarPromptVacio(valor) {
  if (valor == null || valor == "" || isNaN(valor)) {
    alert("No ingreso ningun valor.");
    return false;
  }
  return true;
}

function validarPromptValorMayorSaldo(valor) {
  if (saldoCuenta < valor) {
    alert("El valor ingresado supera el saldo de la cuenta.");
    return false;
  }
  return true;
}
function validarPromptValorMayorLimite(valor) {
  if (saldoCuenta < valor) {
    alert("El valor ingresado supera el limite de extraccion.");
    return false;
  }
  return true;
}
function sumarDinero(cantidad) {
  saldoCuenta += cantidad;
}
function restarDinero(cantidad) {
  saldoCuenta -= cantidad;
}
function cambiarLimiteDeExtraccion() {
  var nuevoLimiteDeExtraccion = parseInt(
    prompt("Ingresa nuevo limite de extraccion")
  );
  if (nuevoLimiteDeExtraccion < 100) {
    alert("El limite de extraccion debe ser superior a $100");
  } else if (nuevoLimiteDeExtraccion >= 1) {
    limiteExtraccion = nuevoLimiteDeExtraccion;
    actualizarLimiteEnPantalla();
    alert("El nuevo limite de extracción es de: $" + limiteExtraccion + ".");
  }
}

function extraerDinero() {
  var valorAExtraer = parseInt(
    prompt("Ingrese la cantidad de dinero que desea extraer")
  );
  var saldoAnterior = saldoCuenta;
  var resto = valorAExtraer % 100;
  if (valorAExtraer == null || valorAExtraer == "" || isNaN(valorAExtraer)) {
    alert("No ingresó ningun valor");
  } else if (valorAExtraer > saldoCuenta) {
    alert(
      "No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero."
    );
  } else if (valorAExtraer > limiteExtraccion) {
    alert(
      "La cantidad de dinero que deseas extraer es mayor a tu límite de extracción."
    );
  } else if (resto != 0) {
    alert("Solo puedes extraer billetes de $100.");
  } else if (valorAExtraer < 100) {
    alert("El valor minimo a extraer es de $100");
  } else {
    restarDinero(valorAExtraer);
    actualizarSaldoEnPantalla();
    alert(
      "Has retirado $" +
        valorAExtraer +
        ". \nSaldo anterior: $" +
        saldoAnterior +
        ". \nSaldo actual: $" +
        saldoCuenta +
        "."
    );
  }
}

function depositarDinero() {
  dineroDepositado = prompt(
    "Ingrese la cantidad de dinero que desea depositar:"
  );
  if (dineroDepositado == null || dineroDepositado == "") {
    alert("No se ingreso monto para dipositar");
  } else if (isNaN(dineroDepositado)) {
    alert("Ingresa solo el monto");
  } else {
    dineroDepositado = parseFloat(dineroDepositado);
    sumarDinero(dineroDepositado);
    mostrarOperacion(
      "depositado",
      saldoCuenta - dineroDepositado,
      dineroDepositado
    );
    actualizarSaldoEnPantalla();
  }
}

function pagarServicio() {
  var servicioAPagar = prompt(
    "Ingrese el numero que corresponde con el servicio que quieres pagar: \n 1 - Agua \n 2 - Telefono \n 3 - Luz \n 4 - Internet"
  );

  if (servicioAPagar == null || servicioAPagar == "") {
    alert("No ingresó ninguna opción");
  } else {
    servicioAPagar = parseInt(servicioAPagar);
    switch (servicioAPagar) {
      case 1:
        pagadoServicio("Agua", valorAgua);
        break;
      case 2:
        pagadoServicio("Luz", valorLuz);
        break;
      case 3:
        pagadoServicio("Internet", valorInternet);
        break;
      case 4:
        pagadoServicio("Telefono", valorTelefono);
        break;
      default:
        alert("No existe el servicio seleccionado");
        break;
    }
  }
}
function pagadoServicio(nombreServicio, valorServicio) {
  if (saldoCuenta < valorServicio) {
    alert("No hay suficiente saldo en tu cuenta para pagar este servicio");
  } else {
    alert(
      "Has pagado el servicio " +
        nombreServicio +
        ".\n" +
        "Saldo anterior: $" +
        saldoCuenta +
        "\n" +
        "Dinero descontado: $" +
        valorServicio +
        "\n" +
        "Saldo actual: $" +
        (saldoCuenta - valorServicio)
    );
    saldoCuenta -= valorServicio;
    actualizarSaldoEnPantalla();
  }
}

function transferirDinero() {
  var montoATransferir = prompt("Ingrese el monto que desea transferir:");
  if (
    validarPromptVacio(montoATransferir) &&
    validarPromptValorMayorSaldo(montoATransferir)
  ) {
    var cuentaATransferir = prompt(
      "Ingrese el número de cuenta al que desea transferir el dinero:"
    );
    if (
      validarPromptVacio(cuentaATransferir) &&
      validarNombreCuentaAmiga(cuentaATransferir)
    ) {
      tranferirACuenta(montoATransferir);
    }
  }
}

function iniciarSesion() {
  var ingresarCodigo = parseInt(
    prompt("Hola! Por favor ingrese su codigo de usuario")
  );
  if (ingresarCodigo == null || ingresarCodigo == "") {
    usuarioLogueado = false;
    nombreUsuario = "";
    saldoCuenta = 0;
    limiteExtraccion = 0;
    alert("No ingresó ningun codigo");
  } else if (ingresarCodigo == codigoCuenta) {
    usuarioLogueado = true;
    alert("¡Bienvenido!");
  } else {
    usuarioLogueado = false;
    nombreUsuario = "";
    saldoCuenta = 0;
    limiteExtraccion = 0;
    alert(
      "El codigo ingresado es incorrecto, por favor refresque la pagina para intentar nuevamente."
    );
  }
  cargarNombreEnPantalla();
  actualizarSaldoEnPantalla();
  actualizarLimiteEnPantalla();
}

function validarNombreCuentaAmiga(cuenta) {
  if (cuenta != cuentaAmiga1 && cuenta != cuentaAmiga2) {
    alert("No es una cuenta amiga");
    return false;
  }
  return true;
}
function tranferirACuenta(cuenta) {
  restarDinero(montoATransferir);
  alert(
    "Se han transferido $" +
      montoATransferir +
      "\n" +
      "Cuenta destino: " +
      cuenta
  );
  actualizarSaldoEnPantalla();
}
//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
  document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
  document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
  document.getElementById("limite-extraccion").innerHTML =
    "Tu límite de extracción es: $" + limiteExtraccion;
}
