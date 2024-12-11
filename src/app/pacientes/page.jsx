import connection from "@/lib/mysql";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function eliminarPaciente(formData){
    'use server'
    const id = formData.get('id');
    await connection.query('delete from pacientes where id=?', [id]);
    revalidatePath('/pacientes');
}
async function anadirPaciente(formData){
    'use server'
    const nombre = formData.get('nombre');
    const localidad = formData.get('localidad');
    const fecha_nacimiento = formData.get('fecha_nacimiento');
    await connection.query('insert into pacientes(nombre, localidad, fecha_nacimiento) values (?,?,?)',
         [nombre, localidad, fecha_nacimiento]);
    revalidatePath('/pacientes');
}
async function PaginaPacientes() {
const [rows] = await connection.query('select * from pacientes');
    return (
        <>
        <form action={anadirPaciente}>
            <input type="text" name="nombre" className="border-solid border-2 border-sky-500"/>
            <input type="text" name="localidad" className="border-solid border-2 border-sky-500"/>
            <input type="text" name="fecha_nacimiento" className="border-solid border-2 border-sky-500"/>
            <button>AÑADIR</button>
        </form>
        <div>PACIENTES
        {
            rows.map(paciente => <div key={paciente.id}><Link href={`/pacientes/${paciente.id}`}>{paciente.nombre}</Link>
            <form action={eliminarPaciente}>
                <input type="hidden" name="id" defaultValue={paciente.id}/>
                <button>ELIMINAR</button>
            </form>
            </div>)
        }
        </div>
        </>
    );
}
export default PaginaPacientes;