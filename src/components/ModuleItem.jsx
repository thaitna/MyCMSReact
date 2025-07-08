import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/constants';

const ModuleItem = ({ module, index, moveModule }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.MODULE,
        item: { index },
        collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    }));

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.MODULE,
        hover: (item) => {
            if (item.index !== index) {
                moveModule(item.index, index);
                item.index = index;
            }
        },
    }));

    return (
        <div
            ref={(node) => drag(drop(node))}
            className={`p-4 mb-4 bg-white rounded-lg shadow-md ${isDragging ? 'opacity-50' : ''}`}
        >
            {module.ModuleName === 'Slides' && <SlidesModule />}
            {module.ModuleName === 'Videos' && <VideosModule />}
            {module.ModuleName === 'Statistics' && <StatisticsModule />}
            {module.ModuleName === 'Links' && <LinksModule />}
        </div>
    );
};

export default ModuleItem;