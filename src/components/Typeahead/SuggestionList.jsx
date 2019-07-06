import React from 'react';
import classNames from 'classnames';

const SuggestionList = ({
  items = [],
  visible,
  selected,
  onSelect,
}) => (
  <div className={classNames('dropdown', { open: visible && items.length })}>
    <ul className="dropdown-menu">
      {items.map((item, index) => (
        <li
          key={item.id}
          className={classNames({ active: selected === index })}
          onClick={() => onSelect(item)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  </div>
);

export default SuggestionList;
