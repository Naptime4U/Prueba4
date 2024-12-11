import connection from "@/lib/mysql";

async function PaginaMedico({params, searchParams}) {
    const {id} = await params;
    const [rows] = await connection.query('select * from medicos where id=?', [id]);
    const medico = rows[0];
    return ( 
        <div>
            <p>{medico.nombre}</p>
            <p>{medico.localidad}</p>
            <p>{medico.fecha_nacimiento.toLocaleDateString()}</p>
        </div>
     );
}

export default PaginaMedico;