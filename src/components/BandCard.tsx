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
        {props.grupo.embed && (
          <iframe
            title={`Reproductor de ${props.grupo.nombre}`}
            src={props.grupo.embed}
            style={{
              border: 0,
              width: "350px",
              height: "120px",
            }}
            seamless
          />
        )}
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
