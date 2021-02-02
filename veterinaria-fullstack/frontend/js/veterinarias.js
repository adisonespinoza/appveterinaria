const nombre=document.getElementById("nombre");
const apellido=document.getElementById("apellido");
const pais=document.getElementById("pais");
const documento=document.getElementById("documento");
const indice=document.getElementById("indice");
const form=document.getElementById("form");
const btnGuardar=document.getElementById("btn-guardar");
const listaVeterinarias=document.getElementById("lista-veterinarias");
const url='http://localhost:5000/veterinarias';

let veterinarias=[/*{
    nombre:"adison",
    apellido:"espinoza",
    pais:"Venezuela",
    documento:"96036722"
    
},{
    nombre:"Lucia",
    apellido:"Valderrama",
    pais:"Argentina",
    documento:"40005722"
    
}*/];


async function listarVeterinarias(){
    try {
        const respuesta=await fetch(url);
    const veterinariasDelServer=await respuesta.json();
    if(Array.isArray(veterinariasDelServer)){
        veterinarias=veterinariasDelServer;
    }
    if(veterinarias.length>0){
        const htmlVeterinarias= veterinarias.map((veterinaria,index)=>
        `<tr>
            <th scope="row">${index}</th>
            <td>${veterinaria.nombre}</td>
            <td>${veterinaria.apellido}</td>
            <td>${veterinaria.pais}</td>
            <td>${veterinaria.documento}</td>
            <td>
                <div class="btn-group " role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-info mx-3 editar" ><i class="fas fa-pencil-alt icono"></i></button>
                    <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt icono"></i></button>
                </div>
            </td>
        </tr>`).join("");
        
        listaVeterinarias.innerHTML = htmlVeterinarias;
        //document.getElementsByClassName("editar");
    Array.from(document.getElementsByClassName ("editar")).forEach((botonEditar,index)=>botonEditar.onclick=editar(index))
    Array.from(document.getElementsByClassName ("eliminar")).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminar(index))
    return;
}
listaVeterinarias.innerHTML = 
`<tr>
    <th colspan="5">No hay Veterinarios</th>
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
            nombre:nombre.value,
            apellido:apellido.value,
            pais:pais.value,
            documento:documento.value
        };
        const accion=btnGuardar.innerHTML;
        let urlEnvio=url;
        let method='POST';
        if (accion==='Editar') {
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
        listarVeterinarias();
        resetModal();;
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
        const veterinaria = veterinarias[index];
        nombre.value=veterinaria.nombre;
        apellido.value=veterinaria.apellido;
        pais.value=veterinaria.pais;
        documento.value=veterinaria.documento;
        indice.value=index;
        //console.log(mascotas[indice]);
    }
}
function resetModal(){
    nombre.value='';
    apellido.value='';
    pais.value='';
    documento.value='';
    btnGuardar.innerHTML='Crear';
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
            listaVeterinarias();
            resetModal()
        }
        } catch (error) {
            console.log({error});
            $(".alert").show();
        }
        listarVeterinarias();
    }
}
listarVeterinarias();

form.onsubmit=enviarDatos;
btnGuardar.onclick=enviarDatos;