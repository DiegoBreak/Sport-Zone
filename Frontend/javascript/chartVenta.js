var pJSON = null;
var resultado = null;
var gatewayAccesoJS = "../../Backend/index.php";
google.load('visualization', '1.0', {'packages':['corechart']});
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
		"method": "ventas",
		"clase": "chart"
	});
	$.post(gatewayAccesoJS, pJSON, tipoObtenido);
}
function tipoObtenido(jsonRespuesta)
{
	resultado1 = jsonRespuesta.result[0];
	resultadoA = llenarArray(jsonRespuesta.result[1]);
	resultadoC = llenarArray(jsonRespuesta.result[2]);
	resultadoR = llenarArray(jsonRespuesta.result[3]);
	var objeto = [];
	var objetoR = [];
	objeto[0] = [ '' , 0, 0, 0, 0];
	
	for(var i = 0; i < resultado1.length; i++)
	{
		objeto[i+1] = [ mes(resultado1[i].Mes) , parseInt(resultado1[i].Numero), parseInt(resultadoA[i].Numero),parseInt(resultadoC[i].Numero),parseInt(resultadoR[i].Numero)];
	}
	

	var datos = new google.visualization.DataTable();
	datos.addColumn('string', 'Meses');
    datos.addColumn('number', 'Total Vendido');
    datos.addColumn('number', 'Accesorios Vendidos');
    datos.addColumn('number', 'Calzado Vendido');
    datos.addColumn('number', 'Ropa Vendida');


	datos.addRows (objeto);

	var options = {hAxis: {
			          title: 'Meses'
			        },
			        vAxis: {
			          title: 'Productos Vendidos'
			        }
			       };
    var chart = new google.visualization.LineChart(document.getElementById('grafica'));
   chart.draw(datos, options);
}

function mes(num)
{
	num = parseInt(num);
	 switch(num)
	{
		case 1:{return "Enero";}break;
		case 2:{return "Febrero";}break;
		case 3:{return "Marzo";}break;
		case 4:{return "Abril";}break;
		case 5:{return "Mayo";}break;
		case 6:{return "Junio";}break;
		case 7:{return "Julio";}break;
		case 8:{return "Agosto";}break;
		case 9:{return "Septiembre";}break;
		case 10:{return "Octubre";}break;
		case 11:{return "Noviembre";}break;
		case 12:{return "Diciembre";}break;

	}
}
function llenarArray(array)
{
	for(var i = 0; i < 12; i++)
	{
		if(array[i]=== undefined)
		{
			array[i] = 1;
		}
	}
	return array;
}