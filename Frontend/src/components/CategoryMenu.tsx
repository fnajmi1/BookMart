// src/components/CategoryMenu.tsx

import React from "react";
import "../styles/CategoryMenu.css";
import { FaTimes } from "react-icons/fa";

interface Props {
  categories: string[];
  selected: string;
  onSelectCategory: (category: string) => void;
  onClose: () => void;
  visible: boolean;
}

export default function CategoryMenu({
  categories,
  selected,
  onSelectCategory,
  onClose,
  visible
}: Props) {
  if (!visible) return null;

  return (
    <div className="category-sidebar">
      <div className="category-header">
        <h3>Genre </h3>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <ul className="category-list">
        {categories.map((cat) => (
          <li
            key={cat}
            className={cat === selected ? "active" : ""}
            onClick={() => {
              onSelectCategory(cat);
              onClose();
            }}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}
