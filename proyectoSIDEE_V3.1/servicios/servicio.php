<?php
require_once('../includes/nusoap/lib/nusoap.php');
date_default_timezone_set('America/Guayaquil');
$server = new soap_server();
$server->register('ingresoEscrutinio');
$server->register('consultaGrafica');
$server->register('consultaGraficaGeneral');
function ingresoEscrutinio($provincia,$canton,$parroquia,$recinto,$junta,$dignidad,$codigoD,$validos,$blanco,$nulos) {
	$cn = mysql_connect("localhost","root","escrutinios2019");
	mysql_select_db("escrutinio",$cn);
	$hoy = date('Y-m-d');
	mysql_set_charset("utf8");
                        $consulta = "select * from candidaturas where ubi_provincia_can = $provincia and ubi_canton_can = $canton and ubi_parroquia_can = $parroquia and jun_id =$junta and cat_id_dignidad=$dignidad and dig_id= $codigoD";
                        $resConsul = mysql_query($consulta);
                        $counConsulta = mysql_num_rows($resConsul);
                        if ($counConsulta == 0){
                            $sql = "INSERT INTO candidaturas(ubi_provincia_can,ubi_canton_can,ubi_parroquia_can,jun_id,rec_id,cat_id_dignidad,dig_id,can_validados,can_nulos,can_blanco,can_estado,can_eliminado,can_reg_usu,can_reg_fecha) VALUES($provincia,$canton,$parroquia,$junta,$recinto,$dignidad,$codigoD,$validos,$nulos,$blanco,11,0,1,'$hoy');";
                            $r=0;
                        }else{
                            $sql="UPDATE candidaturas SET can_validados=$validos,can_nulos=$nulos,can_blanco=$blanco where ubi_provincia_can = $provincia and ubi_canton_can = $canton and ubi_parroquia_can = $parroquia and jun_id =$junta and cat_id_dignidad=$dignidad and dig_id= $codigoD"; 
                            $r=1;
                        }
        $res = mysql_query($sql);               
	return $r;//si= 0(Insertar) ;no =1(Modificar)
}
function consultaGrafica($provincia,$canton,$dignidad) {
	$cn = mysql_connect("localhost","root","escrutinios2019");
	mysql_select_db("escrutinio",$cn);
	mysql_set_charset("utf8");
        $sql = "select dig_nombre,sum(can_validados) as validos,sum(can_nulos) as nulos,sum(can_blanco) as blancos from candidaturas inner join  dignidades on dignidades.dig_id = candidaturas.dig_id where ubi_provincia_can = $provincia and ubi_canton_can = $canton  and cat_id_dignidad=$dignidad group by dig_nombre ";                
        $res = mysql_query($sql);
//        //$counConsulta = mysql_num_rows($res);
        while($filas = mysql_fetch_array($res)){
            $nombreCandidato=$filas['dig_nombre'];
            $validos=(int) $filas['validos'];
            $nulos=$filas['nulos'];
            $blancos=$filas['blancos'];
            $arreglo[] = array(
                'name'=>$nombreCandidato,
                'y'=>$validos,
                'drilldown'=>$nombreCandidato,
            );
        }
        return $arreglo;
}
function consultaGraficaGeneral($dignidad) {
	$cn = mysql_connect("localhost","root","escrutinios2019");
	mysql_select_db("escrutinio",$cn);
	mysql_set_charset("utf8");
        $sql = "select dig_nombre,sum(can_validados) as validos,sum(can_nulos) as nulos,sum(can_blanco) as blancos from candidaturas inner join  dignidades on dignidades.dig_id = candidaturas.dig_id where ubi_provincia_can = 3 and cat_id_dignidad=$dignidad group by dig_nombre ";                
        $res = mysql_query($sql);
//        //$counConsulta = mysql_num_rows($res);
        while($filas = mysql_fetch_array($res)){
            $nombreCandidato=$filas['dig_nombre'];
            $validos=(int) $filas['validos'];
            $nulos=$filas['nulos'];
            $blancos=$filas['blancos'];
            $arreglo[] = array(
                'name'=>$nombreCandidato,
                'y'=>$validos,
                'drilldown'=>$nombreCandidato,
            );
        }
        return $arreglo;
}
if ( !isset( $HTTP_RAW_POST_DATA ) )
    $HTTP_RAW_POST_DATA = file_get_contents( 'php://input' );

$server->service($HTTP_RAW_POST_DATA);
?>