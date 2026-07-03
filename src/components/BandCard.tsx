import type { Band } from "../types/Band";

interface BandCardProps {
  grupo: Band;
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
    </tr>
  );
}

export default BandCard;
