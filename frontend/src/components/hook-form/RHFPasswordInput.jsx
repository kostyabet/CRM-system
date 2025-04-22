import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

import { RHFTextField } from '.';
import React from 'react';

const RHFPasswordInput = (props) => {
    const [values, setValues] = useState(false);

    return (
        <RHFTextField
            {...props}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() => setValues(!values)}
                            onMouseDown={() => setValues(!values)}
                        >
                            {values ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            type={values ? 'text' : 'password'}
        >
            {props.children}
        </RHFTextField>
    );
};

export default RHFPasswordInput;
