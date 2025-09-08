import "@testing-library/jest-dom"
import {render, screen, waitFor} from "@testing-library/react";
import Card from "../src/components/Card/Card";
import {BoardAction, boardReducer, type BoardState} from "../src/components/CardContainer/reducer";
import CardContainer from "../src/components/CardContainer/CardContainer";
import userEvent from "@testing-library/user-event";
import {useReducer} from "react";
import { fireEvent } from "@testing-library/react";

describe("Card", () => {
    test("correct rendering", () => {
        render(<Card id={0} dragging={true} state={{ // @ts-ignore - no tiene que tener el state entero
            cards: [
                {title: "test"}
            ]
        }}/>);
        expect(screen.getByDisplayValue("test")).toBeInTheDocument();
    })
})

describe("Container", () => {
    const initialState = {
        cards: [
            {title: "test1"},
            {title: "test2"},
            {title: "test3"}
        ],
        containerCards: [
            [0, 1, 2],
            []
        ],
        userActions: {
            dragging: null,
            newIndex: null,
            mouseHoveringContainer: null,
            originalCardPlace: null
        }
    }

    function TestBoard() {
        const [state, dispatch] = useReducer(boardReducer, initialState)
        return (
            <>
                <div data-testid="container0">
                    <CardContainer id={0} state={state} dispatch={dispatch} />
                </div>
                <div data-testid="container1">
                    <CardContainer id={1} state={state} dispatch={dispatch} />
                </div>
            </>
        );
    }

    test("correct rendering", () => {
        render(<TestBoard />)
        expect(screen.getByDisplayValue("test1")).toBeInTheDocument();
        expect(screen.getByDisplayValue("test2")).toBeInTheDocument();
        expect(screen.getByDisplayValue("test3")).toBeInTheDocument();
    })

    test("card addition", async () => {
        render(<TestBoard />)
        const user = userEvent.setup()

        const btn = screen.getAllByRole("button", {name: "add button"})[0]
        await user.click(btn);

        await waitFor(() => {
            expect(screen.getByDisplayValue("")).toBeInTheDocument();
        })
    })

    test("card dragging", async () => {
        render(<TestBoard />);

        const input = screen.getByDisplayValue("test1");
        const card = input.parentElement as HTMLElement;

        // Use fireEvent for more predictable DOM interactions
        fireEvent.mouseDown(card, { button: 0 });

        const destContainer = screen.getByTestId("container1").children[0] as HTMLElement;

        fireEvent.mouseMove(destContainer);
        fireEvent.mouseUp(destContainer);

        await waitFor(() => {
            const updatedContainer = screen.getByTestId("container1")
            screen.debug(updatedContainer)
            console.log(updatedContainer);
        });
    });
})