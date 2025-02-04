import Navbar from "./components/Navbar"
import BigBox from './components/BigBox'; 








const App = () => {
  return (
    <div className='px-4 md:px-8 lg:px-16 lx:px-32 2xl:px-64'>
      <Navbar/>
      <BigBox/>
    </div>
  )
}

export default App