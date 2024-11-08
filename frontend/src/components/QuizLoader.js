import { motion } from "framer-motion";
import "../pages/styles/QuizLoader.css"

const opDuration = 0.8

const loaderContainerVariants = {
    visible: {
        // rotate: [null, 360],
        transition: {
            duration: 5,
            repeat: Infinity, 
            
            staggerChildren: 0.3 
        }
    }

};

const loaderVariants = {
    visible: (i) => ({
        y: [-10, 0],
        opacity: [0.5, 1],
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: opDuration,
            type: "tween",
            ease: "easeInOut"
        }
    }),
};

const testVariants = {
    hidden: {
        scale: 1
    },
    visible: {
        scale: 1.5
    }
};

export default function QuizLoader(){
    return <motion.div className= "loader-container"
        variants= {loaderContainerVariants}        
        animate= "visible"
    >
        { Array(3).fill(0).map((val, i) => <motion.div key= {i}
            variants= {loaderVariants}  
            custom = {i} 
            className= "loader"     
        ></motion.div>) }
        {/* <motion.div className= "loader"
            variants= {testVariants}
            initial= "hidden"
            animate= "visible"
            transition= {{ repeat: Infinity, repeatType: "mirror", ease: "easeInOut", duration: 1 }}
        >
        </motion.div> */}
    </motion.div>
}
    
