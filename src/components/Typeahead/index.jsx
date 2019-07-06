import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import SearchField from './SearchField';

const ESCAPE = 27;
const ENTER = 13;
const ARROWS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

export default compose(
  mapProps(props => ({
    ...props,
    onInheritChange: props.onChange,
  })),
  withState('term', 'setTerm', props => props.value || ''),
  withState('selected', 'setSelected', 0),
  withState('showList', 'setVisible', false),
  withHandlers({
    handleChange: ({ onInheritChange, name }) => (value) => {
      onInheritChange({ value, name });
    },
  }),
  withHandlers({
    onChange: props => ({ target }) => {
      const { value } = target;

      props.handleChange(value);
      props.setVisible(true);
      props.setTerm(value);
    },
    onSelect: props => (item) => {
      props.onSelect(item);
      props.setVisible(false);
      props.setTerm(item.label);
    },
    onKeyDown: (props) => (event) => {
      if (!props.showList) return;
      let suggestions = props.suggestions || [];
      const max = suggestions.length - 1;
      let newSelected;

      // eslint-disable-next-line default-case
      switch (event.keyCode) {
        case ESCAPE: props.setVisible(false); break;
        case ARROWS.UP:
          newSelected = props.selected - 1;
          if (newSelected < 0) {
            newSelected = 0;
          } else if (newSelected > max) {
            newSelected = max;
          }
          props.setSelected(newSelected)
          break;
        case ARROWS.DOWN:
          newSelected = props.selected + 1;
          if (newSelected < 0) {
            newSelected = 0;
          } else if (newSelected > max) {
            newSelected = max;
          }
          props.setSelected(newSelected);
          break;
        case ENTER:
          if (suggestions[props.selected]) {
            props.onSelect(suggestions[props.selected]);
            props.setVisible(false);
            props.setTerm(suggestions[props.selected].label);
          }
          break;
      }
    }
  }),
)(SearchField);
