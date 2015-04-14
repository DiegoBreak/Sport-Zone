var nombre = null;
var contraseña = null;
var contraseña2 = null;
var correo = null;
var pJSON = null;
var gatewayAccesoJS = "../../Backend/index.php";
var ls = sessionStorage;

function registra()
{
	nombre = $('#nombre').val();
	contraseña = $('#contraseña1').val();
	contraseña2 = $('#contraseña2').val();
	correo= $('#correo').val();
	if(!valida())
	{
		return;
	}
	if(!validarEmail(correo))
	{
		return;
	}
	if(contraseña2 != contraseña)
	{
		$('.rizquierda #error').html("<small><strong>Las contraseñas ingresadas no coinciden</strong></small>");
		return;
	}
	pJSON = JSON.stringify({
		"Id": generarID(),
		"method":"validaEmail",
		"clase":"registrar",
		"Params": [correo]
		
	});
	$.post(gatewayAccesoJS, pJSON, encontroEmail);

}
function encontroEmail(jsonRespuesta)
{
	if(jsonRespuesta.result.length == 1)
	{
		$('.rizquierda #error').html("<small><strong>Correo Electrónico ya Registrado</strong></small>");
		$('#correo').addClass("inputError");
		return;
	}
	usuario ={
		"nombre":nombre,
		"correo":correo,
		"contraseña":contraseña
	};
	pJSON = JSON.stringify({
		"Id": generarID(),
		"method":"registrarUsuario",
		"clase":"registrar",
		"Params": [usuario]
		
	});
	$.post(gatewayAccesoJS, pJSON, exitoRegistrar);
}

function exitoRegistrar(jsonRespuesta)
{
	if(jsonRespuesta.error)
	{
		console.log(jsonRespuesta.error);
		return;
	}
	ls.nombre = nombre;
	ls.correo = correo;
	ls.rol    = "cliente";
	document.location = "index.html";
}

function validarEmail( email) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
		$('.rizquierda #error').html("<small><strong>Correo Electrónico Invalido.</strong></small>");
		$('#correo').addClass("inputError");
		
    	return false;
    }
    else
    {
    	return true;
    }
}


function valida()
{
	var res = true;
	if($('input').hasClass("inputError"))
	{
		$('input').removeClass("inputError");	
	}
	$(".grupo-input input").each(function(){
		if($(this).val() === "")
		{
			$(this).addClass("inputError");
			$(".rizquierda #error").html("<strong>Error</strong> llena todos los campos");
			res = false; 
		}
	});
	return res;
}
function generarID()
{
	var idLlamada = ('' + Math.random()).substring(2);
	return idLlamada;
}