import { useState } from "react";
import { ReactComponent as ChevronIcon } from "../images/icons/arrowDown.svg";

export const useTableContructor = (state, setState, tableRef, styles) => {
  const [contextMenu, setContextMenu] = useState(null);

  const onColumnLabelChange = (key, value) => {
    const updatedColumns = state.columns.map((column) =>
      column.key === key ? { ...column, label: value } : column
    );
    setState({ ...state, columns: updatedColumns });
  };

  const onColumnChildLabelChange = (key, value) => {
    console.log(key, value);

    const parentKey = key.split("_")[0];
    const updatedColumns = state.columns.map((column) => {
      if (column.key === parentKey) {
        return {
          ...column,
          children: column.children.map((child) =>
            child.key === key ? { ...child, label: value } : child
          ),
        };
      }
      return column;
    });
    setState({ ...state, columns: updatedColumns });
  };

  const onCellLabelChange = (rowIndex, key, value) => {
    const updatedRows = state.rows.map((row, index) =>
      index === rowIndex
        ? row.map((cell) =>
            cell.key === key ? { ...cell, label: value } : cell
          )
        : row
    );
    setState({ ...state, rows: updatedRows });
  };

  const addColumn = () => {
    const key = `key-${state.columns.length}`;
    const columns = [
      ...state.columns,
      {
        key,
        label: "",
      },
    ];
    const rows = state.rows.map((row) => [...row, { key, label: "" }]);

    setState({ columns, rows });
  };

  const addColumnChildren = (key, amount) => {
    const targetColumn = state.columns.find((col) => col.key === key);

    const childrenArray = Array(amount)
      .fill(null)
      .map((_, index) => ({
        key: `${key}_child-${
          targetColumn.children ? targetColumn.children.length + index : index
        }`,
        label: "",
      }));

    const updatedColumns = state.columns.map((col) => {
      if (col.key === key) {
        return {
          ...col,
          children: targetColumn.children
            ? [...targetColumn.children, ...childrenArray]
            : childrenArray,
        };
      }
      return col;
    });

    const updatedRows = state.rows.map((row) => {
      if (targetColumn.children) {
        const lastChildKey =
          targetColumn.children[targetColumn.children.length - 1].key;
        const lastChildCellIndex = row.findIndex(
          (row) => row.key === lastChildKey
        );

        return row.toSpliced(lastChildCellIndex + 1, 0, ...childrenArray);
      }

      const targetCellIndex = row.findIndex((cell) => cell.key === key);

      const childCells = childrenArray.map((cell, index) => {
        if (index === 0) {
          return {
            ...cell,
            label: row[targetCellIndex]?.label || "",
          };
        }
        return cell;
      });

      return row.toSpliced(targetCellIndex, 1, ...childCells);
    });

    setState({ columns: updatedColumns, rows: updatedRows });
  };

  const deleteColumn = (key) => {
    const columnToDelete = state.columns.find((col) => col.key === key);
    const columns = state.columns.filter((column) => column.key !== key);
    const rows = state.rows.map((row) =>
      row.filter(
        (cell) =>
          cell.key !== key &&
          !columnToDelete.children?.find((child) => child.key === cell.key)
      )
    );

    setState({ columns, rows });
  };

  const deleteColumnChild = (key) => {
    const parentColumnKey = key.split("_")[0];

    const updatedColumn = (col) => {
      const children = col.children.filter((child) => child.key !== key);
      return children.length
        ? {
            ...col,
            children: col.children.filter((child) => child.key !== key),
          }
        : { key: col.key, label: col.label };
    };

    const columns = state.columns.map((col) =>
      col.key === parentColumnKey ? updatedColumn(col) : col
    );
    const rows = state.rows.map((row) => {
      if (columns.find((col) => col.key === parentColumnKey).children) {
        return row.filter((cell) => cell.key !== key);
      }
      return row.map((cell) =>
        cell.key === key ? { key: parentColumnKey, label: "" } : cell
      );
    });

    setState({ columns, rows });
  };

  const addRow = () => {
    const newRow = state.columns.reduce((row, column) => {
      console.log(row, column);

      if (column.children?.length) {
        return [
          ...row,
          ...column.children.map(({ key }) => ({ key, label: "" })),
        ];
      }
      return [...row, { key: column.key, label: "" }];
    }, []);

    setState({ columns: state.columns, rows: [...state.rows, newRow] });
  };

  const deleteRow = (index) => {
    const rows = state.rows.filter((_, rowIndex) => rowIndex !== index);
    setState({ columns: state.columns, rows });
  };

  const handleContextMenu = (event, type, data) => {
    event.preventDefault();
    if (!type) {
      setContextMenu(null);
      return;
    }

    const rect = tableRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setContextMenu({
      type,
      x,
      y,
      data,
    });
  };

  const handleMenuAction = (callback) => {
    setContextMenu(null);
    if (callback) callback();
  };

  const renderContextMenu = () =>
    contextMenu ? (
      <ul
        className={styles.contextMenu}
        style={{
          top: `${contextMenu.y}px`,
          left: `${contextMenu.x}px`,
        }}
      >
        {contextMenu.type === "row" && (
          <>
            <li
              onClick={() =>
                handleMenuAction(() => addRow(contextMenu.data.rowIndex))
              }
            >
              Add Row
            </li>
            <li
              onClick={() =>
                handleMenuAction(() => deleteRow(contextMenu.data.rowIndex))
              }
            >
              Delete Row
            </li>
          </>
        )}
        {contextMenu.type === "column" && (
          <>
            <li
              onClick={() =>
                handleMenuAction(() => addColumn(contextMenu.data.key))
              }
            >
              Add Column
            </li>
            <li
              onClick={() =>
                handleMenuAction(() => deleteColumn(contextMenu.data.key))
              }
            >
              Delete Column
            </li>
            <li>
              <span>Add Children</span>
              <ChevronIcon className={styles.expandOptionsIcon} />
              <ul>
                {Array.from([1, 2, 3, 4, 5], (amount) => (
                  <li
                    key={amount}
                    onClick={() =>
                      handleMenuAction(() =>
                        addColumnChildren(contextMenu.data.key, amount)
                      )
                    }
                  >
                    {amount}
                  </li>
                ))}
              </ul>
            </li>
          </>
        )}
        {contextMenu.type === "childColumn" && (
          <li
            onClick={() =>
              handleMenuAction(() => deleteColumnChild(contextMenu.data.key))
            }
          >
            Delete child column
          </li>
        )}
      </ul>
    ) : null;

  return {
    onColumnLabelChange,
    onColumnChildLabelChange,
    onCellLabelChange,
    handleContextMenu,
    renderContextMenu,
  };
};
