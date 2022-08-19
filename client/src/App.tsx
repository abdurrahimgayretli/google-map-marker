import Form from "./components/Form";
import Map from "./components/Map";
import { DataContextProvider } from "./context";

function App() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <DataContextProvider>
        <Map />
        <Form />
      </DataContextProvider>
    </div>
  );
}

export default App;
