var pJSON = null;
var ss = sessionStorage;
var gatewayAccesoJS = "../../Backend/index.php";
var registros = [];
var respaldo = [];
var rmarcas = null;
var rdeportes = null;
var rcategorias = null;
var rscategorias = null;
var consultaf1 = [];
var consultaf2 = [];
var consultaf3 = [];
var consultaf4 = [];
var consultaf5 = [];
var link =
		{
			"genero":"",
 			"marca":"",
 			"tipo":"",	
 			"deporte":"",
 			"categoria":"",
 			"scategoria":""	
		};

function busquedaInicio()
{
	var p = ss.busqueda;
	link.genero = "<a href='#' id='registros'>"+p+"</a>";
	$('#navegando').html(link.genero);
	pJSON = JSON.stringify({
		"Id":generarID(),
		"method" : "busqueda",
		"clase" : "consulta",
		"Params" : [p]
	});
	$.post(gatewayAccesoJS, pJSON, exitoBuscar);

}

function exitoBuscar(jsonRespuesta)
{
	registros = jsonRespuesta.result;
	respaldo = registros;
	var html ="";
	$('#productos>.resultado').remove();
	html += '<div class="resultado">';
	for(var i = 0; i < registros.length; i++)
	{
		var ractual = registros[i];
			html += '<div class="prueba" id="'+i+'">';
				html +='<img class="logito" src="../imagenes/logo-n.png" alt="logo">';
				html += '<img class="imgRes" src="../imagenes/productos/'+ractual.ID+'.jpg" alt="imgStatica"/>';
				html += '<h4>'+ractual.Nombre+'</h4>';
				html += '<span class="icon-attach-money"></span>'+ractual.PrecioV+'<small><strong>MXN.</strong></small>';
				html += '<p><strong>Tallas </strong> <small>'+ractual.Talla+'</small></p>';
			html += '</div>';

		if(i % 3 == 0 && i != 0)
		{
			html += '</div>';
			html += '<div class="resultado">';
		}
	}
	$('#productos').append(html);
	recuperaMarcas();
	recuperaDeportes();
	recuperaCategorias();
	recuperaScategorias();
}





 function filtrar(consulta)
 {
 	var html ="";
	$('#productos>.resultado').remove();
	if(consulta.length > 0)
	{
		html += '<div class="resultado">';
		for(var i = 0; i < consulta.length; i++)
		{
			var ractual = consulta[i];
				html += '<div class="prueba" id="'+ractual.ID+'">';
					html +='<img class="logito" src="../imagenes/logo-n.png" alt="logo">';
					html += '<img class="imgRes" src="../imagenes/productos/'+ractual.ID+'.jpg" alt="imgStatica"/>';
					html += '<h4>'+ractual.Nombre+'</h4>';
					html += '<span class="icon-attach-money"></span>'+ractual.Precio+'<small><strong>MXN.</strong></small>';
					html += '<p><strong>Tallas </strong> <small>'+ractual.Talla+'</small></p>';
				html += '</div>';

			if(i % 3 == 0 && i != 0)
			{
				html += '</div>';
				html += '<div class="resultado">';
			}
				
		}
	}
	$('#productos').append(html);
 }



function generarID()
{
	idLlamada = ('' + Math.random()).substring(2);
	return idLlamada;
}

$('#productos').on("click",mostrarProducto)

function mostrarProducto(e)
{
	if((e.target.parentElement.tagName != "DIV") || (e.target.tagName != "IMG"))
	{
		return;
	}
	var pr = parseInt(e.target.parentElement.id);
	var reg = respaldo[pr];
	console.log(pr);

	var html = "<div id='divModal'>";
			html += "<h1>"+reg.Nombre+"</h1>";
			html += "<img class='imgProducto' src='../imagenes/productos/"+reg.ID+".jpg'>";
			html += "<p id='descripcion'>"+String(reg.Descripcion) +"</p>";
			html += "<p><strong>Precio: </strong><span class='icon-attach-money'></span>"+reg.PrecioV+" mxn.</p>";

			html += "<table class='tablaVer'>";
		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Genero: </strong>"+reg.Genero+"</small></p>";
			html += "</td>";
			html += "<td>";
				html += "<p><small><strong>Tallas Disponibles: </strong>"+reg.Talla+"</small></p>";
			html += "</td>";
		html += "</tr>";

		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Categoría  : </strong>"+reg.Ncategoria+"</small></p>";
			html += "</td>";
			html += "<td>";
				html += "<p><small><strong>Subcategoría: </strong>"+reg.Nscategoria+"</small></p>";
			html += "</td>";
		html += "</tr>";

		html += "<tr>";
			html += "<td>";
				html += "<p><small><strong>Deporte    : </strong>"+reg.Ndeporte+"</small></p>";
			html += "</td>";
			html += "<td>";
				html += "<p><small><strong>Tipo De Producto: </strong>"+reg.Tipo+"</small></p>";
			html += "</td>";
		html += "</tr>";
	html += "</table>";
	html += "</div>";
	if(ss.rol=="cliente")
	{
		$('.modal-footer').html('<button type="button" class="boton btnEditar" data-dismiss="modal">Cerrar</button>&nbsp;&nbsp;<button type="button" class="boton btnVer" data-dismiss="modal">Comprar</button>');
	}
	mostrarVentanaModal(html);
}


$('#filtro>ul>li>div').on("click",muestrali);

function muestrali(e)
{
	if(e.target.tagName != "STRONG")
	{
		return;
	}
	$('#filtro>ul>li>div>ul').slideUp();
	var a = e.target.parentElement.id;
	$('#'+a+' ul').slideToggle();
}

/*filtros*/
$('#f1').on("click",tipo);
$('#f2').on("click",marca);
$('#f3').on("click",deporte);
$('#f4').on("click",categoria);
$('#f5').on("click",scategoria);

function scategoria(e)
{
	if(e.target.tagName != "LI")
	{
		return;
	}
	var a = (e.target.innerText).toLowerCase();
	var o = 0;
	consultaf5 = [];
	for(var i = 0; i < registros.length; i++)
	{
		var ractual = registros[i];
		if(ractual.Nscategoria.toLowerCase() == a)
		{
			consultaf5[o] = ractual;
			o++;
		}
	}
	registros = consultaf5;
	link.scategoria = $('#navegando').html()+" / "+"<a href='#' id='f5'>"+e.target.innerText+"</a>";
	$('#navegando').html(link.scategoria);

	filtrar(registros);
}

function categoria(e)
{
	if(e.target.tagName != "LI")
	{
		return;
	}
	var a = (e.target.innerText).toLowerCase();
	var o = 0;
	consultaf4 = [];
	for(var i = 0; i < registros.length; i++)
	{
		var ractual = registros[i];
		if(ractual.Ncategoria.toLowerCase() == a)
		{
			consultaf4[o] = ractual;
			o++;
		}
	}
	registros = consultaf4;
	$('.sc').slideUp();
	seleccionoCategoria(e.target.innerText);
	link.categoria = $('#navegando').html()+" / "+"<a href='#' id='f4'>"+e.target.innerText+"</a>";
	$('#navegando').html(link.categoria);

	filtrar(registros);
}
function deporte(e)
{
	if(e.target.tagName != "LI")
	{
		return;
	}
	var a = (e.target.innerText).toLowerCase();
	var o = 0;
	consultaf3 = [];
	for(var i = 0; i < registros.length; i++)
	{
		var ractual = registros[i];
		if(ractual.Ndeporte.toLowerCase() == a)
		{
			consultaf3[o] = ractual;
			o++;
		}
	}
	registros = consultaf3;
	link.deporte = $('#navegando').html()+" / "+"<a href='#' id='f3'>"+e.target.innerText+"</a>";
	$('#navegando').html(link.deporte);

	filtrar(registros);
}

function marca(e)
{
	if(e.target.tagName != "LI")
	{
		return;
	}
	var a = (e.target.innerText).toLowerCase();
	var o = 0;
	consultaf2 = [];
	for(var i = 0; i < registros.length; i++)
	{
		var ractual = registros[i];
		if(ractual.Nmarca.toLowerCase() == a)
		{
			consultaf2[o] = ractual;
			o++;
		}
	}
	registros = consultaf2;
	var p = ss.busqueda;
	link.marca = $('#navegando').html()+" / "+"<a href='#' id='f2'>"+e.target.innerText+"</a>";
	$('#navegando').html(link.marca);

	filtrar(registros);
}


function tipo(e)
{
	if(e.target.tagName != "LI")
	{
		return;
	}
	var a = (e.target.innerText).toLowerCase();
	var o = 0;
	for(var i = 0; i < respaldo.length; i++)
	{
		var ractual = respaldo[i];
		if(ractual.Tipo == a)
		{
			consultaf1[o] = ractual;
			o++;
		}
	}
	var p = ss.busqueda;
	registros = consultaf1;
	link.tipo = link.genero+" / "+"<a href='#' id='f1'>"+e.target.innerText+"</a>";
	$('#navegando').html(link.tipo);
	filtrar(registros);
}


/*Navegación*/
$('#navegando').on("click",bien);

function bien(e){
	if(e.target.tagName != "A")
	{
		return;
	}
	switch(e.target.id)
	{
		case "registros":
		{
			$('#navegando').html(link.genero);
			registros = respaldo;
			filtrar(respaldo);
		}break;
		case "f1":
		{
			$('#navegando').html(link.tipo);
			registros = consultaf1;
			filtrar(registros);
		}break;
		case "f2":
		{
			$('#navegando').html(link.marca);
			registros = consultaf2;
			filtrar(registros);
		}break;
		case "f3":
		{
			$('#navegando').html(link.deporte);
			registros = consultaf3;
			filtrar(registros);
		}break;
		case "f4":
		{
			$('#navegando').html(link.categoria);
			registros = consultaf4;
			filtrar(registros);
		}break;
		case "f5":
		{
			$('#navegando').html(link.scategoria);
			registros = consultaf5;
			filtrar(registros);
		}break;
	}
}

/*Recuperar Catalogos**/


function recuperaMarcas()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"clase": "consulta",
		"method":"listarMarca"
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperaMarcas);
}

function exitoRecuperaMarcas(jsonRespuesta)
{
	rmarcas = jsonRespuesta.result;
	$('#f2 ul li').remove();
	var html="";
	for(var i = 0; i < rmarcas.length; i++)
	{
		var m = rmarcas[i];
		html += "<li>"+m.Nombre+"</li>";
	}
	$('#f2 ul').append(html);
}

function recuperaDeportes()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"clase": "consulta",
		"method":"listarDeporte"
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperaDeportes);
}

function exitoRecuperaDeportes(jsonRespuesta)
{
	rdeportes = jsonRespuesta.result;
	$('#f3 ul li').remove();
	var html="";
	for(var i = 0; i < rdeportes.length; i++)
	{
		var d = rdeportes[i];
		html += "<li>"+d.Nombre+"</li>";
	}
	$('#f3 ul').append(html);
}
function recuperaCategorias()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"clase": "consulta",
		"method":"listarCategoria"
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperaCategorias);
}

function exitoRecuperaCategorias(jsonRespuesta)
{
	rcategorias = jsonRespuesta.result;
	$('#f4 ul li').remove();
	var html="";
	for(var i = 0; i < rcategorias.length; i++)
	{
		var c = rcategorias[i];
		html += "<li>"+c.Nombre+"</li>";
	}
	$('#f4 ul').append(html);
}
function recuperaScategorias()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"clase": "consulta",
		"method":"listarScategoria"
	});
	$.post(gatewayAccesoJS, pJSON, exitoRecuperaScategorias);
}
function exitoRecuperaScategorias(jsonRespuesta)
{
	rscategorias = jsonRespuesta.result;
}
function seleccionoCategoria(cate)
{
	$('#f5 ul li').remove();
	var html="";
	for(var i = 0; i < rscategorias.length; i++)
	{
		var s = rscategorias[i];
		if(s.Cnombre == cate)
		{
			html += "<li>"+s.Nombre+"</li>";
		}
	}
	$('#f5 ul').append(html);
	$('.sc').slideDown();
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

