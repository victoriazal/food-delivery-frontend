import { render} from "@testing-library/react";
import Home from "./Home";
describe('Home component', () =>{
  test('Home renders', () =>{
    render(<Home/>);
  })
})