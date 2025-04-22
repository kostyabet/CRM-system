import { LazyMotion } from 'framer-motion';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

const loadFeatures = () => import('./features.js').then((res) => res.default);

MotionLazyContainer.propTypes = {
    children: PropTypes.node,
};

export default function MotionLazyContainer({ children }) {
    return (
        <LazyMotion features={loadFeatures} strict>
            {children}
        </LazyMotion>
    );
}
