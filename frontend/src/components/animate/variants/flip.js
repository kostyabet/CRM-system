import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varFlip = (props) => {
    const durationIn = props?.durationIn;
    const durationOut = props?.durationOut;
    const easeIn = props?.easeIn;
    const easeOut = props?.easeOut;

    return {
        // IN
        inX: {
            animate: {
                opacity: 1,
                rotateX: 0,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: 0,
                rotateX: -180,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 0, rotateX: -180 },
        },
        inY: {
            animate: {
                opacity: 1,
                rotateY: 0,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: 0,
                rotateY: -180,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 0, rotateY: -180 },
        },

        // OUT
        outX: {
            animate: {
                opacity: 0,
                rotateX: 70,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 1, rotateX: 0 },
        },
        outY: {
            animate: {
                opacity: 0,
                rotateY: 70,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 1, rotateY: 0 },
        },
    };
};
