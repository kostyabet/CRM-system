import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';

import useResponsive from './../../shared/hooks/useResponsive';

// ----------------------------------------------------------------------

const initialState = {
    collapseClick: false,
    collapseHover: false,
    onHoverEnter: () => {},
    onHoverLeave: () => {},
    onToggleCollapse: () => {},
};

const CollapseDrawerContext = createContext(initialState);

// ----------------------------------------------------------------------

CollapseDrawerProvider.propTypes = {
    children: PropTypes.node,
};

function CollapseDrawerProvider({ children }) {
    const isDesktop = useResponsive('up', 'lg');

    const [collapse, setCollapse] = useState({
        click: false,
        hover: false,
    });

    useEffect(() => {
        if (!isDesktop) {
            setCollapse({
                click: false,
                hover: false,
            });
        }
    }, [isDesktop]);

    const handleToggleCollapse = () => {
        setCollapse({ ...collapse, click: !collapse.click });
    };

    const handleHoverEnter = () => {
        if (collapse.click) {
            setCollapse({ ...collapse, hover: true });
        }
    };

    const handleHoverLeave = () => {
        setCollapse({ ...collapse, hover: false });
    };

    return (
        <CollapseDrawerContext.Provider
            value={{
                collapseClick: collapse.click,
                collapseHover: collapse.hover,
                isCollapse: collapse.click && !collapse.hover,
                onHoverEnter: handleHoverEnter,
                onHoverLeave: handleHoverLeave,
                onToggleCollapse: handleToggleCollapse,
            }}
        >
            {children}
        </CollapseDrawerContext.Provider>
    );
}

export { CollapseDrawerContext, CollapseDrawerProvider };
