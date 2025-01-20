import { Header } from "./components/header";
import { MainContainer } from "./components/main-container";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <Header />

      <MainContainer />
    </div>
  );
};

export default App;
