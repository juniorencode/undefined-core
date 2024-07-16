import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
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
import { useAlert } from '../../hooks/useAlert.hook';
import { Alert } from '../Alert';
import { SortableRow } from './SortableRow';
import { cn } from '../../utils/styles';

export const Table = props => {
  const {
    className,
    structure = [],
    data = [],
    page = 1,
    noSeqNum,
    highlighted,
    dndFunc,
    handleUpdate,
    handleDelete,
    handleFeature
  } = props;

  const AlertDelete = useAlert();
  const [currentId, setCurrentId] = useState(null);
  const [items, setItems] = useState([]);

  const tableContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = tableContainerRef.current.scrollLeft;
      const maxScrollLeft =
        tableContainerRef.current.scrollWidth -
        tableContainerRef.current.clientWidth;

      setIsScrolling(scrollLeft < maxScrollLeft);
    };

    handleScroll();

    const tableContainer = tableContainerRef.current;
    tableContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      tableContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    setItems(data);
    //eslint-disable-next-line
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
        'relative border-t border-b overflow-auto dark:border-secondary-500',
        className
      )}
      ref={tableContainerRef}
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
                  <th
                    className={cn(
                      'px-4 py-4 w-1 font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 right-0 z-10 border-l border-secondary-200 dark:border-secondary-600',
                      {
                        'border-l-4 dark:border-secondary-600': isScrolling
                      }
                    )}
                  >
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
                  isScrolling={isScrolling}
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
  noSeqNum: PropTypes.bool,
  highlighted: PropTypes.string,
  dndFunc: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFeature: PropTypes.func
};
