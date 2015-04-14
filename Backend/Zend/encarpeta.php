<?php
// Aqui en lugar de poner el id, deberian recuperarlo:
$id = $idp;

ob_start();
switch($tipoImagen) {
	case 'image/png':
		$blobImagen = imagecreatefrompng($nombreTemporal);
		imagepng($blobImagen);
		$extension = '.png';
		break;
	case 'image/jpeg':
		$blobImagen = imagecreatefromjpeg($nombreTemporal);
		imagejpeg($blobImagen);
		$extension = '.jpg';
		break;
	case 'image/gif':
		$blobImagen = imagecreatefromgif($nombreTemporal);
		imagegif($blobImagen);
		$extension = '.gif';
		break;
	default:
		ob_end_clean();
		echo "Solo recibos archivos png, jpg o gif"; exit;
		break;
}
$rutaNueva = '../../Frontend/imagenes/productos/' . $id . $extension;
$datosArchivo = ob_get_contents();
ob_end_clean();
$archivoNuevo = fopen($rutaNueva, 'w');
fwrite($archivoNuevo, $datosArchivo);
fclose($archivoNuevo);
imagedestroy($blobImagen);
?>
<!DOCTYPE html>
<html>
	<head>
	<title>Sport Zone | Productos</title>
		<script src="../../Frontend/javascript/libs/jquery-2.1.1.min.js"></script>

	</head>

	<body>
		<script>
		$(function(){
			document.location="../../Frontend/Paginas/productos.html";
		});
		</script>
	</body>
</html>