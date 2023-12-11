/*
   Main App Render Component
   PageBodyWrapper function is not our own and was adapted from a post in StackOverflow on November 14th 2023 
   (link: https://stackoverflow.com/questions/58548767/react-router-dom-useparams-inside-class-component)
*/

import "./App.css";
import { Routes, Route, useParams, HashRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import PageBody from "./components/PageBody";
import HomePage from "./components/Homepage";

// wrapper to read the tableName parameter and pass it to PageBody
function PageBodyWrapper() {
  let { tableName } = useParams();
  tableName = tableName[0].toUpperCase() + tableName.slice(1);
  return <PageBody tableName={tableName} />;
}

export default function App() {
  return (
    <div className="App">
      {/*hashrouter used to deploy directly on OSU html server, failed due to lack of SSL*/}
      <HashRouter>
        <header>
          <Navigation />
        </header>
        <div className="card">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/:tableName" exact element={<PageBodyWrapper />} />
          </Routes>
        </div>
        <footer>© 2023 Rafael Cruz, Carleton Foster</footer>
      </HashRouter>
    </div>
  );
}
