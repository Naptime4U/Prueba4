import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
<div>
      <Link href="/alumnos" className="block text-blue-500">Medicos</Link>
      <Link href="/profesores" className="block text-blue-500">Pacientes</Link>
    </div>
  );
}
