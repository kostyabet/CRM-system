import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
    searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
    return searchQuery ? (
        <Paper {...other}>
            <Typography align="center" gutterBottom variant="subtitle1">
                Not found
            </Typography>
            <Typography align="center" variant="body2">
                No results found for &nbsp;
                <strong>&quot;{searchQuery}&quot;</strong>. Try checking for
                typos or using complete words.
            </Typography>
        </Paper>
    ) : (
        <Typography variant="body2"> Please enter keywords</Typography>
    );
}
