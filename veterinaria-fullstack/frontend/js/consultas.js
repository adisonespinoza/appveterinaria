const listaConsultas=document.getElementById("lista-consultas");
const mascota=document.getElementById("mascota");
const veterinaria=document.getElementById("veterinaria");
const historia=document.getElementById("historia");
const diagnostico=document.getElementById("diagnostico");
const indice=document.getElementById("indice");
const btnGuardar=document.getElementById("btn-guardar");
const form=document.getElementById("form");

console.log({mascota,veterinaria,historia,diagnostico});

let consultas=[];
let mascotas=[];
let veterinarias=[];
const url='http://localhost:5000';

/*{
            mascota:0,
            veterinaria:0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia:'',
            diagnostico:'',
        } */
async function listarConsultas(){
    const entidad='consultas';
    try {
        const respuesta= await fetch(`${url}/${entidad}`);
        const consultasDelServidor= await respuesta.json();
        if(Array.isArray(consultasDelServidor)){
            consultas=consultasDelServidor;
        }
        if(respuesta.ok){
            const htmlConsultas=consultas.map
            ((consulta,indice)=>
            `<tr>
                <th scope="row"${indice}</th>
                <td>${consulta.mascota.nombre}</td>
                <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellido}</td>
                <td>${consulta.diagnostico}</td>
                <td>${consulta.fechaCreacion}</td>
                <td>${consulta.fechaEdicion}</td>
                <td>
                    <div class="btn-group " role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info mx-3 editar" ><i class="fas fa-pencil-alt icono"></i></button>
                        <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt icono"></i></button>
                    </div>
                </td>
            </tr>`
            )
            .join("");
            listaConsultas.innerHTML=htmlConsultas;
            
        Array.from(document.getElementsByClassName("editar")).forEach((botonEditar,index)=>botonEditar.onclick=editar(index));
        }
    } catch (error) {
        console.log({error});
        $(".alert-danger").show();
    }
}


async function listarMascotas(){
    const entidad='mascotas';
    try {
        const respuesta= await fetch(`${url}/${entidad}`);
        const mascotasDelServidor= await respuesta.json();
        if(Array.isArray(mascotasDelServidor)){
            mascotas=mascotasDelServidor;
        }
        if(respuesta.ok){
            mascotas.forEach((_mascota,indice)=>{
                const optionActual=document.createElement('option');
                optionActual.innerHTML=_mascota.nombre;
                optionActual.value=indice;
                mascota.appendChild(optionActual);
            })
           /* const htmlMascotas=mascotas.map(
                (mascota,indice)=>
           `<option value="${indice}">${mascota.nombre}</option>`
            )
            .join("");
            mascota.innerHTML+=htmlMascotas;*/
           
        }
    } catch (error) {
        console.log({error});
        $(".alert-danger").show();
    }
}



async function listarVeterinarias(){
    const entidad='veterinarias';
    try {
        const respuesta= await fetch(`${url}/${entidad}`);
        const veterinariasDelServidor= await respuesta.json();
        if(Array.isArray(veterinariasDelServidor)){
            veterinarias=veterinariasDelServidor;
        }
        if(respuesta.ok){
            veterinarias.forEach((_veterinaria,indice)=>{
                const optionActual=document.createElement('option');
                optionActual.innerHTML=`${_veterinaria.nombre}`;
                optionActual.value=indice;
                veterinaria.appendChild(optionActual);
            })
           /* const htmlMascotas=mascotas.map(
                (mascota,indice)=>
           `<option value="${indice}">${mascota.nombre}</option>`
            )
            .join("");
            mascota.innerHTML+=htmlMascotas;*/
           
        }
    } catch (error) {
        console.log({error});
        $(".alert-danger").show();
    }
}
function editar(index){
    return function cuandoHagoClick(){
        btnGuardar.innerHTML="Editar"
        $('#exampleModal').modal('toggle');
        const consulta = consultas[index];
        indice.value=index;
        mascota.value=consulta.mascota.id;
        veterinaria.value=consulta.veterinaria.id;
        historia.value=consulta.historia;
        diagnostico.value=consulta.diagnostico;
        //console.log(consulta);
        
        //console.log(mascotas[indice]);
    };
}

async function enviarDatos(evento){
    const entidad='consultas';
    evento.preventDefault();
    try {
        
        const datos={
           // pais:pais.value,
            mascota:mascota.value,
           veterinaria:veterinaria.value,
            historia:historia.value,
            diagnostico:diagnostico.value,
            
        };
       if (validar(datos)===true){
        const accion=btnGuardar.innerHTML;
        let urlEnvio=`${url}/${entidad}`;
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
        listarConsultas();
        resetModal();
        
    }
    form.classList.add('was-validated');
    return;
    
    }
    $(".alert-warning").show();
        } catch (error) {
       //console.log({error});
        
}
    
}

function resetModal(){
    [indice,mascota,veterinaria,historia,diagnostico].forEach(
        (inputActual)=>{
            inputActual.value="";
        inputActual.classList.remove("is-invalid");
        inputActual.classList.remove("is-valid");
        });
        $(".alert-warning").hide();
    $('#exampleModal').modal('toggle');
    
}

function validar(datos){
    if(typeof datos !=='object')return false;
    let respuesta=true;
   for(let llave in datos){
       if(datos[llave].length===0){
        document.getElementById(llave).classList.add("is-invalid");   
        respuesta=false;
       }else{
        document.getElementById(llave).classList.remove("is-invalid");
        document.getElementById(llave).classList.add("is-valid");    
       }
      
      // console.log(llave);
   }
   if(respuesta===true) $(".alert-warning").hide();
   return respuesta;
    //console.log(Object.keys(datos));
}

btnGuardar.onclick=enviarDatos;
listarMascotas();
listarVeterinarias();
listarConsultas();
