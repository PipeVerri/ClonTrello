import { faBars, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dispatch } from "react";
import type { BoardAction, BoardState, OriginalCardPlace } from "../CardContainer/reducer";

interface BaseCardProps {
	id: number;
	state: BoardState;
	dispatch: Dispatch<BoardAction>;
}
type CardProps = BaseCardProps &
	(
		| {
				dragging?: false;
				originalPlace: OriginalCardPlace; // required here
				innerRef: (el: HTMLButtonElement) => void;
		  }
		| {
				dragging: true;
				originalPlace: null; // must be null here
				innerRef?: (el: HTMLButtonElement) => void;
		  }
	);

/**
 * Un componente que muestra la tarjeta dentro de un CardContainer y puede ser arrastrada
 * @param id - El id de la tarjeta, el cual referencia al index del objeto cards
 * @param state - El estado de todo el board
 * @param dispatch - El dispatch del reducer de CardContainer
 * @param dragging - Si la tarjeta esta siendo arrastrada o no
 * @param originalPlace - De que container viene la tarjeta y que posicion tenia originalmente
 * @param innerRef - Si se pasa un valor, sera usado como ref para el div interno de la tarjeta
 * @constructor
 */
export default function Card({
	id,
	state,
	dispatch,
	dragging = false,
	originalPlace,
	innerRef = (_el) => {},
}: CardProps) {
	const placeholder = "Titulo...";

	const handlePress = () => {
		if (!dragging) {
			dispatch({ type: "updateUserActions", param: "dragging", value: id });
			dispatch({
				type: "updateUserActions",
				param: "originalCardPlace",
				value: originalPlace,
			});
		}
	};

	const data = state.cards[id];
	return (
		<button
			className="bg-white rounded-md shadow-md p-2 border-0 py-3 w-card flex flex-row gap-1"
			onMouseDown={handlePress}
			ref={innerRef}
			type={"button"}
		>
			<input
				type="text"
				value={data.title}
				onChange={(e) =>
					dispatch({
						type: "updateCard",
						cardId: id,
						param: "title",
						value: e.target.value,
					})
				}
				onMouseDown={(e) => {
					e.stopPropagation();
				}} // Asi si me clickean, no lo captura el padre y no hago drag
				placeholder={placeholder}
				className={"overflow-hidden text-ellipsis block w-full"}
				size={Math.max(placeholder.length, data.title.length)}
			/>
			<button className={"bg-green-500 p-2 rounded-lg"} type={"button"}>
				<FontAwesomeIcon icon={faPen} color="white" />
			</button>
			<button
				className={"bg-green-500 p-2 rounded-lg"}
				data-testid={"drag-button"}
				type={"button"}
			>
				<FontAwesomeIcon icon={faBars} color="white" />
			</button>
		</button>
	);
}
