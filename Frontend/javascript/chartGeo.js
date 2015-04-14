var pJSON = null;
var resultado = null;
var gatewayAccesoJS = "../../Backend/index.php";
google.load('visualization', '1.0', {'packages':['geochart']});
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
		"method": "paises",
		"clase": "chart"
	});
	$.post(gatewayAccesoJS, pJSON, tipoObtenido);
}
function tipoObtenido(jsonRespuesta)
{
	console.log(jsonRespuesta);
	resultado = jsonRespuesta.result;
	var objeto = [];	
	for(var i = 0; i < resultado.length; i++)
	{
		objeto[i] = [ String(resultado[i].Pais) , parseInt(resultado[i].Numero)];
	}
	

	var datos = new google.visualization.DataTable();
	datos.addColumn('string', 'Pais');
    datos.addColumn('number', 'Total Vendido');


	datos.addRows (objeto);

	var options = {'title':"Paises Clientes"};
    var chart = new google.visualization.GeoChart(document.getElementById('grafica'));
   chart.draw(datos, options);
}
