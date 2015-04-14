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
		"method": "ganancias",
		"clase": "chart"
	});
	$.post(gatewayAccesoJS, pJSON, tipoObtenido);
}
function tipoObtenido(jsonRespuesta)
{
	var objetog = [];
	var objetov = [];
	var objetoi = [];
	var objetoT = [];
	objetog = llenarArray(objetog);
	objetov = llenarArray(objetov);
	objetoi = llenarArray(objetoi);
	objetoT = llenarArray(objetoT);

	resultado = jsonRespuesta.result;

		for(var l = 0; l < resultado.length; l++)
		{
			for (var i = 1; i <= 12; i++) 
			{
				if(parseInt(resultado[l].Mes) === i )
				{
					objetov[i-1] += parseInt(resultado[l].Vendido);
					objetog[i-1] += parseInt(resultado[l].Ganacia);
					objetoi[i-1] += parseInt(resultado[l].Inversion);

				}
			}

		}
		for (var i = 0; i < 12; i++) 
			{
				
				objetoT[i] = [ mes(i+1),objetov[i],objetoi[i],objetog[i]];
				
			}

	var datos = new google.visualization.DataTable();
	datos.addColumn('string', 'Meses');
    datos.addColumn('number', 'Vendido');
    datos.addColumn('number', 'Invertido');
    datos.addColumn('number', 'Ganacia');


	datos.addRows (objetoT);

	var options = {hAxis: {
			          title: 'Meses'
			        },
			        vAxis: {
			          title: 'Efectivo en mxn.'
			        },
			        seriesType: "bars",
			        series : {5:{type: "line"}}
			       };
    var chart = new google.visualization.ComboChart(document.getElementById('grafica'));
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
			array[i] = 0;
		}
	}
	return array;
}