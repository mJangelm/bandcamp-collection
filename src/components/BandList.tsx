import type { Band } from "../types/Band";
import BandCard from "./BandCard";

interface BandListProps {
  bandas: Band[];
  onDeleteBand: (id: number) => void;
  onEditBand: (id: number) => void;
}

function BandList(props: BandListProps) {
  if (props.bandas.length === 0) {
    return (
      <div className="alert alert-secondary mt-4">
        No hay bandas registradas.
      </div>
    );
  }

  return (
    <div className="card shadow mt-4">
      <div className="card-header">
        <h2 className="mb-0">Listado de bandas</h2>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Género</th>
                <th>Bandcamp</th>
                <th>Preview</th>
                <th className="text-center">Acciones</th>
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
        </div>
      </div>
    </div>
  );
}

export default BandList;
