<?php
require_once('../Datos/sportzone_base.php');
	Class Deportes extends Sportzone_base
	{
		private $_sql = null;
		private $_tipo = null;
		private $_id = null;
		private $_nombre = null;

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
		public function listarDeportes($tipo)
		{
	 		$this->_tipo = intval($tipo);
			$this->_sql = "SELECT * FROM deporte WHERE ID>=1 AND Estatus = 1;";
			return $this->sentenciaSQL($this->_sql ,$this->_tipo);
		}

		public function agregaDeporte($registro)
		{
			$registro = (object)$registro;
			$this->_nombre="'".strval(trim($registro->nombre))."'";
			$this->_sql = sprintf("INSERT INTO deporte VALUES (null, %s, 1);",$this->_nombre);

	 		return $this->sentenciaSQL($this->_sql, 4);
		}
		public function modificaDeporte($registro)
		{
			$registro = (object)$registro;
			$this->_nombre="'".strval(trim($registro->nombre))."'";
			$this->_id= intval($registro->id);
			$this->_sql = sprintf("UPDATE deporte SET Nombre = %s WHERE ID = %s;",$this->_nombre, $this->_id);
			 return $this->sentenciaSQL($this->_sql, 5); 

		}
		public function eliminaDeporte($registro)
		{
			$this->_id = intval($registro);
			$this->_sql = sprintf("UPDATE deporte SET Estatus = 0 WHERE ID = %s;",$this->_id);
			return $this->sentenciaSQL($this->_sql, 5);
		}
	}
?>