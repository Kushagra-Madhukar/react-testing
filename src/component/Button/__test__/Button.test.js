import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button'
import {render, cleanup} from '@testing-library/react'
import renderer from 'react-test-renderer'   //external lib

afterEach(cleanup)  //clear each test after it is done, so it does not affect the other test
it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Button></Button>, div)
})

it("renders button correctly", () => {
    const {getByTestId} = render(<Button label="click me please"></Button>)
    expect(getByTestId('button')).toHaveTextContent("click me please")
})

it("renders button correctly", () => {
    const {getByTestId} = render(<Button label="save"></Button>)
    expect(getByTestId('button')).toHaveTextContent("save")
})

//snapshot testing
it("matches snapshot", () => {
    const tree = renderer.create(<Button label="save"></Button>).toJSON()
    expect(tree).toMatchSnapshot()
})
