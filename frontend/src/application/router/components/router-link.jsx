import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export const RouterLink = forwardRef(({ href, ...other }, ref) => (
  <Link ref={ref} to={href} {...other} />
));
