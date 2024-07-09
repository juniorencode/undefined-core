import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useAlert } from '../../hooks/useAlert.hook';
import { Alert } from '../Alert';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import { SortableRow } from './SortableRow/SortableRow';

const Table = ({
  className,
  structure = [],
  data = [],
  page = 1,
  handleUpdate,
  handleDelete,
  handleFeature,
  highlighted,
  noSeqNum,
  dndFunc
}) => {
  const AlertDelete = useAlert();
  const [currentId, setCurrentId] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (data || data.length) {
      const sortedData = [...data].sort((a, b) => a.order - b.order);
      setItems(sortedData);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = event => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id && item);
      const newIndex = items.findIndex(item => item.id === over.id && item);
      setItems(items => {
        const newItems = arrayMove(items, oldIndex, newIndex);

        return newItems.map((item, index) => ({
          ...item,
          order: index + 1
        }));
      });
      // const oldChange = items.find(item => item.id === active.id && item);
      // const newChange = items.find(item => item.id === over.id && item);
      // console.log(oldChange.order);
      // dndFunc(oldChange.id, { ...oldChange, order: newChange.order });
    }
  };

  const handleDeleteEvent = id => {
    AlertDelete.openAlert();
    setCurrentId(id);
  };

  const handleConfirm = async () => {
    try {
      await handleDelete(currentId);
    } finally {
      AlertDelete.closeAlert();
    }
  };

  const handleCancel = () => setCurrentId(null);

  const shortFileName = originalName => {
    if (!originalName) return;
    const extension = originalName.split('.').pop();
    let name = originalName.replace(/\.[^.]+$/, '');

    if (name.length > 20) {
      name = name.substring(0, 20) + '..';
    }

    return `${name}.${extension}`;
  };

  return (
    <div
      className={clsx(
        'relative overflow-auto border-t border-b dark:border-secondary-500',
        className
      )}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <table className="w-full text-sm text-left rtl:text-right border-separate border-spacing-0 text-secondary-500 dark:text-secondary-400">
            <thead className="text-xs uppercase text-secondary-500 dark:text-secondary-400">
              <tr className="sticky top-0 left-0 z-10 bg-secondary-100 dark:bg-secondary-700">
                {dndFunc && (
                  <th className="px-4 py-4 w-1 font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10"></th>
                )}
                {!noSeqNum && (
                  <th className="px-4 py-4 w-1 font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10">
                    #
                  </th>
                )}
                {structure.map(column => (
                  <th
                    key={column.attr}
                    className={
                      column.attr === 'photo'
                        ? 'px-4 py-4 w-12 font-medium text-nowrap bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10 border-l border-secondary-200 dark:border-secondary-600'
                        : 'px-4 py-4 font-medium text-nowrap bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 z-10 border-l border-secondary-200 dark:border-secondary-600'
                    }
                  >
                    {column.label}
                  </th>
                ))}
                {(handleUpdate || handleDelete) && (
                  <th className="px-4 py-4 w-1 font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 right-0 z-10 border-l border-secondary-200 dark:border-secondary-600">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td
                    className="py-4 text-center"
                    colSpan={structure.length + 2}
                  >
                    No hay registros disponibles
                  </td>
                </tr>
              )}
              {items.map((row, index) => (
                <SortableRow
                  key={row.id || index}
                  row={row}
                  index={index}
                  page={page || 1}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  handleFeature={handleFeature}
                  highlighted={highlighted}
                  noSeqNum={noSeqNum}
                  shortFileName={shortFileName}
                  handleDeleteEvent={handleDeleteEvent}
                  structure={structure}
                  dndFunc={dndFunc}
                />
              ))}
            </tbody>
          </table>
          <Alert
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
            {...AlertDelete.register}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};

Table.propTypes = {
  className: PropTypes.string,
  structure: PropTypes.array,
  data: PropTypes.array,
  page: PropTypes.number,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFeature: PropTypes.func,
  dndFunc: PropTypes.func,
  highlighted: PropTypes.string,
  noSeqNum: PropTypes.bool
};

export { Table };
