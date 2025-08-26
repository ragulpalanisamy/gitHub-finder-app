import { BrowserRouter, Route, Routes } from "react-router-dom";

import GithubUserFinder from "./components";
import Slack from "./components/Integration/Slack";
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GithubUserFinder />} />
        <Route path="/slack" element={<Slack />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
