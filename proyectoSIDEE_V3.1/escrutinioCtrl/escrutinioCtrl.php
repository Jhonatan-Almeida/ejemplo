<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
require_once('../includes/nusoap/lib/nusoap.php');
date_default_timezone_set('America/Guayaquil');
$data = json_decode($_POST['escrutinios']);
if(isset($_POST['escrutinios'])){
    $client = new soapclient('https://www.clickdatasolution.com/servicios/servicio.php');
    $err = $client->getError();
	if ($err) {
		// Display the error
		echo '<p><b>Constructor error: ' . $err . '</b></p>';
		// At this point, you know the call that follows will fail
	}	
        for ($i=0;$i<count($data);$i++){
           $parametros = array('provincia' => $data[$i]->provincia,
                               'canton' => $data[$i]->canton,
                               'parroquia' => $data[$i]->parroquia,
                               'recinto' => $data[$i]->recinto,
                               'junta' => $data[$i]->junta,
                               'dignidad'=> $data[$i]->dignidad,
                               'codigoD'=> $data[$i]->codigoD,
                               'validos'=>  $data[$i]->validos,
                               'blanco'=>  $data[$i]->blanco,
                               'nulos'=>  $data[$i]->nulos
                               );
//           echo "entro en el for ".$data[$i]->dignidad;
//           print_r($parametros);
            $result = $client->call(
            'ingresoEscrutinio', $parametros   // input parameters
            ); 
        }
	
        echo $result ;
}else{
	echo get_form();
}
//$myarr=($_POST);
//
//print_r($data[0]->provincia);
//echo "NUMERO DE ROTACIONES: ".count($data);

?>

