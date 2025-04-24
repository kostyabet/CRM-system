import { useContext } from 'react';

import { CollapseDrawerContext } from './../../application/providers/collapse-drawer-provider';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
