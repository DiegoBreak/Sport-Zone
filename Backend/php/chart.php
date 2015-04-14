<?php
require_once('../Datos/sportzone_base.php');
	Class Chart extends Sportzone_base
	{
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

		public function tipo()
		{
			$sql = "SELECT 	Tipo, COUNT(*) AS Numero FROM producto GROUP BY Tipo ORDER BY Tipo;";
			return $this->sentenciaSQL($sql ,2);
		}
		public function tipos()
		{
			$sql = "SELECT 	p.Tipo, COUNT(*) AS Numero, c.Nombre AS Categoria FROM producto p JOIN categoria c ON (p.Categoria_ID = c.ID) GROUP BY p.Categoria_ID ORDER BY Tipo ;";
			return $this->sentenciaSQL($sql ,2);
		}
		public function paises()
		{
			$sql = "SELECT Pais, count(*) AS Numero FROM ventas GROUP BY Pais ";
			return $this->sentenciaSQL($sql ,2);
		}
		public function ganancias()
		{
			$sql = "SELECT v.*, (count(*) * p.PrecioV) as Vendido, count(*) as Numero, (p.PrecioV-p.PrecioC)*count(*) as Ganacia, (count(*)*p.PrecioC) as Inversion FROM ventas v join producto p on (v.Producto = p.ID) group by Mes, Producto;";
			return $this->sentenciaSQL($sql ,2);
		}

		public function ventas()
		{
			$res = [];
			$sql = "SELECT v.*, COUNT(*) AS Numero  FROM ventas v JOIN producto p ON (v.Producto = p.ID) GROUP BY v.Mes;";
			$res[0] = $this->sentenciaSQL($sql,2);
			$sql = "SELECT p.Tipo, v.* ,count(p.Tipo) AS Numero FROM ventas v JOIN producto p ON (p.ID = v.Producto) where p.tipo = 'accesorio' group by p.tipo, v.Mes;";
			$res[1] = $this->sentenciaSQL($sql,2);
			$sql = "SELECT p.Tipo, v.* ,count(p.Tipo) AS Numero FROM ventas v JOIN producto p ON (p.ID = v.Producto) where p.tipo = 'calzado' group by p.tipo, v.Mes;";
			$res[2] = $this->sentenciaSQL($sql,2);
			$sql = "SELECT p.Tipo, v.* ,count(p.Tipo) AS Numero FROM ventas v JOIN producto p ON (p.ID = v.Producto) where p.tipo = 'ropa' group by p.tipo, v.Mes;";
			$res[3] = $this->sentenciaSQL($sql,2);
			
			return $res;
		}
	}

?>