import { useAnimate, motion, useCycle, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const setAsRef = (el, ...refs) => {
    refs.forEach((ref) => { ref.current = el });
    console.log("refs", refs);
};

export default function CardListContainer({ cardList, searchfield }) {
    const [done, setDone] = useState(false);
    const [speed, setSpeed] = useCycle(120, 500);
    const x = useMotionValue(0);
    const widthRef = useRef();

    const animateCards = async (xEnd) => {
        if (done) {
            await animate(x, [0, xEnd], {
                duration: speed,
                repeat: Infinity,
                ease: "linear",
            });
        } else {
            await animate(x, [x.get(), xEnd], {
                duration: speed * (1 - x.get() / xEnd),
                ease: "linear",
                onComplete: () => setDone(true),
            });
        }
    };

    useEffect(() => {
        const xEnd = -widthRef.current.scrollWidth / 2 - 10;
        if (!searchfield) {
            animateCards(xEnd); // Start/resume animation if searchfield is empty
        }
    }, [speed, done, searchfield]);

    useEffect(() => {
        if (searchfield) {
            // Stop the carousel when search field is not empty
            setDone(true);
            animate(x, 0, { duration: 0.5 }); // Reset to the initial position
        }
    }, [searchfield]);

    return (
        <motion.div
            className="card-list-wrapper"
            style={{ x }}
            onHoverStart={() => {
                setDone(false);
                setSpeed();
            }}
            onHoverEnd={() => setSpeed()}
            ref={(el) => setAsRef(el, widthRef)}
        >
            {[cardList, cardList].map((val, i) => val)}
        </motion.div>
    );
}
