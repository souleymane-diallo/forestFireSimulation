type gridType = {
  height: number;
  width: number;
}
  
export type initFireType = {
  x: number;
  y: number;
}
  
export type configDataType = {
  grid: gridType;
  initialFire: initFireType[];
  propagationProbability: number; 
}