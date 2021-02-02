const listaMascotas=document.getElementById("lista-mascotas");
const tipo=document.getElementById("tipo");
const nombre=document.getElementById("nombre");
const dueno=document.getElementById("dueno");
const form=document.getElementById("form");
const btnGuardar=document.getElementById("btn-guardar");
const indice=document.getElementById("indice");
const url='http://localhost:5000/mascotas';

let mascotas=[/*{
    tipo: "perro",
    nombre:"firulay",
    dueno:"adison"
    
},{
    tipo: "gato",
    nombre:"pelusa",
    dueno:"maide"
},{
    tipo: "gato",
    nombre:"pelusa",
    dueno:"maide"
}*/];


async function listarMascotas(){
    try {
        const respuesta=await fetch(url);
        const mascotasDelServer=await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas=mascotasDelServer;
        }
        if(mascotas.length>0){
            const htmlMascotas= mascotas.map((mascota,index)=>
            `<tr>
                <th scope="row">${index}</th>
                <td>${mascota.tipo}</td>
                <td>${mascota.nombre}</td>
                <td>${mascota.dueno}</td>
                <td>
                <div class="btn-group " role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info mx-3 editar" ><i class="fas fa-pencil-alt icono"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt icono"></i></button>
                </div>
                </td>
            </tr>`).join("");
            
            listaMascotas.innerHTML = htmlMascotas;
            //document.getElementsByClassName("editar");
        Array.from(document.getElementsByClassName ("editar")).forEach((botonEditar,index)=>botonEditar.onclick=editar(index))
        Array.from(document.getElementsByClassName ("eliminar")).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminar(index));
        return;
        };
        
        listaMascotas.innerHTML = `<tr>
        <th colspan="5">No hay Mascotas</th>
        
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
            tipo:tipo.value,
            nombre:nombre.value,
            dueno:dueno.value
        };
        let method='POST';
        let urlEnvio=url;
        const accion=btnGuardar.innerHTML;
        if(accion==="Editar") {
                method='PUT';
                mascotas[indice.value]=datos;
                urlEnvio=`${url}/indice.value`;
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
        listarMascotas();
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
        const mascota = mascotas[index];
        nombre.value=mascota.nombre;
        tipo.value=mascota.tipo;
        dueno.value=mascota.dueno;
        indice.value=index
        //console.log(mascotas[indice]);
    }
}
function resetModal(){
    nombre.value='';
    tipo.value='';
    dueno.value='';
    indice.value='';
    btnGuardar.innerHTML='Crear'
}

function eliminar(index){
    try {
        const urlEnvio=`${url}/${index}`;
        return async function clickenEliminar(){
            const respuesta = await fetch(urlEnvio, {
                method:"DELETE", // or 'PUT'
            });
        if(respuesta.ok){
            listarMascotas();
            resetModal();
        }
        listarMascotas();
        };
    }catch (error) {
        console.log({error});
        $(".alert").show();
    }
    
} 
listarMascotas();


form.onsubmit=enviarDatos;
btnGuardar.onclick=enviarDatos;