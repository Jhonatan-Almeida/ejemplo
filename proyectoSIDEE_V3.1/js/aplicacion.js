var hoteles = [];
    var marcador1;
    var latlng = "";
    function cambiarPagina(page) {
       // alert ("aqui toy"+page);

        switch (page) {
            case "paginaRegistro":
                $.mobile.changePage("#" + page, {
                    transition: "slidedown"
                });
                break;
            case "paginaConsulta":

                $("#codigoB").val("");
                $("#datos").html("");

                $.mobile.changePage("#" + page, {
                    transition: "slideup"
                });
                break;
            case "ingresoUsuario":

                //$("#codigoB").val("");
                //$("#datos").html("");

                $.mobile.changePage("#" + page, {
                    transition: "slideup"
                });
                break;
            case "paginalistaHotel":
                $.mobile.changePage("#" + page, {
                    transition: "flip"
                });
                break;
            case "paginaInicio":
                $.mobile.changePage("#" + page, {
                    transition: "flip"
                });
                break;

        }


    }
    function mostrarMapaCon(latlng) {

                    
            var opciones = {            
                zoom: 10,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP        
            };

                    
            var mapa = new google.maps.Map(document.getElementById("divMapaRes"), opciones);               
            var marker = new google.maps.Marker({            
                position: latlng,
                map: mapa,
                draggable: true,
                title: "Punto Hotel!!"
            });    
        }

    function consultarRegistro(nombre){

        cambiarPagina('paginaConsulta');

        var datosReg = "----Hotel"+nombre+"----<br>";

        for (var j = 0; j < hoteles.length; j++) {
                if (nombre == hoteles[j].nombre) {
                datosReg += "Nombre:" + hoteles[j].nombre + "<br>";
                datosReg += "ciudad:" + hoteles[j].ciudad + "<br>";
                datosReg += "telefono:" + hoteles[j].telefono + "<br>";
                datosReg += "estrellas:" + hoteles[j].estrellas + "<br>";

                $("#consulta").html(datosReg);
                mostrarMapaCon(latlng);

                break;

                }

        };
}

    $(document).ready(function() {

        

        function mostrarMapa(posicion) {

                                var opciones = {            
                                    zoom: 10,
                                    center: posicion,
                                    mapTypeId: google.maps.MapTypeId.ROADMAP        
                                };

                                        
                                var mapa = new google.maps.Map(document.getElementById("divMapa"), opciones);   

                                marcador1 = new google.maps.Marker({            
                                    position: posicion,
                                    map: mapa,
                                    draggable: true,
                                    title: "Punto Hotel!!"        
                                });
                                               
                            }

                                 function exito(pos) {         
                                    latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude); 

                                    mostrarMapa(latlng);            
                                }        
                                function fallido(error) {           
                                    if (error.code == 0) {
                                        alert("Oops! No se puede obtener la posición actual.");

                                    }
                                    if (error.code == 1) {

                                        alert("Oops! Algo ha salido mal.");

                                    }
                                    if (error.code == 2) {

                                        alert("Oops! No has aceptado compartir tu posición.");

                                    }
                                    if (error.code == 3) {

                                        alert("Oops! Hemos superado el tiempo de espera");

                                    }        
                                }      

                        function obtenerPosicionActual() {
                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(exito, fallido, {
                                    maximumAge: 50000000,
                                    enableHighAccuracy: true,
                                    timeout: 500000000
                                });
                            }
                        }


                      obtenerPosicionActual();

                $("#boton1").click(function() {
                    var nombre = $("#nombre").val();
                    var posicion = latlng;
                    var ciudad = $("#ciudad").val();
                    var telefono = $("#telefono").val();
                    var estrellas = $("#estrellas").val();
                    var hotel = {
                        nombre: nombre,
                        posicion: posicion,
                        ciudad: ciudad,
                        telefono: telefono,
                        estrellas: estrellas
                    }

                    hoteles.push(hotel);
                    alert("Usuario Registrado!!");
                    limpiarCampos();
                    datos = "";
                    for (var i = 0; i < hoteles.length; i++) {
                        datos +="<a onclick='consultarRegistro(&#39;"+hoteles[i].nombre+"&#39;)' class='ui-btn'>Hotel "+hoteles[i].nombre+"</a>";
                    };
                   
                    $("#datos").html(datos);
                });
                


                    function limpiarCampos() {
                         $("#nombre").val("");
                         $("#ciudad").val("");
                         $("#telefono").val("");
                         $("#estrellas").val("");
                    }
            

            });

