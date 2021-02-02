const url = require('url');
const StringDecoder =require('string_decoder').StringDecoder;
const enrutador=require('./enrutador');

module.exports = (req, res) => {
    //1.Obtener url desde el objeto request
    const urlActual=req.url;
    const urlParseada=url.parse(urlActual,true);
 //2.Obtener la ruta
    const ruta=urlParseada.pathname;

  //3. quitar slash con expresion regular

    const rutaLimpia=ruta.replace(/^\/+|\/+$/g, '');

    //3.1 obtener el metodo http

    const metodo= req.method.toLowerCase();
   // console.log('req.method', req.method.toLowerCase());

    //3.1.1 dar permisos de CORS escribiendo los headers

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(
        'Access-Control-Request-Methods',
        'OPTIONS,GET,PUT,DELETE,POST'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS,GET,PUT,DELETE,POST'
    );
    
    //3.1.2 dar respuesta inmediata cuando el metodo sea options

    if(metodo==='options'){
        res.writeHead(200);
        res.end();
        return;
    }

        //3.2 obtener variables del query url
        const {query={}}=urlParseada;
        //console.log({urlParseada});

        /*3.3 obtener parametros del query url con destructuracion

        const {query}=urlParseada;
        const {path}=urlParseada;
        console.log({query});
        console.log({path});*/

        //3.4 obtener headers

        const {headers={}}=req;
       // console.log({headers});

           //3.4 obtener paulod, en el caso que lo haya

            const decoder = new StringDecoder('utf8');
            let buffer='';

            //3.4.1 ir acumulando data cuando el request reciba un paylaod
            req.on('data',(data)=>{
                buffer+=decoder.write(data);
            });
        //3.4.2 terminar de acumular datos y decirle al decoder que finalice
            req.on('end',()=>{
                buffer+=decoder.end();

            if(headers["Content-type"]==="application/json"){
                buffer=JSON.parse(buffer);
            }
            //3.4.3 revisar si tiene subrutas, en este caso es el indeice del array
            
            if(rutaLimpia.indexOf("/")>-1){
              var [rutaPrincipal,indice] = rutaLimpia.split("/");
            }
            //3.5 ordenar data del request

            const data={
                indice,
                ruta:rutaPrincipal ||rutaLimpia,
                query,
                metodo,
                headers,
                payload:buffer
            };
            console.log({data});

            //3.6 elegir el manejador dependiendo de la ruta y asignarle funcion que tiene el enrutador
            let handler;
            if(
                data.ruta && enrutador 
                [data.ruta]
                && enrutador[data.ruta][metodo]
                ){
                handler=enrutador[data.ruta][metodo];
            }else{
                handler=enrutador.noEncotrada;
            }

//4. ejecutar handler(manejador) para enviar la respuesta

            if(typeof handler==="function"){
                handler(data,(statusCode=200,mensaje)=>{
                    const respuesta=JSON.stringify(mensaje);
                    //para convertir el objeto a json
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(statusCode);

                    //linea donde realmenta ua estamos respondiendo a la aplicacion del cliente
                    res.end(respuesta);
                })
            }
        //console.log({urlActual,urlParseada});
                
/*if(ruta==='/ruta'){
    res.end('hola estas en  /ruta');
}else{
    res.end('ruta dezconocida');
}
switch(rutaLimpia){
    case 'ruta':
        res.end('Ruta conocida');
        break;
    default:
        res.end('se desconoce la ruta');
        break;
}*/
});

//res.end("hola mundo en el servidor");
  // console.log(req.url);
};