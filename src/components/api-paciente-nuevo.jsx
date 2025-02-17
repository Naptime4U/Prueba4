import { revalidatePath } from "next/cache";
import SubmitButton from "@/components/submit-button";


async function nuevoPaciente(formData) {
    'use server'
    const [nombre, localidad, fecha_nacimiento] = formData.values()

    const response = await fetch('http://localhost:4000/pacientes', {
        method: 'POST',
        body: JSON.stringify({ nombre, localidad, fecha_nacimiento })
    })
    const data = await response.json()

    // Introducimos un retardo artificial
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    revalidatePath('/pacientes-api')
}



function PacienteNuevo() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Nombre</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='localidad'>Localidad:</label>
            <input required id='localidad' name='localidad' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha_nacimiento'>Fecha de Nacimiento</label>
            <input required id='pefil' name='fecha_nacimiento' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <div className='col-span-2 grid gap-2'>
                <SubmitButton formAction={nuevoPaciente} className='disabled:bg-slate-600 bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar paciente
                </SubmitButton>
                <button type='reset' className='bg-blue-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default PacienteNuevo;