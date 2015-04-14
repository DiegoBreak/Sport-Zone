/**
* Constante que contiene al objeto con id formUsuario del DOM.
* @var {Object}
*/
var $btnusuario = $('#formUsuario');
/**
* Constante que contiene al objeto con id formAdministrador del DOM.
* var {Object}
*/
var	$btnAdmi = $('#formAdministrador');
/**
* Constante que contiene al objeto con id nombre del DOM
* var {Object}
*/
var $divNombre = $('#nombre');
/**
* Variable que contiene el email del usuario con el que desea ingresar.
* var {String}
*/
var email = null;
/**
* Variable que contiene la contraseña del usuario con el que desea ingresar.
* var {Integer}
*/
var contrasena = null;
/**
* Variable que contiene el tipo de usuario con el que desea ingresar.
* var {Integer}
*/
var tipo = null;
/**
* Constante que apunta al session Storage del browser.
*/
var ls = sessionStorage;

/**
* Variable para crear alguna peticion JSON al servidor
* var {JSON}
*/
var pJSON = null;
/**
 * Constante publica con la url del GATEWAY que recibe las peticiones al servidor
 * @var [String}
 */
var gatewayAccesoJS = "../../Backend/index.php";
/**
* Variable que contiene el arreglo que se obtiene como resultado de la peticion JSON
* @var {Array}
*/
var respuesta = null;
/**
* Función que 	valida si hay una sesian activa segun el session storage
* @Param: {void}
* @Return: {void}
*/
function inicio()
{
	if(ls.nombre != null)
	{
		$('.cliente').hide();
		$('.admi').hide();
		$('.nombre>span').html(ls.nombre);
		$('.nombre>small').html("("+ls.correo+")");
	}
	else
	{
		$('.nombre').hide();
	}
}
/**
* Funcion que limpia el sesion storage cuando el usuario cierra sesion
* @Param: {void}
* @Return: {void}
*/
function fin()
{
	ls.removeItem('correo');
	ls.removeItem('rol');
	ls.removeItem('nombre');
}

/**
* Función que muestra el formulario de acceso al cliente.
* @Param {Object} e objeto que contiene todas las caracteristicas del evento click.
* @Return {void}
*/
function mostrarFormularioAccesarCliente(e)
{
	e.preventDefault();
	var $form = $('#inicio-cliente');
	$form.slideToggle();
}

/**
* Función que muestra el formulario de acceso al administrador.
* @Param {void}.
* @Return {void}
*/
function mostrarFormularioAccesarAdmi()
{
	var $form = $('#inicio-administrador');
	$form.slideToggle();
}
$btnusuario.click(mostrarFormularioAccesarCliente);
$btnAdmi.click(mostrarFormularioAccesarAdmi);
/**
* Funcion que genera un numero aleatorio que es tomado como id para las peticiones JSON
* @Param {void}
* @Rreturn {string} numero id
*/
function generarID()
{
	idLlamada = ('' + Math.random()).substring(2);
	return idLlamada;
}
/**
* Función que verifica que los inputs del formulario del cliente no este vacios, los convierte a string y les quita los espacios en blanco
* Param {void}
* Return {void}
*/
function validarDatosCliente()
{
	email = $('#correoU').val().toString().trim();
	contrasena = $('#contraseñaU').val().toString().trim();
	if(email.length > 0 && contrasena.length > 0)
	{
		tipo = 2;
		if(!validarEmail(email))
		{
			return;
		}
		validarUsuario(tipo);
	}
	else
	{
		$('#error').html("<small><strong>Llena todos los campos.</strong></small>");
		if(email.length===0)
		{
			$('#correoU').addClass("inputError");
		}
		if(contrasena.length===0)
		{
			$('#contraseñaU').addClass("inputError");
		}
	}
}
/**
* Función que verifica que los inputs del formulario del administrador no este vacios, los convierte a string y les quita los espacios en blanco
* Param {void}
* Return {void}
*/
function validarDatosAdmi()
{
	email = $('#correoA').val().toString().trim();
	contrasena = $('#contraseñaA').val().toString().trim();
	if(email.length > 0 && contrasena.length > 0)
	{
		tipo=1;
		if(!validarEmail(email))
		{
			return;
		}
		validarUsuario(tipo);
	}
	else
	{
		$('#inicio-administrador>#error').html("<small><strong>Llena todos los campos.</strong></small>");
		if(email.length===0)
		{
			$('#correoA').addClass("inputError");
		}
		if(contrasena.length===0)
		{
			$('#contraseñaA').addClass("inputError");
		}
	}
}
/**
 * Función para verificar el accceso y crear la sesión mediante AJAX
 * @returns {void}
 */

function validarUsuario(tipo)
{
	pJSON = JSON.stringify(
		{
			"Id": generarID(),
			"method":"verifica",
			"clase":"inicio",
			"Params":[tipo, email, contrasena]
		});

	$.post(gatewayAccesoJS, pJSON, exitoValidar);

}
/**
* Función que se ejecuta junto con el resultado de la petición JSON mediante AJAX.
* @Param: {JSON} jsonRespuesta, resultado de la petición JSON realizada al servidor.
* @Return: {void}.
*/
function exitoValidar(jsonRespuesta)
{
	console.log(jsonRespuesta);
	//Si existio algun problema 
	if(jsonRespuesta.error){
		if(tipo===1)
		{
			$("input#correoA").val('');
			$("input#contraseñaA").val('');
			$('#inicio-administrador>#error').html("<small><strong>El correo electrónico no existe o contraseña incorrecta.</strong></small>");
		}
		else
		{
			$("input#correoU").val('');
			$("input#contraseñaU").val('');
			$('#inicio-cliente>#error').html("<small><strong>El correo electrónico no existe o contraseña incorrecta.</strong></small>");
		}
		return;
	}
	respuesta = jsonRespuesta.result[0];
	ls.nombre = respuesta.Nombre;
	ls.correo = respuesta.Correo;
	ls.rol    = respuesta.Rol;

	//Si se pugo logear, nos vamos al menú
	//document.location="index.html";
	if(tipo===1)
	{
		document.location = "menuAdmi.html";
	}
	else
	{
		location.reload();
	}
	return;
}
/**
* Función que valida que el email ingresado cumpla con el formato esperado.
* @Param: {string} email ingresado por el usuario.
* @Return: {boolean} true si el email cumple el formato.
*/
function validarEmail( email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
		if(tipo===1)
		{
			$('#inicio-administrador>#error').html("<small><strong>Correo Electrónico Invalido.</strong></small>");
			$('#correoA').addClass("inputError");
		}
		else
		{
			$('#inicio-cliente>#error').html("<small><strong>Correo Electrónico Invalido.</strong></small>");
			$('#correoU').addClass("inputError");
		}
    	return false;
    }
    else
    {
    	return true;
    }
}
/**
* Función que remueve la clase de error a los elementos inputs que contienen datos erróneos.
* @Param: e, id del elemento a cual se le removerá la clase.
* @Return: {void}.
*/

function revertirError(e)
{
	var elemento = $('#'+e);
	if(elemento.hasClass("inputError"))
	{
		elemento.removeClass("inputError");
	}
}
/**
* Funcion que mestra la opción para poder cerrar sesión
* @Param: {void}
* @Return: {void}
*/
function muestraCerrarSesion()
{
	$('#cerrarSesion').fadeToggle(0);
}
/**
* Función que crea una peticion JSON al backend para poder terminar la sesion del usuario
* @Param: {void}
* @Return: {void}
*/

function cerrarSesion()
{
	pJSON = JSON.stringify(
		{
			"Id": generarID(),
			"method":"terminarSesion",
			"clase": "inicio"
		});
	$.post(gatewayAccesoJS, pJSON, exitoCerrarSesion);
}
/**
* Función que se ejcuta cuando la peticion JSON regresa un respuesta
* @Param: {JSON} jsonRespuesta, es la respuesta que arroja el backend
* @Return: {void}
*/
function exitoCerrarSesion(jsonRespuesta)
{
	if(jsonRespuesta.error)
	{
		console.log("Error al cerrar Sesion");
		return;
	}
		document.location="index.html";
		fin();

}
function muestraMenucito()
{
	$('#navpeque').slideToggle();
}
function muestraBarra()
{
	$('#inicioBarraUno').fadeToggle(150);
	$('#barraLateral').animate({width:"toggle"});

}

$('nav .navegacion li a').on("click",link);
function link(e)
{
	var a = e.target.id;
	if(a == "hombre" || a == "mujer" || a == "niño" || a == "marca" || a == "deporte")
	{
		ls.busqueda = a;
		document.location = "cproductos.html";
	}
}