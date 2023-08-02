import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CREATE_ACCOUNT_REQUEST, ROOT_ROUTE, UPDATE_ACCOUNT_REQUEST } from "./pages/routes-config";
import Landing from "./pages/Landing";
import UpdateRequest from "./pages/ViewRequest";
import AccountForm from "./pages/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT_ROUTE} element={<Landing />} />
        <Route path={CREATE_ACCOUNT_REQUEST} element={<AccountForm />} />
        <Route path={UPDATE_ACCOUNT_REQUEST} element={<UpdateRequest />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
