import Scrollbar from "~/components/Scrollbar"
import {
    Stack,
    Box,
    Typography
} from "@mui/material"
import Iconify from '~/components/Iconify';
import React from "react";

export const EquipmentFilesInfo = ({ 
    files
}) => {
    return (
        <Scrollbar>
            <Box
                direction="column"
                alignItems="left"
            >
                {files.map(file => <FileComponent fileName={file.name} />)}
            </Box>
        </Scrollbar>
    )
}

export const FileComponent = ({ column, fileName }) => {
    const fileExt = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
    return (
        <Stack
            direction={!column ? "row" : "column"}
            sx={{
                display: 'flex',
                verticalAlign: 'center'
            }}
        >
            <Iconify icon={`bi:filetype-${fileExt}`} />
                
            <Typography
                variant="subtitle2"
                sx={{ color: 'text.disabled', pr: 0.1 }}
            >
                {fileName}
            </Typography>
        </Stack>
    )
}