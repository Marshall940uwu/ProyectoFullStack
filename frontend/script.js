const API = "http://127.0.0.1:8000/api/empleados/";

const lista = document.getElementById("lista-empleados");

const formulario = document.getElementById("formulario");

const contador = document.getElementById("contador");

const buscador = document.getElementById("buscador");

let empleadoEditar = null;



function mostrarMensaje(texto){

    alert(texto);
}



async function obtenerEmpleados(){

    const respuesta = await fetch(API);

    const datos = await respuesta.json();

    lista.innerHTML = "";

    contador.textContent = `Total empleados: ${datos.length}`;

    datos.forEach(emp => {

        lista.innerHTML += `
        
        <tr>

            <td>${emp.id}</td>

            <td>${emp.nombre}</td>

            <td>${emp.cargo}</td>

            <td>$ ${emp.salario}</td>

            <td>

                <button class="editar"
                onclick="editarEmpleado(${emp.id}, '${emp.nombre}', '${emp.cargo}', ${emp.salario})">

                    Editar

                </button>

                <button class="eliminar"
                onclick="eliminarEmpleado(${emp.id})">

                    Eliminar

                </button>

            </td>

        </tr>
        `;
    });
}



formulario.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const salario = document.getElementById("salario").value;

    if(salario < 0){

        alert("El salario no puede ser negativo");

        return;
    }

    const empleado = {

        nombre: document.getElementById("nombre").value,

        cargo: document.getElementById("cargo").value,

        salario: salario
    };

    if(empleadoEditar){

        await fetch(API + empleadoEditar + "/",{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(empleado)
        });

        mostrarMensaje("Empleado actualizado correctamente");

        empleadoEditar = null;

    }else{

        await fetch(API,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(empleado)
        });

        mostrarMensaje("Empleado registrado correctamente");
    }

    formulario.reset();

    obtenerEmpleados();
});



function editarEmpleado(id,nombre,cargo,salario){

    empleadoEditar = id;

    document.getElementById("nombre").value = nombre;

    document.getElementById("cargo").value = cargo;

    document.getElementById("salario").value = salario;

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}



async function eliminarEmpleado(id){

    const confirmar = confirm("¿Desea eliminar este empleado?");

    if(!confirmar){

        return;
    }

    await fetch(API + id + "/",{

        method:"DELETE"
    });

    mostrarMensaje("Empleado eliminado correctamente");

    obtenerEmpleados();
}



buscador.addEventListener("keyup", ()=>{

    const texto = buscador.value.toLowerCase();

    const filas = document.querySelectorAll("tbody tr");

    filas.forEach(fila => {

        fila.textContent.toLowerCase().includes(texto)

        ? fila.style.display = ""

        : fila.style.display = "none";
    });
});



obtenerEmpleados();