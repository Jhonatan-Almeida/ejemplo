<?php
/*******************************************************************************
** Sistema de Comercialización de Semillas 2015                               **
**                                                                            **
** Funcionalidad:                                                             **
**                                                                            **
**                                                                            **
** Desarrollado por:                                                          **
**    Lorena Torres                                                           **
** Modificado por:                                                            **
**                                                                            **
*******************************************************************************

header("Content-Type: text/html; charset=utf-8");
/*******************************************************************************
** Función que formatea la fecha                                              **
*******************************************************************************/
function fechaFormato($formato=0, $fecha=''){
    if ($fecha=='')
        $fecha=date('Y-m-d');

    $dias = array("Domingo","Lunes","Martes","Miércoles","Jueves",
                  "Viernes","Sábado");
    $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                   "Agosto","Septiembre","Octubre","Noviembre","Diciembre");

    switch ($formato){
        case 1:
        $retorna = $dias[date('w',strtotime($fecha))].", "
        .date('d',strtotime($fecha))." de ".$meses[date('n',strtotime($fecha))-1]
        ." del ".date('Y',strtotime($fecha)) ;
        break;
        default:
            $retorna=$fecha;
    }
    return $retorna;
}


/*******************************************************************************
** Función que limpia cadenas numéricas, elimina caracteres de otro tipo      **
*******************************************************************************/
function limpiarNumero($numero) {
    $numero = trim($numero);
    $flag_punto = false;
    $cadena = "";
    for ($i=0; $i<strlen($numero); $i++){
        $num = substr($numero,$i,1);
        if (strpos("0123456789.-", $num) !== false) {
            //Para numeros negativos el guion debe estar al inicio
            if ($num == "-" and $i > 0) $num = ""; 
            if ($num == ".") { // Para decimales
                if ($flag_punto) $num=""; //Controla que haya un solo punto
                if ($i == 0) $num = "0.";
                $flag_punto = true;
            }
            $cadena .= $num;
        }
    }
    return $cadena;
}

/*******************************************************************************
** Función que limpia las cadenas  SQL INJECTION, CSS y HTML INJECTION        **
** Si $html==1 no limpia la cadena de código html                             **
*******************************************************************************/
function limpiarCadena($cadena, $html=1) {
    // Limpiamos apóstrofes para ataques SQL Injection
    
    if (is_array($cadena)) return;
    $flag_validar_sql = 0;
    if (strpos(" $cadena", "'") !== false) $flag_validar_sql = 1;
    $cadena = str_replace("\\", "", $cadena);
    $cadena = str_replace("'", "′", $cadena);
    $cadena = str_replace("”", '"', $cadena);
    $cadena = str_replace("“", '"', $cadena);
    
    // Validamos que cadenas numericas no tengan queries adicionales
    if (strpos("0123456789.-",substr($cadena, 0, 1)) !== false) {
        if (ltrim($cadena, "0123456789.-") != "") $flag_validar_sql = 2;
    }
    
    $carac = array("&NBSP;", "\n");
    $tmp = str_replace($carac, " ", strtoupper($cadena));

    if ($flag_validar_sql > 0) {
        $flag_notificacion = false;
        $flag_bloqueo = false;

        $sentencias = array(" AND ", " OR ");
        if (strpos($tmp, ";") !== false) {
            $sentencias = array_merge($sentencias, array(" SELECT ", " UPDATE "
                          ," DELETE ", " TRUNCATE ", " INSERT ", " DROP "
                          , " ALTER ", " CREATE ", ";SELECT ", ";UPDATE "
                          , ";DELETE ", ";TRUNCATE ", ";INSERT ", ";DROP "
                          , ";ALTER ", ";CREATE ", " EXPLAIN ", ";EXPLAIN "
                          , " ANALYZE ", ";ANALYZE ", " GRANT ", ";GRANT "
                          , " REVOKE ", ";REVOKE", " COMMENT ", ";COMMENT "
                          , " LOCK ", ";LOCK "));
        }

        foreach ($sentencias as $cad_sql) {
            if (strpos($tmp, $cad_sql) !== false) {
                $flag_notificacion = true;
                if ($flag_validar_sql == 2 and !$flag_bloqueo) {
                    $tmp = str_replace(" ", "", $tmp);
                    if (strpos($tmp, "FROM", 0+strpos($tmp, ";SELECT")) !== false) $flag_bloqueo = true;
                    if (strpos($tmp, "SET", 0+strpos($tmp, ";UPDATE")) !== false) $flag_bloqueo = true;
                    if (strpos($tmp, "TO", 0+strpos($tmp, "ON", 0+strpos($tmp, ";GRANT"))) !== false) $flag_bloqueo = true;
                    if (strpos($tmp, "FROM", 0+strpos($tmp, "ON", 0+strpos($tmp, ";REVOKE"))) !== false) $flag_bloqueo = true;
                    if (strpos($tmp, "MODE", 0+strpos($tmp, "IN", 0+strpos($tmp, ";LOCKTABLE"))) !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DELETEFROM") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";TRUNCATE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";INSERTINTO") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";EXECUTE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERDATABASE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERDOMAIN") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERFUNCTION") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERGROUP") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERLANGUAGE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERSCHEMA") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERSEQUENCE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERTABLE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERTRIGGER") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTERUSER") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";ALTEROPERATOR") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEAGGREGATE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATECAST") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATECONSTRAINT") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATECONVERSION") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEDATABASE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEDOMAIN") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEFUNCTION") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEGROUP") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEINDEX") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATELANGUAGE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATERULE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATESCHEMA") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATESEQUENCE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATETABLE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATETRIGGER") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEUSER") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATETYPE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";CREATEVIEW") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPAGGREGATE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPCAST") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPCONVERSION") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPDATABASE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPDOMAIN") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPFUNCTION") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPGROUP") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPINDEX") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPLANGUAGE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPOPERATOR") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPRULE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPSCHEMA") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPSEQUENCE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPTABLE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPTRIGGER") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPTYPE") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPUSER") !== false) $flag_bloqueo = true;
                    if (strpos($tmp, ";DROPVIEW") !== false) $flag_bloqueo = true;
                }
            }
        }
        if ($flag_bloqueo) {
            //Enviar mail
            die("Usted esta ingresando c&oacute;digo no v&aacute;lido...");

        } elseif ($flag_notificacion) {
            //Enviar mail
        }
        
    }

    // Validamos ataques de CSS
    $tmp = str_replace(array(" ","&AMP;","&LT;"), array("","&","<"), $tmp);
    if (strpos($tmp, "<SCRIPT") !== false) {
        //Enviar mail
        $cadena = str_ireplace(array("javascript","script"), array("jaiba_street","street"), $cadena);
    }
    if ($html == 1) {
        $cadena = str_replace(array("<",">",'"'),array("&lt;","&gt;","&quot;"),$cadena);
    }
    $tmp = str_replace(" ", "", $tmp);
    if (strpos($tmp, "<SCRIPT") !== false or strpos($tmp, "&LT;SCRIPT") !== false) {
        //Enviar mail
        $cadena = str_ireplace(array("javascript","script"), array("jaiba_street","street"), $cadena);
    }
    if ($html == 1) {
        $cadena = strip_tags($cadena);
        $cadena = htmlspecialchars($cadena);
    }
    
    return trim($cadena);
}

/*******************************************************************************
** Función que formatea parametros para envio por ja.                         **
*******************************************************************************/
function obtenerParametroJs($arrayRecibido) {
    $resultado = "";
    foreach($arrayRecibido as $key => $value)
    {
        //2017-09-22 convertir caracteres especiales
        $value=str_replace("amp;",'',$value);
        $value = htmlspecialchars_decode($value);
        $resultado .=   trim($key) .  '=' . trim($value) . '&';
    }
    $resultado = substr($resultado, 0, strlen($resultado)-1);
    return trim($resultado);
}

/*******************************************************************************
** Función que formatea parametros para envio por ja.                         **
*******************************************************************************/
function cargarDatosRegistro($datos) {
    $registro = array();
    unset($registro);
    foreach($datos as $key => $value)
    {
        $registro[$key] = trim($value);
    } 
    return $registro;
}

/*******************************************************************************
** Función que envia a excel una tabla de datos. (FV)                         **
*******************************************************************************/
function exportarExcel($filteredRecords,$titulo,$headerLabels)
{
        header('Content-type: application/vnd.ms-excel');
        header('Content-Disposition: attachment; filename="reporte.xls"');
        header("Pragma: no-cache");
        header("Expires: 0");
        echo "<style>.fila{font-size:9.0pt} .filaf{background:#DBE5F1;font-size:9.0pt} .titulo{background:#F79646;font-size:9.0pt}</style>";
        echo "<table border=1>\n";
				$col=count($headerLabels);
                echo "<tr>\n<td colspan='$col' align='center'>$titulo</td></tr>\n";
				
                //titulo columnas
                if($headerLabels)
                {
                    echo "<tr>\n";
                    foreach ($headerLabels as $item)
                    {
                            echo "<td class='titulo'>".utf8_decode($item)."</td>\n";
                    }
                }
                echo "</tr>\n";
                //filas
                $color=true;
                foreach ($filteredRecords as $registro)
                {
                        $color=!$color;
                        echo "<tr>\n";
                        foreach ($registro as $campo)   
                        {
                                $clase="class='".($color?'fila':'filaf')."'";
                                echo "<td $clase>".utf8_decode($campo)."</td>\n";
                        }
                        echo "</tr>\n";
                }
        echo "</table>\n";
}

/*******************************************************************************
** Función que envia a excel una tabla de datos. (FV)                         **
*******************************************************************************/
function exportarExcel2($filteredRecords,$titulo,$headerLabels,$titulo2,$tecnico)
{
//        header('Content-type: application/vnd.ms-excel');
//        header('Content-Disposition: attachment; filename="reporte.xls"');
//        header("Pragma: no-cache");
//        header("Expires: 0");
        echo "<style>.fila{font-size:9.0pt} .filaf{background:#DBE5F1;font-size:9.0pt} .titulo{background:#F79646;font-size:9.0pt}</style>";
        echo "<table border=1>\n";
				$col=count($headerLabels);
                                $col2=count($headerLabels)-4;

                echo "<tr>\n</td> <td colspan='23' align='center'>$titulo</td></tr>\n";		
			
                //titulo columnas
                if($headerLabels)
                {
                    echo "<tr\n";
                    foreach ($headerLabels as $item)
                    {
                            echo "<td class='titulo'>".utf8_decode($item)."</td>\n";
                    }
                }
                echo "</tr>\n";
                //filas
                $color=true;
                foreach ($filteredRecords as $registro)
                {
                        unset($registro['per_nombres']);
                        $color=!$color;
                        echo "<tr height='50'>\n";
                        foreach ($registro as $campo)   
                        {                                
                                $clase="class='".($color?'fila':'filaf')."'";
                                echo "<td $clase>".utf8_decode($campo)."</td>\n";
                        }
                        echo "</tr>\n";
                }
        echo "</table>\n";
}
function convierteArrayUtf8(array $array) {
    $convertedArray = array();
    foreach($array as $key => $value) {
        //2017-09-22 convertir caracteres especiales 
        $value=str_replace("amp;",'',$value);
        //Comprueba si el string es válido para a la codificación especificada (UTF-8)
      if(!mb_check_encoding($value, 'UTF-8')) $value =utf8_encode($value);
      if(is_array($value)) $value = $this->convertArrayKeysToUtf8($value);
      $convertedArray[$key] = $value;
    }
    return $convertedArray;
  } 
?>