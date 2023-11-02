import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import PageBody from "./components/PageBody";

function PageBodyWrapper() {
  let { tableName } = useParams();
  tableName = tableName[0].toUpperCase() + tableName.slice(1);
  return <PageBody tableName={tableName} />;
}

export default function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <Navigation />
        </header>
        <body>
          <div className="card">
            <Routes>
              <Route path="/:tableName" exact element={<PageBodyWrapper />} />
            </Routes>
          </div>
        </body>
        <footer></footer>
      </Router>
    </div>
  );
}
