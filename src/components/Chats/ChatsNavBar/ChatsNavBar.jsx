import React from "react";
import styles from "../Chats.module.scss";
import HorizontalScroller from "../../shared/HorizontalScroller/HorizontalScroller";

const chats = [
  {
    id: 1,
    title:
      "Chat 1 Chat 1 Chat 1 Chat 1Chat 1 Chat 1 Chat 1 Chat 1 Chat 1 Chat 1",
  },
  {
    id: 2,
    title: "Chat 2",
  },
  {
    id: 3,
    title: "Chat 3",
  },
  {
    id: 4,
    title: "Chat 4",
  },
  {
    id: 5,
    title: "Chat 5",
  },
  {
    id: 6,
    title: "Chat 6",
  },
  {
    id: 7,
    title: "Chat 7",
  },
  {
    id: 8,
    title: "Chat 8",
  },
];

const ChatsNavBar = () => {
  return (
    <div className={styles.navWrapper}>
      <HorizontalScroller>
        <ul className={styles.navItems}>
          {chats.map(({ id, title }) => (
            <li key={id}>
              <button type="button">
                <span title={title}>{title}</span>
              </button>
            </li>
          ))}
          {chats.map(({ id, title }) => (
            <li key={id}>
              <button type="button">
                <span title={title}>{title}</span>
              </button>
            </li>
          ))}
          {chats.map(({ id, title }) => (
            <li key={id}>
              <button type="button">
                <span title={title}>{title}</span>
              </button>
            </li>
          ))}
        </ul>
      </HorizontalScroller>
    </div>
  );
};

export default ChatsNavBar;
