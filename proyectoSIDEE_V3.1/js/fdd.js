var escrutinios = [];
//////////////////********* Instanciacion de los cantones de Bolivar****//////////////
var jsonText = '{"canton":['+
'{"codigo":43,"nombre":"GUARANDA"},'+
'{"codigo":44,"nombre":"CHILLANES"},'+
'{"codigo":45,"nombre":"CHIMBO"},'+
'{"codigo":46,"nombre":"ECHEANDÍA"},'+
'{"codigo":47,"nombre":"SAN MIGUEL"},'+
'{"codigo":48,"nombre":"CALUMA"},'+
'{"codigo":49,"nombre":"LAS NAVES"}'+']}';

//////////////////********* Instanciacion de los parroquias de Guaranda****//////////////
var jsonGuaranda = '{"parroquiaGuaranda":['+
'{"codigo":356,"nombre":"ÁNGEL POLIBIO CHÁVES"},'+
'{"codigo":357,"nombre":"GABRIEL IGNACIO VEINTIMILLA"},'+
'{"codigo":358,"nombre":"GUANUJO"},'+
'{"codigo":359,"nombre":"GUARANDA"},'+
'{"codigo":360,"nombre":"FACUNDO VELA"},'+
'{"codigo":362,"nombre":"JULIO E. MORENO (CATANAHUÁN GRANDE)"},'+
'{"codigo":364,"nombre":"SALINAS"},'+
'{"codigo":365,"nombre":"SAN LORENZO"},'+
'{"codigo":366,"nombre":"SAN SIMÓN (YACOTO)"},'+
'{"codigo":367,"nombre":"SANTA FÉ (SANTA FÉ)"},'+
'{"codigo":368,"nombre":"SIMIÁTUG"},'+
'{"codigo":369,"nombre":"SAN LUIS DE PAMBIL"}'+']}';

//////////////////********* Instanciacion de los parroquias de Chillanes****//////////////
var jsonChillanes = '{"parroquiaChillanes":['+
'{"codigo":370,"nombre":"CHILLANES"},'+
'{"codigo":371,"nombre":"SAN JOSÉ DEL TAMBO (TAMBOPAMBA)"}'+']}';

//////////////////********* Instanciacion de los parroquias de Chimbo****//////////////
var jsonChimbo = '{"parroquiaChimbo":['+
'{"codigo":372,"nombre":"SAN JOSÉ DE CHIMBO"},'+
'{"codigo":373,"nombre":"ASUNCIÓN (ASANCOTO)"},'+
'{"codigo":375,"nombre":"MAGDALENA (CHAPACOTO)"},'+
'{"codigo":376,"nombre":"SAN SEBASTIÁN"},'+
'{"codigo":377,"nombre":"TELIMBELA"}'+']}';

//////////////////********* Instanciacion de los parroquias de Echeandia****//////////////
var jsonEcheandia = '{"parroquiaEcheandia":['+
'{"codigo":378,"nombre":"ECHEANDÍA"}'+']}';

//////////////////********* Instanciacion de los parroquias de San Miguel ****//////////////
var jsonSanmiguel = '{"parroquiaSanmiguel":['+
'{"codigo":379,"nombre":"SAN MIGUEL"},'+
'{"codigo":380,"nombre":"BALZAPAMBA"},'+
'{"codigo":381,"nombre":"BILOVÁN"},'+
'{"codigo":382,"nombre":"RÉGULO DE MORA"},'+
'{"codigo":383,"nombre":"SAN PABLO  (SAN PABLO DE ATENAS)"},'+
'{"codigo":384,"nombre":"SANTIAGO"},'+
'{"codigo":385,"nombre":"SAN VICENTE"}'+']}';
//////////////////********* Instanciacion de los parroquias de Echeandia****//////////////
var jsonCaluma = '{"parroquiaCaluma":['+
'{"codigo":386,"nombre":"CALUMA"}'+']}';

//////////////////********* Instanciacion de los parroquias de Las Naves****//////////////
var jsonLasnaves = '{"parroquiaLasnaves":['+
'{"codigo":387,"nombre":"LAS MERCEDES"},'+
'{"codigo":388,"nombre":"LAS NAVES"}'+']}';
/////////////////********* Manejo de JSON para los cantones y parroquias***///////////

var jsObj = JSON.parse(jsonText);
var jsObj1 = JSON.parse(jsonGuaranda);
var jsObj2 = JSON.parse(jsonChillanes);
var jsObj3 = JSON.parse(jsonChimbo);
var jsObj4 = JSON.parse(jsonEcheandia);
var jsObj5 = JSON.parse(jsonSanmiguel);
var jsObj6 = JSON.parse(jsonCaluma);
var jsObj7 = JSON.parse(jsonLasnaves);

///////////////////////////////////////////////////////////////////////////////////////
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
            case "paginaReportes":
                $("#codigoB").val("");
                $("#datos").html("");
                $.mobile.changePage("#" + page, {
                    transition: "slideup"
                });
                break;
            case "paginaGraficos":
                $.mobile.changePage("#" + page, {
                    transition: "flip"
                });
                break;
            case "paginaGraficosGeneral":
                $.mobile.changePage("#" + page, {
                    transition: "flip"
                });
                break;
            case "paginaInicio":
                $.mobile.changePage("#" + page, {
                    transition: "flip"
                });
                break;
            case "paginaSincronizar":
                $.mobile.changePage("#" + page, {
                    transition: "flip"
                });
                break;
        }
    }
   
///////////////////*****************Elegir el Canton**********//////////////////////////////
function cargarCanton(json) {
    var provincia = document.getElementById("sel_prov").value;
    if (provincia == 3){
    var out ="<select id='selCanton' name='selCanton' onchange='cargarParroquia(jsObj1,jsObj2,jsObj3,jsObj4,jsObj5,jsObj6,jsObj7)' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<json.canton.length;i++){
                out+="<option value='"+json.canton[i].codigo+"'>"+json.canton[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divCanton").innerHTML= out;
    }
    }

///////////////////*****************Elegir el Parroquia**********//////////////////////////////
function cargarParroquia(json1,json2,json3,json4,json5,json6,json7) {
        var canton = document.getElementById("selCanton").value;
         if (canton == 43){
        var out ="<select id='selRecinto' name='selRecinto' onchange='cargarRecintos()' style='width:250px'>";
        out+="<option value='0'>Escoja una opción</option>";
        for(i=0;i<json1.parroquiaGuaranda.length;i++){
                    out+="<option value='"+json1.parroquiaGuaranda[i].codigo+"'>"+json1.parroquiaGuaranda[i].nombre+"</option>";
            }
          out+="</select>";
          document.getElementById("divParroquia").innerHTML= out;
        }
        if (canton == 44){
        var out ="<select id='selRecinto' name='selRecinto' onchange='cargarRecintos()' style='width:250px'>";
        out+="<option value='0'>Escoja una opción</option>";
        for(i=0;i<json2.parroquiaChillanes.length;i++){
                    out+="<option value='"+json2.parroquiaChillanes[i].codigo+"'>"+json2.parroquiaChillanes[i].nombre+"</option>";
            }
          out+="</select>";
          document.getElementById("divParroquia").innerHTML= out;
        }
        if (canton == 45){
        var out ="<select id='selRecinto' name='selRecinto' onchange='cargarRecintos()' style='width:250px'>";
        out+="<option value='0'>Escoja una opción</option>";
        for(i=0;i<json3.parroquiaChimbo.length;i++){
                    out+="<option value='"+json3.parroquiaChimbo[i].codigo+"'>"+json3.parroquiaChimbo[i].nombre+"</option>";
            }
          out+="</select>";
          document.getElementById("divParroquia").innerHTML= out;
        }
        if (canton == 46){
        var out ="<select id='selRecinto' name='selRecinto' onchange='cargarRecintos()' style='width:250px'>";
        out+="<option value='0'>Escoja una opción</option>";
        for(i=0;i<json4.parroquiaEcheandia.length;i++){
                    out+="<option value='"+json4.parroquiaEcheandia[i].codigo+"'>"+json4.parroquiaEcheandia[i].nombre+"</option>";
            }
          out+="</select>";
          document.getElementById("divParroquia").innerHTML= out;
        }
        if (canton == 47){
        var out ="<select id='selRecinto' name='selRecinto' onchange='cargarRecintos()' style='width:250px'>";
        out+="<option value='0'>Escoja una opción</option>";
        for(i=0;i<json5.parroquiaSanmiguel.length;i++){
                    out+="<option value='"+json5.parroquiaSanmiguel[i].codigo+"'>"+json5.parroquiaSanmiguel[i].nombre+"</option>";
            }
          out+="</select>";
          document.getElementById("divParroquia").innerHTML= out;
        }
        if (canton == 48){
        var out ="<select id='selRecinto' name='selRecinto' onchange='cargarRecintos()' style='width:250px'>";
        out+="<option value='0'>Escoja una opción</option>";
        for(i=0;i<json6.parroquiaCaluma.length;i++){
                    out+="<option value='"+json6.parroquiaCaluma[i].codigo+"'>"+json6.parroquiaCaluma[i].nombre+"</option>";
            }
          out+="</select>";
          document.getElementById("divParroquia").innerHTML= out;
        }
        if (canton == 49){
        var out ="<select id='selRecinto' name='selRecinto' onchange='cargarRecintos()' style='width:250px'>";
        out+="<option value='0'>Escoja una opción</option>";
        for(i=0;i<json7.parroquiaLasnaves.length;i++){
                    out+="<option value='"+json7.parroquiaLasnaves[i].codigo+"'>"+json7.parroquiaLasnaves[i].nombre+"</option>";
            }
          out+="</select>";
          document.getElementById("divParroquia").innerHTML= out;
        }
    }   
    
    ///////////////////*****************Elegir el Recinto**********//////////////////////////////
function cargarRecintos() {
    var recinto = document.getElementById("selRecinto").value;
    
    //////////////////********* Instanciacion de los parroquias de apch****//////////////
    var jsonApchavez = '{"parroquiaApchavez":['+
    '{"codigo":20,"nombre":"UNIDAD EDUCATIVA SAN JUAN BOSCO"},'+
    '{"codigo":21,"nombre":"ESCUELA ANGEL POLIBIO CHAVES"},'+
    '{"codigo":22,"nombre":"UNIDAD EDUCATIVA ANGEL POLIBIO CHAVES"}'+']}';

    //////////////////********* Instanciacion de los parroquias de Gveitimilla****//////////////
    var jsonGiveitimilla = '{"parroquiaGiveitimilla":['+
    '{"codigo":23,"nombre":"ESCUELA DE EDUCACION BASICA MANUEL DE ECHEANDIA"},'+
    '{"codigo":24,"nombre":"UNIDAD EDUCATIVA PEDRO CARBO"},'+
    '{"codigo":25,"nombre":"UNIDAD EDUCATIVA VERBO DIVINO"},'+
    '{"codigo":26,"nombre":"UNIDAD EDUCATIVA INTERCULTURAL BILINGÜE INTI CHURI"}'+']}';
    
    //////////////////********* Instanciacion de los parroquias de Guanujo****//////////////
    var jsonGuanujo = '{"parroquiaGuanujo":['+
    '{"codigo":27,"nombre":"UNIDAD EDUCATIVA SAN PEDRO"},'+
    '{"codigo":28,"nombre":"UNIDAD EDUCATIVA VICENTE ROCAFUERTE"},'+
    '{"codigo":29,"nombre":"UNIDAD EDUCATIVA ROCAFUERTE (EX TRINIDAD CAMACHO)"},'+
    '{"codigo":30,"nombre":"ESCUELA DE EDUCACION BASICA FABIAN AGUILAR IBARRA"},'+
    '{"codigo":31,"nombre":"CENTRO EDUCATIVO BASICO HECTOR ZAMBRANO"},'+
    '{"codigo":32,"nombre":"ESCUELA DE EDUCACION BASICA FAE"},'+
    '{"codigo":33,"nombre":"ESCUELA DE EDUCACION BASICA ISABEL LA CATOLICA"},'+
    '{"codigo":34,"nombre":"UNIDAD EDUCATIVA COCDIAG"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Fvela****//////////////
    var jsonFvela = '{"parroquiaFvela":['+
    '{"codigo":4,"nombre":"UNIDAD EDUCATIVA DR. FACUNDO VELA"},'+
    '{"codigo":5,"nombre":"ESCUELA 20 DE AGOSTO"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Jmoreno****//////////////
    var jsonJmoreno = '{"parroquiaJmoreno":['+
    '{"codigo":35,"nombre":"ESCUELA DE EDUCACION GENERAL BASICA CARLOS GUALBERTO GALARZA"},'+
    '{"codigo":36,"nombre":"UNIDAD EDUCATIVA INTERCULTURAL BILINGÜE 7 DE MAYO"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Salinas****//////////////
    var jsonSalinas = '{"parroquiaSalinas":['+
    '{"codigo":6,"nombre":"BALCON DE SERVICIOS PUBLICOS DE SALINAS"},'+
    '{"codigo":7,"nombre":"UNIDAD EDUCATIVA LA PALMA"},'+
    '{"codigo":8,"nombre":"UNIDAD EDUCATIVA ATAHUALPA"},'+
    '{"codigo":9,"nombre":"ESCUELA INTERCULTURAL BILINGÜE HUALCOPO DUCHICELA"}'+']}';
    //////////////////********* Instanciacion de los parroquias de San Lorenzo****//////////////
    var jsonSlorenzo = '{"parroquiaSlorenzo":['+
    '{"codigo":36,"nombre":"UNIDAD EDUCATIVA SAN LORENZO"}'+']}';
    //////////////////********* Instanciacion de los parroquias de San Simon****//////////////
    var jsonSsimon = '{"parroquiaSsimon":['+
    '{"codigo":11,"nombre":"ESCUELA DE EDUCACION BASICA ABDON CALDERON"},'+
    '{"codigo":12,"nombre":"UNIDAD EDUCATIVA COMUNITARIA INTERCULTURAL BILINGUE RUMIÑAHUI"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Santa Fé****//////////////
    var jsonSantafe = '{"parroquiaSantafe":['+
    '{"codigo":36,"nombre":"UNIDAD EDUCATIVA 23 DE ABRIL"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Simiatug****//////////////
    var jsonSimiatug = '{"parroquiaSimiatug":['+
    '{"codigo":27,"nombre":"UNIDAD EDUCATIVA DEL MILENIUN INTERCULTURAL BILINGUE SIMIATUG"},'+
    '{"codigo":28,"nombre":"UNIDAD EDUCATIVA FELIX GRANJA"},'+
    '{"codigo":29,"nombre":"ESCUELA CACIQUE GUARANGA"},'+
    '{"codigo":30,"nombre":"CENTRO DE EDUCACION INTERCULTURAL BILINGÜE 23 DE ABRIL"},'+
    '{"codigo":31,"nombre":"ESCUELA DE EDUCACION BASICA INGAPIRCA"},'+
    '{"codigo":34,"nombre":"ESCUELA DE EDUCACION BASICA SIMON RODRIGUEZ"}'+']}';
    //////////////////********* Instanciacion de los parroquias de San Luis de Pambil****//////////////
    var jsonSlpambil = '{"parroquiaSlpambil":['+
    '{"codigo":27,"nombre":"UNIDAD EDUCATIVA DIEGO DE ALMAGRO"},'+
    '{"codigo":28,"nombre":"UNIDAD EDUCATIVA SIMON BOLIVAR"},'+
    '{"codigo":34,"nombre":"ESCUELA EMILIO MARIA TERAN"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Chillanes****//////////////
    var jsonChillanes = '{"parroquiaChillanes":['+
    '{"codigo":63,"nombre":"ESCUELA DE EDUCACION BASICA GABRIELA MISTRAL"},'+
    '{"codigo":64,"nombre":"UNIDAD EDUCATIVA CHILLANES (ESCUELA FRAY VICENTE SOLANO)"},'+
    '{"codigo":65,"nombre":"UNIDAD EDUCATIVA CHILLANES"},'+
    '{"codigo":66,"nombre":"UNIDAD EDUCATIVA ANGEL JACINTO VILLARES"},'+
    '{"codigo":67,"nombre":"ESCUELA JUAN DE DIOS MORALES"},'+
    '{"codigo":68,"nombre":"ESCUELA 27 DE FEBRERO"},'+
    '{"codigo":69,"nombre":"UNIDAD EDUCATIVA MANUEL AGUILAR"},'+
    '{"codigo":70,"nombre":"ESCUELA BELISARIO QUEVEDO"},'+
    '{"codigo":71,"nombre":"UNIDAD EDUCATIVA SANTA ROSA DE CERRITOS"},'+
    '{"codigo":72,"nombre":"UNIDAD EDUCATIVA BARTOLOME RUIZ"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Sjosetambo****//////////////
    var jsonSjosetambo = '{"parroquiaSjosetambo":['+
    '{"codigo":58,"nombre":"ESCUELA DE EDUCACION GENERAL BASICA DARIO C GUEVARA"},'+
    '{"codigo":59,"nombre":"ESCUELA DE EDUCACION BASICA GRAN COLOMBIA"},'+
    '{"codigo":60,"nombre":"UNIDAD EDUCATIVA LA ANGELICA"},'+
    '{"codigo":61,"nombre":"ESCUELA DE EDUCACION BASICA FRANCISCO DE ORELLANA"},'+
    '{"codigo":62,"nombre":"ESCUELA DE EDUCACION BASICA TOMAS GAVILANES ALAVA"}'+']}';
     //////////////////********* Instanciacion de los parroquias de San Jose de Chimbo****//////////////
    var jsonSjchimbo = '{"parroquiaSjchimbo":['+
    '{"codigo":11,"nombre":"ESCUELA BASICA ALEJANDRO SERGIO BERMEO"},'+
    '{"codigo":12,"nombre":"UNIDAD EDUCATIVA CORINA PARRAL DE VELASCO IBARRA"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Asuncion****//////////////
    var jsonAsuncion = '{"parroquiaAsuncion":['+
    '{"codigo":37,"nombre":"UNIDAD EDUCATIVA LA ASUNCION"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Magdalena****//////////////
    var jsonMagdalena = '{"parroquiaMagdalena":['+
    '{"codigo":38,"nombre":"UNIDAD EDUCATIVA LA MAGDALENA"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Ssebastian****//////////////
    var jsonSsebastian = '{"parroquiaSsebastian":['+
    '{"codigo":39,"nombre":"ESCUELA GONZALES SUAREZ"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Telimbela****//////////////
    var jsonTelimbelas = '{"parroquiaTelimbelas":['+
    '{"codigo":40,"nombre":"UNIDAD EDUCATIVA GUSTAVO LEMOS RAMIREZ"},'+
    '{"codigo":41,"nombre":"ESCUELA AMERICA"},'+
    '{"codigo":42,"nombre":"ESCUELA DE EDUCACION BASICA GUTBERTO GARCIA"}'+']}';
     //////////////////********* Instanciacion de los parroquias de Echeandia****//////////////
    var jsonEcheandia = '{"parroquiaEcheandia":['+
    '{"codigo":78,"nombre":"ESCUELA DE EDUCACION BASICA JUAN BENIGNO VELA"},'+
    '{"codigo":79,"nombre":"ESCUELA DE EDUCACION BASICA ADOLFO PAEZ"},'+
    '{"codigo":80,"nombre":"UNIDAD EDUCATIVA SABANETILLAS"}'+']}';
    //////////////////********* Instanciacion de los parroquias de San Miguel****//////////////
    var jsonSmigue = '{"parroquiaSmiguel":['+
    '{"codigo":55,"nombre":"UNIDAD EDUCATIVA DEL MILENIO ANGEL POLIBIO CHAVES"},'+
    '{"codigo":56,"nombre":"UNIDAD EDUCATIVA 10 DE ENERO"},'+
    '{"codigo":57,"nombre":"ESCUELA BASICA CHILE"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Balzapamba****//////////////
    var jsonBalzapamba = '{"parroquiaBalzapamba":['+
    '{"codigo":45,"nombre":"UNIDAD EDUCATIVA 8 DE NOVIEMBRE"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Bilovan****//////////////
    var jsonBilovan = '{"parroquiaBilovan":['+
    '{"codigo":46,"nombre":"ESCUELA MIXTA JOSEFINA BARBA"},'+
    '{"codigo":47,"nombre":"UNIDAD EDUCATIVA CAMINO REAL"},'+
    '{"codigo":48,"nombre":"ESCUELA MIGUEL DE CERVANTES"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Regulo de Mora****//////////////
    var jsonRmora = '{"parroquiaRmora":['+
    '{"codigo":54,"nombre":"UNIDAD EDUCATIVA REGULO DE MORA"}'+']}';
      //////////////////********* Instanciacion de los parroquias de San Jose de Chimbo****//////////////
    var jsonSpablo = '{"parroquiaSpablo":['+
    '{"codigo":49,"nombre":"UNIDAD EDUCATIVA SAN PABLO DE ATENAS"},'+
    '{"codigo":50,"nombre":"ESCUELA HERMANO MIGUEL"}'+']}';
 //////////////////********* Instanciacion de los parroquias de Santiago****//////////////
    var jsonSantiago = '{"parroquiaSantiago":['+
    '{"codigo":51,"nombre":"UNIDAD EDUCATIVA SANTIAGO"},'+
    '{"codigo":52,"nombre":"ESCUELA ALBERTO DAVILA LOPEZ"}'+']}';
    //////////////////********* Instanciacion de los parroquias de Svicente****//////////////
    var jsonSvicente = '{"parroquiaSvicente":['+
    '{"codigo":53,"nombre":"ESCUELA DE EDUCACION BASICA LUIS AURELIO GONZALES"}'+']}';
     //////////////////********* Instanciacion de los parroquias de Caluma****//////////////
    var jsonCaluma = '{"parroquiaCaluma":['+
    '{"codigo":73,"nombre":"ESCUELA DE EDUCACION BASICA ALFREDO NOBOA MONTENEGRO"},'+
    '{"codigo":74,"nombre":"UNIDAD EDUCATIVA CALUMA"},'+
    '{"codigo":75,"nombre":"ESCUELA JOSE H GONZALES"},'+
    '{"codigo":76,"nombre":"UNIDAD EDUCATIVA YATUVI"},'+
    '{"codigo":77,"nombre":"ESCUELA FISCAL MIXTA FRANCISCO PIZARRO"}'+']}';
    //////////////////********* Instanciacion de los parroquias de mercedes****//////////////
    var jsonMercedes = '{"parroquiaMercedes":['+
    '{"codigo":83,"nombre":"ESCUELA DE EDUCACION BASICA SEBASTIAN DE BENALCAZAR"}'+']}';
      //////////////////********* Instanciacion de los parroquias Las Naves****//////////////
    var jsonLnaves = '{"parroquiaLnaves":['+
    '{"codigo":81,"nombre":"UNIDAD EDUCATIVA LAS NAVES"},'+
    '{"codigo":82,"nombre":"ESCUELA DE EDUCACION BASICA CORONEL MARIANO SALTOS ALBAN"}'+']}';
    
    var jsObj8 = JSON.parse(jsonApchavez);
    var jsObj9 = JSON.parse(jsonGiveitimilla);
    var jsObj10 = JSON.parse(jsonGuanujo);
    var jsObj11 = JSON.parse(jsonFvela);
    var jsObj12 = JSON.parse(jsonJmoreno);
    var jsObj13 = JSON.parse(jsonSalinas);
    var jsObj14 = JSON.parse(jsonSlorenzo);
    var jsObj15 = JSON.parse(jsonSsimon);
    var jsObj16 = JSON.parse(jsonSantafe);
    var jsObj17 = JSON.parse(jsonSimiatug);
    var jsObj18 = JSON.parse(jsonSlpambil);
    var jsObj19 = JSON.parse(jsonChillanes);
    var jsObj20 = JSON.parse(jsonSjosetambo);
    var jsObj21 = JSON.parse(jsonSjchimbo);
    var jsObj22 = JSON.parse(jsonAsuncion);
    var jsObj23 = JSON.parse(jsonMagdalena);
    var jsObj24 = JSON.parse(jsonSsebastian);
    var jsObj25 = JSON.parse(jsonTelimbelas);
    var jsObj26 = JSON.parse(jsonEcheandia);
    var jsObj27 = JSON.parse(jsonSmigue);
    var jsObj28 = JSON.parse(jsonBalzapamba);
    var jsObj29 = JSON.parse(jsonBilovan);
    var jsObj30 = JSON.parse(jsonRmora);
    var jsObj31 = JSON.parse(jsonSpablo);
    var jsObj32 = JSON.parse(jsonSantiago);
    var jsObj33 = JSON.parse(jsonSvicente);
    var jsObj34 = JSON.parse(jsonCaluma);
    var jsObj35 = JSON.parse(jsonMercedes);
    var jsObj36 = JSON.parse(jsonLnaves);
    if (recinto == 356){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj8.parroquiaApchavez.length;i++){
                out+="<option value='"+jsObj8.parroquiaApchavez[i].codigo+"'>"+jsObj8.parroquiaApchavez[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 357){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj9.parroquiaGiveitimilla.length;i++){
                out+="<option value='"+jsObj9.parroquiaGiveitimilla[i].codigo+"'>"+jsObj9.parroquiaGiveitimilla[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 358){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj10.parroquiaGuanujo.length;i++){
                out+="<option value='"+jsObj10.parroquiaGuanujo[i].codigo+"'>"+jsObj10.parroquiaGuanujo[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 359){
    alert ("No existe registros...!");
    var out ="<select id='selJunta'  style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 360){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj11.parroquiaFvela.length;i++){
                out+="<option value='"+jsObj11.parroquiaFvela[i].codigo+"'>"+jsObj11.parroquiaFvela[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 362){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj12.parroquiaJmoreno.length;i++){
                out+="<option value='"+jsObj12.parroquiaJmoreno[i].codigo+"'>"+jsObj12.parroquiaJmoreno[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 364){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj13.parroquiaSalinas.length;i++){
                out+="<option value='"+jsObj13.parroquiaSalinas[i].codigo+"'>"+jsObj13.parroquiaSalinas[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 365){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj14.parroquiaSlorenzo.length;i++){
                out+="<option value='"+jsObj14.parroquiaSlorenzo[i].codigo+"'>"+jsObj14.parroquiaSlorenzo[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 366){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj15.parroquiaSsimon.length;i++){
                out+="<option value='"+jsObj15.parroquiaSsimon[i].codigo+"'>"+jsObj15.parroquiaSsimon[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 367){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj16.parroquiaSantafe.length;i++){
                out+="<option value='"+jsObj16.parroquiaSantafe[i].codigo+"'>"+jsObj16.parroquiaSantafe[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 368){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj17.parroquiaSimiatug.length;i++){
                out+="<option value='"+jsObj17.parroquiaSimiatug[i].codigo+"'>"+jsObj17.parroquiaSimiatug[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 369){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj18.parroquiaSlpambil.length;i++){
                out+="<option value='"+jsObj18.parroquiaSlpambil[i].codigo+"'>"+jsObj18.parroquiaSlpambil[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 370){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj19.parroquiaChillanes.length;i++){
                out+="<option value='"+jsObj19.parroquiaChillanes[i].codigo+"'>"+jsObj19.parroquiaChillanes[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 371){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj20.parroquiaSjosetambo.length;i++){
                out+="<option value='"+jsObj20.parroquiaSjosetambo[i].codigo+"'>"+jsObj20.parroquiaSjosetambo[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
     if (recinto == 372){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj21.parroquiaSjchimbo.length;i++){
                out+="<option value='"+jsObj21.parroquiaSjchimbo[i].codigo+"'>"+jsObj21.parroquiaSjchimbo[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 373){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj22.parroquiaAsuncion.length;i++){
                out+="<option value='"+jsObj22.parroquiaAsuncion[i].codigo+"'>"+jsObj22.parroquiaAsuncion[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 375){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj23.parroquiaMagdalena.length;i++){
                out+="<option value='"+jsObj23.parroquiaMagdalena[i].codigo+"'>"+jsObj23.parroquiaMagdalena[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 376){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj24.parroquiaSsebastian.length;i++){
                out+="<option value='"+jsObj24.parroquiaSsebastian[i].codigo+"'>"+jsObj24.parroquiaSsebastian[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 377){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj25.parroquiaTelimbelas.length;i++){
                out+="<option value='"+jsObj25.parroquiaTelimbelas[i].codigo+"'>"+jsObj25.parroquiaTelimbelas[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 378){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj26.parroquiaEcheandia.length;i++){
                out+="<option value='"+jsObj26.parroquiaEcheandia[i].codigo+"'>"+jsObj26.parroquiaEcheandia[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 379){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj27.parroquiaSmiguel.length;i++){
                out+="<option value='"+jsObj27.parroquiaSmiguel[i].codigo+"'>"+jsObj27.parroquiaSmiguel[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 380){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj28.parroquiaBalzapamba.length;i++){
                out+="<option value='"+jsObj28.parroquiaBalzapamba[i].codigo+"'>"+jsObj28.parroquiaBalzapamba[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 381){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj29.parroquiaBilovan.length;i++){
                out+="<option value='"+jsObj29.parroquiaBilovan[i].codigo+"'>"+jsObj29.parroquiaBilovan[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 382){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj30.parroquiaRmora.length;i++){
                out+="<option value='"+jsObj30.parroquiaRmora[i].codigo+"'>"+jsObj30.parroquiaRmora[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 383){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj31.parroquiaSpablo.length;i++){
                out+="<option value='"+jsObj31.parroquiaSpablo[i].codigo+"'>"+jsObj31.parroquiaSpablo[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 384){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj32.parroquiaSantiago.length;i++){
                out+="<option value='"+jsObj32.parroquiaSantiago[i].codigo+"'>"+jsObj32.parroquiaSantiago[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 385){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj33.parroquiaSvicente.length;i++){
                out+="<option value='"+jsObj33.parroquiaSvicente[i].codigo+"'>"+jsObj33.parroquiaSvicente[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 386){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj34.parroquiaCaluma.length;i++){
                out+="<option value='"+jsObj34.parroquiaCaluma[i].codigo+"'>"+jsObj34.parroquiaCaluma[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 387){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj35.parroquiaMercedes.length;i++){
                out+="<option value='"+jsObj35.parroquiaMercedes[i].codigo+"'>"+jsObj35.parroquiaMercedes[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    if (recinto == 388){
    var out ="<select id='selJunta' name='selJunta' onchange='cargarJuntaDignidad()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<jsObj36.parroquiaLnaves.length;i++){
                out+="<option value='"+jsObj36.parroquiaLnaves[i].codigo+"'>"+jsObj36.parroquiaLnaves[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divRecinto").innerHTML= out;
    }
    
        
    }//cierre de funcion
    
    ///////////////////*****************Elegir el Canton**********//////////////////////////////
function cargarJuntaDignidad(){
      
      var comboJunta = "<select id='selJuntaCombo' name='selJuntaCombo' style='width:250px'>";
          comboJunta += "<option value='0'>Escoja una opción</option>";
          comboJunta += "<option value='1'>Junta 1 Masculino</option>";
          comboJunta += "<option value='2'>Junta 1 Femenino</option>";
          comboJunta += "<option value='3'>Junta 2 Masculino</option>";
          comboJunta += "<option value='4'>Junta 2 Femenino</option>";
          comboJunta += "<option value='5'>Junta 3 Masculino</option>";
          comboJunta += "<option value='6'>Junta 3 Femenino</option>";
          comboJunta += "<option value='7'>Junta 4 Masculino</option>";
          comboJunta += "<option value='8'>Junta 4 Femenino</option>";
          comboJunta += "<option value='9'>Junta 5 Masculino</option>";
          comboJunta += "<option value='10'>Junta 5 Femenino</option>";
          comboJunta += "<option value='11'>Junta 6 Masculino</option>";
          comboJunta += "<option value='12'>Junta 6 Femenino</option>";
          comboJunta += "<option value='13'>Junta 7 Masculino</option>";
          comboJunta += "<option value='14'>Junta 7 Femenino</option>";
          comboJunta += "<option value='15'>Junta 8 Masculino</option>";
          comboJunta += "<option value='16'>Junta 8 Femenino</option>";
          comboJunta += "<option value='17'>Junta 9 Masculino</option>";
          comboJunta += "<option value='18'>Junta 9 Femenino</option>";
          comboJunta += "<option value='19'>Junta 10 Masculino</option>";
          comboJunta += "<option value='20'>Junta 10 Femenino</option>";
          comboJunta += "<option value='21'>Junta 11 Masculino</option>";
          comboJunta += "<option value='22'>Junta 11 Femenino</option>";
          comboJunta += "<option value='23'>Junta 12 Masculino</option>";
          comboJunta += "<option value='24'>Junta 12 Femenino</option>";
          comboJunta +="</select>";
      document.getElementById("divJunta").innerHTML= comboJunta;
      
       var comboDignidad = "<select id='selDignidad' name='selDignidad' onchange='cargarDignidad()' style='width:250px'>";
          comboDignidad += "<option value='0'>Escoja una opción</option>";
          comboDignidad += "<option value='369'>Prefecto o Viceprefecto(a)</option>";
          comboDignidad += "<option value='370'>Alcaldes Municipales</option>";
          comboDignidad += "<option value='371'>Concejales Urbanos</option>";
          comboDignidad += "<option value='372'>Concejales Rurales</option>";
//          comboDignidad += "<option value='373'>Vocales de Junta Parroquial</option>";
          comboDignidad +="</select>";
      document.getElementById("divDignidad").innerHTML= comboDignidad;
    
        
    }//cierre funcioncargarDignidadReporte
/////////////////////////********Select Dignidades*********/////////////////////////////
    function cargarDignidad(){
        
        var dignidad = document.getElementById("selDignidad").value;
        var canton = document.getElementById("selCanton").value;
//        //////////////////********* Instanciacion de los Alcaldes Guaranda****////////////////        
    var jsonAlcadeg = '{"alcaldeGuaranda":['+
    '{"codigo":5,"nombre":"MAXIMILIANO GALLMEIER"},'+
    '{"codigo":6,"nombre":"INTI YUMBAY TARIS"},'+
    '{"codigo":7,"nombre":"JORGE ABEDRABBO"},'+
    '{"codigo":8,"nombre":"PATRICIO CAMACHO"},'+
    '{"codigo":9,"nombre":"WASHINGTON GUAMAN"},'+
    '{"codigo":10,"nombre":"GUSTAVO JARAMILLO"},'+
    '{"codigo":11,"nombre":"RAMSSES TORRESO"},'+
    '{"codigo":12,"nombre":"MARCELO BASANTES MOYANO"},'+
    '{"codigo":13,"nombre":"MEDARDO CHIMBOLEMA"},'+
    '{"codigo":14,"nombre":"RAMIRO SALTOS ARELLANO"},'+
    '{"codigo":15,"nombre":"GALO VASCONEZ DEL SALTO"}'+']}';
    //        //////////////////********* Instanciacion de los Alcaldes Chillanes****////////////////        
    var jsonAlcadeCh = '{"alcaldeChillanes":['+
    '{"codigo":30,"nombre":"WILIAN ANGULO"},'+
    '{"codigo":31,"nombre":"PEDRO ARIAS"},'+
    '{"codigo":32,"nombre":"ROLANDO COLINA"},'+
    '{"codigo":33,"nombre":"JHON PEREZ"},'+
    '{"codigo":34,"nombre":"JOSE SINCHE"},'+
    '{"codigo":35,"nombre":"ANGEL CALDERON"},'+
    '{"codigo":36,"nombre":"CARMITA NAUCIN"}'+']}';
    /        //////////////////********* Instanciacion de los Prefectos****////////////////        
    var jsonPrefectosg = '{"prefectosGuaranda":['+
    '{"codigo":1,"nombre":"WILLIAN MONTERO"},'+
    '{"codigo":2,"nombre":"VINICIO COLOMA"},'+
    '{"codigo":3,"nombre":"AURELIO CHACHA"},'+
    '{"codigo":4,"nombre":"ANIBAL CORONEL"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Urbanos****////////////////        
    var jsonConsejalesu = '{"concejalesUrbanosGuaranda":['+
    '{"codigo":66,"nombre":"CESAR ALFONSO CAMACHO"},'+
    '{"codigo":67,"nombre":"FREDDY ESPINOZA"},'+
    '{"codigo":68,"nombre":"MAGDALENA PILCO"},'+
    '{"codigo":69,"nombre":"JULIO ESCOBAR PEREZ"},'+
    '{"codigo":70,"nombre":"MARCELO CALLES"},'+
    '{"codigo":71,"nombre":"PEDRO COLES"},'+
    '{"codigo":72,"nombre":"FERNANDO GARCIA"},'+
    '{"codigo":73,"nombre":"CARLOS ALCIDES GUERRERO OCAMPO"},'+
    '{"codigo":74,"nombre":"ERNESTO CASTRO"},'+
    '{"codigo":75,"nombre":"MIGUEL RUIZ GUEVARA"},'+
    '{"codigo":76,"nombre":"SEGUNDO SANTAMARIA MOREJON"},'+
    '{"codigo":77,"nombre":"SANDRA ORTIZ"},'+
    '{"codigo":78,"nombre":"JUAN MANUEL GALARZA"},'+
    '{"codigo":79,"nombre":"OLGA PEREZ"},'+
    '{"codigo":80,"nombre":"ROSA URBANO"},'+
    '{"codigo":81,"nombre":"FERNANDO MENA"},'+
    '{"codigo":82,"nombre":"MAGALY SANCHEZ GALEAS"},'+
    '{"codigo":83,"nombre":"SILVIA GARCIA"},'+
    '{"codigo":84,"nombre":"DELIDA AVEROS"},'+
    '{"codigo":85,"nombre":"VANESSA MARIDUEÑA"},'+
    '{"codigo":86,"nombre":"GLENDA MARISELA ESTRADA AROCA"},'+
    '{"codigo":87,"nombre":"TANIA POVEDA"},'+
    '{"codigo":88,"nombre":"EMILY LLUMITAXI"},'+
    '{"codigo":89,"nombre":"CARMEN SANTAMARIA MOREJON"},'+
    '{"codigo":90,"nombre":"WILSON DEL POZO"},'+
    '{"codigo":91,"nombre":"ROSA ROCHINA BAYAS"},'+
    '{"codigo":92,"nombre":"WALTER DURAN"},'+
    '{"codigo":93,"nombre":"AUGUSTO GONZALEZ"},'+
    '{"codigo":94,"nombre":"ELIANA GONZALEZ"},'+
    '{"codigo":95,"nombre":"DIEGO SISALEMA SERRANO"},'+
    '{"codigo":96,"nombre":"ANGEL REA"},'+
    '{"codigo":97,"nombre":"ALBERTO GUAMAN"},'+
    '{"codigo":98,"nombre":"OVIDIO PATIN"},'+
    '{"codigo":99,"nombre":"LENIN ADOLFO SANCHEZ ORTIZ"},'+
    '{"codigo":100,"nombre":"CARLOS SOLANO"},'+
    '{"codigo":101,"nombre":"VICTOR ESPINOZA"},'+
    '{"codigo":102,"nombre":"JAIME CAMACHO BONILLA"},'+
    '{"codigo":103,"nombre":"ALICIA CHELA RAMIREZ"},'+
    '{"codigo":104,"nombre":"NAPOLEON MANOBANDA"},'+
    '{"codigo":105,"nombre":"LUZ AMERICA CHIMBO"},'+
    '{"codigo":106,"nombre":"FERNANDA BARRIONUEVO"},'+
    '{"codigo":107,"nombre":"MIGUEL POZO"},'+
    '{"codigo":108,"nombre":"CINTYA COBO CHIMBO"},'+
    '{"codigo":109,"nombre":"ADRIANA FIERRO"},'+
    '{"codigo":110,"nombre":"YOLANDA ALARCON"},'+
    '{"codigo":111,"nombre":"MARIA JOSE GARCIA"},'+
    '{"codigo":112,"nombre":"NORMA ALICIA PILAMUNGA MENDOZA"},'+
    '{"codigo":113,"nombre":"ANDREA GAIBOR"},'+
    '{"codigo":114,"nombre":"JESSICA PATIN SISA"},'+
    '{"codigo":115,"nombre":"MARIA YANEZ ALVAREZ"},'+
    '{"codigo":116,"nombre":"MARIANA DE JESUS DE LA CRUZ"},'+
    '{"codigo":117,"nombre":"CARLOS MARCELO POMA BARRAGAN"}'+']}';
//        //////////////////********* Instanciacion de los Concejales Urbanos****////////////////        
    var jsonConsejalesr = '{"concejalesRuralesGuaranda":['+
    '{"codigo":325,"nombre":"WILLIAM CHELA"},'+
    '{"codigo":326,"nombre":"OSWALDO REA"},'+
    '{"codigo":327,"nombre":"RODRIGO BASTIDAS"},'+
    '{"codigo":328,"nombre":"GEOVANNY PAZMIÑO"},'+
    '{"codigo":329,"nombre":"RAUL CABRERA"},'+
    '{"codigo":330,"nombre":"NORMA TENELEMA"},'+
    '{"codigo":331,"nombre":"JULIO AYME"},'+
    '{"codigo":332,"nombre":"DOMENICA ORTEGA"},'+
    '{"codigo":333,"nombre":"NORMA ARGUELLO"},'+
    '{"codigo":334,"nombre":"LIDA AYME"},'+
    '{"codigo":335,"nombre":"DIANA GARCIA"},'+
    '{"codigo":336,"nombre":"MARIA TENELEMA"},'+
    '{"codigo":337,"nombre":"ROSALBA GUAMAN"},'+
    '{"codigo":338,"nombre":"MERCEDES REA"},'+
    '{"codigo":339,"nombre":"NESTOR VISTIN"},'+
    '{"codigo":340,"nombre":"MARCIA POVEDA"},'+
    '{"codigo":341,"nombre":"PATRICIO ACOSTA"},'+
    '{"codigo":342,"nombre":"HOLGER BORJA"},'+
    '{"codigo":343,"nombre":"OLMEDO ZAPATA"},'+
    '{"codigo":344,"nombre":"MARCO SANTAMARIA"},'+
    '{"codigo":345,"nombre":"ANGEL MANOBANDA"},'+
    '{"codigo":346,"nombre":"WILSON CORONEL"},'+
    '{"codigo":347,"nombre":"HUGO TOALOMBO"},'+
    '{"codigo":348,"nombre":"JESSICA ACURIO"},'+
    '{"codigo":349,"nombre":"MESIAS CORDOVA"},'+
    '{"codigo":350,"nombre":"RUTH PEREZ"},'+
    '{"codigo":351,"nombre":"YAJAIRA PILAMUNGA CHIMBORAZO"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Urbanos****////////////////        
    var jsonConsejalesuch = '{"concejalesUrbanasChillanes":['+
    '{"codigo":146,"nombre":"MENTOR HUILCA"},'+
    '{"codigo":147,"nombre":"EDUARDO QUINATOA"},'+
    '{"codigo":148,"nombre":"ANA MARIA EGAS VELASCO"},'+
    '{"codigo":149,"nombre":"SANDY VINUEZA"},'+
    '{"codigo":150,"nombre":"RAMIRO TRUJILLO"},'+
    '{"codigo":151,"nombre":"REINALDO GALLEGOS"},'+
    '{"codigo":152,"nombre":"TANIA PAZMIÑO"},'+
    '{"codigo":153,"nombre":"JESSICA PEÑAFIEL"},'+
    '{"codigo":154,"nombre":"MANUEL AYALA"},'+
    '{"codigo":155,"nombre":"ANGELA CEVALLOS"},'+
    '{"codigo":156,"nombre":"CARMEN CHACHA"},'+
    '{"codigo":157,"nombre":"VERONICA CEVALLOS"},'+
    '{"codigo":158,"nombre":"VINICIO CEVALLOS"},'+
    '{"codigo":159,"nombre":"JOSE CANDO"},'+
    '{"codigo":160,"nombre":"YOLANDA CHACHA SALTOS"},'+
    '{"codigo":161,"nombre":"HERNAN TUMAILLA"},'+
    '{"codigo":162,"nombre":"CESAR ARGUELLO"},'+
    '{"codigo":163,"nombre":"DANIEL LLANOS"},'+
    '{"codigo":164,"nombre":"ANA BELEN MOYANO"},'+
    '{"codigo":165,"nombre":"MIRIAN CEVALLOS"},'+
    '{"codigo":166,"nombre":"ANGEL YAUCAN VILLACRES"},'+
    '{"codigo":167,"nombre":"MARTHA GAVILANES"},'+
    '{"codigo":168,"nombre":"MARGORY ESPINOZA"},'+
    '{"codigo":169,"nombre":"DEYSI MOYANO"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Rurales****////////////////        
    var jsonConsejalesrch = '{"concejalesRuralesChillanes":['+
    '{"codigo":385,"nombre":"WILSON SALAZAR"},'+
    '{"codigo":386,"nombre":"IGNACIO BORJA AVILES"},'+
    '{"codigo":387,"nombre":"CEBERO MIÑO"},'+
    '{"codigo":388,"nombre":"GILBERTO TROYA"},'+
    '{"codigo":389,"nombre":"CONCHITA COLINA"},'+
    '{"codigo":390,"nombre":"JUAN FREIRE"}'+']}';
    //        //////////////////********* Instanciacion de los Alcaldes Chimbo****////////////////        
    var jsonAlcadeChim = '{"alcaldeChimbo":['+
    '{"codigo":16,"nombre":"HUGO LARA"},'+
    '{"codigo":17,"nombre":"CESAR VELOZ CEVALLOS"},'+
    '{"codigo":18,"nombre":"LUIS ALFREDO PRADO VELASQUEZ"},'+
    '{"codigo":19,"nombre":"ROBERTO SIERRA"},'+
    '{"codigo":20,"nombre":"GRACIELA PEPE GUILCAPI"},'+
    '{"codigo":21,"nombre":"BYRON BOSQUEZ"},'+
    '{"codigo":22,"nombre":"NIVARDO OCAÑA"},'+
    '{"codigo":23,"nombre":"PATRICIO SILVA"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Urbanos Chimbo****////////////////        
    var jsonConsejalesUrbChimbo = '{"consejalesUrbanosChimbo":['+
    '{"codigo":118,"nombre":"LUIS JACOME"},'+
    '{"codigo":119,"nombre":"MANUEL MESIAS ALLAN BAÑO"},'+
    '{"codigo":120,"nombre":"DERMA ROMERO"},'+
    '{"codigo":121,"nombre":"FREDY ALBIÑO"},'+
    '{"codigo":122,"nombre":"MARCO VERDEZOTO"},'+
    '{"codigo":123,"nombre":"EDWIN ALBIÑO"},'+
    '{"codigo":124,"nombre":"ANGEL RODRIGO LEMA"},'+
    '{"codigo":125,"nombre":"CONSUELO LOPEZ BENAVIDES"},'+
    '{"codigo":126,"nombre":"EMMA JIMENEZ ROLDAN"},'+
    '{"codigo":127,"nombre":"IVAN JORGGE"},'+
    '{"codigo":128,"nombre":"LORENA GAROFALO"},'+
    '{"codigo":129,"nombre":"LUZ TARIS"},'+
    '{"codigo":130,"nombre":"LETICIA MORETA"},'+
    '{"codigo":131,"nombre":"CARLITA SANTILLAN"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Rural Chimbo ****////////////////        
    var jsonConsejalesRurChimbo = '{"consejalesRuralesChimbo":['+
    '{"codigo":352,"nombre":"WILIAN GABILANES"},'+
    '{"codigo":353,"nombre":"MEDARDO RODRIGO REA DURANGO"},'+
    '{"codigo":354,"nombre":"JHONNY ACURIO"},'+
    '{"codigo":355,"nombre":"OSWALDO CHAVEZ"},'+
    '{"codigo":356,"nombre":"MIGUEL VEGA"},'+
    '{"codigo":357,"nombre":"RODRIGO NAVAS"},'+
    '{"codigo":358,"nombre":"SILVERIO ABRAHAN HINOJOSA"},'+
    '{"codigo":359,"nombre":"PATRICIA SANCHEZ GARCIA"},'+
    '{"codigo":360,"nombre":"MARITZA NATIVIDAD SANTILLAN"},'+
    '{"codigo":361,"nombre":"YOLANDA VARGAS"},'+
    '{"codigo":362,"nombre":"ZOILA QUIROZ"},'+
    '{"codigo":363,"nombre":"VERONICA QUINTANA"},'+
    '{"codigo":364,"nombre":"DENNIS LLANOS"},'+
    '{"codigo":365,"nombre":"GRETA DEL CARMEN QUINTANA"},'+
    '{"codigo":366,"nombre":"RENE VAICILLA"},'+
    '{"codigo":367,"nombre":"DUBAL ACURIO"},'+
    '{"codigo":368,"nombre":"EDWIN BECERRA"},'+
    '{"codigo":369,"nombre":"BLADIMIRO GARCIA"},'+
    '{"codigo":370,"nombre":"FRANKLIN YANEZ"},'+
    '{"codigo":371,"nombre":"MARCOS MULLO"},'+
    '{"codigo":372,"nombre":"ALONSO ELI GAROFALO GARCIA"}'+']}';
    //        //////////////////********* Instanciacion de los Alcaldes Chimbo****////////////////        
    var jsonAlcadeEcheandia = '{"alcaldeEcheandia":['+
    '{"codigo":37,"nombre":"ANGEL ROCHINA"},'+
    '{"codigo":38,"nombre":"FERNANDO CHANGO"},'+
    '{"codigo":39,"nombre":"PATRICIO ESCUDERO"},'+
    '{"codigo":40,"nombre":"MARCOS GUAMAN CARVAJAL"},'+
    '{"codigo":41,"nombre":"HUGO HIDALGO"},'+
    '{"codigo":42,"nombre":"ELVIO HIDALGO VISCARRA"},'+
    '{"codigo":43,"nombre":"CARLOS COLOMA"},'+
    '{"codigo":44,"nombre":"WILLIAM VISCARRA"},'+
    '{"codigo":45,"nombre":"PEDRO SISA"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Urbanos Echeandia****////////////////        
    var jsonConsejalesUrbanosEcheandia = '{"concejalesUrbanosEcheandia":['+
    '{"codigo":170,"nombre":"JOSE NOBOA"},'+
    '{"codigo":171,"nombre":"JOSELITO REAL"},'+
    '{"codigo":172,"nombre":"WILLIAM MINAYA"},'+
    '{"codigo":173,"nombre":"VICENTE CHANGO CAYAMBE"},'+
    '{"codigo":174,"nombre":"JOSE AUMALA"},'+
    '{"codigo":175,"nombre":"DIMAS LARA"},'+
    '{"codigo":176,"nombre":"FREDIN NUÑEZ"},'+
    '{"codigo":177,"nombre":"MAXTELY ALARCON"},'+
    '{"codigo":178,"nombre":"JOSE VALLEJO"},'+
    '{"codigo":179,"nombre":"VICTOR ISMAEL PAREDES"},'+
    '{"codigo":180,"nombre":"LIGIA GUERRERO"},'+
    '{"codigo":181,"nombre":"NELLY REA"},'+
    '{"codigo":182,"nombre":"JANETH VACA"},'+
    '{"codigo":183,"nombre":"RUTH NARANJO ILLANES"},'+
    '{"codigo":184,"nombre":"LEIDY ROBALINO"},'+
    '{"codigo":185,"nombre":"OFELIA URBANA VITERI"},'+
    '{"codigo":186,"nombre":"GICELA VISCARRA"},'+
    '{"codigo":187,"nombre":"DORA VEGA"},'+
    '{"codigo":188,"nombre":"NELY PICO"},'+
    '{"codigo":189,"nombre":"GRISELDA GARDENIA GALARZA"},'+
    '{"codigo":190,"nombre":"LUIS ESCUDERO"},'+
    '{"codigo":191,"nombre":"JOAN CARLOS IPIALES"},'+
    '{"codigo":192,"nombre":"WILSON GARCIA"},'+
    '{"codigo":193,"nombre":"KENNEDI ANDRADE SISALEMA"},'+
    '{"codigo":194,"nombre":"SEGUNDO MUÑOZ"},'+
    '{"codigo":195,"nombre":"LUIS SALAZAR"},'+
    '{"codigo":196,"nombre":"VINICIO LARA"},'+
    '{"codigo":197,"nombre":"SEBASTIAN BONILLA"},'+
    '{"codigo":198,"nombre":"NOE RUBEN ERAZO"},'+
    '{"codigo":199,"nombre":"GALO RIERA PONCE"},'+
    '{"codigo":200,"nombre":"CECILIA MUÑOZ"},'+
    '{"codigo":201,"nombre":"KARINA ALDAZ"},'+
    '{"codigo":202,"nombre":"INES MONAR"},'+
    '{"codigo":203,"nombre":"ALEXANDRA ZURITA CADENA"},'+
    '{"codigo":204,"nombre":"NORAINE JACOME"},'+
    '{"codigo":205,"nombre":"JESSICA LARA"},'+
    '{"codigo":206,"nombre":"LASTENIA COLOMA"},'+
    '{"codigo":207,"nombre":"SHIRLEY LLUMITAXI"},'+
    '{"codigo":208,"nombre":"YOLANDA MARILU CONDOR"},'+
    '{"codigo":209,"nombre":"ELSA DOLORES BORJA"},'+
    '{"codigo":210,"nombre":"DIEGO CARVAJAL"},'+
    '{"codigo":211,"nombre":"CESAR MATZA"},'+
    '{"codigo":212,"nombre":"MARCELO ARELLANO"},'+
    '{"codigo":213,"nombre":"CLAUDIO POVEDA GUZMAN"},'+
    '{"codigo":214,"nombre":"JULIO VISCARRA"},'+
    '{"codigo":215,"nombre":"JOHN LEON"},'+
    '{"codigo":216,"nombre":"JIMMY SOLIZ"},'+
    '{"codigo":217,"nombre":"RICHAR SEVILLA"},'+
    '{"codigo":218,"nombre":"JAVIER JESUS JIMENEZ"},'+
    '{"codigo":219,"nombre":"JOFFRE ESTRADA"}'+']}';
    //        //////////////////********* Instanciacion de los Alcaldes San Miguel****////////////////        
    var jsonAlcadeSanmiguel = '{"alcaldeSanmiguel":['+
    '{"codigo":24,"nombre":"STALIN CARRASCO"},'+
    '{"codigo":25,"nombre":"RAUL JACOME"},'+
    '{"codigo":26,"nombre":"SIMON YANEZ"},'+
    '{"codigo":27,"nombre":"RAFAEL BARZALLO"},'+
    '{"codigo":28,"nombre":"LIBERTY BALLADARES PAZMIÑO"},'+
    '{"codigo":29,"nombre":"CESAR AUGUSTO MONCAYO NARANJO"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Urbanos San Miguel ****////////////////        
    var jsonConsejalesUrbSanmiguel = '{"consejalesUrbanosSanmiguel":['+
    '{"codigo":132,"nombre":"LORENA VILLENA"},'+
    '{"codigo":133,"nombre":"KONRAD MORA"},'+
    '{"codigo":134,"nombre":"LENIN BARRAGAN"},'+
    '{"codigo":135,"nombre":"CRISTHIAN JARRIN"},'+
    '{"codigo":136,"nombre":"ANTONIO FLORES"},'+
    '{"codigo":137,"nombre":"ISRAEL FLORES"},'+
    '{"codigo":138,"nombre":"NERI NARANJO"},'+
    '{"codigo":139,"nombre":"BORYS LOPEZ"},'+
    '{"codigo":140,"nombre":"RITA CARRASCO"},'+
    '{"codigo":141,"nombre":"CARMITA ESPINOZA"},'+
    '{"codigo":142,"nombre":"MARIA DE MORA"},'+
    '{"codigo":143,"nombre":"PATRICIA GAIBOR"},'+
    '{"codigo":144,"nombre":"ALEXANDRA MACHADO"},'+
    '{"codigo":145,"nombre":"SEGUNDO HERMOZA"}'+']}';
     //        //////////////////********* Instanciacion de los Concejales Rurales San Miguel ****////////////////        
    var jsonConsejalesRurSanmiguel = '{"consejalesRuralSanmiguel":['+
    '{"codigo":373,"nombre":"MARCO DOMINGUEZ"},'+
    '{"codigo":374,"nombre":"ANGEL SERAFIN ROMERO SANCHEZ"},'+
    '{"codigo":375,"nombre":"NERBO DOMINGUEZ"},'+
    '{"codigo":376,"nombre":"LUIS GONZALEZ"},'+
    '{"codigo":377,"nombre":"SILVIA VERDEZOTO"},'+
    '{"codigo":378,"nombre":"JULIETA MARIA SALAZAR RAMOS"},'+
    '{"codigo":379,"nombre":"GLORIA MONTERO"},'+
    '{"codigo":380,"nombre":"MARIBEL PUENTE"},'+
    '{"codigo":381,"nombre":"LENIN COLOMA"},'+
    '{"codigo":382,"nombre":"JOVANI FABRICIO PAZMIÑO MONAR"},'+
    '{"codigo":383,"nombre":"JORGE MONTERO"},'+
    '{"codigo":384,"nombre":"CARLOS MATUTE"}'+']}';
     //        //////////////////********* Instanciacion de los Alcaldes Caluma ****////////////////        
    var jsonAlcaldesCaluma = '{"alcaldesCaluma":['+
    '{"codigo":46,"nombre":"ANGEL UFREDO SUAREZ GARCIA"},'+
    '{"codigo":47,"nombre":"HUGO ARIAS"},'+
    '{"codigo":48,"nombre":"MIGUEL MALDONADO BRAVO"},'+
    '{"codigo":49,"nombre":"POMERIO GAROFALO MENDOZA"},'+
    '{"codigo":50,"nombre":"DANNY AVEROS"},'+
    '{"codigo":51,"nombre":"ANGEL PACHALA"},'+
    '{"codigo":52,"nombre":"MAURO TOAPANTA"},'+
    '{"codigo":53,"nombre":"RUPERTO NARVAEZ MENDOZA"},'+
    '{"codigo":54,"nombre":"CLAUDIA SANCHEZ SANCHEZ"},'+
    '{"codigo":55,"nombre":"JUAN VELASTEGUI"},'+
    '{"codigo":56,"nombre":"MOISES CARRERA"}'+']}';
    
    //        //////////////////********* Instanciacion de los Concejales Urbanos Echeandia****////////////////        
    var jsonConsejalesUrbanosCaluma= '{"concejalesUrbanosCaluma":['+
    '{"codigo":220,"nombre":"MESIAS BAÑOS ROJAS"},'+
    '{"codigo":221,"nombre":"DIANA AGUIAR"},'+
    '{"codigo":222,"nombre":"CARLOS PALOMEQUE LOZANO"},'+
    '{"codigo":223,"nombre":"MARCO BRAVO"},'+
    '{"codigo":224,"nombre":"ROBERTH RIVERA"},'+
    '{"codigo":225,"nombre":"JORGE VERDEZOTO"},'+
    '{"codigo":226,"nombre":"WILMER ESTRADA QUINTANILLA"},'+
    '{"codigo":227,"nombre":"JOREL ROMERO"},'+
    '{"codigo":228,"nombre":"CARLA VEGA"},'+
    '{"codigo":229,"nombre":"CARLOS MORILLO"},'+
    '{"codigo":230,"nombre":"MAURO JAVIER CASTILLO VISCARRA"},'+
    '{"codigo":231,"nombre":"MARITZA GUZMAN NUÑEZ"},'+
    '{"codigo":232,"nombre":"RUVEN RECALDE"},'+
    '{"codigo":233,"nombre":"ESTELA ESCOBAR GAVILANES"},'+
    '{"codigo":234,"nombre":"GINA JARAMILLO"},'+
    '{"codigo":235,"nombre":"ROSA MOROCHO"},'+
    '{"codigo":236,"nombre":"NERY MENDOZA"},'+
    '{"codigo":237,"nombre":"SARA PAZMIÑO CHASQUE"},'+
    '{"codigo":238,"nombre":"ALICIA PEÑA SANTILLAN"},'+
    '{"codigo":239,"nombre":"JIMMY ESPIN"},'+
    '{"codigo":240,"nombre":"SILVIA GALLEGOS"},'+
    '{"codigo":241,"nombre":"ESTHELA MONTERO BAZANTES"},'+
    '{"codigo":242,"nombre":"JAIME GARCIA DEL POZO"},'+
    '{"codigo":243,"nombre":"SILVANA ROSERO"},'+
    '{"codigo":244,"nombre":"LENIN PROAÑO VEGA"},'+
    '{"codigo":245,"nombre":"RAUL GUASTAY"},'+
    '{"codigo":246,"nombre":"EDWIN GARCIA"},'+
    '{"codigo":247,"nombre":"KLEVER MAYORGA"},'+
    '{"codigo":248,"nombre":"FREDY GUZMAN CAMACHO"},'+
    '{"codigo":249,"nombre":"MARTIN SAGNAI MONAR"},'+
    '{"codigo":250,"nombre":"SILVANA MANTILLA"},'+
    '{"codigo":251,"nombre":"HOLMES LEMA"},'+
    '{"codigo":252,"nombre":"VICENTE FERMIN SANCHEZ ZAPATA"},'+
    '{"codigo":253,"nombre":"ALEJANDRA ERAZO ARGUELLO"},'+
    '{"codigo":254,"nombre":"RAFAEL GARCIA"},'+
    '{"codigo":255,"nombre":"BETTY ARGUELLO CASTRO"},'+
    '{"codigo":256,"nombre":"REBECA NUÑEZ"},'+
    '{"codigo":257,"nombre":"PATRICIA HIDALGO"},'+
    '{"codigo":258,"nombre":"ROSA ALDAZ SALTOS"},'+
    '{"codigo":259,"nombre":"MARGARITA LONDO LONDO"},'+
    '{"codigo":260,"nombre":"MARIA ELENA GUERRERO GUILLEN"},'+
    '{"codigo":261,"nombre":"MARIO LLANOS"},'+
    '{"codigo":262,"nombre":"RUTH LONDO"},'+
    '{"codigo":263,"nombre":"CECILIA ALEXANDRA PACHECO"},'+
    '{"codigo":264,"nombre":"JAIME ESPIN POZO"},'+
    '{"codigo":265,"nombre":"SANDRA RIERA"},'+
    '{"codigo":266,"nombre":"LUIS ROCA SUAREZ"},'+
    '{"codigo":267,"nombre":"WUILGER RIVERA"},'+
    '{"codigo":268,"nombre":"NELSON CISNEROS"},'+
    '{"codigo":269,"nombre":"WUALTER VERDEZOTO"},'+
    '{"codigo":270,"nombre":"CARLOS ISIDRO YANEZ GAYBOR"},'+
    '{"codigo":271,"nombre":"ANGEL ARNULFO GUERRERO"},'+
    '{"codigo":272,"nombre":"MARLENE GUAMBUGUETE"},'+
    '{"codigo":273,"nombre":"FREDDY PAREDES"},'+
    '{"codigo":274,"nombre":"JOEL BAYARDO MORAN CAMACHO"}'+']}';
     //        //////////////////********* Instanciacion de los Alcaldes Las Naves ****////////////////        
    var jsonAlcaldesNaves = '{"alcaldesLasnaves":['+
    '{"codigo":57,"nombre":"OSWALDO PEÑALOZA"},'+
    '{"codigo":58,"nombre":"OTILIA CAROLINA ALDAZ PACHECO"},'+
    '{"codigo":59,"nombre":"GALO ROMERO"},'+
    '{"codigo":60,"nombre":"LUIS ULLOA"},'+
    '{"codigo":61,"nombre":"MILTON SANCHEZ MORAN"},'+
    '{"codigo":62,"nombre":"FAUSTO ZUÑIGA RECALDE"},'+
    '{"codigo":63,"nombre":"DANIEL SISA MANCERO"},'+
    '{"codigo":64,"nombre":"CYNTHIA SOLANO"},'+
    '{"codigo":65,"nombre":"LORENZO RAMIREZ"}'+']}';
    //        //////////////////********* Instanciacion de los Concejales Urbanos Las Naves****////////////////        
    var jsonConsejalesUrbanosLasnaves= '{"concejalesUrbanosLasnaves":['+
    '{"codigo":275,"nombre":"GUILLERMO PEREZ"},'+
    '{"codigo":276,"nombre":"DARWIN HERNAN GAIBOR NARANJO"},'+
    '{"codigo":277,"nombre":"ADAN GARCIA"},'+
    '{"codigo":278,"nombre":"PATRICIA GIL"},'+
    '{"codigo":279,"nombre":"FREDY MONTERO MONAR"},'+
    '{"codigo":280,"nombre":"LUIS VERA"},'+
    '{"codigo":281,"nombre":"RACHID BUCHEIN"},'+
    '{"codigo":282,"nombre":"NARCISA RODRIGUEZ"},'+
    '{"codigo":283,"nombre":"OSWALDO CASTILLO"},'+
    '{"codigo":284,"nombre":"ILDA AGUILA"},'+
    '{"codigo":285,"nombre":"MAYDA VARGAS"},'+
    '{"codigo":286,"nombre":"MONICA SILBINA MORETA ABRIL"},'+
    '{"codigo":287,"nombre":"YADIRA ESPIN"},'+
    '{"codigo":288,"nombre":"JACINTO ESPIN"},'+
    '{"codigo":289,"nombre":"KARINA SEGURA MESTANZA"},'+
    '{"codigo":290,"nombre":"NANCY SILVA"},'+
    '{"codigo":291,"nombre":"NEXY GARCIA"},'+
    '{"codigo":292,"nombre":"BOLIVAR CASTRO"},'+
    '{"codigo":293,"nombre":"JUINA CALBERTO"},'+
    '{"codigo":294,"nombre":"WILTON VERDEZOTO"},'+
    '{"codigo":295,"nombre":"WILSON CASTILLO"},'+
    '{"codigo":296,"nombre":"LUIS GERARDO IBARRA TAPIA"},'+
    '{"codigo":297,"nombre":"VENANCIO MAGALLON"},'+
    '{"codigo":298,"nombre":"ADELA PEÑALOZA"},'+
    '{"codigo":299,"nombre":"WILBER CALDERON VILLAFUERTE"},'+
    '{"codigo":300,"nombre":"ANGEL COELLO"},'+
    '{"codigo":301,"nombre":"GUILLERMO SALTOS"},'+
    '{"codigo":302,"nombre":"AMABLE JIMENEZ"},'+
    '{"codigo":303,"nombre":"JORGE VILLACRES"},'+
    '{"codigo":304,"nombre":"ROSA NARANJO"},'+
    '{"codigo":305,"nombre":"DEYSY COLES"},'+
    '{"codigo":306,"nombre":"CINTHYA MICHELLE GIL VILLACRES"},'+
    '{"codigo":307,"nombre":"MARIA TACLE"},'+
    '{"codigo":308,"nombre":"GENARO LUCIO"},'+
    '{"codigo":309,"nombre":"LEIDY QUINGAGUANO ROBAYO"},'+
    '{"codigo":310,"nombre":"KAREN YEPEZ"},'+
    '{"codigo":311,"nombre":"DIANA CALDERON"},'+
    '{"codigo":312,"nombre":"FAUSTO ARECHUA"},'+
    '{"codigo":313,"nombre":"CINDY PACHECO"},'+
    '{"codigo":314,"nombre":"NELSON YANEZ"},'+
    '{"codigo":315,"nombre":"ORLANDO CONTRERAS"},'+
    '{"codigo":316,"nombre":"JOSELITO EDUARDO BOSQUEZ"},'+
    '{"codigo":317,"nombre":"LIZARDO FIGUEROA"},'+
    '{"codigo":318,"nombre":"DIANA ESPINOZA"},'+
    '{"codigo":319,"nombre":"RICHART URBINA LINARES"},'+
    '{"codigo":320,"nombre":"EDUARDO CORRALES"},'+
    '{"codigo":321,"nombre":"IVAN RUIZ"},'+
    '{"codigo":322,"nombre":"ROSA GIL"},'+
    '{"codigo":323,"nombre":"RAMIRO GAVILANEZ"},'+
    '{"codigo":324,"nombre":"YOLANDA YANEZ"}'+']}';
//    //////////////*******************Json Dignidades*****************////////////////////////////

    var jsObj1 = JSON.parse(jsonAlcadeg);
    var jsObj2 = JSON.parse(jsonPrefectosg);
    var jsObj3 = JSON.parse(jsonConsejalesu);
    var jsObj4 = JSON.parse(jsonConsejalesr);
    var jsObj5 = JSON.parse(jsonAlcadeCh);
    var jsObj6 = JSON.parse(jsonConsejalesuch);
    var jsObj7 = JSON.parse(jsonConsejalesrch);
    var jsObj8 = JSON.parse(jsonAlcadeChim);
    var jsObj9 = JSON.parse(jsonConsejalesUrbChimbo);
    var jsObj10 = JSON.parse(jsonConsejalesRurChimbo);
    var jsObj11 = JSON.parse(jsonAlcadeEcheandia);
    var jsObj12 = JSON.parse(jsonConsejalesUrbanosEcheandia);
    var jsObj13 = JSON.parse(jsonAlcadeSanmiguel);
    var jsObj14 = JSON.parse(jsonConsejalesUrbSanmiguel);
    var jsObj15 = JSON.parse(jsonConsejalesRurSanmiguel);
    var jsObj16 = JSON.parse(jsonAlcaldesCaluma);
    var jsObj17 = JSON.parse(jsonConsejalesUrbanosCaluma);  
    var jsObj18 = JSON.parse(jsonAlcaldesNaves);
    var jsObj19 = JSON.parse(jsonConsejalesUrbanosLasnaves);
        if (dignidad == 369 && (canton == 43 || canton == 44 || canton == 45 || canton == 46 || canton == 47 || canton == 48 || canton == 49)){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj2.prefectosGuaranda.length+"' size='5'/>";
            for(i=0;i<jsObj2.prefectosGuaranda.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj2.prefectosGuaranda[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj2.prefectosGuaranda[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj2.prefectosGuaranda[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";        
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
        if (dignidad == 370 && canton == 43){
            var html = "";
            html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj1.alcaldeGuaranda.length+"' size='5'/>";
            for(i=0;i<jsObj1.alcaldeGuaranda.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj1.alcaldeGuaranda[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj1.alcaldeGuaranda[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj1.alcaldeGuaranda[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";   
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
        if (dignidad == 371 && canton == 43){ 
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj3.concejalesUrbanosGuaranda.length+"' size='5'/>";
            for(i=0;i<jsObj3.concejalesUrbanosGuaranda.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj3.concejalesUrbanosGuaranda[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj3.concejalesUrbanosGuaranda[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj3.concejalesUrbanosGuaranda[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";           
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }  
        if (dignidad == 372 && canton == 43){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj4.concejalesRuralesGuaranda[i].nombre+"' size='5'/>";
            for(i=0;i<jsObj4.concejalesRuralesGuaranda.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj4.concejalesRuralesGuaranda[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj4.concejalesRuralesGuaranda[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj4.concejalesRuralesGuaranda[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>"; 
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }  
           if (dignidad == 370 && canton == 44){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj5.alcaldeChillanes.length+"' size='5'/>";
            for(i=0;i<jsObj5.alcaldeChillanes.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj5.alcaldeChillanes[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj5.alcaldeChillanes[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj5.alcaldeChillanes[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";           
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 371 && canton == 44){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj6.concejalesUrbanasChillanes.length+"' size='5'/>";
            for(i=0;i<jsObj6.concejalesUrbanasChillanes.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj6.concejalesUrbanasChillanes[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj6.concejalesUrbanasChillanes[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj6.concejalesUrbanasChillanes[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }  
           if (dignidad == 372 && canton == 44){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj7.concejalesRuralesChillanes.length+"' size='5'/>";
            for(i=0;i<jsObj7.concejalesRuralesChillanes.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj7.concejalesRuralesChillanes[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj7.concejalesRuralesChillanes[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj7.concejalesRuralesChillanes[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";          
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 370 && canton == 45){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj8.alcaldeChimbo.length+"' size='5'/>";
            for(i=0;i<jsObj8.alcaldeChimbo.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj8.alcaldeChimbo[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj8.alcaldeChimbo[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj8.alcaldeChimbo[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";          
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 371 && canton == 45){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj9.consejalesUrbanosChimbo.length+"' size='5'/>";
            for(i=0;i<jsObj9.consejalesUrbanosChimbo.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj9.consejalesUrbanosChimbo[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj9.consejalesUrbanosChimbo[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj9.consejalesUrbanosChimbo[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
       
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }  
           if (dignidad == 372 && canton == 45){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj10.consejalesRuralesChimbo.length+"' size='5'/>";
            for(i=0;i<jsObj10.consejalesRuralesChimbo.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj10.consejalesRuralesChimbo[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj10.consejalesRuralesChimbo[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj10.consejalesRuralesChimbo[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 370 && canton == 46){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj11.alcaldeEcheandia.length+"' size='5'/>";
            for(i=0;i<jsObj11.alcaldeEcheandia.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj11.alcaldeEcheandia[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj11.alcaldeEcheandia[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj11.alcaldeEcheandia[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 371 && canton == 46){
            var html = "";
                html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj12.concejalesUrbanosEcheandia.length+"' size='5'/>";
            for(i=0;i<jsObj12.concejalesUrbanosEcheandia.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj12.concejalesUrbanosEcheandia[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj12.concejalesUrbanosEcheandia[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj12.concejalesUrbanosEcheandia[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }  
           if (dignidad == 370 && canton == 47){
            var html = "";
             html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj13.alcaldeSanmiguel.length+"' size='5'/>";
            for(i=0;i<jsObj13.alcaldeSanmiguel.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj13.alcaldeSanmiguel[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj13.alcaldeSanmiguel[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj13.alcaldeSanmiguel[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 371 && canton == 47){
            var html = "";
             html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj14.consejalesUrbanosSanmiguel.length+"' size='5'/>";
            for(i=0;i<jsObj14.consejalesUrbanosSanmiguel.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj14.consejalesUrbanosSanmiguel[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj14.consejalesUrbanosSanmiguel[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj14.consejalesUrbanosSanmiguel[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 372 && canton == 47){
            var html = "";
             html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj15.consejalesRuralSanmiguel.length+"' size='5'/>";
            for(i=0;i<jsObj15.consejalesRuralSanmiguel.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj15.consejalesRuralSanmiguel[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj15.consejalesRuralSanmiguel[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj15.consejalesRuralSanmiguel[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 370 && canton == 48){
            var html = "";
             html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj16.alcaldesCaluma.length+"' size='5'/>";
            for(i=0;i<jsObj16.alcaldesCaluma.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj16.alcaldesCaluma[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj16.alcaldesCaluma[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj16.alcaldesCaluma[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";            
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 371 && canton == 48){
            var html = "";
             html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj17.concejalesUrbanosCaluma.length+"' size='5'/>";
            for(i=0;i<jsObj17.concejalesUrbanosCaluma.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj17.concejalesUrbanosCaluma[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj17.concejalesUrbanosCaluma[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj17.concejalesUrbanosCaluma[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
          }
           if (dignidad == 370 && canton == 49){
            var html = "";
             html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj18.alcaldesLasnaves.length+"' size='5'/>";
            for(i=0;i<jsObj18.alcaldesLasnaves.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj18.alcaldesLasnaves[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj18.alcaldesLasnaves[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj18.alcaldesLasnaves[i].codigo+"' size='5'/>";
              html+="Validos: <input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";    
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           if (dignidad == 371 && canton == 49){
            var html = "";
             html+="<input type='hidden' id='ocultorRrecorrido' name='ocultorRrecorrido' value='"+jsObj19.concejalesUrbanosLasnaves.length+"' size='5'/>";
            for(i=0;i<jsObj19.concejalesUrbanosLasnaves.length;i++){
              html+="<h3 class='acordeon__titulo'>"+jsObj19.concejalesUrbanosLasnaves[i].nombre+"</h3>";
              html+="<p class='acordeon__contenido'>";
              html+="<input type='hidden' id='nombre"+i+"' name='nombre"+i+"' value='"+jsObj19.concejalesUrbanosLasnaves[i].nombre+"' size='5'/>";
              html+="<input type='hidden' id='oculto"+i+"' name='oculto"+i+"' value='"+jsObj19.concejalesUrbanosLasnaves[i].codigo+"' size='5'/>";
              html+="V<input type='text' id='validos"+i+"' name='validos"+i+"' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";           
            }
              html+="<hr>";
              html+="Nulos: <input type='text' id='nulos' name='nulos' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/>";
              html+=" Blancos: <input type='text' id='blanco' name='blanco' onkeyup='limpiarNumero(this)' onchange='limpiarNumero(this)' value='' size='5'/><br>";
              html+="<hr>";
           }
           
      document.getElementById("formularioDatos").innerHTML= html; 
    }

    function limpiarNumero(obj) {
  /* El evento "change" sólo saltará si son diferentes */
  obj.value = obj.value.replace(/\D/g, '');
}

    $(document).ready(function() {
                $("#btnGuardar").click(function() {
                    if(validacion()){
                        
                    $("#btnGuardar").attr('disabled','-1');
                    var provincia = $("#sel_prov").val();
                    var canton = $("#selCanton").val();
                    var parroquia = $("#selRecinto").val();
                    var recinto  = $("#selJunta").val();
                    var junta  = $("#selJuntaCombo").val();
                    var dignidad  = $("#selDignidad").val();
                    var recorrido = $("#ocultorRrecorrido").val();
                    var can_blanco = $("#blanco").val();
                    var can_nulos = $("#nulos").val();
                    for(i=0;i<recorrido;i++){
                        var dig_id = $("#oculto"+i).val();
                        var dig_nombre = $("#nombre"+i).val();
                        var can_validos = $("#validos"+i).val();
                        var escrutinio = {
                                        provincia:provincia,
                                        canton:canton,
                                        parroquia:parroquia,
                                        recinto:recinto,
                                        recorrido:recorrido,
                                        junta:junta,
                                        dignidad:dignidad,
                                        codigoD:dig_id,
                                        nombreD:String(dig_nombre),
                                        validos:can_validos,
                                        blanco:can_blanco,
                                        nulos :can_nulos
                                    };
                        escrutinios.push(escrutinio);
                    }
                    alert("Datos Registrado!!");
                    limpiarCampos();
                    var datos="";
                    for (j = 0; j < escrutinios.length; j++) { 
                    datos+="<a  class='ui-btn'><p style='color:#FF0000';><b>DIGNIDAD</b>: "+escrutinios[j].nombreD+" "+escrutinios[j].dignidad+"</p>\n"+"Validos :"+escrutinios[j].validos+"</p>\n"+"Nulos :"+escrutinios[j].nulos+"\nBlancos :"+escrutinios[j].blanco+"</a>";
                    }
                    $("#datosSincronizacion").html(datos);
                    $("#datosSincronizacion").removeAttr('disabled');
                    }
                });
                $("#btnSincronizar").click(function(){
                $("#btnSincronizar").attr('disabled','-1');   
                if(navigator.onLine) {
                    var mesajeEspera = "<center><img src='generico/interfaz/imagenes/procesando.gif'/></center>";
                    var mensaje;
                    $('#divEsperaup').html(mesajeEspera);
                    $('#divEsperadown').html(mesajeEspera);
                                        $.ajax({
                                                type: "post",
                                                url:"escrutinioCtrl/escrutinioCtrl.php",
                                                crossDomain: true,
                                                data: {'escrutinios': JSON.stringify(escrutinios)},//capturo array     
                                                success: function(data){
            //                                alert (data);
            //                                console.log (data);
                                                if(data == 0){  
                                                    alert ("Datos ingresados correctamente");
                                                    escrutinios = [];
                                                    location.reload();
                                                    mensaje = "Datos ingresados correctamente";
                                                } else{
                                                    alert ("Ya existe los datos en la base, sin embargo los datos serán modificados");
                                                if(confirm("Esta seguro")){
                                                    escrutinios = [];
                                                    location.reload();
                                                    mensaje = "Ya existe los datos en la base";
                                               }else{
                                                   alert ("Puede confirmar asegurándose de los datos");
                                               }                      
                                             }
                                              $('#divMensaje').html(mensaje); 
                                              $('#divEsperaup').html("");
                                              $('#divEsperadown').html("");
                                         }
                                    });           
                    
                    }else{
                        $('#divMensaje').html("No existe conexión a Internet");
                        $('#divEsperadown').html("No existe conexión a Internet");
                    }
                });
                   });
                    function limpiarCampos() {
                        var recorrido = $("#ocultorRrecorrido").val();
                        for(i=0;i<recorrido;i++){
                         $("#validos"+i).val("");
                        }
                         $("#blanco").val("");
                         $("#nulos").val("");
                    }
                    function validacion(){
                       var recorrido = $("#ocultorRrecorrido").val();
                       var contadorValidos = 0;
                       var contadorBlancos = 0;
                       var contadorNulos = 0;
                        for(i=0;i<recorrido;i++){
                            if($("#validos"+i).val()==''){
                            contadorValidos++;
                            }
                            }
                        if($("#blanco").val()==''){
                            contadorBlancos++;
                            }
                        if($("#nulos").val()==''){
                            contadorNulos++;
                            }
                        if(contadorValidos == 0 && contadorBlancos == 0 && contadorNulos == 0){
                             document.getElementById("mensajeForUp").innerHTML= "DATOS INGRESADOS CORRECTAMENTE";
                            document.getElementById("mensajeForDown").innerHTML= "DATOS INGRESADOS CORRECTAMENTE";   
                             return true;
                            
                        }else{
                            document.getElementById("mensajeForUp").innerHTML= "Por favor verificar toda la información de validos, blancos y nulos";
                            document.getElementById("mensajeForDown").innerHTML= "Por favor verificar toda la información de validos, blancos y nulos";
                            return false;
                            }
                         
                    }