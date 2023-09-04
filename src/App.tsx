
import './App.scss'
import Calculator from './components/Calculator/Calculator'
import { ImCalculator } from "react-icons/im";

function App() {

  return (
    <div className='container'>
      <h1 className='title'>My calculator with Typescripts <ImCalculator size={25} /></h1>
      <Calculator />
      <footer className='footer'>
        <p>Create by <a href='https://erickfabiandev.com/'> erickfabiandev </a></p>
      </footer>
    </div>
  )
}

export default App
