var id = null;

var nombre = null;

var descripcion = null;

var precioV = null;

var precioC = null;

var genero = null;

var talla = null;

var imagen = null;

var categoria = null;

var deporte = null;

var marca = null;

var subcategoria = null;

var disponibles = null;

var escogido = null;

var resultado = null;

var resultado2 = null;

var pJSON = null;

var recuperado = null;

var accion = null;

var html = null;

 /**
 * Constante con la url del GATEWAY que recibe las peticiones al servidor
 * @var [String}
 */

var gatewayAccesoJS = "../../Backend/index.php";


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

$('#navTipos>ul>li>a').on("click",listar);

function listar(a)
{
	escogido = a.target.id;
	if($('#navTipos ul li a').hasClass("activo"))
	{
		$('#navTipos ul li a').removeClass("activo");
	}
	$('#navTipos ul li #'+escogido).addClass("activo");
	listarProductos(escogido);
}


/**
* Función que se ejecuta cuando se termina de cargar el DOM y crea la peticion JSON para obtener todos los registros
* @Param: {void}
* @Return: {void}
*/
function listarProductos(tipoe)
{
	escogido = tipoe;
	pJSON = JSON.stringify(
		{
			"Id": generarID(),
			"method":"listarProductos",
			"clase":"productos",
			"Params":[escogido]
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
	resultado = jsonRespuesta.result[0];
	resultado2 = jsonRespuesta.result[1];

	var cadena ="";
	for(var i = 0; i < resultado.length; i++)
	{
		
		var registro = resultado[i];

		id = Number(registro.ID);
		nombre = String(registro.Nombre);
		genero = String(registro.Genero);
		categoria = String(registro.Ncategoria);
		for(var l = 0; l < resultado2.length; l++)
		{
			var registro2 = resultado2[l];
			if(registro.ID == registro2.Producto)
			{

				if(parseInt(registro.Disponibles) == parseInt(registro2.Numero))
				{
	    			cadena += "<tr class='agotado'>";
				}
				else
				{
					if(((parseInt(registro.Disponibles)-1) === parseInt(registro2.Numero)) || ((parseInt(registro.Disponibles)-2) === parseInt(registro2.Numero)))
					{
	    				cadena += "<tr class='cagotado'>";
	    			}
	    			else
	    			{
	    				cadena += "<tr>";
	    			}
				}
			}
		}
			cadena += "<td>"+id+"</td>";
			cadena += "<td>"+nombre+"</td>";
			cadena += "<td>"+genero+"</td>";
			cadena += "<td>"+categoria+"</td>";
			cadena += "<td> <button id='boton_eliminar_"+i+"' class='boton btnEliminar'>Eliminar <span class='icon-trashcan'></span></button>&nbsp;&nbsp;<button id='boton_editar_"+i+"' class='boton btnEditar'>Editar <span class='icon-pencil'></span></button>&nbsp;&nbsp;<button id='boton_ver_"+i+"' class='boton btnVer'>Ver <span class='icon-tag'></span></button></td>";
		cadena += "</tr>";
	}
	$('tbody').append(cadena);

}
function quitaError()
{
	if($('input').hasClass("inputError"))
	{
		$('input').removeClass("inputError");	
	}
	if($('select').hasClass("inputError"))
	{
		$('select').removeClass("inputError");	
	}
	if($('textarea').hasClass("inputError"))
	{
		$('textarea').removeClass("inputError");	
	}
}
function mostrarFormAgregaProducto()
{
	quitaError();

	$('#id').val('0');
	$('#error').html('');
	$('#nombre').val('');
	$('#descripcion').val('');
	$('#precioV').val('');
	$('#talla').val('');
	$('#lista').animate({height:"toggle"},600);
	$('#formulario').animate({width:"toggle"},600);
	recuperaDeportes();
	recuperaMarcas();
	recuperaCategorias();

	//recuperado = null;

}

/**
* Evento que se ejecuta al dar click dentro del cuerpo de la tabla
*/
$('#lista>table>tbody').on('click', recuperaIdSubcategoria);

/**
* Funcion que trae las caracteristicas del evento click y valida si se realizo sobre un boton para obtener el id del registro
* @Params: {object} evento, contiene las caracteristicas del evento click
* @Return: {void}
*/
function recuperaIdSubcategoria(evento)
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
		recuperado = resultado[arrayBoton[2]];
		mostrarFormAgregaProducto();
		recuperarRegistroProducto(arrayBoton[2]);
	}
	else if(arrayBoton[1]==="ver")
	{
		verProducto(arrayBoton[2]);
	}
	else
	{
		var html = "<h1>Eliminar Producto</h1><br /><p>Estas seguro de eliminar este producto </p><br /><button class='boton btnCancelar' onClick='eliminaProducto("+arrayBoton[2]+")'>Aceptar</button>";
		mostrarVentanaModal(html);
	}
}
/**
* Función que obtiene los valores del registro seleccionado y llena los inputs con su información
* @Params: {inice} posición del registro en el arreglo que tiene todos los resultados.
* @Return: {void}
*/
function recuperarRegistroProducto(indice)
{
	var registro = resultado[indice];
	$('#id').val(registro.ID);
	$('#nombre').val(registro.Nombre);
	$('#descripcion').val(registro.Descripcion);
	$('#precioV').val(registro.PrecioV);
	$('#precioC').val(registro.PrecioC);
	$('#disponibles').val(registro.Disponibles);
	$('#talla').val(registro.Talla);
	$('#tipo').val(registro.Tipo);
	$('#genero').val(registro.Genero);


}

function recuperaDeportes()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"method":"recuperaDeportes",
		"clase":"productos"
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperarDeportes);
}
function exitoRecuperarDeportes(jsonRespuesta)
{
	$('#deporte>option').remove();
	var respuesta = jsonRespuesta.result;
	if(respuesta.length>0)
	{
		for(var i = 0; i<respuesta.length;i++)
		{
			var res = respuesta[i];
			$('#deporte').append("<option value='"+res.ID+"'>"+res.Nombre+"</option>");

		}
		if(recuperado!=null)
		{
			$('#deporte').val(recuperado.Deporte_ID).attr("selected","selected");
		}
	}

}
function recuperaMarcas()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"method":"recuperaMarcas",
		"clase":"productos"
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperarMarcas);
}
function exitoRecuperarMarcas(jsonRespuesta)
{
	$('#marca>option').remove();
	var respuesta = jsonRespuesta.result;
	if(respuesta.length>0)
	{
		for(var i = 0; i<respuesta.length;i++)
		{
			var res = respuesta[i];
			$('#marca').append("<option value='"+res.ID+"'>"+res.Nombre+"</option>");

		}
		if(recuperado!=null)
		{
			$('#marca').val(recuperado.Marca_ID).attr("selected","selected");
		}
	}

}
function recuperaCategorias()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"method":"recuperaCategorias",
		"clase":"productos"
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperarCategorias);
}
function exitoRecuperarCategorias(jsonRespuesta)
{
	$('#categoria>option').remove();
	var respuesta = jsonRespuesta.result;
	if(respuesta.length>0)
	{
		for(var i = 0; i<respuesta.length;i++)
		{
			var res = respuesta[i];
			$('#categoria').append("<option value='"+res.ID+"'>"+res.Nombre+"</option>");

		}

		if(recuperado!=null)
		{
			$('#categoria').val(recuperado.Categoria_ID).attr("selected","selected");
			recuperaSubcategorias(recuperado.Categoria_ID);
		}
	}

}


$("#categoria").change(function (e) {
        var a = $("#categoria option:selected")[0].value;
        recuperaSubcategorias(a);
            
               
 });
 
 function recuperaSubcategorias(cate)
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"method":"recuperaSubcategorias",
		"clase":"productos",
		"Params":[cate]
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperarSubcategorias);
}
function exitoRecuperarSubcategorias(jsonRespuesta)
{
	$('#subcategoria>option').remove();
	var respuesta = jsonRespuesta.result;
	if(respuesta.length>0)
	{
		for(var i = 0; i<respuesta.length;i++)
		{
			var res = respuesta[i];
			$('#subcategoria').append("<option value='"+res.ID+"'>"+res.Nombre+"</option>");

		}
		if(recuperado!=null)
		{
			$('#subcategoria').val(recuperado.Subcategoria_ID).attr("selected","selected");
		}
		else
		{
			$('#subcategoria>option:first').attr("selected","selected");
		}

	}

}

function validaDatos()
{
	quitaError();
	correcto = true;
	$(".grupo-input input").each(function(){
		if($(this).val() === "")
		{
			$(this).addClass("inputError");
			$("#error").html("<strong>Error</strong> llena todos los campos");
			correcto = false; 
		}
	});
	$('.grupo-input select').each(function(){
		var a = $(this)[0].id;
			a = $('#'+a+'>option:selected');
		if(a.length ==0)
		{
			$(this).addClass("inputError");
			correcto = false;
		}
	});

	if($('.grupo-input #descripcion').val() === "")
	{
			$('#descripcion').addClass("inputError");
			correcto = false;
	}
	if($('#id').val()=="0")
	{
		accion = "agregaProducto";
	}
	else
	{
		accion = "modificaProducto";
	}
	return correcto;
}
function cargaImagen()
{
	var img;
	if(accion === "agregaProducto")
	{
		img ="../imagenes/productos/x.jpg";
	}
	else
	{
		img ="../imagenes/productos/"+id+".jpg";
	}
	html +="<img class='imgProducto' alt='Producto' src='"+img+"'/><br/>"
	html += "<small>El tamaño recomendado de la imagen es de 460 x 460 px.</small><br />";
	html += "<form id='formArchivo' name='formArchivo' enctype='multipart/form-data' method='post' action='../../Backend/Zend/recibir.php'><br />";
		html += "<input type='hidden' id='id' value='"+id+"' name ='id'>";
		html += "<input type='file' id='inputImagen' name='inputImagen'><br />";
		html += "<input class='boton btnGuardar' type='submit' value='Enviar' />";
	html += "</form>";
	mostrarVentanaModal(html);
}

$('#inputImagen').change(function () {
 	console.log("si");
 });

function guardaProducto()
{
	if(!validaDatos())
	{
		return;
	}

	pJSON = JSON.stringify({
		"Id": generarID(),
		"method": accion,
		"clase":"productos",
		"Params":[cargaDatos()]
	});
	$.post(gatewayAccesoJS, pJSON, exitoGuardar);
	
}
function exitoGuardar(jsonRespuesta)
{
	if(jsonRespuesta.error)
	{
		alert("Error al guardar");
		return;
	}
	if(accion === "agregaProducto")
	{
		id = jsonRespuesta.result;
		html ="<h1>Producto Almacenado Exitosamente Con El ID "+id+"</h1><h1>Carga la imagen del nuevo produto</h1>";
		cargaImagen();
	}
	else
	{
		html ="<h1>Producto Actualizado Exitosamente </h1><h1>¿ Quieres subir una nueva imagen ?</h1>";
		cargaImagen();
	}
	mostrarFormAgregaProducto();
	listarProductos(escogido);

}

function cargaDatos()
{
     id = $('#id').val();
	 nombre= $('#nombre').val();
	 descripcion= $('#descripcion').val();
	 precioV= $('#precioV').val();
	 precioC= $('#precioC').val();
	 disponibles= $('#disponibles').val();
	 genero= $('#genero').val();
	 talla= $('#talla').val();
	 categoria= $('#categoria').val();
	 deporte= $('#deporte').val();
	 marca= $('#marca').val();
	 subcategoria= $('#subcategoria').val();
	 tipo= $('#tipo').val();
	var objetoP ={
		id: id,
		nombre: nombre,
		descripcion : descripcion,
		precioV : precioV,
		precioC : precioC,
		disponibles : disponibles,
		genero : genero,
		talla : talla,
		categoria : categoria,
		deporte : deporte,
		marca :  marca,
		subcategoria : subcategoria,
		tipo: tipo
	};
	return objetoP;

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
/**
* Función que crear la peticion JSON que permita eliminar un registro por AJAX
* @Params: {integer} es la pocición del registro a eliminar en el arreglo que contiene todos los registros
* @Return: {void}  
*/
function eliminaProducto(indice)
{
	indice = resultado[indice].ID;
	pJSON = JSON.stringify({
		"Id": generarID(),
		"method": "eliminaProducto",
		"clase": "productos",
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
		mostrarVentanaModal("<h1>Producto Eliminado</h1>");
		listarProductos(escogido);
	}
	return;

}

function verProducto(indice)
{
	var res = resultado[indice];
	html = "<h1>Producto  ID "+res.ID+"</h1>";
	html += "<img id='imgProducto' class='imgProducto' src='../imagenes/productos/"+res.ID+".jpg' alt='producto en formato diferente a jpg'>"; 
	html += "<h2>"+res.Nombre+"  "+"("+res.Nmarca.toUpperCase()+")</h2>";
	html += "<p id='descripcion'><small>"+res.Descripcion+"</small></p>";

	html += "<table class='tablaVer'>";
		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Precio Venta: </strong><span class='icon-attach-money'></span>"+res.PrecioV+" mxn.</small></p>";
			html += "</td>";
			html += "<td>";
				html += "<p><small><strong>Precio Compra: </strong><span class='icon-attach-money'></span>"+res.PrecioC+" mxn.</small></p>";
			html += "</td>";
		html += "</tr>";

		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Genero: </strong>"+res.Genero+"</small></p>";
			html += "</td>";
			html += "<td>";
				html += "<p><small><strong>Tallas Disponibles: </strong>"+res.Talla+"</small></p>";
			html += "</td>";
		html += "</tr>";

		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Categoría  : </strong>"+res.Ncategoria+"</small></p>";
			html += "</td>";
			html += "<td>";
				html += "<p><small><strong>Subcategoría: </strong>"+res.Nscategoria+"</small></p>";
			html += "</td>";
		html += "</tr>";

		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Deporte    : </strong>"+res.Ndeporte+"</small></p>";
			html += "</td>";
			html += "<td>";
				html += "<p><small><strong>Tipo De Producto: </strong>"+res.Tipo+"</small></p>";
			html += "</td>";
		html += "</tr>";

		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Piezas Totales  : </strong>"+res.Disponibles+"</small></p>";
			html += "</td>";
			html += "<td>";
		var html2 ="<p><small><strong>Piezas Disponibles  : </strong>"+res.Disponibles+"</small></p>";
		for(var l = 0; l < resultado2.length; l++)
		{
			var registro2 = resultado2[l];
			if(res.ID == registro2.Producto)
			{
				html2 = "<p><small><strong>Piezas Disponibles  : </strong>"+(res.Disponibles-registro2.Numero )+"</small></p>";
			}
		}
			html += html2;
			html += "</td>";
		html += "</tr>";
	html += "</table>";


	mostrarVentanaModal(html);

}
