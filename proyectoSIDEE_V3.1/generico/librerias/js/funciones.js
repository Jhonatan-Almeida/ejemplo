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

/*******************************************************************************
** Función para envío de login.                                               **    
*******************************************************************************/
function encForm(form, password) {
    var p = document.createElement("input");
    var mensaje = validarLoginForm(form);
    document.getElementById("divMensaje").innerHTML = "";
    if(mensaje!=""){
        document.getElementById("divMensaje").innerHTML = formatearMensaje(mensaje,4);
        return false;
    }
    form.appendChild(p);
    p.name = "vpcu";
    p.type = "hidden"
    p.value = MD5(trimCad(password.value));
    password.value = "";
    form.submit();
    return true;
}

/*******************************************************************************
** Función para validar datos de login.                                       **    
*******************************************************************************/
function validarLoginForm(form){
    var mensaje = "";
    if(trimCad(form.txtLogin.value) == "")
        mensaje = "Debe ingresar la cédula \n";
    if(trimCad(form.txtClave.value) == "")
        mensaje += "Debe ingresar la clave";
    return mensaje;
}

/*******************************************************************************
** Función para acceder al form login.                                        **    
*******************************************************************************/
function accederLogin(ruta, parametro)
{
    var x = (screen.width - 20) / 2;
    var y = (screen.height - 80) / 2;
    var ancho = screen.width - 20;
    var alto = screen.height - 80;
    var ventana = window.open(ruta+"/login.php"+parametro,"_blank","toolbar=no,directories=no,menubar=no,status=no,scrollbars=yes, resizable=yes, width=" + ancho + ", height=" + alto);
    ventana.moveTo(x, y);
    ventana.focus();
}

/*******************************************************************************
** Función para abrir una página en un div, recibe varios parametros.         **    
*******************************************************************************/
function cargarVentana(url_dir, nombre_div, parametros){
    $.ajax({ 
        type: "POST",
        url:url_dir,
        data: parametros ,
        success: function(datos){       
            $('#'+nombre_div).html(datos);
        }
    });
}

/*******************************************************************************
** Función para abrir una página en un div, recibe 2 parametros: accion y id. **    
*******************************************************************************/
function cargarVentanaAccion(url_dir, nombre_div, accion, registroId){
    $.ajax({ 
        type: "POST",
        url:url_dir,
        data: {"accion":accion, "registroId":registroId} ,
        success: function(datos){       
            $('#'+nombre_div).html(datos);
        }
    }); 
}

/*******************************************************************************
** Función para abrir una ventana popup.                                      **    
*******************************************************************************/
function abrirPopup(url,ancho,alto){
        var pos_x; 
        var pos_y; 
        pos_x=(screen.width/2)-(ancho/2); 
        pos_y=(screen.height/2)-(alto/2); 
        window.open(url, "", "width="+ancho+",height="+alto+",menubar=0,toolbar=0,directories=0,scrollbars=yes,resizable=no,left="+pos_x+",top="+pos_y+""); 
}

/*******************************************************************************
** Función para cambiar de tipo de usuario al seleccionar del combo.          **    
*******************************************************************************/
var cambiaTipoUs = false;
var cambiaPerfil = false;
var sesionCaducada = false;
var cambiaCvUs = false;
function cambiarTipoUs(tipoUs){    
    cambiaTipoUs = true;
    location.href="contenedor.php?tipous="+tipoUs;
}

/*******************************************************************************
** Función para cambiar el perfil al seleccionar del combo.                   **    
*******************************************************************************/
function cambiarPerfil(perfil, tipoUs){   
    cambiaPerfil = true;  
    location.href="contenedor.php?perfil="+perfil+"&tipous="+tipoUs;
}

/*******************************************************************************
** Función para advertir al usuario antes de salir del sistema.               **    
*******************************************************************************/
 function OnBeforeUnLoad() {
    if(!cambiaPerfil && !sesionCaducada && !cambiaTipoUs && !cambiaCvUs){   
        return "";
    }
}

/*******************************************************************************
** Función para cerrar ventana, sin tomar en cuenta el cambio de perfil.      **    
*******************************************************************************/
 function cerrarVentana () {
     var navegador = navigator.userAgent;
     if(!cambiaPerfil && !cambiaTipoUs){
         window.parent.close();
         if (navigator.userAgent.indexOf('Chrome') != -1){
            cerrarSesion(); 
         }
//         alert ("navegador");
//         cerrarSesion();    
    }
}
/*******************************************************************************
** Función para cerrar sesión, sin tomar en cuenta el cambio de perfil.       **    
*******************************************************************************/
 function cerrarSesion(){
    if(!cambiaPerfil && !cambiaTipoUs && !sesionCaducada){   
        salirSesion();
        window.parent.close();
    }
}

/*******************************************************************************
** Función para cerrar sesión, sin tomar en cuenta el cambio de perfil.       **    
*******************************************************************************/
 function salirSesion(){
    window.open ('../../generico/sesion/salirSesion.php', "", "width="+5+",height="+5+",menubar=0,toolbar=0,directories=0,scrollbars=yes,resizable=no,left="+0+",top="+0+"");
}

/*******************************************************************************
** Función para cerrar sesión caducada.                                       **    
*******************************************************************************/
 function cerrarSesionCaducada(){
     sesionCaducada = true;
     if(!cambiaPerfil && !cambiaTipoUs){   
        salirSesion();
        window.parent.close();
    }
    else salirSesion();
}

/*******************************************************************************
** Función para formatear mensajes según tipo.                                **    
*******************************************************************************/
function formatearMensaje(texto, opcion) {
   switch(opcion){
       case 1: //Mensaje de acción satisfactoria
           texto = "<div class='alert-sm alert-success bg-success'><span class='glyphicon glyphicon-ok'></span> " +texto+"</div>";
       break;
       case 2: //Mensaje de información
           texto = "<div class='alert-sm alert-info bg-info'><span class='glyphicon glyphicon-info-sign'></span> " +texto+"</div>";
       break;
       case 3: //Mensaje de advertencia
           texto = "<div class='alert-sm alert-warning bg-warning' ><span class='glyphicon glyphicon-warning-sign'></span> " +texto+"</div>";
       break;
       case 4: //Mensaje de error
           texto = "<div class='alert-sm alert-danger bg-danger' ><span class='glyphicon glyphicon-exclamation-sign'></span> " +texto+"</div>";
       break;
   }
   return texto;
}

/*******************************************************************************
** Función para eliminar espacios en blanco de una cadena.                    **    
*******************************************************************************/
function trimCad(str)
{
   var resultado = "";
   if(str)
    resultado = str.replace(/^\s+|\s+$/g,"");
   return resultado;
}

/*******************************************************************************
** Función que muestra mensaje al recargar la página.                         **    
*******************************************************************************/
 function mostrarMensaje(nombreDiv, mensaje,opcion){
    if(mensaje!=""){
        $("#"+nombreDiv).show();
        $("#"+nombreDiv).html(formatearMensaje(mensaje,opcion));
    }
}

/*******************************************************************************
** Función que valida en número de cédula, RUC                                **    
*******************************************************************************/
function validarCedula (numero)
{
    var suma = 0;
    var residuo = 0;
    var pri = false;
    var pub = false;
    var nat = false;
    var numeroProvincias = 24;
    var modulo = 11;
    var mensaje = "";

    // Verifico que el número de cédula tenga 10 o 13 digitos
    numero = numero.replace(/^\s+/, "");
    numero = numero.replace('-','');
    if (numero.length!=10 && numero.length!=13)
        mensaje = "Identificación incorrecta."; //return false;
    /* Verifico que el campo no contenga letras */
    if (isNaN(numero))
         mensaje = "Identificación incorrecta."; //return false;
    var valIf = numero.substr(0,2);
    if (parseInt(valIf,10)<=0 || parseInt(valIf,10)>numeroProvincias)
         mensaje = "Identificación incorrecta."; //return false;
     
    //Si esta con error de longitud retorne antes de validar
    if(mensaje) return mensaje;
    
    /*var ok=1;
    for (i=0; i<numeroProvincias){
            mensaje = 'El código de la provincia (dos primeros dígitos) es inválido'); return false;
    }*/

    /* Aqui almacenamos los digitos de la cedula en variables. */
    var d1 = numero.substr(0,1);
    var d2 = numero.substr(1,1);
    var d3 = numero.substr(2,1);
    var d4 = numero.substr(3,1);
    var d5 = numero.substr(4,1);
    var d6 = numero.substr(5,1);
    var d7 = numero.substr(6,1);
    var d8 = numero.substr(7,1);
    var d9 = numero.substr(8,1);
    var d10 = numero.substr(9,1);

    /* El tercer digito es: */
    /* 9 para sociedades privadas y extranjeros */
    /* 6 para sociedades publicas */
    /* menor que 6 (0,1,2,3,4,5) para personas naturales */

    if (d3==7 || d3==8){
        mensaje = 'El tercer dígito ingresado es inválido';
        //return false;
    }

    /* Solo para personas naturales (modulo 10) */
    if (d3 < 6){
        nat = true;
        var p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
        var p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
        var p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
        var p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
        var p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
        var p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
        var p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
        var p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
        var p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
        modulo = 10;
    }

    /* Solo para sociedades publicas (modulo 11) */
    /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
    else if(d3 == 6){
        pub = true;
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;
        p9 = 0;
    }

    /* Solo para entidades privadas (modulo 11) */
    else if(d3 == 9) {
        pri = true;
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;
    }

    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
    residuo = suma % modulo;

    /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
    var digitoVerificador = residuo==0 ? 0: modulo - residuo;

    /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
    if (pub==true){
        if (digitoVerificador != d9){
            mensaje = 'El ruc de la empresa del sector público es incorrecto.';
            //return false;
        }
        /* El ruc de las empresas del sector publico terminan con 0001*/
        if ( numero.substr(9,4) != '0001' ){
            mensaje = 'El ruc de la empresa del sector público debe terminar con 0001';
            //return false;
        }
    }
    else if(pri == true){
        if (digitoVerificador != d10){
            mensaje = 'El ruc de la empresa del sector privado es incorrecto.';
            //return false;
        }
        if ( numero.substr(10,3) != '001' ){
            mensaje = 'El ruc de la empresa del sector privado debe terminar con 001';
            //return false;
        }
    }
    else if(nat == true){
        if (digitoVerificador != d10){
            mensaje = 'El número de cédula es incorrecto.';
            //return false;
        }
        if (numero.length >10 && numero.substr(10,3) != '001' ){
            mensaje = 'El ruc de la persona natural debe terminar con 001';
            //return false;
        }
    }
    return mensaje;
}

/*******************************************************************************
** Función que valida el ingreso de números.                                  **    
*******************************************************************************/
function validarIngresoNumeros(e)
{
	var evento = e || window.event;
	var tecla = evento.charCode || evento.keyCode;
	if (tecla==8) return true; 	//presiono backspace
	if (tecla==9) return true; 	//presiono tab
	var patron = /[0-9.]+/; 
	var te = String.fromCharCode(tecla); 
	return patron.test(te);
}

/*******************************************************************************
** Función que muestra el formulario para cambiar datos de cuenta de usuario. **    
*******************************************************************************/
function abrirCuenta(){
    $.ajax({
        type: "POST",
        url: "cuentaForm.php",
        data: {"accion":4} ,
        success: function(data) {
            $('#divBusca2').fadeIn(1000).html(data);
        }
    });
}

function getAMD( fecha )
{
	var a=fecha.substr(0,4);
	var m=fecha.substr(5,2) - 1;
	var d=fecha.substr(8,2);
	var h=fecha.substr(11,2);
	var mi=fecha.substr(14,2);
	return new Date(a,m,d,h,mi,0);
}

function restarFechas (f1,f2)
{ 
    var aFecha1 = f1.split('-'); 
    var aFecha2 = f2.split('-'); 
    var fFecha1 = Date.UTC(aFecha1[0],aFecha1[1]-1,aFecha1[2]); 
    var fFecha2 = Date.UTC(aFecha2[0],aFecha2[1]-1,aFecha2[2]);
    var dif = fFecha1 - fFecha2;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24)); 
    return dias;
}

function dateFormat( fecha )
{
        var yyyy = fecha.getFullYear().toString();                                    
        var mm = (fecha.getMonth()+1).toString(); // getMonth() is zero-based         
        var dd  = fecha.getDate().toString();             
                            
        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
}

/*******************************************************************************
** Función que ejecuta la validación del control requerido.                   **    
*******************************************************************************/
function validarControl(nombreControl){
    var mensaje = "";
    if($("#"+nombreControl).val() == "" || $("#"+nombreControl).val() == 0)
        mensaje = obtenerMensajeControl(nombreControl);
    var nomspan = "sp_"+nombreControl;
    $("#"+nomspan).detach();
    $('#divMensaje').html("");
    if(mensaje!=""){
        $("#divMensaje").fadeIn("fast");
        $('#divMensaje').html(formatearMensaje(mensaje,4));
        $("#"+nombreControl).after(" <span id='"+nomspan+"' name='"+nomspan+"' width='5' class='alert-sm alert-danger bg-danger' ><span width='5' class='glyphicon glyphicon-exclamation-sign'></span></span>");
    }
    return mensaje;
}

/*******************************************************************************
** Función que ejecuta la validación del control requerido.                   **    
*******************************************************************************/
function validarControlLista(nombreControl,tipo){
    var mensaje = "";
    if(tipo == 0)
        mensaje = obtenerMensajeControl(nombreControl);
    var nomspan = "sp_"+nombreControl;
    $("#"+nomspan).detach();
    $('#divMensaje').html("");
    if(mensaje!=""){
        $("#divMensaje").fadeIn("fast");
        $('#divMensaje').html(formatearMensaje(mensaje,4));
        $("#"+nombreControl).after(" <span id='"+nomspan+"' name='"+nomspan+"' width='5' class='alert-sm alert-danger bg-danger' ><span width='5' class='glyphicon glyphicon-exclamation-sign'></span></span>");
    }
    return mensaje;
}
function abrirDescargarArchivo(ruta)
{
    var x = (screen.width) / 2;
    var y = (screen.height) / 2;
    var ancho = 600;
    var alto = 300;
    var ventana = window.open(ruta,"_blank","toolbar=no,directories=no,menubar=no,status=no,scrollbars=yes, resizable=yes, width=" + ancho + ", height=" + alto);
    ventana.moveTo(x, y);
    ventana.focus();
}