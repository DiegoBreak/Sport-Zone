<?php
require_once('../Datos/sportzone_base.php');
	Class Marca extends Sportzone_base
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
		* atributo privado para el id del registro
		* @access private
		* @var String
		*/
		private $_id = null;
		/**
		* atributo privado para el nombre del registro
		* @access private
		* @var String
		*/
		private $_nombre = null;
		/**
		* atributo privado para la compañia
		* @access private
		* @var String
		*/
		private $_compania = null;


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
		* Funcion para obtener todos los registros de la tabla marca y listarlos
		* @param int para establer el tipo de devoluvción
		* @access public
		* @return object los resultados de la consulta en array
		*/
		public function listarMarca($tipo)
		{
	 		$this->_tipo = intval($tipo);
			$this->_sql = "SELECT * FROM marca WHERE ID>=1 AND Estatus = 1;";
			return $this->sentenciaSQL($this->_sql ,$this->_tipo);
		}

		/**
		* Funcion para agregar un nuevo registro a la tabla marca
		* @param int para establer el tipo de devoluvción
		* @access public
		* @return int el id de la nueva marca
		*/
		public function agregaMarca($registro)
		{
			$registro = (object)$registro;
			$this->_nombre="'".strval(trim($registro->nombre))."'";
			$this->_compania="'".strval(trim($registro->compania))."'";
			$this->_sql = sprintf("INSERT INTO marca VALUES (null, %s, %s, 1);",$this->_nombre,$this->_compania);

	 		return $this->sentenciaSQL($this->_sql, 4);
		}

		/**
		* Funcion para modificar un registro a la tabla marca
		* @param object son los datos que se van a modificar
		* @access public
		* @return int es el número de registros que se actualizaron
		*/
		public function modificaMarca($registro)
		{
			$registro = (object)$registro;
			$this->_nombre="'".strval(trim($registro->nombre))."'";
			$this->_compania="'".strval(trim($registro->compania))."'";
			$this->_id= intval($registro->id);
			$this->_sql = sprintf("UPDATE marca SET Nombre = %s ,Compania = %s WHERE ID = %s;",$this->_nombre, $this->_compania, $this->_id);
			 return $this->sentenciaSQL($this->_sql, 5); 

		}

		/**
		* Funcion para modificar el estatus de una marca
		* @param int es el id del rgistro que se va a ctualizar
		* @access public
		* @return int número de registros que se actualizaron
		*/
		public function eliminaMarca($registro)
		{
			$this->_id = intval($registro);
			$this->_sql = sprintf("UPDATE marca SET Estatus = 0 WHERE ID = %s;",$this->_id);
			return $this->sentenciaSQL($this->_sql, 5);
		}
	}
?>