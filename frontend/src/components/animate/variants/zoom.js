import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varZoom = (props) => {
    const distance = props?.distance || 720;
    const durationIn = props?.durationIn;
    const durationOut = props?.durationOut;
    const easeIn = props?.easeIn;
    const easeOut = props?.easeOut;

    return {
        // IN
        in: {
            animate: {
                opacity: 1,
                scale: 1,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: 0,
                scale: 0,
                transition: varTranExit({ durationOut, easeOut }),
            },
            initial: { opacity: 0, scale: 0 },
        },
        inDown: {
            animate: {
                opacity: 1,
                scale: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                translateY: 0,
            },
            exit: {
                opacity: 0,
                scale: 0,
                transition: varTranExit({ durationOut, easeOut }),
                translateY: -distance,
            },
            initial: { opacity: 0, scale: 0, translateY: -distance },
        },
        inLeft: {
            animate: {
                opacity: 1,
                scale: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                translateX: 0,
            },
            exit: {
                opacity: 0,
                scale: 0,
                transition: varTranExit({ durationOut, easeOut }),
                translateX: -distance,
            },
            initial: { opacity: 0, scale: 0, translateX: -distance },
        },
        inRight: {
            animate: {
                opacity: 1,
                scale: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                translateX: 0,
            },
            exit: {
                opacity: 0,
                scale: 0,
                transition: varTranExit({ durationOut, easeOut }),
                translateX: distance,
            },
            initial: { opacity: 0, scale: 0, translateX: distance },
        },
        inUp: {
            animate: {
                opacity: 1,
                scale: 1,
                transition: varTranEnter({ durationIn, easeIn }),
                translateY: 0,
            },
            exit: {
                opacity: 0,
                scale: 0,
                transition: varTranExit({ durationOut, easeOut }),
                translateY: distance,
            },
            initial: { opacity: 0, scale: 0, translateY: distance },
        },

        // OUT
        out: {
            animate: {
                opacity: 0,
                scale: 0,
                transition: varTranEnter({ durationIn, easeIn }),
            },
            initial: { opacity: 1, scale: 1 },
        },
        outDown: {
            animate: {
                opacity: 0,
                scale: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                translateY: distance,
            },
            initial: { opacity: 1, scale: 1 },
        },
        outLeft: {
            animate: {
                opacity: 0,
                scale: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                translateX: -distance,
            },
            initial: { opacity: 1, scale: 1 },
        },
        outRight: {
            animate: {
                opacity: 0,
                scale: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                translateX: distance,
            },
            initial: { opacity: 1, scale: 1 },
        },
        outUp: {
            animate: {
                opacity: 0,
                scale: 0,
                transition: varTranEnter({ durationIn, easeIn }),
                translateY: -distance,
            },
            initial: { opacity: 1, scale: 1 },
        },
    };
};
