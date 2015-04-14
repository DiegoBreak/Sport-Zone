<?php
require_once('../Datos/sportzone_base.php');
	Class Productos extends Sportzone_base
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
		private $_id = null;
		private $_nombre = null;
		private $_descripcion = null;
		private $_precioV = null;
		private $_genero = null;
		private $_talla = null;
		private $_imagen = null;
		private $_categoria = null;
		private $_deporte = null;
		private $_marca = null;
		private $_subcategoria = null;
		private $_tipo = null;
		private $_disponibles = null;
		private $_precioC = null;


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
		public function listarProductos($tipo)
		{
			$objeto = [];
	 		$this->_tipo = strval($tipo);
	 		if($this->_tipo== "t1" )
	 		{
				$this->_sql = "SELECT p.*, c.Nombre as Ncategoria, d.Nombre as Ndeporte, m.Nombre as Nmarca, sb.Nombre as Nscategoria FROM producto p join categoria c on(p.Categoria_ID = c.ID) join deporte d on (p.Deporte_ID = d.ID) join marca m on (p.Marca_ID = m.ID) join subcategoria sb on (p.Subcategoria_ID = sb.ID) WHERE p.ID>=1 AND p.Tipo='ropa';";
	 		}
	 		else if($this->_tipo== "t2" )
	 		{
				$this->_sql = "SELECT p.*, c.Nombre as Ncategoria, d.Nombre as Ndeporte, m.Nombre as Nmarca, sb.Nombre as Nscategoria FROM producto p join categoria c on(p.Categoria_ID = c.ID) join deporte d on (p.Deporte_ID = d.ID) join marca m on (p.Marca_ID = m.ID) join subcategoria sb on (p.Subcategoria_ID = sb.ID) WHERE p.ID>=1 AND p.Tipo='accesorio';";
	 		}
	 		else
	 		{
				$this->_sql = "SELECT p.*, c.Nombre as Ncategoria, d.Nombre as Ndeporte, m.Nombre as Nmarca, sb.Nombre as Nscategoria FROM producto p join categoria c on(p.Categoria_ID = c.ID) join deporte d on (p.Deporte_ID = d.ID) join marca m on (p.Marca_ID = m.ID) join subcategoria sb on (p.Subcategoria_ID = sb.ID) WHERE p.ID>=1 AND p.Tipo='calzado';";
	 		}
	 		$objeto[0]= $this->sentenciaSQL($this->_sql ,2);
	 		$this->_sql = "SELECT *, count(*) AS Numero FROM ventas Group by Producto ";
	 		$objeto[1]= $this->sentenciaSQL($this->_sql ,2);

			return $objeto;
		}

		/**
		* Funcion para agregar un nuevo registro a la tabla marca
		* @param int para establer el tipo de devoluvción
		* @access public
		* @return int el id de la nueva marca
		*/
		public function agregaProducto($registro)
		{
			$registro = (object)$registro;
			$this->_id = intval($registro->id);
			$this->_nombre = "'".strval($registro->nombre)."'";
			$this->_descripcion = "'".strval($registro->descripcion)."'";
			$this->_precioV = floatval($registro->precioV);
			$this->_precioC = floatval($registro->precioC);
			$this->_disponibles = intval($registro->disponibles);
			$this->_genero = "'".strval($registro->genero)."'";
			$this->_talla = "'".strval($registro->talla)."'";
			$this->_categoria = intval($registro->categoria);
			$this->_deporte = intval($registro->deporte);
			$this->_marca = intval($registro->marca);
			$this->_subcategoria = intval($registro->subcategoria);
			$this->_tipo = "'".strval($registro->tipo)."'";



			$this->_sql = sprintf("INSERT INTO producto VALUES (null, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);",$this->_nombre, $this->_descripcion,$this->_precioV, $this->_precioC,$this->_genero,$this->_talla,$this->_categoria,$this->_deporte,$this->_marca,$this->_subcategoria,$this->_tipo,$this->_disponibles);
	 		return $this->sentenciaSQL($this->_sql, 4);
		}

		/**
		* Funcion para agregar un nuevo registro a la tabla marca
		* @param int para establer el tipo de devoluvción
		* @access public
		* @return int el id de la nueva marca
		*/
		public function modificaProducto($registro)
		{
			$registro = (object)$registro;
			$this->_id = intval($registro->id);
			$this->_nombre = "'".strval($registro->nombre)."'";
			$this->_descripcion = "'".strval($registro->descripcion)."'";
			$this->_precioV = floatval($registro->precioV);
			$this->_precioC = floatval($registro->precioC);
			$this->_disponibles = intval($registro->disponibles);
			$this->_genero = "'".strval($registro->genero)."'";
			$this->_talla = "'".strval($registro->talla)."'";
			$this->_categoria = intval($registro->categoria);
			$this->_deporte = intval($registro->deporte);
			$this->_marca = intval($registro->marca);
			$this->_subcategoria = intval($registro->subcategoria);
			$this->_tipo = "'".strval($registro->tipo)."'";
			$this->_sql = sprintf("UPDATE producto SET Nombre=%s,Descripcion=%s,PrecioV=%s,PrecioC=%s, Genero=%s, Talla=%s,Categoria_ID=%s,Deporte_ID=%s,Marca_ID=%s,Subcategoria_ID=%s,Tipo=%s,Disponibles=%s WHERE ID=%s;",$this->_nombre, $this->_descripcion,$this->_precioV,$this->_precioC,$this->_genero,$this->_talla,$this->_categoria,$this->_deporte,$this->_marca,$this->_subcategoria,$this->_tipo,$this->_disponibles,$this->_id);
	 		return $this->sentenciaSQL($this->_sql, 5);
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
		public function eliminaProducto($registro)
		{
			$this->_id = intval($registro);
			$this->_sql = sprintf("DELETE FROM producto WHERE ID = %s;",$this->_id);
			return $this->sentenciaSQL($this->_sql, 5);
		}

		public function recuperaDeportes()
		{
			$this->_sql = "SELECT * FROM deporte WHERE ID>0 AND Estatus=1 ORDER BY ID ASC;";
			return $this->sentenciaSQL($this->_sql,2);
		}
		public function recuperaMarcas()
		{
			$this->_sql = "SELECT * FROM marca WHERE ID>0 AND Estatus=1 ORDER BY ID ASC;";
			return $this->sentenciaSQL($this->_sql,2);
		}
		public function recuperaCategorias()
		{
			$this->_sql = "SELECT * FROM categoria WHERE ID>0 AND Estatus=1 ORDER BY ID ASC;";
			return $this->sentenciaSQL($this->_sql,2);
		}
		public function recuperaSubcategorias($cate)
		{
			$this->_tipo=$cate;
			$this->_sql = sprintf("SELECT * FROM subcategoria WHERE ID>0 AND Estatus=1 AND Categoria_ID= %s ORDER BY ID ASC;",$this->_tipo);
			return $this->sentenciaSQL($this->_sql,2);
		}
	}
?>