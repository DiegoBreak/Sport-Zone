/**
* Variable que contiene el nombre de la categoria
* var {String}
*/
var nombre = null;
/**
* Variable que contiene el nombre de la compañia a la que pertenece la categoria
* var {String}
*/
var tipo = null;
/**
* Variable que contiene el id de la categoria
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
* Evento que se ejecuta al dar click dentro del cuerpo de la tabla
*/
$('#lista>table>tbody').on('click', recuperaIdCategoria);

/**
* Funcion que trae las caracteristicas del evento click y valida si se realizo sobre un boton para obtener el id del registro
* @Params: {object} evento, contiene las caracteristicas del evento click
* @Return: {void}
*/
function recuperaIdCategoria(evento)
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
		mostrarFormAgregaCategoria();
		recuperarRegistroCategoria(arrayBoton[2]);
	}
	else
	{
		var html = "<h1>Eliminar categoría</h1><br /><p>Estas seguro de eliminar la categoría </p><br /><button class='boton btnCancelar' onClick='eliminaCategoria("+arrayBoton[2]+")'>Aceptar</button>";
		mostrarVentanaModal(html);
	}
}
/**
* Funcion que muestra u oculta el formulario de agregar categoria y vacia los input
* Params: {void}
* Return: {void}
*/
function mostrarFormAgregaCategoria()
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
	$('#tipo').val("");

}
/**
* Función que crear la peticion JSON que permita eliminar un registro por AJAX
* @Params: {integer} es la pocición del registro a eliminar en el arreglo que contiene todos los registros
* @Return: {void}  
*/
function eliminaCategoria(indice)
{
	indice = resultado[indice].ID;
	pJSON = JSON.stringify({
		"Id": generarID(),
		"method": "eliminaCategoria",
		"clase": "categorias",
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
		mostrarVentanaModal("Categoria Eliminada");
		listaCategorias();
	}
	return;

}
/**
* Función que obtiene los valores del registro seleccionado y llena los inputs con su información
* @Params: {inice} posición del registro en el arreglo que tiene todos los resultados.
* @Return: {void}
*/
function recuperarRegistroCategoria(indice)
{
	var registro = resultado[indice];
	$('#id').val(registro.ID);
	$('#nombre').val(registro.Nombre);
	$('#tipo').val(registro.Tipo);
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
function listaCategorias()
{
	pJSON = JSON.stringify(
		{
			"Id": generarID(),
			"method":"listarCategoria",
			"clase":"categorias",
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
		tipo = String(registro.Tipo);
	    html += "<tr>";
			html += "<td>"+id+"</td>";
			html += "<td>"+nombre+"</td>";
			html += "<td>"+tipo+"</td>";
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
	if($('input').hasClass("inputError"))
	{
		$('input').removeClass("inputError");
	}
	if($('#nombre').val().length != 0 && $('#tipo').val().length != 0)
	{
		id = $('#id').val();
		nombre = $('#nombre').val();
		tipo = $('#tipo').val();
		accion;
		if(id=="0")
		{
			accion="agregaCategoria";
		}
		else
		{
			accion="modificaCategoria";
		}
		var objeto = {
			id :id,
			nombre : nombre,
			tipo : tipo
		}
		pJSON = JSON.stringify({
			"Id":generarID(),
			"method": accion,
			"clase": "categorias",
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
		
		if($('#tipo').val().length === 0){
			error ="Llena Todos los Campos"
			$('#tipo').addClass("inputError");
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
	if(accion === "agregaCategoria")
	{
		if(jsonRespuesta.result > 0)
		{
			mostrarVentanaModal("Categoria Guardada con el ID "+jsonRespuesta.result);
		}
	}
	else
	{
		if(jsonRespuesta.result == 1)
		{
			mostrarVentanaModal("Categoria Actualizada");
		}
	}

	listaCategorias();
	mostrarFormAgregaCategoria();

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
