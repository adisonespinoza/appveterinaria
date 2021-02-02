
//const pais=document.getElementById("pais");
const nombre=document.getElementById("nombre");
const documento=document.getElementById("documento");
const apellido=document.getElementById("apellido");
const indice=document.getElementById("indice");
const form=document.getElementById("form");
const btnGuardar=document.getElementById("btn-guardar");
const listaDuenos=document.getElementById("lista-duenos");
const url='http://localhost:5000/duenos';

let duenos=[/*{
    nombre:"adison",
    apellido:"espinoza",
    pais:"Venezuela",
    identificacion:"96036722"
    
},{
    nombre:"Lucia",
    apellido:"Valderrama",
    pais:"Argentina",
    identificacion:"40005722"
    
}*/];


async function listarDuenos(){

    try {
        const respuesta=await fetch(url);
        const duenosDelServer=await respuesta.json();
        if(Array.isArray(duenosDelServer)){
            duenos=duenosDelServer;
        }
        if(duenos.length>0){
            const htmlDuenos= duenos.map((dueno,index)=>
            `<tr>
                <th scope="row">${index}</th>
                <td>${dueno.nombre}</td>
                <td>${dueno.apellido}</td>
                
                <td>${dueno.documento}</td>
                <td>
                    <div class="btn-group " role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info mx-3 editar" ><i class="fas fa-pencil-alt icono"></i></button>
                        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt icono"></i></button>
                    </div>
                </td>
            </tr>`).join("");
            
            listaDuenos.innerHTML = htmlDuenos;
            //document.getElementsByClassName("editar");
        Array.from(document.getElementsByClassName ("editar")).forEach((botonEditar,index)=>botonEditar.onclick=editar(index))
        Array.from(document.getElementsByClassName ("eliminar")).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminar(index))
    return;
        }
        listaDuenos.innerHTML = 
    `<tr>
        <th colspan="5">No hay Dueñ@s</th>
    </tr>`;   
    } catch (error) {
        console.log({error});
        $(".alert").show();
    }
    
        }


async function enviarDatos(evento){
    evento.preventDefault();
    try {
        const datos={
           // pais:pais.value,
            nombre:nombre.value,
            apellido:apellido.value,
            documento:documento.value,
        };
        const accion=btnGuardar.innerHTML;
        let urlEnvio=url;
        let method="POST";
        if(accion==="Editar"){
            urlEnvio+= `/${indice.value}`;
                method='PUT';
        }
        const respuesta = await fetch(urlEnvio, {
            method, // or 'PUT'
            headers:{
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos), // data can be `string` or {object}!
            mode:"cors",
    });
    if(respuesta.ok){
        listarDuenos();
        resetModal();
    }
        
    } catch (error) {
        console.log({error});
        $(".alert").show();
    }
    
}
function editar(index){
    return function cuandoHagoClick(){
        btnGuardar.innerHTML="Editar"
        $('#exampleModal').modal('toggle');
        const dueno = duenos[index];
        indice.value=index;
        nombre.value=dueno.nombre;
        apellido.value=dueno.apellido;
        documento.value=dueno.documento;
        
        //console.log(mascotas[indice]);
    }
}
function resetModal(){
    nombre.value='';
    apellido.value='';
    documento.value='';
    indice.value='';
    btnGuardar.innerHTML='Crear'
}

function eliminar(index){
    const urlEnvio=`${url}/${index}`;
    return async function clickenEliminar(){
        try {
            const respuesta = await fetch(urlEnvio, {
                method:"DELETE", // or 'PUT'
                mode:'cors',
            });
            
        if(respuesta.ok){
            listarDuenos();
            resetModal();
        }
    } catch (error) {
        console.log({error});
        $(".alert").show();
    }
        
        //duenos=duenos.filter((dueno,indiceDueno)=>indiceDueno !== index);
        //listarDuenos();
    }
}
listarDuenos();

form.onsubmit=enviarDatos;
btnGuardar.onclick=enviarDatos;