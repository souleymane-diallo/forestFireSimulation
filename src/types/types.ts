type GridDimensions = {
  height: number;
  width: number;
}
  
export type initFireType = {
  initialRow: number;
  initialCell: number;
}
  
export type configDataType = {
  grid: GridDimensions;
  initialFire: initFireType[];
  propagationProbability: number; 
}

export enum FireState {
  Intact = "unburned",
  On = "burning",
  Off = "burned",
}