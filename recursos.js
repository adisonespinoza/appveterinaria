module.exports={
    mascotas: [
        {tipo:'perro', nombre:'princesa0', dueno:'jose'},
        {tipo:'perro', nombre:'princesa1', dueno:'adison'},
        {tipo:'perro', nombre:'princesa2', dueno:'jose'},
        {tipo:'perro', nombre:'princesa3', dueno:'jose'},
    ],
    veterinarias: [
        {nombre:'alexandra', 
        apellido:'perez',
        pais:'Venezuela',
         documento:'1234567890'},
         {nombre:'alexader', 
        apellido:'gomez',
        pais:'Argentina',
         documento:'9999999993'},
         {nombre:'julian', 
        apellido:'madrid',
        pais:'Ecuador',
         documento:'2211334455'},
         {nombre:'naryie', 
        apellido:'vasquez',
        pais:'Chile',
         documento:'3366775543'},
        
    ],
    duenos: [
        {nombre:'lucya', 
        apellido:'fernandez',
         documento:'0987654321'},
         {nombre:'alexader', 
        apellido:'gimenez',
         documento:'3344556677'},
         {nombre:'david', 
        apellido:'medina',
         documento:'1234565432'},
         {nombre:'gustavo', 
        apellido:'enrique',
         documento:'9837253783'},
        
    ],
    consultas:[
        {
            mascota:0,
            veterinaria:0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia:'',
            diagnostico:'diagnostico',
        },
],
}; 
