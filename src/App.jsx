import { Router, RouterProvider } from "react-router";
import { routes } from "./router";
import * as bootstrap from 'bootstrap'
import MessageToast from "./components/messageToast";




function App(){

    return(
<>
    <MessageToast />
    <RouterProvider router={routes} />
</>    
    )
}

export default App;