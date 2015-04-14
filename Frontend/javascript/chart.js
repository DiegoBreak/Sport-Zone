var pJSON = null;
var resultado = null;
var gatewayAccesoJS = "../../Backend/index.php";
//carga la API visualization y el piechart package
google.load('visualization', '1.0', {'packages':['corechart']});
//se establce la funcion que se ejecutara cuando se termine de cargar la API de visualization
google.setOnLoadCallback(obtenTipo);

	

function generarID()
{
	var idLlamada = ('' + Math.random()).substring(2);
	return idLlamada;
}

function obtenTipo()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"method": "tipo",
		"clase": "chart"
	});
	$.post(gatewayAccesoJS, pJSON, tipoObtenido);
}
function tipoObtenido(jsonRespuesta)
{
	resultado = jsonRespuesta.result;
	//crea la tabla de Datos
	var datos = new google.visualization.DataTable();

	//lena los tabla de Datos
	datos.addColumn('string', 'Topping');
    datos.addColumn('number', 'Slices');
	 datos.addRows ([
	  ['Accesorios', parseInt(resultado[0].Numero)],
	  ['Calzado', parseInt(resultado[1].Numero)],
	  ['Ropa', parseInt(resultado[2].Numero)]
	 ]);

	 // Establecer las opciones de la tabla
        var options = {'title':'Tipos de Productos',
                       'is3D':true};

    var chart = new google.visualization.PieChart(document.getElementById('grafica'));
   chart.draw(datos, options);
   obtenTipos();
}

function obtenTipos()
{
	pJSON = JSON.stringify({
		"Id":generarID(),
		"method": "tipos",
		"clase": "chart"
	});
	$.post(gatewayAccesoJS, pJSON, tiposObtenidos);
}
function tiposObtenidos(jsonRespuesta)
{
	resultado = jsonRespuesta.result;
	ropa();
	accesorio();
	calzado();
	
}
function ropa()
{
	var objeto = [];
	var o = 0;
	for(var i = 0; i < resultado.length; i++)
	{
		if(resultado[i].Tipo == "ropa")
		{
	 		objeto[o]=[ String(resultado[i].Categoria), parseInt(resultado[i].Numero)];
	 		o++;
		}
	}
	var datosR = new google.visualization.DataTable();
	datosR.addColumn('string', 'Topping');
    datosR.addColumn('number', 'Slices');
	datosR.addRows (objeto);
    var options = {'title':'Ropa'};

    var chart1 = new google.visualization.PieChart(document.getElementById('grafico1'));
   chart1.draw(datosR, options);
}
function accesorio()
{
	var objeto = [];
	var o = 0;
	for(var i = 0; i < resultado.length; i++)
	{
		if(resultado[i].Tipo == "accesorio")
		{
	 		objeto[o]=[ String(resultado[i].Categoria), parseInt(resultado[i].Numero)];
	 		o++;
		}
	}
	var datosA = new google.visualization.DataTable();
	datosA.addColumn('string', 'Topping');
    datosA.addColumn('number', 'Slices');
	datosA.addRows (objeto);
    var options = {'title':'Accesorios'};

    var chart2 = new google.visualization.PieChart(document.getElementById('grafico2'));
   chart2.draw(datosA, options);
}
function calzado()
{
	var objeto = [];
	var o = 0;
	for(var i = 0; i < resultado.length; i++)
	{
		if(resultado[i].Tipo == "calzado")
		{
	 		objeto[o]=[ String(resultado[i].Categoria), parseInt(resultado[i].Numero)];
	 		o++;
		}
	}
	var datosC = new google.visualization.DataTable();
	datosC.addColumn('string', 'Topping');
    datosC.addColumn('number', 'Slices');
	datosC.addRows (objeto);
    var options = {'title':'Calzado'};

    var chart3 = new google.visualization.PieChart(document.getElementById('grafico3'));
   chart3.draw(datosC, options);
}
