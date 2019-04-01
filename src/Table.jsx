import React, { Component } from "react";
import Button from "Button.jsx";
import { sortBy } from "lodash";
import Sort from "Sort.jsx";

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  };
}

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: "NONE",
      isSortReverse: false
    };
  }

  onSort = sortKey => {
    const isSortReverse =
      this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({
      sortkey: sortKey,
      isSortReverse: isSortReverse
    });
  };

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <table>
        <thead>
          <td>
            <Sort>Title</Sort>
          </td>
          <td>
            <Sort>Author</Sort>
          </td>
          <td>
            <Sort>Comments</Sort>
          </td>
          <td>
            <Sort>Points</Sort>
          </td>
          <td>Archive</td>
        </thead>
        <tbody>
          {reverseSortedList.map(item => (
            <tr>
              <td>
                <a href={item.url}>{item.title}</a>
              </td>
              <td>{item.author}</td>
              <td>{item.num_comments}</td>
              <td>{item.points}</td>
              <td>
                <Button onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
