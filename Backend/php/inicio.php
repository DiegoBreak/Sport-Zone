<?php
require_once('../Datos/sportzone_base.php');
	Class Inicio extends Sportzone_base
	{
		private $_tipo       = null;
		private $_email      = null;
		private $_contrasena = null;
		private $_sql        = null;
		private $_res        = null;

		public function verifica($tipo, $email, $contrasena)
		{


			if(isset($_SESSION["idUsuario"]))
			{
				throw new Exception('El Usuario ya tiene una Sesión Abierta');
				return; 
			}
			$_email 	 = "'".$email."'";
			$_contrasena = "'".$contrasena."'";
			if($tipo == 1 )
			{
				$_tipo="'"."administrador"."'";
				$this->_sql=sprintf("SELECT * FROM usuario WHERE (Correo=%s AND Contrasena=%s AND Rol=%s);",
					$_email, $_contrasena, $_tipo);
			}
			else
			{
				$_tipo="'"."cliente"."'";
				$this->_sql=sprintf("SELECT * FROM usuario WHERE (Correo=%s AND Contrasena=%s AND Rol=%s);",
				$_email, $_contrasena, $_tipo);
				
			}
			

			$this->_res=$this->sentenciaSQL($this->_sql,8,'ID');
			if($this->_res>0)
			{
				$_SESSION["idUsuario"]=$this->_res;
				$_SESSION["Rol"]=$tipo;
				return $this->sentenciaSQL($this->_sql,2,'ID');
			}
			else
			{
				throw new Exception("Error en sus permisos del servidor.\n\r".$this->_sql);
				return;
			}
			
		}
		public function terminarSesion()
		{
			$_SESSION["idUsuario"] = null;
			unset($_SESSION["idUsuario"]);
			session_unset();

			return true;
		}
	}
?>