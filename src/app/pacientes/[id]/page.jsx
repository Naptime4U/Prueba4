import connection from "@/lib/mysql";
import Link from "next/link";

async function PaginaPaciente({params, searchParams}) {
    const {id} = await params;
    const [rows] = await connection.query('select * from pacientes where id=?', [id]);
    const paciente = rows[0];
    return ( 
        <div>
            <p>{paciente.nombre}</p>
            <p>{paciente.localidad}</p>
            <p>{paciente.fecha_nacimiento.toLocaleDateString()}</p>
            <Link href={`/pacientes/${paciente.id}/modificar`} className="block text-blue-500">Modificar</Link>
        </div>
     );
}

export default PaginaPaciente;