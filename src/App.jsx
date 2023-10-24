
import './App.css'
import Home from './Components/Home';
import Info from './Components/Info';
import { useRoutes } from "react-router-dom";



function App() {
  let element = useRoutes([
    {
      path: "/",
      element: < Home/>,
    },
    {
      path: "/Info/:symbol",
      element: <Info />,
    },
  ]);
  
  
  return (
    <div>
      {element}
    </div>
  );
}

export default App
