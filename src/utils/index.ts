import { configDataType, } from "../types/types";

export enum CellState {
  Green = 'green',
  On = 'on',
  Off = 'off',
}

export type initFireType = {
  x: number;
  y: number;
};

export function makeGrid(width: number, height: number): CellState[][] {
  const grid: CellState[][] = [];

  for (let i = 0; i < width; i++) {
    const row: CellState[] = [];
    for (let j = 0; j < height; j++) {
      row.push(CellState.Green);
    }

    grid.push(row);
  }
  return grid;
}

// Fonction pour initialiser la grille en allumant une case au hasard en feu (on)
export function initializeGrid(grid: CellState[][], initFire: initFireType[]): CellState[][] {
  const gridCopy: CellState[][] = grid.map(row => [...row]); // Copie profonde de la grille
  const X = initFire[0].x;
  const Y = initFire[0].y;
  gridCopy[X][Y] = CellState.On;
  return gridCopy;
}

export function propagationFire(grid: CellState[][], configData: configDataType): CellState[][] {
  const newGrid: CellState[][] = grid.map(row => [...row]);

  grid.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (cell === CellState.On) {
        newGrid[x][y] = CellState.Off;

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
            // Vérifier si la case adjacente est exactement à une distance de 1 dans l'une des 4 directions
            (dx !== 0 || dy !== 0) && // Cette condition exclut la case actuelle (la case en feu elle-même)
            newGrid[newX][newY] === CellState.Green &&
            Math.random() < configData.propagationProbability
          ) {
            newGrid[newX][newY] = CellState.On;
          }
        });
      }
    });
  });

  return newGrid;
}


export function simulationFinished(grid: CellState[][]): boolean {
  return grid.every(row => row.every(cell => cell !== CellState.On));
}

export function executeSimulation(data: configDataType, grid: CellState[][]): CellState[][] | null {
  if(!simulationFinished(grid)) {
    const gridStep = propagationFire(grid, data);
    return gridStep;
  }
  return null;
}

