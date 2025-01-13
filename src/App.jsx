import { Routes ,Route} from "react-router";
import Setupquiz from"./pages/Setupquiz"
import NavBar from "./components/NavBar";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>

    <NavBar/>
  <Routes>
    <Route path="/" element={<Setupquiz/>}/>
    <Route path="/quiz" element={<Quiz/>}/>
    <Route path="/leaderboard" element={<Leaderboard/>}/>

    
  </Routes>
 
    </>
  );
}

export default App;
