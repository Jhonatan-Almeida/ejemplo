<?php
header("Content-type: application/vnd.ms-excel");
header("Content-Disposition: filename=ficheroExcel.xls");
header("Pragma: no-cache");
header("Expires: 0");
//set_time_limit(360);
?>
<table border="1">
<?php 
echo $_POST['datos_a_enviar'];
?>
</table>