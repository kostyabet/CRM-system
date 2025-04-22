//
import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varRotate = (props) => {
    const durationIn = props?.durationIn;
    const durationOut = props?.durationOut;
    const easeIn = props?.easeIn;
    const easeOut = props?.easeOut;

    return {
        // IN
        in: {
            animate: {
                opacity: 1,
                rotate: 0,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: 0,
                rotate: -360,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 0, rotate: -360 },
        },

        // OUT
        out: {
            animate: {
                opacity: 0,
                rotate: -360,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 1, rotate: 0 },
        },
    };
};
