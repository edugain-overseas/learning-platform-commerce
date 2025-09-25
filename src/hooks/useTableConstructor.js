import { useCallback, useEffect, useRef, useState } from "react";
import { ReactComponent as ChevronIcon } from "../images/icons/arrowDown.svg";
import { createPortal } from "react-dom";
import { generateTableStateFromFile } from "../utils/generateTableStateFromFile";

export const useTableContructor = (state, setState, tableRef, styles) => {
  const [contextMenu, setContextMenu] = useState(null);
  const resizingRef = useRef(null);
  console.log(tableRef);

  const onColumnLabelChange = (key, value) => {
    console.log("onColumnLabelChange");

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

    // console.log(event, type, data);

    if (!type) {
      setContextMenu(null);
      return;
    }

    const x = event.pageX;
    const y = event.pageY;

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

  const handleFileUpload = async (files) => {
    const file = files[0];
    if (!file) return;

    try {
      const uploadedTableState = await generateTableStateFromFile(file);
      console.log(uploadedTableState);

      setState({ ...state, ...uploadedTableState });
    } catch (err) {
      console.error("Failed to parse table file:", err);
    }
  };

  const handleStartResizeCol = (e, colKey) => {
    e.preventDefault();

    const startX = e.clientX;
    const targetTh = e.target.parentElement;
    const targetTr = e.target.closest("tr");

    const targetWidth = targetTh.offsetWidth;

    const containerWidth = targetTr.offsetWidth;

    resizingRef.current = {
      startX,
      targetWidth,
      targetTh,
      containerWidth,
      colKey,
      width: Math.round((targetWidth / containerWidth) * 100),
    };

    window.addEventListener("mousemove", handeResizeCol);
    window.addEventListener("mouseup", handleStopResizeCol);

    targetTh.closest("table").style.setProperty("cursor", "col-resize");
    e.target.classList.add(styles.active);
  };

  const handeResizeCol = useCallback((e) => {
    if (!resizingRef.current) return;

    const { startX, targetWidth, containerWidth, targetTh } =
      resizingRef.current;
    const deltaX = e.clientX - startX;

    const newAbsoluteWidth = targetWidth + deltaX;
    const newPercentWidth = Math.round(
      (newAbsoluteWidth / containerWidth) * 100
    );
    console.log(newPercentWidth);
    targetTh.style.setProperty("width", `${newPercentWidth}%`);
    resizingRef.current.width = newPercentWidth;
  }, []);

  const handleStopResizeCol = () => {
    window.removeEventListener("mousemove", handeResizeCol);
    window.removeEventListener("mouseup", handleStopResizeCol);

    const targetIsChild = resizingRef.current.colKey.includes("child");

    if (targetIsChild) {
      const parentKey = resizingRef.current.colKey.split("_")[0];
      const updatedColumns = state.columns.map((col) => {
        if (col.key === parentKey) {
          return {
            ...col,
            children: col.children.map((child) => {
              if (child.key === resizingRef.current.colKey) {
                return {
                  ...child,
                  width: resizingRef.current.width,
                };
              }
              return child;
            }),
          };
        }
        return col;
      });

      setState({
        ...state,
        columns: updatedColumns,
      });
    } else {
      const updatedColumns = state.columns.map((col) => {
        if (col.key === resizingRef.current.colKey) {
          return { ...col, width: resizingRef.current.width };
        }
        return col;
      });

      setState({
        ...state,
        columns: updatedColumns,
      });
    }

    resizingRef.current?.targetTh
      .closest("table")
      .style.removeProperty("cursor");

    resizingRef.current?.targetTh
      .querySelector("." + styles.resizer)
      .classList.remove(styles.active);
  };

  const mergeRowCellsAmount = (rowIndex, cellKey) => {
    const cellIndex = state.rows[rowIndex].findIndex(
      (cell) => cell.key === cellKey
    );

    const targetCellsAmount = state.rows[rowIndex].length - (cellIndex + 1);
    return targetCellsAmount;
  };

  const mergeCellInRow = (rowIndex, cellIndex, amountForMerge) => {
    const updatedRows = state.rows.map((row, rIdx) => {
      if (rIdx !== rowIndex) return row;
  
      const newRow = [...row];
      const baseCell = { ...newRow[cellIndex] };
  
      const baseColspan = baseCell.colspan || 1;
      baseCell.colspan = baseColspan + amountForMerge;
  
      newRow.splice(cellIndex, 1, baseCell);
      newRow.splice(cellIndex + 1, amountForMerge);
  
      return newRow;
    });
  
    setState({ ...state, rows: updatedRows });
  };
  

  const mergeCellToFullRow = (rowIndex, cellIndex) => {
    const updatedRows = state.rows.map((row, index) => {
      if (index === rowIndex) {
        const colspan = row.reduce(
          (colspan, cell) => (colspan += cell.colspan ? cell.colspan : 1),
          0
        );
        return [{ ...row[cellIndex], colspan }];
      }
      return row;
    });

    setState({ ...state, rows: updatedRows });
  };

  const mergeColCellsAmount = (rowIndex, cellKey) =>
    state.rows.length - rowIndex - 1;

  const mergeCellInCol = (rowIndex, cellIndex, amountForMerge) => {
    const updatedRows = state.rows.map((row) => [...row]);
  
    const baseCell = { ...updatedRows[rowIndex][cellIndex] };
    const baseRowspan = baseCell.rowspan || 1;
    baseCell.rowspan = baseRowspan + amountForMerge;
  
    updatedRows[rowIndex][cellIndex] = baseCell;
  
    for (let i = 1; i <= amountForMerge; i++) {
      const targetRow = updatedRows[rowIndex + i];
      if (!targetRow) continue;
  
      let colCounter = 0;
      for (let c = 0; c < targetRow.length; c++) {
        const colspan = targetRow[c].colspan || 1;
        if (colCounter === cellIndex) {
          targetRow.splice(c, 1);
          break;
        }
        colCounter += colspan;
      }
    }
  
    setState({ ...state, rows: updatedRows });
  };
  

  useEffect(() => {
    //handle menu close action
    const handleClick = () => setContextMenu(null);
    const handleEsc = (e) => {
      if (e.key === "Escape") setContextMenu(null);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const renderContextMenu = () =>
    contextMenu
      ? createPortal(
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
                <li>
                  <span>Merge cell in row</span>
                  <ChevronIcon className={styles.expandOptionsIcon} />
                  <ul>
                    {Array.from(
                      {
                        length: mergeRowCellsAmount(
                          contextMenu.data.rowIndex,
                          contextMenu.data.cellKey
                        ),
                      },
                      (_, i) => (
                        <li
                          key={i}
                          onClick={() =>
                            handleMenuAction(() =>
                              mergeCellInRow(
                                contextMenu.data.rowIndex,
                                contextMenu.data.cellIndex,
                                i + 1
                              )
                            )
                          }
                        >
                          {i + 1}
                        </li>
                      )
                    )}
                    <li
                      onClick={() =>
                        handleMenuAction(() =>
                          mergeCellToFullRow(
                            contextMenu.data.rowIndex,
                            contextMenu.data.cellIndex
                          )
                        )
                      }
                    >
                      <span>Full row</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Merge cell in column</span>
                  <ChevronIcon className={styles.expandOptionsIcon} />
                  <ul>
                    {Array.from(
                      {
                        length: mergeColCellsAmount(
                          contextMenu.data.rowIndex,
                          contextMenu.data.cellKey
                        ),
                      },
                      (_, i) => (
                        <li
                          key={i}
                          onClick={() =>
                            handleMenuAction(() =>
                              mergeCellInCol(
                                contextMenu.data.rowIndex,
                                contextMenu.data.cellIndex,
                                i + 1
                              )
                            )
                          }
                        >
                          {i + 1}
                        </li>
                      )
                    )}
                    <li
                      onClick={() =>
                        handleMenuAction(() =>
                          mergeCellToFullRow(
                            contextMenu.data.rowIndex,
                            contextMenu.data.cellIndex
                          )
                        )
                      }
                    >
                      <span>Full column</span>
                    </li>
                  </ul>
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
                  handleMenuAction(() =>
                    deleteColumnChild(contextMenu.data.key)
                  )
                }
              >
                Delete child column
              </li>
            )}
          </ul>,
          document.body
        )
      : null;

  return {
    onColumnLabelChange,
    onColumnChildLabelChange,
    onCellLabelChange,
    handleStartResizeCol,
    handleContextMenu,
    renderContextMenu,
    handleFileUpload,
  };
};
