import Buscar from '@/components/buscar'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

async function obtenerRegistros(query) {
    const response = await fetch('http://localhost:4000/productos')
    const productos = await response.json()

    // Introducimos un retardo artificial
    // await new Promise(resolve => setTimeout(resolve, 2000))

    return productos.filter(producto => producto.nombre.toLowerCase().includes(query))
}


async function eliminarRegistro(formData) {
    'use server'
    const id = formData.get('id')

    await fetch('http://localhost:4000/medicos/' + id, { method: 'DELETE' })

    revalidatePath('/productos-api')
}


async function Registros({ query }) {
    const productos = await obtenerRegistros(query)

    return (
        <>
            <h1 className='text-2xl text-slate-600 py-2  mb-2 border-b-2 border-b-slate-600'>
                Lista de medicos (API)
            </h1>

            <Buscar />

            <div className='flex flex-col'>
                {medicos.sort((a, b) => a.createdAt - b.createdAt).reverse()  // Orden inverso de tiempo                           
                    .map((medico) => (
                        <div key={medico.id} className='p-2 odd:bg-slate-100 flex justify-between'>
                            <Link href={`/productos-api/${medico.id}`}>{medico.nombre}</Link>
                            <div className='flex gap-6'>
                                <form>
                                    <input type="hidden" name='id' value={producto.id} />
                                    <button formAction={eliminarRegistro} title='ELIMINAR'>❌</button>
                                </form>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Registros