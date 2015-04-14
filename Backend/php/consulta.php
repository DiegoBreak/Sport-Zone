<?php
require_once('../Datos/sportzone_base.php');
	Class Consulta extends Sportzone_base
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
		* Funcion para obtener todos los registros de la tabla marca y listarlos
		* @param int para establer el tipo de devoluvción
		* @access public
		* @return object los resultados de la consulta en array
		*/
		public function busqueda($tipo)
		{
	 		$this->_tipo = "'".strval($tipo)."'";
			$this->_sql = sprintf("SELECT p.*, c.Nombre as Ncategoria, d.Nombre as Ndeporte, m.Nombre as Nmarca, sb.Nombre as Nscategoria FROM producto p join categoria c on(p.Categoria_ID = c.ID) join deporte d on (p.Deporte_ID = d.ID) join marca m on (p.Marca_ID = m.ID) join subcategoria sb on (p.Subcategoria_ID = sb.ID) WHERE p.ID>=1 AND (Genero = %s or Genero = 'unisex');",$this->_tipo);
			$objetoA = $this->sentenciaSQL($this->_sql ,2);
			return $objetoA;
		}

		public function listarMarca()
		{
			$this->_sql = "SELECT m.* , count(*) as Numero FROM marca m join producto p on (m.ID = p.marca_ID) WHERE Estatus = 1 group by m.ID;";
			return $this->sentenciaSQL($this->_sql ,2);
		}

		public function listarDeporte()
		{
			$this->_sql = "SELECT d.* , count(*) as Numero FROM deporte d join producto p on (p.Deporte_ID = d.ID) WHERE Estatus = 1 group by d.ID;";
			return $this->sentenciaSQL($this->_sql ,2);
		}
		public function listarCategoria()
		{
			$this->_sql = "SELECT c.* , count(*) as Numero FROM categoria c join producto p on (p.Categoria_ID = c.ID) WHERE Estatus = 1 group by c.ID;";
			return $this->sentenciaSQL($this->_sql ,2);
		}

		public function listarScategoria()
		{
			$this->_sql = "SELECT s.* , c.Nombre as Cnombre, count(*) as Numero FROM subcategoria s join producto p on (p.Subcategoria_ID = s.ID) join categoria c on (p.Categoria_ID = c.ID) WHERE s.Estatus = 1 group by s.ID";
			return $this->sentenciaSQL($this->_sql ,2);
		}

		
	}
?>