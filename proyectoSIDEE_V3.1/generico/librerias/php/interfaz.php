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
*******************************************************************************/
header("Content-Type: text/html; charset=utf-8");

class Interfaz {

    private $aplicacion;

    /***************************************************************************
    ** Constructor de la clase.                                               **
    ***************************************************************************/
    public function Interfaz($aplicacion) {
        $this->aplicacion = $aplicacion;
    }

    /***************************************************************************
    ** Función para desplegar el menú vertical.                               **
    ***************************************************************************/
    public function desplegarMenuVertical($div) {
        $permisos_v = $_SESSION[$this->aplicacion . 'permisos_v'];
        $menu_v = $this->armarMenuVertical($permisos_v, $div, 0, '');
        return '<div id = "menuVerticalDiv" class="menuVerticalDiv">  ' . $menu_v . '</ul> </div>';
    }

    /***************************************************************************
    ** Función para desplegar árbol vertical.                                **
    ***************************************************************************/
    public function desplegarArbolVertical($arreglo,$datos, $div, $checkRadio) {
        $arbol_v = $this->armarArbolVertical($arreglo, $datos, 0, '', $checkRadio);
        return '<div id = "' . $div . '"  class="arbol">' . $arbol_v . '</ul> </div>';
    }

    /***************************************************************************
    ** Función para desplegar el menú horizontal.                             **
    ***************************************************************************/
    public function desplegarMenuHorizontal($perm_id_padre) {
        $permisos_h = $_SESSION[$this->aplicacion . 'permisos_h'];
        if ($permisos_h) {
            foreach ($permisos_h as $valor) {
                $funcionalidad = trim($valor["perm_funcionalidad"]);
                //Se evalúa si es una función o una página
                $posAccion = strpos($funcionalidad, "()");
                //editar también desde controlador
                if ($posAccion === false) {
                    $accion = "cargarVentana('$funcionalidad','divContenedorAccion')";
                } else {
                    $accion = $funcionalidad;
                }
                $titulo = $valor["perm_titulo"];
                $icono = $valor["perm_estilo"];
                $perm_id = $valor["perm_id"];
                $perm_nombreid = $valor["perm_nombreid"];
                if ($perm_id_padre == $valor["perm_id_padre"]) {
                    echo "<a onclick=\"$accion\"><span class=\"$icono\"></span>$titulo</a>";
                    echo "<input type='hidden' id='$perm_nombreid' name='$perm_nombreid' class = 'textoBody' value='$perm_id' size='5'/>";
                }
            }
        }
    }

    /***************************************************************************
    ** Función para desplegar el menú horizontal.                             **
    ***************************************************************************/
    public function desplegarBotones($perm_id_padre) {
        $permisos_b = $_SESSION[$this->aplicacion . 'permisos_b'];
        if ($permisos_b) {
            foreach ($permisos_b as $valor) {
                $funcionalidad = trim($valor["perm_funcionalidad"]);
                $perm_nombreid = trim($valor["perm_nombreid"]);
                $perm_nombreid = trim($valor["perm_nombreid"]);
                $estilo = trim($valor['perm_estilo']);
                $icono = trim($valor['perm_icono']);
                $titulo = $valor["perm_titulo"];
                $perm_destino = trim($valor["perm_destino"]);
                $perm_origen = trim($valor["perm_origen"]);
                $codigos_origen = explode(",", $perm_origen);
                for ($i = 0; $i <= count($codigos_origen) - 1; $i++) {
                    $cod_origen = limpiarNumero($codigos_origen[$i]);
                    //echo "cod: " . $cod_origen . " perm " . $perm_id_padre;
                    if ($cod_origen == $perm_id_padre) { //if($perm_id_padre == $valor["perm_id_padre"]){
                        echo "<button type='button' id='$perm_nombreid' class='btn btn-primary active' onClick='$funcionalidad'>$titulo</button>&nbsp;&nbsp;";
                        if ($perm_destino != '' && $perm_destino != 0)
                            echo "<input type='hidden' id='dest_$perm_nombreid' name='dest_$perm_nombreid' class = 'textoBody' value='$perm_destino' size='5'/>";
                    }
                }
            }
        }
    }

    /***************************************************************************
    ** Función para armar el menú vertical.                                   **
    ***************************************************************************/
    function armarMenuVertical($arreglo, $div, $id, $padre) {
        // $estiloUl =  "menuVertical";
        if ($padre == '')
            $html = "<ul>";
        else
            $html = '';
        $numhijos = $this->contarElementosHijos($arreglo, $id, 'perm_id_padre');
        if (trim($padre) != '' and $numhijos > 0)
            $html = $html . "<ul>";
        if ($arreglo) {
            foreach ($arreglo as $celda) {
                //Se obtienen datos
                $perm_id = $celda['perm_id'];
                $perm_id_padre = $celda['perm_id_padre'];
                $titulo = $celda['perm_titulo'];
                $parametro = "perm_id=" . $perm_id . "&func=" . $celda['perm_funcionalidad'] . "&func_archivo=" . $celda['perm_archivo'] . "&perm_nombreid=" . $celda['perm_nombreid'];
                $accion = "cargarVentana('../../publico/vista/contenedorAccion.php','divContenedorAccion','$parametro')";
                //echo $titulo . "<br>";
                if ($perm_id_padre == $id) {
                    $numhijos2 = $this->contarElementosHijos($arreglo, $perm_id, 'perm_id_padre');
                    if ($numhijos2 == 0) {
                        $html.= "<li><a href='#' title=\"$titulo\" onClick=\"$accion\"><span class='" . $celda['perm_estilo'] . "'> " . $titulo . "</span></a>";
                    } else {
                        $html.= "<li>" . '<a href="#"><span class="' . $celda['perm_estilo'] . '">' . $titulo . "</span> </a>";
                        $resp = $this->armarMenuVertical($arreglo, $div, $perm_id, $perm_id_padre);
                        $html = $html . $resp;
                        $html = $html . "</li>";
                        if ($numhijos > 0) {
                            $html = $html . "</ul>";
                        }
                    }
                }
            }
        }
        return $html;
    }

    /***************************************************************************
    ** Función para armar árbol de opciones.                                  **
    ***************************************************************************/
    function armarArbolVertical($arreglo, $datos, $id, $padre, $checkRadio) {
        // $estiloUl =  "menuVertical";
        if ($padre == '')
            $html = "<ul>";
        else
            $html = '';
        $numhijos = $this->contarElementosHijos($arreglo, $datos, $id, 'perm_id_padre');
        if (trim($padre) != '' and $numhijos > 0)
            $html = $html . "<ul>";
        if ($arreglo) {
            foreach ($arreglo as $celda) {
                //Se obtienen datos
                $perm_id = $celda['perm_id'];
                $perm_id_padre = $celda['perm_id_padre'];
                $titulo = $celda['perm_titulo'];
                $perm_nombre = $celda ['perm_nombre'];               
                $cat_tipo_permiso = $celda['cat_tipo_permiso'];
                $check = "";
                for ($v = 0; $v < sizeof($datos); $v++) {
                    if ($perm_id == $datos[$v]) {
                        $check = "checked";
                    }
                }

                switch ($checkRadio) {

                    case 'radio':
                        if ($cat_tipo_permiso == 2 || $cat_tipo_permiso == 3) {
                            $listaResultado = " <input type='radio' name='chkPermDestino' id='chkPermDestino' value='$perm_id' onclick='obtenerPermisoDestino($perm_id)' $check>";
                        } else {
                            $listaResultado = '';
                        }
                        break;
                    case 'check':
                        if ($cat_tipo_permiso == 2 || $cat_tipo_permiso == 3) {
                            $listaResultado = " <input type='checkbox' name='chkPermOrigen' id='chkPermOrigen' value='$perm_id' onclick='obtenerPermisoOrigen()' $check>";
                        } else {
                            $listaResultado = '';
                        }
                        break;
                }

                if ($perm_id_padre == $id) {
                    $numhijos2 = $this->contarElementosHijos($arreglo, $perm_id, 'perm_id_padre');
                    if ($numhijos2 == 0) {
                        $html.= "<li> $listaResultado<a href='#' title=\"$titulo\" ><span class='" . $celda['perm_estilo'] . "'> " . $perm_nombre . "</span></a>";
                    } else {
                        $html.= "<li>" . $listaResultado . '<a href="#"> <span class="' . $celda['perm_estilo'] . '">' . $perm_nombre . "</span> </a>";
                        $resp = $this->armarArbolVertical($arreglo, $datos, $perm_id, $perm_id_padre, $checkRadio);
                        $html .= $resp;
                        $html .= "</li>";
                        if ($numhijos > 0) {
                            $html = $html . "</ul>";
                        }
                    }
                }
            }
        }
        return $html;
    }

    /***************************************************************************
    ** Función para contar elementos hijos según función recursiva.           **
    ***************************************************************************/
    function contarElementosHijos($arreglo, $id, $columna) {
        $i = 0;
        if ($arreglo) {
            foreach ($arreglo as $celda) {
                if ($id == $celda[$columna]) {
                    $i++;
                }
            }
        }
        return $i;
    }

    /***************************************************************************
    ** Función para desplegar el combo con los perfiles de usuario.           **
    ***************************************************************************/
    public function desplegarComboUsuarioTipos($usu_id_sel) {
        $usuarioTipos = $_SESSION[$this->aplicacion . 'usuario_tipos'];
        $valorDefecto = $usu_id_sel;
        echo $this->combo($usuarioTipos, "cmbUsuarioTipos", "usu_id", "usu_tipo_nombre", $valorDefecto, "", 'onchange=cambiarTipoUs(this.value)');
    }    
    
    /***************************************************************************
    ** Función para desplegar un combo a partir de una lista de datos.        **
    ***************************************************************************/
    public function combo($lista, $nombreCmb, $campoId, $campoNombre, $valorDefecto = "0", $opcionDefecto = "", $parametros) {

        $combo = "<select id='$nombreCmb' name='$nombreCmb' class='form-control input-sm' $parametros>";
        // Cargar opcion por defecto
        $opcionDefecto = trim($opcionDefecto);
        $valorDefecto = trim($valorDefecto);

        //Se agrega opción por defecto
        if (($valorDefecto == "0" || $valorDefecto == "") && $opcionDefecto != "") {
            $combo .= "<option value='0' selected>" . $opcionDefecto . "</option>";
        }
        if (is_array($lista) == true) {
            //Se carga opciones de lista
            foreach ($lista as $valor) {
                $valorId = $valor[$campoId];
                $valorNombre = $valor[$campoNombre];
                if ($valorId == $valorDefecto)
                    $sel = "selected";
                else
                    $sel = "";
                $combo.="<option value='$valorId' $sel>$valorNombre</option>";
            }
        }
        $combo.="</select>";
        $combo .="<div id='div_$nombreCmb' name='div_$nombreCmb' style='display:none'>
                <font color='blue' size='1'>Seleccione una opción</font></div>";
        return $combo;
    }    

    /***************************************************************************
    ** Función para formatear mensajes según tipo.                            **
    ***************************************************************************/
    public function formatearMensaje($texto, $opcion) {
        switch ($opcion) {
            case 1: //Mensaje de acción satisfactoria
                $texto = "<div class='alert-sm alert-success bg-success'><span class='glyphicon glyphicon-ok'></span> $texto</div>";
                break;
            case 2: //Mensaje de información
                $texto = "<div class='alert-sm alert-info bg-info'><span class='glyphicon glyphicon-info-sign'></span> $texto</div>";
                break;
            case 3: //Mensaje de advertencia
                $texto = "<div class='alert-sm alert-warning bg-warning' ><span class='glyphicon glyphicon-warning-sign'></span> $texto</div>";
                break;
            case 4: //Mensaje de error
                $texto = "<div class='alert-sm alert-danger bg-danger' ><span class='glyphicon glyphicon-exclamation-sign'></span> $texto</div>";
                break;
        }
        return $texto;
    }

    /***************************************************************************
    ** Función para formatear mensajes según tipo.                            **
    ***************************************************************************/
    function procesarMensaje($cod) {
        $mensaje = "";
        global $CONFIG;
        switch ($cod) {
            case "001":
                $mensaje = $this->formatearMensaje($CONFIG['errorAccesoSistema'], 4);
                break;
            case "002":
                $mensaje = $this->formatearMensaje($CONFIG['errorAccesoSistema'], 4);
                break;
            case "003":
                $mensaje = $this->formatearMensaje($CONFIG['errorSesionCaducada'], 4);
                break;
            default:
                $mensaje = $this->formatearMensaje($cod, 4);             
                break;
        }
        return $mensaje;
    }
    
    /*************************************************************************
    ** Función que dibuja una tabla a partir de un Arreglo de Datos, y par?me-*
    ** tros de tabla html Ej. border='1'
    ** Retorna tabla en formato html.                                       **
    ***************************************************************************/
    function dibujarTabla($datos,$parametros) {
        $tabla = "<table $parametros >";
        $tabla .= '<tr>';
        foreach ($datos[0] as $key => $value) {
            $tabla .= '<th><center>' . '&nbsp;' .  strtoupper(str_replace('_',' ',$key)). '&nbsp;' . '</center></th>';
        }
        $tabla .= '</tr>';

        foreach ($datos as $fila) {
            $tabla .="<tr>";
            foreach ($fila as $celda) {
                $tabla .="<td> $celda </td>";
            }
            $tabla .="</tr>";
        }
        $tabla .="</table>";
        return $tabla;
    }
    
    /*******************************************************************************
    ** Función que retorna una tabla html poblada (FV)                            **
    *******************************************************************************/
    function dibujarTablaConFormato($datos,$titulo,$headerLabels,$esNumero)
    {
        if($headerLabels)
        {
            $reg=''; $i=0;
            foreach ($headerLabels as $campo)
            {
                    //$alinear='align="left"';if($esNumero[$i]) $alinear='align="right"';
                    $alinear='align="center"';
                    $reg=$reg.'<td '.$alinear.'>'.$campo.'</td>';
                    $i++;
            }
        }
        $campos=count($headerLabels);
        $titulo='<tr style="background-color:#000099;color:white;font-size:9.0pt"><td colspan="'.$campos.'" align="center"><strong>'.$titulo.'</strong></td></tr>';
        $titulo=$titulo.'<tr style="background-color:#F79646;font-size:9.0pt;font-weight:bold">'.$reg.'</tr>';
        $linea='';
        $color=true;
            if(is_array($datos))
            {
        foreach($datos as $registro)
        {
            $reg=''; $i=0;
            foreach ($registro as $campo)   
            {
                    $alinear='align="left"';if($esNumero[$i]) $alinear='align="right"';
                    $reg=$reg.'<td '.$alinear.'>'.$campo.'</td>';
                    $i++;
            }
            $color=!$color;
            $clase='style="'.($color?"font-size:10.0pt":"background-color:#DBE5F1;font-size:10.0pt").'"';
            $linea=$linea.'<tr '.$clase.'>'.$reg.'</tr>';
        }
            }
        return '<table border="1">'.$titulo.$linea.'</table>';
    }
    
    /***************************************************************************
    ** Función para desplegar un combo a partir de una lista de datos. JA     **
    ***************************************************************************/
    public function comboDualList($lista, $nombreCmb, $campoId, $campoNombre, $parametros, $campoNombreSel) {
       
        $combo = "<select id='$nombreCmb' multiple='multiple' name='$nombreCmb' class='duallist' $parametros>";
        
        if (is_array($lista) == true) {
            //Se carga opciones de lista
            foreach ($lista as $valor) {
                $valorId = $valor[$campoId];
                $valorNombre = $valor[$campoNombre];
                if ($valor[$campoNombreSel] != 0) 
                    $sel = "selected";
                else
                    $sel = "";
                $combo.="<option value='$valorId' $sel>$valorNombre</option>";
            }
        }
        $combo.="</select>";
        $combo .="<div id='div_$nombreCmb' name='div_$nombreCmb' style='display:none'>
                <font color='blue' size='1'>Seleccione una opción</font></div>";
        $combo .= "<script>
                        var duallist = $('.duallist').bootstrapDualListbox({
                                nonSelectedListLabel: 'Sin Escoger',
                                selectedListLabel: 'Elegidos',
                                preserveSelectionOnMove: 'Mover',
                                moveOnSelect: false,
                                nonSelectedFilter: ''
                        });
                    </script> ";
        return $combo;
    }
}
?>
