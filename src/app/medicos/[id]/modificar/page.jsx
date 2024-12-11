import connection from "@/lib/mysql";
import Link from "next/link";
import { redirect } from "next/navigation";
async function modificarMedico(formData) {
    'use server'
    const id = formData.get('id');
    const nombre = formData.get('nombre');
    const localidad = formData.get('localidad');
    const fecha_nacimiento = formData.get('fecha_nacimiento');

    await connection.query('update medicos set nombre=?, localidad=?, fecha_nacimiento=? where id=?',
        [nombre, localidad, fecha_nacimiento, id]
    );
    redirect(`/medicos/${id}`);
}
async function PaginaModificar({params}) {
    const {id} = await params;
    const [rows] = await connection.query('select * from medicos where id=?', [id]);
    const medico = rows[0];
    return ( 
        <div>
            <form action={modificarMedico}>
                <input type="hidden" name="id" defaultValue={medico.id} />
                <input type="text" name="nombre" defaultValue={medico.nombre} />
                <input type="text" name="localidad" defaultValue={medico.localidad} />
                <input type="text" name="fecha_nacimiento" defaultValue={medico.fecha_nacimiento.toISOString().split('T')[0]} />
                <button>MODIFICAR</button>
            </form>
        </div>
     );
}

export default PaginaModificar;