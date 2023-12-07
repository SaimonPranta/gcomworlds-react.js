 
import "./App.css";
import './Shades/Styles/dashboardSideNav.scss'
import useLoginChecker from "./Hooks/useLoginChecker"; 
import Routess from "./Routes/Routess"; 
import checkAffiliate from "./CustomHooks/CheckAffiliate";


function App() { 
  useLoginChecker();
  checkAffiliate()
 

  return (
    <div className="App"> 
      <Routess />      
    </div>
  );
}

export default App;
