import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { configDataType, FireState } from "../types/types";
import { makeGrid, initializeGrid, executeSimulation} from "../utils/fireSimulation";
import Cell from "./GridCell";

interface GridProps {
  mappedData: configDataType;
}

export default function Grid({ mappedData }: GridProps) {
  /* Local Data */
  const { grid, initialFire } = mappedData;
  
  const [gridState, setGridState] = useState<FireState[][] | null>(null);

  /* Methods */
  // Function to initialize the grid at the beginning
  function initializeGridState() {
    const gridArray = makeGrid(grid.width, grid.height);
    const gridInitialize = initializeGrid(gridArray, initialFire);

    setGridState(gridInitialize);
  }

  // Function to perform one step of the simulation
  function advanceSimulation() {
    if (gridState) {
      const newGrid = executeSimulation(mappedData, gridState);
      if (newGrid) {
        setGridState(newGrid);
      } else {
        Swal.fire({
          title: "Information",
          text: "Simulation terminée. Aucun arbre n'est en feu!",
          icon: "info",
          confirmButtonText: "OK"
        });
      }
    }
  }

  useEffect(() => {
    initializeGridState(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="flex bg-[#adddf1] p-2 flex-col shadow-md rounded-md justify-between items-center gap-2 mt-5">
      <motion.div
        className="grid grid-cols-10 gap-0.5"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        {gridState &&
          gridState.map((row, i) =>
            row.map((cell, j) => (
              <Cell key={`${i}-${j}`} state={cell} />
            ))
          )}
      </motion.div>
      <div className="mt-2">
      <button 
        className="font-inter font-medium bg-[#3485A9] text-white px-4 py-2 rounded-md" 
        onClick={advanceSimulation}>Étape suivante</button>
      </div>
    </section>
  )
}
