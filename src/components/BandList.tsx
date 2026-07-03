import type { Band } from "../types/Band";
import BandCard from "./BandCard";

interface BandListProps {
  bandas: Band[];
  onDeleteBand: (id: number) => void;
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
          </tr>
        </thead>

        <tbody>
          {props.bandas.map((banda) => (
            <BandCard
              key={banda.id}
              grupo={banda}
              onDeleteBand={props.onDeleteBand}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default BandList;
