//
import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varScale = (props) => {
    const durationIn = props?.durationIn;
    const durationOut = props?.durationOut;
    const easeIn = props?.easeIn;
    const easeOut = props?.easeOut;

    return {
        // IN
        inX: {
            animate: {
                opacity: 1,
                scaleX: 1,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: 0,
                scaleX: 0,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 0, scaleX: 0 },
        },
        inY: {
            animate: {
                opacity: 1,
                scaleY: 1,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: 0,
                scaleY: 0,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 0, scaleY: 0 },
        },

        // OUT
        outX: {
            animate: {
                opacity: 0,
                scaleX: 0,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            initial: { opacity: 1, scaleX: 1 },
        },
        outY: {
            animate: {
                opacity: 0,
                scaleY: 0,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            initial: { opacity: 1, scaleY: 1 },
        },
    };
};
