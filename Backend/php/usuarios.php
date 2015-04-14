<?php
require_once('../Datos/sportzone_base.php');
	Class Usuarios extends Sportzone_base
	{
		/**
		* atributo privado parael query de SQL
		* @access private
		* @var String
		*/
		private $_sql = null;
		/**
		* atributo privado para elt tipo de resultado que se espera
		* @access private
		* @var String
		*/
		private $_tipo = null;
		/**
		* atributo privado para el id del rusuario
		* @access private
		* @var String
		*/
		private $_id = null;
		/**
		* atributo privado para el nombre del usuario
		* @access private
		* @var String
		*/
		private $_nombre = null;
		/**
		* atributo privado para el correo del usuario
		* @access private
		* @var String
		*/
		private $_correo = null;
		/**
		* atributo privado para el correo del usuario
		* @access private
		* @var String
		*/
		private $_rol = null;
		/**
		* atributo privado para la contraseña del usuario
		* @access private
		* @var String
		*/
		private $_contrasena = null;


		/**
		* constructor de la clase, que invoca el constructor heredado
		* @access public
		* @return void
		*/
		public function __construct()
		{
			if(parent::validaSesion())
			{
				parent::__construct();

			}
			else{
				throw new Exception("No tienes permisos");
				return;
			} 
		}

		/**
		* Funcion para obtener todos los registros de la tabla usuario y listarlos
		* @param int para establer el tipo de devoluvción
		* @access public
		* @return object los resultados de la consulta en array
		*/
		public function listarUsuarios($tipo)
		{
	 		$this->_tipo = intval($tipo);
			$this->_sql = "SELECT * FROM usuario WHERE ID>=1";
			return $this->sentenciaSQL($this->_sql ,$this->_tipo);
		}

		/**
		* Funcion para agregar un nuevo registro a la tabla usuario
		* @param int para establer el tipo de devoluvción
		* @access public
		* @return int el id del nuevo usuario
		*/
		public function agregaUsuario($registro)
		{
			$registro = (object)$registro;
			$this->_nombre="'".strval(trim($registro->nombre))."'";
			$this->_correo="'".strval(trim($registro->correo))."'";
			$this->_rol="'".strval(trim($registro->rol))."'";
			$this->_contrasena="'".strval(trim($registro->contraseña))."'";


			$this->_sql = sprintf("INSERT INTO usuario VALUES (null, %s, %s, %s, %s);",$this->_nombre, $this->_correo, $this->_contrasena ,$this->_rol);

	 		return $this->sentenciaSQL($this->_sql, 4);
		}

		/**
		* Funcion para modificar un registro a la tabla usuario
		* @param object son los datos que se van a modificar
		* @access public
		* @return int es el número de registros que se actualizaron
		*/
		public function modificaUsuario($registro)
		{
			$registro = (object)$registro;
			$this->_nombre="'".strval(trim($registro->nombre))."'";
			$this->_correo="'".strval(trim($registro->correo))."'";
			$this->_id=intval($registro->id);

			$this->_sql = sprintf("UPDATE usuario SET Nombre = %s ,Correo = %s WHERE ID = %s;",$this->_nombre, $this->_correo, $this->_id);
			 return $this->sentenciaSQL($this->_sql, 5); 

		}

		/**
		* Funcion para eliminar el registro de algún usuario
		* @param int es el id del rgistro que se va a ctualizar
		* @access public
		* @return int número de registros que se actualizaron
		*/
		public function eliminaUsuario($registro)
		{
			$this->_id = intval($registro);
			$this->_sql = sprintf("DELETE FROM usuario WHERE ID = %s;",$this->_id);
			return $this->sentenciaSQL($this->_sql, 5);
		}
	}
?>