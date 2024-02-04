import { simulationConfig } from './simulationConfig';
import Grid from "./components/Grid";
import logo from "./assets/cirilgroup.logo.png"

export default function App() {

  return (
    <>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </header>
      <main className="sm:p-8 px-4 py-8 flex-col w-full flex justify-center items-center">
        <div>
          <h1 className="font-semibold text-[#3485A9] text-[32px]">Similation d'un feu de forêt</h1>
          <p className="mt-2 text-[#3485A9] text-[17px]">Implémentation d'une simulation de la propagation d’un feu de forêt.</p>
        </div>
        <Grid
          mappedData={simulationConfig} 
        />
      </main>
    </>
  );
}
