import { configDataType, initFireType, FireState } from "../types/types";

export function makeGrid(width: number, height: number): FireState[][] {
  const grid: FireState[][] = [];

  for (let i = 0; i < width; i++) {
    const row: FireState[] = [];
    for (let j = 0; j < height; j++) {
      row.push(FireState.Intact);
    }

    grid.push(row);
  }
  return grid;
}

// Fonction pour initialiser la grille en allumant une case au hasard en feu (on)
export function initializeGrid(grid: FireState[][], initFire: initFireType[]): FireState[][] {
  // Copie profonde de la grille
  const gridCopy: FireState[][] = grid.map(row => [...row]); 
  const row = initFire[0].initialRow;
  const cell = initFire[0].initialCell;
  gridCopy[row][cell] = FireState.On;
  return gridCopy;
}

export function propagationFire(grid: FireState[][], configData: configDataType): FireState[][] {
  const newGrid: FireState[][] = grid.map(row => [...row]);

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === FireState.On) {
        newGrid[x][y] = FireState.Off;

        // Les 4 directions possibles (haut, bas, gauche, droite)
        const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];

        directions.forEach(([dx, dy]) => {
          const newX = x + dx;
          const newY = y + dy;

          // Vérifier si la nouvelle position est dans la grille
          if (
            newX >= 0 &&
            newX < configData.grid.width &&
            newY >= 0 &&
            newY < configData.grid.height &&
            (dx !== 0 || dy !== 0) && 
            newGrid[newX][newY] === FireState.Intact &&
            Math.random() < configData.propagationProbability
          ) {
            newGrid[newX][newY] = FireState.On;
          }
        });
      }
    });
  });

  return newGrid;
}

export function simulationFinished(grid: FireState[][]): boolean {
  return grid.every(row => row.every(cell => cell !== FireState.On));
}

export function executeSimulation(data: configDataType, grid: FireState[][]): FireState[][] | null {
  if(!simulationFinished(grid)) {
    const gridStep = propagationFire(grid, data);
    return gridStep;
  }
  return null;
}

