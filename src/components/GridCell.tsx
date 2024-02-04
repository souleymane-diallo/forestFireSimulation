import { motion } from "framer-motion"
import { FireState } from "../types/types"

interface GridCellProps {
  state: string
}

export default function GridCell({ state }: GridCellProps) {

  return (
    <motion.div 
      className={`h-8 w-8 
      ${state === FireState.On ? 'bg-red-600' : 
      state === FireState.Intact ? 'bg-green-600' : 
      'bg-gray-600'}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ ease: "easeOut", duration: 2 }} 
    />
  )
}
