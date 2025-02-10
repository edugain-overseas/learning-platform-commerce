import React from "react";
import { ReactComponent as PlusIcon } from "../../images/icons/plus.svg";
import { ReactComponent as MinusIcon } from "../../images/icons/minus.svg";
import RichTextEditor from "../shared/RichTextEditor/RichTextEditor";
import styles from "./Table.module.scss";

const TableConstructor = ({ state, setState }) => {
  console.log(state);

  const onColumnLabelChange = (key, value) => {
    const updatedColumns = state.columns.map((column) => {
      if (column.key === key) {
        return {
          ...column,
          label: value,
        };
      }
      return column;
    });

    setState({
      ...state,
      columns: updatedColumns,
    });
  };

  const onCellLabelChange = (rowIndex, key, value) => {
    const updatedRows = state.rows.map((row, index) => {
      if (index === rowIndex) {
        return row.map((cell) => {
          if (cell.key === key) {
            return {
              ...cell,
              label: value,
            };
          }
          return cell;
        });
      }
      return row;
    });
    setState({
      ...state,
      rows: updatedRows,
    });
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

  const deleteColumn = (key) => {
    const columns = state.columns.filter((column) => column.key !== key);
    const rows = state.rows.map((row) =>
      row.filter((cell) => cell.key !== key)
    );

    setState({ columns, rows });
  };

  const addRow = () => {
    const rows = [
      ...state.rows,
      state.columns.map((column) => ({ key: column.key, label: "" })),
    ];

    setState({ columns: state.columns, rows });
  };

  const deleteRow = (index) => {
    const rows = state.rows.filter((_, rowIndex) => rowIndex !== index);

    setState({ columns: state.columns, rows });
  };

  

  return (
    <div className={styles.constructorWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {state.columns.map((column) => (
              <th key={column.key}>
                <RichTextEditor
                  value={column.label}
                  placeholder=""
                  setValue={(value) => onColumnLabelChange(column.key, value)}
                />
                <button
                  className={styles.deleteColumnBtn}
                  onClick={() => deleteColumn(column.key)}
                >
                  <MinusIcon />
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell) => (
                <td key={cell.key}>
                  <RichTextEditor
                    value={cell.label}
                    placeholder=""
                    setValue={(value) =>
                      onCellLabelChange(index, cell.key, value)
                    }
                  />
                </td>
              ))}
              <button
                className={styles.deleteRowBtn}
                onClick={() => deleteRow(index)}
              >
                <MinusIcon />
              </button>
            </tr>
          ))}
        </tbody>
      </table>
      <button className={styles.addColumnBtn} onClick={addColumn}>
        <span>
          <PlusIcon />
        </span>
      </button>
      <button className={styles.addRowBtn} onClick={addRow}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default TableConstructor;
