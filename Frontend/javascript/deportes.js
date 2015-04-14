/**
* Variable que contiene el nombre de la marca
* var {String}
*/
var nombre = null;
/**
* Variable que contiene el id de la marca
* var {String}
*/
var id = null;
/**
* Variable que contiene las peticiones JSON  que se hacen al backend 
* var {JSON}
*/
 var pJSON = null;
 /**
 * Constante publica con la url del GATEWAY que recibe las peticiones al servidor
 * @var [String}
 */
var gatewayAccesoJS = "../../Backend/index.php";

var resultado = null;

var accion = null;


$('#lista>table>tbody').on('click', recuperaIdDeporte);


function recuperaIdDeporte(evento)
{
	if(evento.target.tagName=="BUTTON")
	{
		seleccionoRegistro(evento.target.id);
	}

	else
	{
		if(evento.target.parentElement.tagName=="BUTTON")
		{
			seleccionoRegistro(evento.target.parentElement.id);
		}
	}
}

function seleccionoRegistro(boton)
{
	var arrayBoton = boton.split("_");
	if(arrayBoton[1]==="editar")
	{
		mostrarFormAgregaDeporte();
		recuperarRegistroDeporte(arrayBoton[2]);
	}
	else
	{
		var html = "<h1>Eliminar Deporte</h1><br /><p>Estas seguro de eliminar el deporte </p><br /><button class='boton btnCancelar' onClick='eliminaDeporte("+arrayBoton[2]+")'>Aceptar</button>";
		mostrarVentanaModal(html);
	}
}
function mostrarFormAgregaDeporte()
{
	if($('input').hasClass("inputError"))
	{
		$('input').removeClass("inputError");	
	}
	$('#error').html('');
	$('#lista').animate({height:"toggle"},600);
	$('#formulario').animate({width:"toggle"},600);
	$('#id').val("0");
	$('#nombre').val("");

}
function cerrarModal()
{
	$("#modalAvisos").modal('hide');

}
function eliminaDeporte(indice)
{
	indice = resultado[indice].ID;
	pJSON = JSON.stringify({
		"Id": generarID(),
		"method": "eliminaDeporte",
		"clase": "deportes",
		"Params": [indice]
	});
	$.post(gatewayAccesoJS, pJSON , exitoEliminar);
}
function exitoEliminar(jsonRespuesta)
{
	if(jsonRespuesta.result == 1)
	{
		mostrarVentanaModal("Deporte Eliminado");
		listaDeportes();
	}
	return;

}
function recuperarRegistroDeporte(indice)
{
	var registro = resultado[indice];
	$('#id').val(registro.ID);
	$('#nombre').val(registro.Nombre);
}
/**
* Funcion que genera un numero aleatorio que es tomado como id para las peticiones JSON
* @Param {void}
* @Rreturn {string} numero id
*/
function generarID()
{
	var idLlamada = ('' + Math.random()).substring(2);
	return idLlamada;
}
/**
* Función que se ejecuta cuando se termina de cargar el DOM y crea la peticion JSON que obtener los registros
* @Param: {void}
* @Return: {void}
*/
function listaDeportes()
{
	pJSON = JSON.stringify(
		{
			"Id": generarID(),
			"method":"listarDeportes",
			"clase":"deportes",
			"Params":['2']
		});
	$.post(gatewayAccesoJS, pJSON, exitoListar);
}

function exitoListar(jsonRespuesta)
{
	if(jsonRespuesta.error)
	{
		mostrarVentanaModal("<h1>Intruso  !!!</h1><br />"+jsonRespuesta.error.message);
		return;
	}
	$('tbody > tr').remove();
	resultado = jsonRespuesta.result;
	var html ="";
	for(var i = 0; i < resultado.length; i++)
	{
		var registro = resultado[i];
		nombre = String(registro.Nombre);
		id = Number(registro.ID);
	    html += "<tr>";
			html += "<td>"+id+"</td>";
			html += "<td>"+nombre+"</td>";
			html += "<td> <button id='boton_eliminar_"+i+"' class='boton btnEliminar'>Eliminar <span class='icon-trashcan'></span></button>&nbsp;&nbsp;<button id='boton_editar_"+i+"' class='boton btnEditar'>Editar <span class='icon-pencil'></span></button></td>";
		html += "</tr>";
	}
	$('tbody').append(html);

}
function validaDatos()
{
	var error ="";
	if($('#nombre').val().length != 0)
	{
		id = $('#id').val();
		nombre = $('#nombre').val();
		if(id=="0")
		{
			accion="agregaDeporte";
		}
		else
		{
			accion="modificaDeporte";
		}
		var objeto = {
			id :id,
			nombre : nombre
		}
		pJSON = JSON.stringify({
			"Id":generarID(),
			"method": accion,
			"clase": "deportes",
			"Params":[objeto]
		});
		$.post(gatewayAccesoJS, pJSON, exitoAgregar);
	}
	else
	{
		if($('#nombre').val().length === 0){
			error ="Llena Todos los Campos"
			$('#nombre').addClass("inputError");
		}
		else{
			if($('#nombre').hasClass("inputError"))
			{
				$('#nombre').removeClass("inputError");
			}
		}
		
		$('#error').html(error);
	}
}
function exitoAgregar(jsonRespuesta)
{
	if(jsonRespuesta.error)
	{
		console.log("Error al guardar");
		return;
	}
	if(accion === "agregaDeporte")
	{
		if(jsonRespuesta.result > 0)
		{
			mostrarVentanaModal("Deporte Guardado con el ID "+jsonRespuesta.result);
		}
	}
	else
	{
		if(jsonRespuesta.result == 1)
		{
			mostrarVentanaModal("Deporte Actualizado");
		}
	}

	listaDeportes();
	mostrarFormAgregaDeporte();

}

function mostrarVentanaModal(codigoHTML)
{
	$("#aviso").html( codigoHTML );
	$("div#modalAvisos").modal('show');
}
