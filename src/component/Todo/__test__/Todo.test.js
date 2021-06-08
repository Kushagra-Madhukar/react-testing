import ReactDOM from 'react-dom'
import Todo from '../Todo'
import { getByTestId, getQueriesForElement } from '@testing-library/dom'
import {render, fireEvent, waitFor, wait, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {api} from '../api'

//Normally you can mock the entire module using jest.mock("../api")
// jest.mock("../api")
//This however, doesn't work in codesandbox

const mockCreateItem = (api.createItem = jest.fn())
// afterEach(cleanup)

//Tests for Todo using jest and testing-library/dom
test('renders the correct component', () => {
    const root = document.createElement("div")
    ReactDOM.render(<Todo/>, root)
    expect(root.querySelector("h1").textContent).toBe("TODOs")
    expect(root.querySelector("label").textContent).toBe("What needs to be done?")

    const {getByText, getByLabelText} = getQueriesForElement(root)

    expect(getByText("TODOs")).not.toBeNull()
    // expect(root.querySelector("label").textContent).toBe("What needs to be done?")
    expect(getByLabelText("What needs to be done?")).not.toBeNull()
    // expect(root.querySelector("button").textContent).toBe("Add #1")
    expect(getByText("Add #1")).not.toBeNull()
  })

//Using react testing lib
test('renders the correct component', () => {
    const {getByText, getByLabelText} = render(<Todo/>)

    expect(getByText("TODOs")).not.toBeNull()
    // expect(root.querySelector("label").textContent).toBe("What needs to be done?")
    expect(getByLabelText("What needs to be done?")).not.toBeNull()
    // expect(root.querySelector("button").textContent).toBe("Add #1")
    expect(getByText("Add #1")).not.toBeNull()
  })

//event testing
test("allows users to add items to their list", async () => {
    const todoText = "Work on your skills"
    mockCreateItem.mockResolvedValueOnce({id: 123, text: todoText})
    const {getByText, getByLabelText} = render(<Todo/>)
    // const wrapper = render(<Todo/>)
    const input = getByLabelText("What needs to be done?")
    fireEvent.change(input, {target: {value: todoText}})
    fireEvent.click(getByText("Add #1"))

    expect(mockCreateItem).toHaveBeenCalledTimes(1)
    expect(mockCreateItem).toHaveBeenCalledWith("/items", expect.objectContaining({text: todoText}))
    // expect(wrapper.state("items").toBe(["Work on your skills"]))
    await waitFor(() => getByText(todoText))
})


