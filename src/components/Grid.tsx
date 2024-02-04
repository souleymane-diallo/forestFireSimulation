import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import { configDataType } from "../data";
import { makeGrid, initializeGrid, executeSimulation, CellState } from "../utils";
import Cell from "./Cell";

interface GridProps {
  mappedData: configDataType;
}

export default function Grid({ mappedData }: GridProps) {
  /* Local Data */
  const { grid, initialFire } = mappedData;
  
  const [gridState, setGridState] = useState<CellState[][] | null>(null);

  /* Methods */
  // Function to initialize the grid at the beginning
  function initializeGridState() {
    const gridArray = makeGrid(grid.width, grid.height);
    const gridInitialize = initializeGrid(gridArray, initialFire);

    setGridState(gridInitialize);
  }

  // Fonction pour effectuer une étape de la simulation
  function nextStep() {
    if (gridState) {
      const newGrid = executeSimulation(mappedData, gridState);
      if (newGrid) {
        setGridState(newGrid);
      } else {
        alert('Simulation is finished. No trees on fire.');
      }
    }
  }

  useEffect(() => {
    initializeGridState(); 
  }, []);

  return (
    <section className="flex bg-purple-300 p-4 flex-col shadow-md rounded-md justify-between items-center gap-2 mt-5">
      <motion.div
        className="grid grid-cols-10 gap-0.5"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {gridState &&
          gridState.map((row, i) =>
            row.map((cell, j) => (
              <Cell key={`${i}-${j}`} caseEnum={cell} />
            ))
          )}
      </motion.div>
      <div className="mt-2">
      <button 
        className="font-inter font-medium bg-[#3485A9] text-white px-4 py-2 rounded-md" 
        onClick={nextStep}>Étape suivante</button>
      </div>
    </section>
  )
}
