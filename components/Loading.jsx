import React from 'react'
import { IoIosSync } from 'react-icons/io'

import { motion } from 'framer-motion' 

function Loading() {
  return (
    <motion.div 
      className="flex justify-center items-center text-2xl h-full mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="icon-spin text-8xl"
        animate={{ rotate: 360 }}
        transition={{ 
          repeat: Infinity,
          repeatType: "loop",
          duration: 2
        }}
      >
        <IoIosSync />
      </motion.div>

      <motion.span
        className="ml-2 text-6xl"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}  
      >
        Loading
      </motion.span>
    </motion.div>
  )
}

export default Loading