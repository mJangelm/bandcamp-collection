import type { Band } from "../types/Band";
import BandCard from "./BandCard";

interface BandListProps {
  bandas: Band[];
  onDeleteBand: (id: number) => void;
  onEditBand: (id: number) => void;
}

function BandList(props: BandListProps) {
  if (props.bandas.length === 0) {
    return <p>No hay bandas registradas.</p>;
  }

  return (
    <>
      <h2>Listado de bandas</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Género</th>
            <th>Bandcamp</th>
            <th>Preview</th>
            <th>Editar</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>
          {props.bandas.map((banda) => (
            <BandCard
              key={banda.id}
              grupo={banda}
              onDeleteBand={props.onDeleteBand}
              onEditBand={props.onEditBand}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default BandList;
