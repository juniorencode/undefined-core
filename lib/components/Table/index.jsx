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
import { cn } from '../../utilities/styles.utilities';
import { Skeleton } from './Skeleton';
import { FaTableColumns } from 'react-icons/fa6';
import { InputCheck } from './InputCheck';
import { useClickOutside } from '../../hooks/useClickOutside.hook';

export const Table = props => {
  const {
    className,
    structure = [],
    data = [],
    loading,
    size = 50,
    page = 1,
    noSeqNum,
    highlighted,
    dndFunc,
    handleUpdate,
    handleDelete,
    handleFeature
  } = props;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const [columns, setColumns] = useState(
    structure.map(col => {
      if (!col.hidden) {
        col.hidden = false;
      }
      return col;
    })
  );

  const handleColumns = (attr, value) => {
    const _columns = columns.map(item => {
      if (item.attr === attr) {
        item.hidden = !value;
      }
      return item;
    });
    setColumns(_columns);
  };

  const AlertDelete = useAlert();
  const [currentId, setCurrentId] = useState(null);
  const [items, setItems] = useState([]);

  const tableContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = () => {
    const scrollLeft = tableContainerRef.current.scrollLeft;
    const maxScrollLeft =
      tableContainerRef.current.scrollWidth -
      tableContainerRef.current.clientWidth;

    setIsScrolling(scrollLeft < maxScrollLeft);
  };

  useEffect(() => {
    setTimeout(handleScroll, 1);

    const tableContainer = tableContainerRef.current;
    tableContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      tableContainer.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data || data.length) {
      const sortedData = [...data].sort((a, b) => a.order - b.order);
      setItems(sortedData);
    }
  }, [data]);

  useEffect(() => {
    handleScroll();
  }, [data, columns, loading]);

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
          <table className="min-w-full text-sm text-left rtl:text-right border-separate border-spacing-0 text-secondary-500 dark:text-secondary-400">
            <thead className="text-xs uppercase text-secondary-500 dark:text-secondary-400">
              <tr className="sticky top-0 left-0 z-10 bg-secondary-100 dark:bg-secondary-700">
                {dndFunc && (
                  <th className="px-4 py-3 w-1 tracking-wider font-medium border-r bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 border-secondary-200 dark:border-secondary-600"></th>
                )}
                {!noSeqNum && (
                  <th className="px-4 py-3 w-1 tracking-wider font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0">
                    #
                  </th>
                )}
                {columns
                  .filter(col => !col.hidden)
                  .map(column => (
                    <th
                      key={column.attr}
                      className="px-4 py-3 tracking-wider font-medium text-nowrap bg-secondary-100 dark:bg-secondary-700 sticky top-0 left-0 border-l border-secondary-200 dark:border-secondary-600"
                    >
                      {column.label}
                    </th>
                  ))}
                {(handleUpdate || handleDelete) && (
                  <th
                    className={cn(
                      'px-4 py-3 w-1 tracking-wider font-medium bg-secondary-100 dark:bg-secondary-700 sticky top-0 right-0 border-l border-secondary-200 dark:border-secondary-600',
                      {
                        'border-special border-opacity-20 dark:border-opacity-100':
                          isScrolling
                      }
                    )}
                  >
                    <div className="relative flex items-center gap-2 justify-center">
                      <button onClick={() => setIsOpen(!isOpen)}>
                        <FaTableColumns size={20} />
                      </button>
                      <div
                        ref={dropdownRef}
                        className={cn(
                          'absolute top-full right-0 hidden mt-2 py-2 text-sm normal-case border shadow-bottom dark:shadow-black rounded-lg overflow-y-auto bg-secondary-700 border-secondary-600',
                          {
                            block: isOpen
                          }
                        )}
                      >
                        <div className="min-w-[200px] max-h-[300px] overflow-y-auto">
                          {columns.map((row, index) => (
                            <InputCheck
                              key={`ske-row-${index}`}
                              name={row.attr}
                              label={row.label}
                              value={!row.hidden}
                              handleChange={val => handleColumns(row.attr, val)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {dndFunc && (
                  <td className="border-r h-2 bg-secondary-100 dark:bg-secondary-700 border-secondary-200 dark:border-secondary-600"></td>
                )}
                {!noSeqNum && (
                  <td className="h-2 bg-secondary-100 dark:bg-secondary-700"></td>
                )}
                {columns
                  .filter(col => !col.hidden)
                  .map((_, index) => (
                    <td
                      key={`fill-${index}`}
                      className="border-l h-2 bg-secondary-100 dark:bg-secondary-700 border-secondary-200 dark:border-secondary-600"
                    ></td>
                  ))}
                {(handleUpdate || handleDelete) && (
                  <td
                    className={cn(
                      'h-2 sticky top-0 right-0 border-l bg-secondary-100 dark:bg-secondary-700 border-secondary-200 dark:border-secondary-600',
                      {
                        'border-special border-opacity-20 dark:border-opacity-100':
                          isScrolling
                      }
                    )}
                  ></td>
                )}
              </tr>
              {loading && (
                <Skeleton
                  isScrolling={isScrolling}
                  columns={columns.filter(col => !col.hidden)}
                  noSeqNum={noSeqNum}
                  dndFunc={dndFunc}
                  actions={Boolean(handleUpdate || handleDelete)}
                />
              )}
              {!loading &&
                items.map((row, index) => (
                  <SortableRow
                    key={row.id || index}
                    row={row}
                    index={index}
                    size={size}
                    page={page}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    handleFeature={handleFeature}
                    highlighted={highlighted}
                    noSeqNum={noSeqNum}
                    shortFileName={shortFileName}
                    handleDeleteEvent={handleDeleteEvent}
                    structure={columns.filter(col => !col.hidden)}
                    dndFunc={dndFunc}
                    isScrolling={isScrolling}
                  />
                ))}
              {items.length === 0 && (
                <tr>
                  <td
                    className="py-4 text-center"
                    colSpan={
                      columns.filter(col => !col.hidden).length +
                      (dndFunc ? 1 : 0) +
                      (!noSeqNum ? 1 : 0) +
                      (handleUpdate || handleDelete ? 1 : 0)
                    }
                  >
                    No hay registros disponibles
                  </td>
                </tr>
              )}
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
  loading: PropTypes.bool,
  size: PropTypes.number,
  page: PropTypes.number,
  noSeqNum: PropTypes.bool,
  highlighted: PropTypes.string,
  dndFunc: PropTypes.func,
  handleUpdate: PropTypes.func,
  handleDelete: PropTypes.func,
  handleFeature: PropTypes.func
};
