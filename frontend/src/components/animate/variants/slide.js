//
import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varSlide = (props) => {
    const distance = props?.distance || 160;
    const durationIn = props?.durationIn;
    const durationOut = props?.durationOut;
    const easeIn = props?.easeIn;
    const easeOut = props?.easeOut;

    return {
        inDown: {
            animate: { transition: varTranEnter({ durationIn, easeIn }), y: 0 },
            exit: {
                transition: varTranExit({ durationOut, easeOut }),
                y: -distance,
            },
            initial: { y: -distance },
        },
        inLeft: {
            animate: { transition: varTranEnter({ durationIn, easeIn }), x: 0 },
            exit: {
                transition: varTranExit({ durationOut, easeOut }),
                x: -distance,
            },
            initial: { x: -distance },
        },
        inRight: {
            animate: { transition: varTranEnter({ durationIn, easeIn }), x: 0 },
            exit: {
                transition: varTranExit({ durationOut, easeOut }),
                x: distance,
            },
            initial: { x: distance },
        },
        // IN
        inUp: {
            animate: { transition: varTranEnter({ durationIn, easeIn }), y: 0 },
            exit: {
                transition: varTranExit({ durationOut, easeOut }),
                y: distance,
            },
            initial: { y: distance },
        },

        outDown: {
            animate: {
                transition: varTranEnter({ durationIn, easeIn }),
                y: distance,
            },
            exit: { transition: varTranExit({ durationOut, easeOut }), y: 0 },
            initial: { y: 0 },
        },
        outLeft: {
            animate: {
                transition: varTranEnter({ durationIn, easeIn }),
                x: -distance,
            },
            exit: { transition: varTranExit({ durationOut, easeOut }), x: 0 },
            initial: { x: 0 },
        },
        outRight: {
            animate: {
                transition: varTranEnter({ durationIn, easeIn }),
                x: distance,
            },
            exit: { transition: varTranExit({ durationOut, easeOut }), x: 0 },
            initial: { x: 0 },
        },
        // OUT
        outUp: {
            animate: {
                transition: varTranEnter({ durationIn, easeIn }),
                y: -distance,
            },
            exit: { transition: varTranExit({ durationOut, easeOut }), y: 0 },
            initial: { y: 0 },
        },
    };
};
