<?php
session_start();
	abstract Class Sportzone_base
	{
		private $_resultado = null;
		protected $conexion = null;
		private $_devolver = null;

		public function __construct()
		{
			error_reporting(E_ERROR & ~E_WARNING); 
			$this->conexion = new mysqli("localhost", "root", "", "sportzone");
			if (mysqli_connect_error()) {
				throw new Exception('Error: ' . mysqli_connect_errno() . '<br />Mensaje: ' . mysqli_connect_error()); // Desarrollo
			return;
			}
		}
		protected function sentenciaSQL($elSQL, $tipoDevolucion, $columna='')
		{
			$_resultado = $this->conexion->query($elSQL);
			// Si $_resultado fue TRUE:
			if($_resultado) {
				switch ($tipoDevolucion) {
					case 0:
						// Devolvemos el resulteSet tal cual (util para pdf y excel):
						$_devolver = $_resultado;
						break;
					case 1:
						// Devolvemos el resultSet convertido en un array (util para amfphp2 y zendamf):
						// DESCONTINUADO...
						break;
					case 2:
						// Devolvemos el resultSet convertido a formato JSON (util para jQuery o jQueryMobile):
						$_resultSet = array();
						while($_registro = $_resultado->fetch_assoc()) {
							$_resultSet[] = array_map(utf8_encode, $_registro);
						}
						$_devolver = $_resultSet;
						break;
					case 3:
						// Devolvemos el resultSet convertido a XML (util para webservices viejitos -experimental-):
						// DESCONTINUADO...
						break;
					case 4:
						// Devolvemos el ultimo id (AUTO_INCREMENT).
						$_devolver  = $this->conexion->insert_id;
						break;
					case 5:
						// Devolvemos el numero de registros afectados por INSERT, UPDATE o DELETE.
						$_devolver  = $this->conexion->affected_rows;
						break;
					case 6:
						// Devolvemos el numero de registros devueltos por SELECT solamente.
						$_devolver = $_resultado->num_rows;
						break;
					case 7:
						// Devolvemos el PRIMER registro devuelto por el SELECT en formato de array.
						$_devolver = $_resultado->fetch_assoc();
						break;
					case 8:
						// Devolvemos la columna especifica del PRIMER registro devuelto por el SELECT.
						$columnaSQL = strval(trim($columna));
						$registroSQL = $_resultado->fetch_assoc();
						$_devolver = $registroSQL[$columnaSQL];

						break;
					default:
						// No hay un $tipoDevolucion, por lo tanto devolvemos un error.
						throw new Exception("NO tienes un tipo definido en el Query.");
						return;
						break;
				}
				return $_devolver; // Aqui devolvemos el resultado a la Clase Heredada...
			} else {
				throw new Exception("No. " .  $this->conexion->errno . "<br />Error: " . $this->conexion->error . "<br />En la sentencia:<br />". $elSQL); 
				return;
			}
		}
		protected function validaSesion()
		{
			if(isset($_SESSION["idUsuario"]) && $_SESSION["Rol"] == 1)
			{
				return true;
			}
			else
			{
				return false;
			}

		}

	}
?>