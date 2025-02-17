import React, { useRef } from "react";
import { useTableContructor } from "../../hooks/useTableConstructor";
import RichTextEditor from "../shared/RichTextEditor/RichTextEditor";
import styles from "./Table.module.scss";

const TableConstructor = ({ state, setState }) => {
  console.log(state);

  const tableRef = useRef(null);

  const {
    onColumnLabelChange,
    onColumnChildLabelChange,
    onCellLabelChange,
    handleContextMenu,
    renderContextMenu,
  } = useTableContructor(state, setState, tableRef, styles);

  const renderHead = () => {
    const children = state.columns.reduce((childrenArray, col) => {
      if (col.children) {
        return [...childrenArray, ...col.children];
      }
      return [...childrenArray];
    }, []);
    const isChildren = Boolean(children.length);

    const parentRow = (
      <tr>
        {state.columns?.map((column) => {
          const colSpan = column.children ? column.children.length : 1;
          const rowSpan = !column.children && isChildren ? 2 : 1;
          return (
            <th
              key={column.key}
              rowSpan={rowSpan}
              colSpan={colSpan}
              onContextMenu={(e) =>
                handleContextMenu(e, "column", { key: column.key })
              }
            >
              <RichTextEditor
                value={column.label}
                placeholder=""
                setValue={(value) => onColumnLabelChange(column.key, value)}
              />
            </th>
          );
        })}
      </tr>
    );

    const childrenRow = (
      <tr>
        {children.map((child) => (
          <th
            key={child.key}
            onContextMenu={(e) =>
              handleContextMenu(e, "childColumn", { key: child.key })
            }
          >
            <RichTextEditor
              value={child.label}
              placeholder=""
              setValue={(value) => onColumnChildLabelChange(child.key, value)}
            />
          </th>
        ))}
      </tr>
    );

    return (
      <>
        {parentRow}
        {isChildren && childrenRow}
      </>
    );
  };

  const renderBody = () =>
    state.rows?.map((row, index) => (
      <tr
        key={index}
        onContextMenu={(e) => handleContextMenu(e, "row", { rowIndex: index })}
      >
        {row?.map((cell) => (
          <td key={cell.key}>
            <RichTextEditor
              value={cell.label}
              placeholder=""
              setValue={(value) => onCellLabelChange(index, cell.key, value)}
            />
          </td>
        ))}
      </tr>
    ));

  return (
    <div
      className={styles.constructorWrapper}
      ref={tableRef}
      onClick={(e) => handleContextMenu(e)}
    >
      <table className={styles.table}>
        <thead>{renderHead()}</thead>
        <tbody>{renderBody()}</tbody>
      </table>
      {renderContextMenu()}
    </div>
  );
};

export default TableConstructor;
