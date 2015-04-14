/**
* Variable que contiene el nombre de la marca
* var {String}
*/
var nombre = null;
/**
* Variable que contiene el nombre de la compañia a la que pertenece la marca
* var {String}
*/
var compania = null;
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
 * Constante con la url del GATEWAY que recibe las peticiones al servidor
 * @var [String}
 */
var gatewayAccesoJS = "../../Backend/index.php";
/**
* Variable que contiene el resultado de la peticion JSON convetido en arreglo que trae todos los registros 
* @var [Array]
*/
var resultado = null;

/**
* Variable que contiene la accion que se va hacer al precionar el boton guardar: agregar o modificar
*
*/
var accion = null;

/**
* Funcion que trae las caracteristicas del evento click y valida si se realizo sobre un boton para obtener el id del registro
* @Params: {object} evento, contiene las caracteristicas del evento click
* @Return: {void}
*/
function recuperaIdMarca(evento) {
if (evento.target.tagName === "BUTTON") {
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

/**
* Evento que se ejecuta al dar click dentro del cuerpo de la tabla
*/
$('#lista>table>tbody').on('click', recuperaIdMarca);
/**
* Función que convierte le id del boton en arreglo para saber la accion que se va a ejecutar y el id del registro seleccionado
* @Params {String} boton, id del boton del registro seleccionado
* @Return {void}
*/
function seleccionoRegistro(boton)
{
	var arrayBoton = boton.split("_");
	if(arrayBoton[1]==="editar")
	{
		mostrarFormAgregaMarca();
		recuperarRegistroMarca(arrayBoton[2]);
	}
	else
	{
		var html = "<h1>Eliminar Marca</h1><br /><p>Estas seguro de eliminar la marca </p><br /><button class='boton btnCancelar' onClick='eliminaMarca("+arrayBoton[2]+")'>Aceptar</button>";
		mostrarVentanaModal(html);
	}
}
/**
* Funcion que muestra u oculta el formulario de agregar marca y vacia los input
* Params: {void}
* Return: {void}
*/
function mostrarFormAgregaMarca()
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
	$('#compania').val("");

}
/**
* Función que crear la peticion JSON que permita eliminar un registro por AJAX
* @Params: {integer} es la pocición del registro a eliminar en el arreglo que contiene todos los registros
* @Return: {void}  
*/
function eliminaMarca(indice)
{
	indice = resultado[indice].ID;
	pJSON = JSON.stringify({
		"Id": generarID(),
		"method": "eliminaMarca",
		"clase": "marca",
		"Params": [indice]
	});
	$.post(gatewayAccesoJS, pJSON , exitoEliminar);
}
/**
* Función que se ejecuta despues de realizar la peticion JSON que permite eliminar un registro
* @Params: {JSON} jsonRespuesta, resultado que arroja el backend de la petición JSON 
* @Return: {void}
*/
function exitoEliminar(jsonRespuesta)
{
	if(jsonRespuesta.result == 1)
	{
		mostrarVentanaModal("Marca Eliminada");
		listaMarcas();
	}
	return;

}
/**
* Función que obtiene los valores del registro seleccionado y llena los inputs con su información
* @Params: {inice} posición del registro en el arreglo que tiene todos los resultados.
* @Return: {void}
*/
function recuperarRegistroMarca(indice)
{
	var registro = resultado[indice];
	$('#id').val(registro.ID);
	$('#nombre').val(registro.Nombre);
	$('#compania').val(registro.Compania);
}
/**
* Funcion que genera un número aleatorio que es tomado como id para las peticiones JSON
* @Param {void}
* @Return {string}
*/
function generarID()
{
	var idLlamada = ('' + Math.random()).substring(2);
	return idLlamada;
}
/**
* Función que se ejecuta cuando se termina de cargar el DOM y crea la peticion JSON para obtener todos los registros
* @Param: {void}
* @Return: {void}
*/
function listaMarcas()
{
	pJSON = JSON.stringify(
		{
			"Id": generarID(),
			"method":"listarMarca",
			"clase":"marca",
			"Params":['2']
		});
	$.post(gatewayAccesoJS, pJSON, exitoListar);
}
/**
* Función que se ejecuta despúes de crear la peticion JSON que obtiene todos los registros y los enlista
* Params: {JSON} resultado que arroja el backend de la peticion JSON 
* @Return: {void}
*/
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
		compania = String(registro.Compania);
	    html += "<tr>";
			html += "<td>"+id+"</td>";
			html += "<td>"+nombre+"</td>";
			html += "<td>"+compania+"</td>";
			html += "<td> <button id='boton_eliminar_"+i+"' class='boton btnEliminar'>Eliminar <span class='icon-trashcan'></span></button>&nbsp;&nbsp;<button id='boton_editar_"+i+"' class='boton btnEditar'>Editar <span class='icon-pencil'></span></button></td>";
		html += "</tr>";
	}
	$('tbody').append(html);

}
/**
* Función que valida los campos y determina la acción que se va a ejecutar: editar o egregar y crear la peticion JSON 
* @Param {void}
* @Return {void}
*/
function validaDatos()
{
	var error ="";
	if($('#nombre').val().length != 0 && $('#compania').val().length != 0)
	{
		id = $('#id').val();
		nombre = $('#nombre').val();
		compania = $('#compania').val();
		accion;
		if(id=="0")
		{
			accion="agregaMarca";
		}
		else
		{
			accion="modificaMarca";
		}
		var objeto = {
			id :id,
			nombre : nombre,
			compania : compania
		}
		pJSON = JSON.stringify({
			"Id":generarID(),
			"method": accion,
			"clase": "marca",
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
		if($('#compania').val().length === 0){
			error ="Llena Todos los Campos"
			$('#compania').addClass("inputError");
		}
		else{
			if($('#compania').hasClass("inputError"))
			{
				$('#compania').removeClass("inputError");
			}
		}
		$('#error').html(error);
	}
}
/**
*  Función que se ejecuta después de la peticion JSON de agregar o modificar 
* @Params: {JSON} jsonRespuesta, resultado que arroja el backend por la  peticion JSON
* @Return: {void}
*/
function exitoAgregar(jsonRespuesta)
{
	if(jsonRespuesta.error)
	{
		console.log("Error al guardar");
		return;
	}
	if(accion === "agregaMarca")
	{
		if(jsonRespuesta.result > 0)
		{
			mostrarVentanaModal("Marca Guardada con el ID "+jsonRespuesta.result);
		}
	}
	else
	{
		if(jsonRespuesta.result == 1)
		{
			mostrarVentanaModal("Marca Actualizada");
		}
	}

	listaMarcas();
	mostrarFormAgregaMarca();

}
/**
* Funcion que muestra el modal en pantalla
* @Params: {String} codigoHTML, texto que aparecera en el modal. 
* @Return: {void}
*/

function mostrarVentanaModal(codigoHTML)
{
	$("#aviso").html( codigoHTML );
	$("div#modalAvisos").modal('show');
}