<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
require_once('../includes/nusoap/lib/nusoap.php');
date_default_timezone_set('America/Guayaquil');
$data = $_POST;
if(isset($_POST)){
    $client = new soapclient('https://www.clickdatasolution.com/servicios/servicio.php');
    $err = $client->getError();
	if ($err) {
		// Display the error
		echo '<p><b>Constructor error: ' . $err . '</b></p>';
		// At this point, you know the call that follows will fail
	}	
           $parametros = array('provincia' => $data['provincia'],
                               'canton' => $data['canton'],
                               'dignidad'=> $data['dignidad']
                               );
            $result = $client->call(
            'consultaGrafica', $parametros   // input parameters
            ); 
        $resultado = json_encode($result);
        print_r($resultado);
}else{
	echo get_form();
}
//$myarr=($_POST);
//
//print_r($data[0]->provincia);
//echo "NUMERO DE ROTACIONES: ".count($data);
//print_r ($data['provincia']);
?>

