import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varFade = (props) => {
    const distance = props?.distance || 120;
    const durationIn = props?.durationIn;
    const durationOut = props?.durationOut;
    const easeIn = props?.easeIn;
    const easeOut = props?.easeOut;

    return {
        // IN
        in: {
            animate: { opacity: 1, transition: varTranEnter },
            exit: { opacity: 0, transition: varTranExit },
            initial: { opacity: 0 },
        },
        inDown: {
            animate: {
                opacity: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                y: 0,
            },
            exit: {
                opacity: 0,
                transition: varTranExit({ durationOut, easeOut }),
                y: -distance,
            },
            initial: { opacity: 0, y: -distance },
        },
        inLeft: {
            animate: {
                opacity: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                x: 0,
            },
            exit: {
                opacity: 0,
                transition: varTranExit({ durationOut, easeOut }),
                x: -distance,
            },
            initial: { opacity: 0, x: -distance },
        },
        inRight: {
            animate: {
                opacity: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                x: 0,
            },
            exit: {
                opacity: 0,
                transition: varTranExit({ durationOut, easeOut }),
                x: distance,
            },
            initial: { opacity: 0, x: distance },
        },
        inUp: {
            animate: {
                opacity: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                y: 0,
            },
            exit: {
                opacity: 0,
                transition: varTranExit({ durationOut, easeOut }),
                y: distance,
            },
            initial: { opacity: 0, y: distance },
        },

        // OUT
        out: {
            animate: {
                opacity: 0,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: 1,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 1 },
        },
        outDown: {
            animate: {
                opacity: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                y: distance,
            },
            exit: {
                opacity: 1,
                transition: varTranExit({ durationOut, easeOut }),
                y: 0,
            },
            initial: { opacity: 1, y: 0 },
        },
        outLeft: {
            animate: {
                opacity: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                x: -distance,
            },
            exit: {
                opacity: 1,
                transition: varTranExit({ durationOut, easeOut }),
                x: 0,
            },
            initial: { opacity: 1, x: 0 },
        },
        outRight: {
            animate: {
                opacity: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                x: distance,
            },
            exit: {
                opacity: 1,
                transition: varTranExit({ durationOut, easeOut }),
                x: 0,
            },
            initial: { opacity: 1, x: 0 },
        },
        outUp: {
            animate: {
                opacity: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                y: -distance,
            },
            exit: {
                opacity: 1,
                transition: varTranExit({ durationOut, easeOut }),
                y: 0,
            },
            initial: { opacity: 1, y: 0 },
        },
    };
};
