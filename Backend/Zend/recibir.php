<?php
if(isset($_FILES['inputImagen'])) {
	if ($_FILES['inputImagen']['error'] != 0) {
		echo 'Existe un error: <br />' . $_FILES['inputImagen']['error'];
		exit;
	}
	$nombreOriginal = $_FILES['inputImagen']['name'];
	$tipoImagen = $_FILES['inputImagen']['type'];
	$nombreTemporal = $_FILES['inputImagen']['tmp_name'];
	$tamanoImagen = $_FILES['inputImagen']['size'];
	$idp = $_REQUEST['id'];
	$tipoSubida = 'A';
	if($tipoSubida == 'A') {
		// A una carpeta:
		require_once 'encarpeta.php';
		exit;
	} else {
		// A la base de datos:
		require_once 'enbase.php';
		exit;
	}
} else {
	echo "No hay archivo subido.";
	exit;
}
?>
