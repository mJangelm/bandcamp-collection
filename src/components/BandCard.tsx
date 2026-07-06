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
        <a href={props.grupo.enlace} target="_blank" rel="noopener noreferrer">
          Ver en Bandcamp
        </a>
      </td>
            <td>
        <button onClick={() => props.onEditBand(props.grupo.id)}>
          Editar banda
        </button>
      </td>
      <td>
        <button onClick={() => props.onDeleteBand(props.grupo.id)}>
          Borrar banda
        </button>
      </td>
    </tr>
  );
}

export default BandCard;
