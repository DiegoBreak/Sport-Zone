
<?php
require_once('../Datos/sportzone_base.php');
	Class Registrar extends Sportzone_base
	{
		private $_email = null;
		private $_sql = null;
		public function validaEmail($email)
		{
	 		$this->_email = "'".strval($email)."'";
			$this->_sql = sprintf("SELECT * FROM usuario WHERE Correo = %s;",$this->_email);
			return $this->sentenciaSQL($this->_sql ,2);
		}
		public function registrarUsuario($usuario)
		{
			$registro = (object)$usuario;
			$nombre = "'".strval(trim($registro->nombre))."'";
			$correo = "'".$registro->correo."'";
			$contraseña = "'".strval(trim($registro->contraseña))."'";
			$this->_sql = sprintf("INSERT INTO usuario VALUES (null, %s, %s, %s, 'cliente');",$nombre,$correo,$contraseña);
			return $this->sentenciaSQL($this->_sql,4);
		}
	}
?>
