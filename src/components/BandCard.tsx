import type { Band } from "../types/Band";

interface BandCardProps {
  grupo: Band;
  onDeleteBand: (id: number) => void;
  onEditBand: (id: number) => void;
}

function BandCard(props: BandCardProps) {
  return (
    <tr>
      <td>{props.grupo.nombre}</td>

      <td>{props.grupo.genero}</td>

      <td>
        <a
          href={props.grupo.enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-info btn-sm"
        >
          Ver en Bandcamp
        </a>
      </td>

      <td>
        <iframe
          title={props.grupo.nombre}
          style={{ border: 0, width: "250px", height: "42px" }}
          src={props.grupo.embed}
          seamless
        />
      </td>

      <td className="text-center">
        <button
          className="btn btn-warning btn-sm me-2"
          onClick={() => props.onEditBand(props.grupo.id)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>

        <button
          className="btn btn-danger btn-sm"
          onClick={() => props.onDeleteBand(props.grupo.id)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
}

export default BandCard;
