import { useDispatch } from "react-redux";
import CrudPage from "./components/CrudPage";
import { useEffect } from "react";
import { fetchData } from "./Toolkit/Slices/UserSlice";

function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  return <CrudPage />;
}

export default App;
