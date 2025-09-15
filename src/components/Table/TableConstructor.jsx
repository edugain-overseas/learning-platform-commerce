import { useRef } from "react";
import { useTableContructor } from "../../hooks/useTableConstructor";
import RichTextEditor from "../shared/RichTextEditor/RichTextEditor";
import DropZone from "../shared/Uploaders/DropZone/Dropzone";
import fileUploaderStyles from "../shared/Uploaders/FileUploader/FileUploader.module.scss";
import styles from "./Table.module.scss";
import Textarea from "../shared/Textarea/Textarea";

const TableConstructor = ({ state, setState }) => {
  const tableRef = useRef(null);

  const {
    onColumnLabelChange,
    onColumnChildLabelChange,
    onCellLabelChange,
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
                type="tableConstructor"
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
              type="tableConstructor"
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
            <Textarea
              value={cell.label}
              onChange={(value) => onCellLabelChange(index, cell.key, value)}
              maxRows={4}
              minRows={2}
            />
          </td>
        ))}
      </tr>
    ));

  return (
    <>
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
