import PropTypes from 'prop-types';
import { FormProvider as Form } from 'react-hook-form';
import React from 'react';

// ----------------------------------------------------------------------

FormProvider.propTypes = {
    children: PropTypes.node.isRequired,
    methods: PropTypes.object.isRequired,
    onSubmit: PropTypes.func,
};

export default function FormProvider({ children, methods, onSubmit }) {
    return (
        <Form {...methods}>
            <form onSubmit={onSubmit}>{children}</form>
        </Form>
    );
}
