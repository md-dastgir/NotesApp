
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllNotes from "./components/AllNotes";
import NewNote from "./components/NewNote";
import EditNote from "./components/EditNote";


const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<AllNotes />} />
            <Route path="/new" element={<NewNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App