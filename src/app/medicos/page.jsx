import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarMedico(formData){
    'use server'
    const id = formData.get('id');
    await connection.query('delete from medicos where id=?', [id]);
    revalidatePath('/medicos');
}
async function anadirMedico(formData){
    'use server'
    const nombre = formData.get('nombre');
    const localidad = formData.get('localidad');
    const fecha_nacimiento = formData.get('fecha_nacimiento');
    await connection.query('insert into medicos(nombre, localidad, fecha_nacimiento) values (?,?,?)',
         [nombre, localidad, fecha_nacimiento]);
    revalidatePath('/medicos');
}
async function PaginaMedicos() {
const [rows] = await connection.query('select * from medicos');
    return (
        <>
        <form action={anadirMedico}>
            <input type="text" name="nombre" className="border-solid border-2 border-sky-500"/>
            <input type="text" name="localidad" className="border-solid border-2 border-sky-500"/>
            <input type="text" name="fecha_nacimiento" className="border-solid border-2 border-sky-500"/>
            <button>AÑADIR</button>
        </form>
        <div>MEDICOS
        {
            rows.map(medico => <div key={medico.id}><Link href={`/medicos/${medico.id}`}>{medico.nombre}</Link>
            <form action={eliminarMedico}>
                <input type="hidden" name="id" defaultValue={medico.id}/>
                <button>ELIMINAR</button>
            </form>
            </div>)
        }
        </div>
        </>
    );
}

export default PaginaMedicos;