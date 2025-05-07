import React from 'react';
import { Draggable} from 'react-beautiful-dnd';

export const EquipmentFile = (props) => {
    return (
        <Draggable draggableId={`${props.index}`} index={props.index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {props.child}
                </div>
            )}
        </Draggable>
    );
};
