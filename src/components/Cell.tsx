import { motion } from "framer-motion"
import { CellState } from "../utils";

interface CellProps {
  caseEnum: string
}

export default function Cell({ caseEnum }: CellProps) {

  return (
    <motion.div 
      className={`h-8 w-8 cursor-pointer 
      ${caseEnum === CellState.On ? 'bg-red-600' : 
      caseEnum === CellState.Green ? 'bg-green-600' : 
      'bg-gray-600'}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }} 
    />
  )
}
