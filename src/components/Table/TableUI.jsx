import React from "react";
import styles from "./Table.module.scss";

const TableUI = ({ tableData }) => {
  console.log(tableData);

  const renderHead = () => {
    const children = tableData.columns.reduce((childrenArray, col) => {
      if (col.children) {
        return [...childrenArray, ...col.children];
      }
      return [...childrenArray];
    }, []);
    const isChildren = Boolean(children.length);

    const parentRow = (
      <tr>
        {tableData.columns?.map((column) => {
          const colSpan = column.children ? column.children.length : 1;
          const rowSpan = !column.children && isChildren ? 2 : 1;
          return (
            <th
              key={column.key}
              rowSpan={rowSpan}
              colSpan={colSpan}
              dangerouslySetInnerHTML={{ __html: column.label }}
            ></th>
          );
        })}
      </tr>
    );

    const childrenRow = (
      <tr>
        {children.map((child) => (
          <th
            key={child.key}
            dangerouslySetInnerHTML={{ __html: child.label }}
          ></th>
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
    tableData.rows?.map((row, index) => (
      <tr key={index}>
        {row?.map((cell) => (
          <td
            key={cell.key}
            dangerouslySetInnerHTML={{ __html: cell.label }}
          ></td>
        ))}
      </tr>
    ));

  return (
    <table className={styles.table}>
      <thead>{renderHead()}</thead>
      <tbody>{renderBody()}</tbody>
    </table>
  );
};

export default TableUI;
