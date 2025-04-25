import { varTranEnter, varTranExit } from './transition';

// ----------------------------------------------------------------------

export const varBounce = (props) => {
    const durationIn = props?.durationIn;
    const durationOut = props?.durationOut;
    const easeIn = props?.easeIn;
    const easeOut = props?.easeOut;

    return {
        // IN
        in: {
            animate: {
                opacity: [0, 1, 1, 1, 1, 1],
                scale: [0.3, 1.1, 0.9, 1.03, 0.97, 1],
                transition: varTranEnter({ durationIn, easeIn }),
            },
            exit: {
                opacity: [1, 1, 0],
                scale: [0.9, 1.1, 0.3],
            },
            initial: {},
        },
        inDown: {
            animate: {
                opacity: [0, 1, 1, 1, 1],
                scaleY: [4, 0.9, 0.95, 0.985, 1],
                transition: varTranEnter({ durationIn, easeIn }),
                y: [-720, 24, -12, 4, 0],
            },
            exit: {
                opacity: [1, 1, 0],
                scaleY: [0.985, 0.9, 3],
                transition: varTranExit({ durationOut, easeOut }),
                y: [-12, 24, -720],
            },
            initial: {},
        },
        inLeft: {
            animate: {
                opacity: [0, 1, 1, 1, 1],
                scaleX: [3, 1, 0.98, 0.995, 1],
                transition: varTranEnter({ durationIn, easeIn }),
                x: [-720, 24, -12, 4, 0],
            },
            exit: {
                opacity: [1, 1, 0],
                scaleX: [1, 0.9, 2],
                transition: varTranExit({ durationOut, easeOut }),
                x: [0, 24, -720],
            },
            initial: {},
        },
        inRight: {
            animate: {
                opacity: [0, 1, 1, 1, 1],
                scaleX: [3, 1, 0.98, 0.995, 1],
                transition: varTranEnter({ durationIn, easeIn }),
                x: [720, -24, 12, -4, 0],
            },
            exit: {
                opacity: [1, 1, 0],
                scaleX: [1, 0.9, 2],
                transition: varTranExit({ durationOut, easeOut }),
                x: [0, -24, 720],
            },
            initial: {},
        },
        inUp: {
            animate: {
                opacity: [0, 1, 1, 1, 1],
                scaleY: [4, 0.9, 0.95, 0.985, 1],
                transition: { ...varTranEnter({ durationIn, easeIn }) },
                y: [720, -24, 12, -4, 0],
            },
            exit: {
                opacity: [1, 1, 0],
                scaleY: [0.985, 0.9, 3],
                transition: varTranExit({ durationOut, easeOut }),
                y: [12, -24, 720],
            },
            initial: {},
        },

        // OUT
        out: {
            animate: { opacity: [1, 1, 0], scale: [0.9, 1.1, 0.3] },
        },
        outDown: {
            animate: {
                opacity: [1, 1, 0],
                scaleY: [0.985, 0.9, 3],
                y: [12, -24, 720],
            },
        },
        outLeft: {
            animate: {
                opacity: [1, 1, 0],
                scaleX: [1, 0.9, 2],
                x: [0, 24, -720],
            },
        },
        outRight: {
            animate: {
                opacity: [1, 1, 0],
                scaleX: [1, 0.9, 2],
                x: [0, -24, 720],
            },
        },
        outUp: {
            animate: {
                opacity: [1, 1, 0],
                scaleY: [0.985, 0.9, 3],
                y: [-12, 24, -720],
            },
        },
    };
};
