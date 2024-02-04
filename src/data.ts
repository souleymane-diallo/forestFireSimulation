export const data = {
  "grid": {
    "height": 10,
    "width": 10
  },
  "initialFire": [{"x": 3, "y":3},],
  "propagationProbability": 0.3
}

type gridType = {
  height: number;
  width: number;
}

type initFireType = {
  x: number;
  y: number;
}

export type configDataType = {
  grid: gridType;
  initialFire: initFireType[];
  propagationProbability: number; 
}

