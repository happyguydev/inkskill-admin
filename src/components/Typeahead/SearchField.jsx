import React from 'react';
import classNames from 'classnames';
import SuggestionList from './SuggestionList';


const SearchField = ({
  term,
  error,
  suggestions,
  placeholder,
  showList,
  selected,
  className,
  onChange,
  onBlur,
  onSelect,
  onKeyDown,
}) => (
  <div className={classNames('search-field', className)}>
    <input
      type="text"
      className="form-control"
      placeholder={placeholder}
      value={term}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
    <SuggestionList
      visible={showList}
      selected={selected}
      items={suggestions}
      onSelect={onSelect}
    />
    {error && <span className="error">{error}</span>}
  </div>
);


export default SearchField;
