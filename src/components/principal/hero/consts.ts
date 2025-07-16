import { Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12
        }
    }
};

const floatingAnimation = {
    y: [-10, 10, -10]
};

const floatingTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const
};

const floatingTransitionDelay1 = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: 1
};

const floatingTransitionDelay2 = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: 2
};