async function modificarMedico(formData) {
    'use server'
    const [nombre, especialidad, perfil] = formData.values()

    const response = await fetch('http://localhost:4000/medicos', {
        method: 'POST',
        body: JSON.stringify({ nombre, especialidad, perfil })
    })
    const data = await response.json()

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    revalidatePath(`/medicos-api/${id}`)
}
async function obtenerMedico(id) {
    const response = await fetch('http://localhost:4000/medicos/' + id)
    if (!response.ok) notFound()
    const paciente = await response.json()  

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return paciente
}
async function PaginaModificar({params}) {
    const { id } = await params
    const medico = await obtenerMedico(id)

    return ( 
        <div>
            <form action={modificarMedico}>
                <input type="hidden" name="id" defaultValue={medico.id} />
                <input type="text" name="nombre" defaultValue={medico.nombre} />
                <input type="text" name="especialidad" defaultValue={medico.especialidad} />
                <input type="text" name="perfil" defaultValue={medico.perfil} />
                <button>MODIFICAR</button>
            </form>
        </div>
     );
}

export default PaginaModificar;