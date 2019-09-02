
//////////////////********* Instanciacion de los cantones de Bolivar****//////////////
var jsonReporte = '{"canton":['+
'{"codigo":43,"nombre":"GUARANDA"},'+
'{"codigo":44,"nombre":"CHILLANES"},'+
'{"codigo":45,"nombre":"CHIMBO"},'+
'{"codigo":46,"nombre":"ECHEANDÍA"},'+
'{"codigo":47,"nombre":"SAN MIGUEL"},'+
'{"codigo":48,"nombre":"CALUMA"},'+
'{"codigo":49,"nombre":"LAS NAVES"}'+']}';
var jsObjr = JSON.parse(jsonReporte);

///////////////////*****************Elegir el Canton Reporte**********//////////////////////////////
function cargarCantonReporte(json) {
    var provincia = document.getElementById("sel_prov_reporte").value;
    if (provincia == 3){
    var out ="<select id='selCantonReporte' name='selCantonReporte' onchange='cargarDignidadReporte()' style='width:250px'>";
    out+="<option value='0'>Escoja una opción</option>";
    for(i=0;i<json.canton.length;i++){
                out+="<option value='"+json.canton[i].codigo+"'>"+json.canton[i].nombre+"</option>";
	}
      out+="</select>";
      document.getElementById("divCantonReporte").innerHTML= out;
    }
 }
////////////////****************Combo de tipo de dignidades*************////////////////////////////
function cargarDignidadReporte(){
        var comboDignidad = "<select id='selDignidadReporte' name='selDignidadReporte' onchange='cargarGrafica()' style='width:250px'>";
          comboDignidad += "<option value='0'>Escoja una opción</option>";
          comboDignidad += "<option value='369'>Prefecto o Viceprefecto(a)</option>";
          comboDignidad += "<option value='370'>Alcaldes Municipales</option>";
          comboDignidad += "<option value='371'>Concejales Urbanos</option>";
          comboDignidad += "<option value='372'>Concejales Rurales</option>";
//          comboDignidad += "<option value='373'>Vocales de Junta Parroquial</option>";
          comboDignidad +="</select>";
      document.getElementById("divDignidadReporte").innerHTML= comboDignidad;
    }
////////////////*****************Comienso de Reporte**************//////////////////////////////////
function cargarGrafica(){
    var provincia = document.getElementById("sel_prov_reporte").value;
    var canton = document.getElementById("selCantonReporte").value;
    var dignidad = document.getElementById("selDignidadReporte").value;
    
                            $(document).ready(function () {
                                $.ajax({
                                        type: "post",
                                        url:"escrutinioCtrl/cargarCtrl.php",
                                        crossDomain: false,
                                        dataType: 'jsonp',
                                        data: {'provincia': provincia,'canton':canton,'dignidad':dignidad},//capturo array     
                                        success: function(data){
                                            if(data){
                                            var datosGraf = JSON.parse(data);
                                            var dataArray=[];
                                         for(var i=0;i<datosGraf.length;i++){
                                             var name = datosGraf[i].name;
                                             var y= datosGraf[i].y;
                                             var drilldown= datosGraf[i].drilldown;
                                             var datos= {
                                                    name:name,
                                                    y:y,
                                                    drilldown:drilldown
                                             }
                                             dataArray.push(datos);
                                         }
                                        Highcharts.chart('container', {
                                        chart: {
                                          type: 'column'
                                        },
                                        title: {
                                          text: 'Proceso de Escrutinios Electoral 2019'
                                        },
                                        subtitle: {
                                          text: 'Reporte de Escrutinio</a>'
                                        },
                                        xAxis: {
                                          type: 'category'
                                        },
                                        yAxis: {
                                          title: {
                                            text: 'Total de Votos'
                                          }

                                        },
                                        legend: {
                                          enabled: false
                                        },
                                        plotOptions: {
                                          series: {
                                            borderWidth: 0,
                                            dataLabels: {
                                              enabled: true,
                                              format: '{point.y:.1f}'
                                            }
                                          }
                                        },

                                        tooltip: {
                                          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> de votos<br/>'
                                        },

                                        "series": [
                                          {
                                            "name": "Candidato",
                                            "colorByPoint": true,
                                           // "data": [{"name":"ANIBAL CORONEL","y":83,"drilldown":"ANIBAL CORONEL"},{"name":"AURELIO CHACHA","y":13,"drilldown":"AURELIO CHACHA"},{"name":"VINICIO COLOMA","y":883,"drilldown":"VINICIO COLOMA"},{"name":"WILLIAN MONTERO","y":91,"drilldown":"WILLIAN MONTERO"}]
                                            "data":dataArray
                                          }
                                        ],
                                      });
                                            //cargarDatosGrafico(datosGraf);
                                         }else{
                                             alert ("No existe Registros");
                                         }
                                      }
                                    });
                                    
                            });
                            
}
////////////////*****************Comienso de Reporte General**************//////////////////////////////////
function cargarGraficaGeneral(){
    var dignidad = document.getElementById("sel_dignidad_reporte_general").value;
                            $(document).ready(function () {
                                $.ajax({
                                        type: "post",
                                        url:"escrutinioCtrl/cargarGeneralCtrl.php",
                                        crossDomain: false,
                                        dataType: 'jsonp',
                                        data: {'dignidad':dignidad},//capturo array     
                                        success: function(data){
                                            if(data){
                                            var datosGraf = JSON.parse(data);
                                            var dataArray=[];
                                         for(var i=0;i<datosGraf.length;i++){
                                             var name = datosGraf[i].name;
                                             var y= datosGraf[i].y;
                                             var drilldown= datosGraf[i].drilldown;
                                             var datos= {
                                                    name:name,
                                                    y:y,
                                                    drilldown:drilldown
                                             }
                                             dataArray.push(datos);
                                         }
                                        Highcharts.chart('containerGeneral', {
                                        chart: {
                                          type: 'column'
                                        },
                                        title: {
                                          text: 'Proceso de Escrutinios Electoral 2019'
                                        },
                                        subtitle: {
                                          text: 'Reporte de Escrutinio</a>'
                                        },
                                        xAxis: {
                                          type: 'category'
                                        },
                                        yAxis: {
                                          title: {
                                            text: 'Total de Votos'
                                          }

                                        },
                                        legend: {
                                          enabled: false
                                        },
                                        plotOptions: {
                                          series: {
                                            borderWidth: 0,
                                            dataLabels: {
                                              enabled: true,
                                              format: '{point.y:.1f}'
                                            }
                                          }
                                        },

                                        tooltip: {
                                          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> de votos<br/>'
                                        },

                                        "series": [
                                          {
                                            "name": "Candidato",
                                            "colorByPoint": true,
                                           // "data": [{"name":"ANIBAL CORONEL","y":83,"drilldown":"ANIBAL CORONEL"},{"name":"AURELIO CHACHA","y":13,"drilldown":"AURELIO CHACHA"},{"name":"VINICIO COLOMA","y":883,"drilldown":"VINICIO COLOMA"},{"name":"WILLIAN MONTERO","y":91,"drilldown":"WILLIAN MONTERO"}]
                                            "data":dataArray
                                          }
                                        ],
                                      });
                                            //cargarDatosGrafico(datosGraf);
                                         }else{
                                             alert ("No existe Registros");
                                         }
                                      }
                                    });
                                    
                            });
                            
}