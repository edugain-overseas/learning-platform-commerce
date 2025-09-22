import { useEffect, useRef, useState } from "react";
import { useTableContructor } from "../../hooks/useTableConstructor";
import RichTextEditor from "../shared/RichTextEditor/RichTextEditor";
import DropZone from "../shared/Uploaders/DropZone/Dropzone";
import fileUploaderStyles from "../shared/Uploaders/FileUploader/FileUploader.module.scss";
import styles from "./Table.module.scss";

const TableConstructor = ({ state, setState }) => {
  const tableRef = useRef(null);
  const [editing, setEditing] = useState(null);
  const [tableHeight, setTableHeight] = useState(null);

  console.log(state);

  const {
    onColumnLabelChange,
    onColumnChildLabelChange,
    onCellLabelChange,
    handleStartResizeCol,
    handleContextMenu,
    renderContextMenu,
    handleFileUpload,
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
        {state.columns?.map((column, index, array) => {
          const colSpan = column.children ? column.children.length : 1;
          const rowSpan = !column.children && isChildren ? 2 : 1;

          const isEditing =
            editing?.part === "head" && editing?.key === column.key;

          return (
            <th
              key={column.key}
              rowSpan={rowSpan}
              colSpan={colSpan}
              style={{ width: column.width + "%" }}
              onContextMenu={(e) =>
                handleContextMenu(e, "column", { key: column.key })
              }
              data-key={column.key}
            >
              {isEditing ? (
                <RichTextEditor
                  value={column.label}
                  placeholder=""
                  setValue={(value) => onColumnLabelChange(column.key, value)}
                  type="tableConstructor"
                  onBlur={() => setEditing(null)}
                />
              ) : (
                <div
                  className={styles.contentContainer}
                  dangerouslySetInnerHTML={{ __html: column.label }}
                  onClick={() =>
                    setEditing({
                      part: "head",
                      key: column.key,
                    })
                  }
                ></div>
              )}

              {index !== array.length - 1 && (
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => handleStartResizeCol(e, column.key)}
                  style={{ height: tableHeight }}
                ></span>
              )}
            </th>
          );
        })}
      </tr>
    );

    const childrenRow = (
      <tr>
        {children.map((child, index, array) => {
          const isEditing =
            editing?.part === "head" && editing?.key === child.key;
          return (
            <th
              className={styles.child}
              key={child.key}
              onContextMenu={(e) =>
                handleContextMenu(e, "childColumn", { key: child.key })
              }
              data-key={child.key}
            >
              {isEditing ? (
                <RichTextEditor
                  value={child.label}
                  placeholder=""
                  setValue={(value) =>
                    onColumnChildLabelChange(child.key, value)
                  }
                  type="tableConstructor"
                  onBlur={() => setEditing(false)}
                />
              ) : (
                <div
                  className={styles.contentContainer}
                  dangerouslySetInnerHTML={{ __html: child.label }}
                  onClick={() =>
                    setEditing({
                      part: "head",
                      key: child.key,
                    })
                  }
                ></div>
              )}

              {index !== array.length - 1 && (
                <span
                  className={styles.resizer}
                  onMouseDown={(e) => handleStartResizeCol(e, child.key)}
                ></span>
              )}
            </th>
          );
        })}
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
    state.rows?.map((row, rIndex) => (
      <tr key={rIndex}>
        {row?.map((cell, cIndex) => {
          const isEditing =
            editing?.part === "body" &&
            rIndex === editing?.rowIndex &&
            cIndex === editing?.cellIndex;

          return (
            <td
              key={cell.key}
              data-key={`${cell.key}`}
              colspan={cell.colspan}
              onContextMenu={(e) =>
                handleContextMenu(e, "row", {
                  rowIndex: rIndex,
                  cellKey: cell.key,
                  cellIndex: cIndex,
                })
              }
            >
              {isEditing ? (
                <RichTextEditor
                  value={cell.label}
                  placeholder=""
                  setValue={(value) =>
                    onCellLabelChange(rIndex, cell.key, value)
                  }
                  type="tableConstructor"
                  onBlur={() => setEditing(null)}
                />
              ) : (
                <div
                  className={styles.contentContainer}
                  dangerouslySetInnerHTML={{ __html: cell.label }}
                  onClick={() =>
                    setEditing({
                      part: "body",
                      rowIndex: rIndex,
                      cellIndex: cIndex,
                    })
                  }
                ></div>
              )}
            </td>
          );
        })}
      </tr>
    ));

  useEffect(() => {
    if (tableRef.current) {
      setTableHeight(tableRef.current.clientHeight);
    }
  }, [tableRef]);

  return (
    <>
      <div
        className={styles.constructorWrapper}
        onClick={(e) => handleContextMenu(e)}
      >
        <table className={styles.table} ref={tableRef}>
          <thead>{renderHead()}</thead>
          <tbody>{renderBody()}</tbody>
        </table>
        {renderContextMenu()}
      </div>
      <div style={{ height: "300rem", position: "relative" }}>
        <DropZone
          onDrop={handleFileUpload}
          className={fileUploaderStyles.dropzone}
          accept={{
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [".xlsx"],
            "application/vnd.ms-excel": [".xls"],
            "text/csv": [".csv"],
          }}
          iconSize="m"
          type="table"
        />
      </div>
    </>
  );
};

export default TableConstructor;
