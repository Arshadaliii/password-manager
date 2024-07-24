
import Navbar from "./components/Navbar";
import Manager from "./components/manager"
import Footer from "./components/Footer"
import "./App.css";

function App() {
  return (
    <>
     <div className="overflow-hidden">
     <Navbar />
      <div className="min-h-[88vh]">
      <Manager/>
      </div>
      <Footer/>
     </div>
    </>
  )
}

export default App;
