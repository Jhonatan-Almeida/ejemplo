<?php
/*******************************************************************************
** Sistema de Comercialización de Semillas 2015                               **
**                                                                            **
** Módulo: Genérico                                                           **
** Funcionalidad:                                                             **
**                                                                            **
**                                                                            **
** Desarrollado por:                                                          **
**    Lorena Torres                                                           **
** Modificado por:                                                            **
**                                                                            **
*******************************************************************************/

class ExceptionValidaConfig extends Exception { }

class Configura{
    
    private $ruta_archivo;
     
    /**********************************************************************************
    ** Constructor de la clase de configuración                                      **    
    ** Parámetro $ruta_archivo: es la ruta del archivo a leer.                       **      
    ***********************************************************************************/
    public function Configura($ruta_archivo){
        
        $this->ruta_archivo = trim($ruta_archivo);
        
    }
    
    /***************************************************************************************
    ** Función que establece el tipo de letra del resultado devuelto del archivo.         **   
    ** Parámetro $tipo_letra: es el tipo de letra que indica si son mayúsculas,           ** 
    ** minúsuculas, se define el tipo en el archivo de configuración.                     **  
    ** Parámetro $texto: es el texto a transformar.                                       **
    ** Retorna texto según el tipo de letra especificado.                                 **
    ***************************************************************************************/  
    function establecerTipoLetra($tipo_letra, $texto){
        
        switch ($tipo_letra) { //Definición de las constantes en el archivo config_aplicativo.xml
            case 1: //Según el valor del archivo de configuraciòn.
                $resultado =  $texto;
                break;
            case 2: //Mayúscula
                $resultado = strtoupper($texto);
                break;
            case 3: //Minúscula
                $resultado = strtolower($texto);
                break;
            case 4: //Título
                $resultado = ucwords($texto);
                break;
            default:
                $resultado =  $texto;
                break;
        }
        
        return $resultado;
                    
    }
        
    /***************************************************************************************
    ** Función que obtiene datos de los archivos xml de configuración.                    **   
    ** Parámetro $nombre: es el nombre del atributo que identifica a la etiqueta.         **
    ** Parámetro $etiqueta: es el nombre de la etiqueta.                                  **
    ** Parámetro $tipo_letra: es el tipo de letra que indica si son mayúsculas,           ** 
    ** minúsuculas, se define el tipo en el archivo de configuración.                     **  
    ** Parámetro $etiqueta: es el nombre de la etiqueta a consultar.                      **
    ** Parámetro $nodo: es el nombre de la etiqueta principal.                            **
    ** Retorna el valor consultado del archivo.                                           **
    ***************************************************************************************/ 
    public function obtenerDatoArchivo($nombre, $tipo_letra, $etiqueta, $nodo="parametro"){
      
        $resultado = "";
        $mensaje = "";
        
        try{ 
            try{
                $nombre = trim($nombre);
                $nodo = trim($nodo);
                $etiqueta = trim($etiqueta);
                
                if (!file_exists($this->ruta_archivo))
                    throw new ExceptionValidaConfig("No se encuentra el archivo.");
                
                //Se carga archivo
                $archivo_xml = simplexml_load_file($this->ruta_archivo);
              
                //Se busca el nodo
                $nodo_path = $archivo_xml->xpath("//".$nodo."[@name='$nombre']/$etiqueta");
                if($nodo_path=="" || empty($nodo_path))
                    throw new ExceptionValidaConfig("No se encuentra el parámetro");
                else
                    $resultado = $this->establecerTipoLetra($tipo_letra, preg_replace('/<[^>]*>/i'," ",$nodo_path[0]->asXml()));                 
                } catch (ExceptionValidaConfig $e) {
                $mensaje = $e->getMessage();                
            }
        } catch (Exception $e) {    
            $mensaje = $e->getMessage();
        }
        
        //Se muestra el error
        $mensaje = trim($mensaje);
        if($mensaje != ""){
            echo "<script> alert('$mensaje $nombre'); </script>"; //$nombre $archivo_xml
        }
        
        return $resultado;
    }
    
    /***************************************************************************************
    ** Función que obtiene datos de los archivos xml de configuración.                    **   
    ** Parámetro $nombre: es el nombre del atributo que identifica a la etiqueta.         **    
    ** Parámetro $tipo_letra: es el tipo de letra que indica si son mayúsculas,           ** 
    ** minúsuculas, se define el tipo en el archivo de configuración.                     **    
    ** Parámetro $nodo: es el nombre de la etiqueta principal.                            **
    ** Retorna el valor consultado del archivo.                                           **
    ***************************************************************************************/ 
    public function obtenerValor($nombre, $tipo_letra=1, $nodo="parametro"){
      
        $resultado = "";
        $resultado = $this->obtenerDatoArchivo($nombre, $tipo_letra, 'valor', $nodo);
        
        return $resultado;
    }
    
    /***************************************************************************************
    ** Función que obtiene datos de los archivos xml de configuración.                    **   
    ** Parámetro $nombre: es el nombre del atributo que identifica a la etiqueta.         **    
    ** Parámetro $tipo_letra: es el tipo de letra que indica si son mayúsculas,           ** 
    ** minúsuculas, se define el tipo en el archivo de configuración.                     **    
    ** Parámetro $nodo: es el nombre de la etiqueta principal.                            **
    ** Retorna el valor consultado del archivo.                                           **
    ***************************************************************************************/ 
    public function obtenerCodigo($nombre, $nodo="parametro"){
      
        $resultado = "";
        $resultado = (int)$this->obtenerDatoArchivo($nombre, 1, 'valor', $nodo);
        
        return $resultado;
    }
    
    /***************************************************************************************
    ** Función que obtiene datos de los archivos xml de configuración.                    **   
    ** Parámetro $nombre: es el nombre del atributo que identifica a la etiqueta.         **    
    ** Parámetro $tipo_letra: es el tipo de letra que indica si son mayúsculas,           ** 
    ** minúsuculas, se define el tipo en el archivo de configuración.                     **    
    ** Parámetro $nodo: es el nombre de la etiqueta principal.                            **
    ** Retorna el valor consultado del archivo.                                           **
    ***************************************************************************************/
    public function obtenerDescripcion($nombre, $tipo_letra=1, $nodo="parametro"){
      
        $resultado = "";      
        $resultado = $this->obtenerDatoArchivo($nombre, $tipo_letra, 'descripcion', $nodo);                        
        return $resultado;
        
    }
}

?>