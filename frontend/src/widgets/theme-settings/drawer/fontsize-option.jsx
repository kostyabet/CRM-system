import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import { Block } from './styles';
import React from 'react';

export function FontSizeOption({ onChangeOption, minOption, maxOption, step, currentValue }) {
    return (
        <Block title="Font Size">
            <Box sx={{ width: "100%" }}>
                <Slider
                    aria-label="Font Size"
                    defaultValue={currentValue}
                    valueLabelDisplay="auto"
                    step={step}
                    marks
                    min={minOption}
                    max={maxOption}
                    onChange={(value) => onChangeOption(value)}
                />
            </Box>
        </Block>
    )
}