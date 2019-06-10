import React, { Component } from "react";
import Button from "./Button.js";
import { sortBy } from "lodash";
import classNames from "classnames";
import PropTypes from "prop-types";

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, "title"),
  AUTHOR: list => sortBy(list, "author"),
  COMMENTS: list => sortBy(list, "num_comments").reverse(),
  POINTS: list => sortBy(list, "points").reverse()
};

const largeColumn = {
  width: "55%"
};

const midColumn = {
  width: "15%"
};

const smallColumn = {
  width: "10%"
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
      sortKey: sortKey,
      isSortReverse: isSortReverse
    });
  };

  render() {
    const { list, onDismiss } = this.props;
    const { sortKey, isSortReverse } = this.state;

    const sortedList = SORTS[sortKey](list);
    const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

    return (
      <table className='table'>
        <thead className='table-header'>
          <tr>
            <th style={{ width: "40%" }}>
              <Sort
                sortKey={"TITLE"}
                onSort={this.onSort}
                activeSortKey={sortKey}>
                Title
              </Sort>
            </th>
            <th style={{ width: "30%" }}>
              <Sort
                sortKey={"AUTHOR"}
                onSort={this.onSort}
                activeSortKey={sortKey}>
                Author
              </Sort>
            </th>
            <th style={{ width: "10%" }}>
              <Sort
                sortKey={"COMMENTS"}
                onSort={this.onSort}
                activeSortKey={sortKey}>
                Comments
              </Sort>
            </th>
            <th style={{ width: "10%" }}>
              <Sort
                sortKey={"POINTS"}
                onSort={this.onSort}
                activeSortKey={sortKey}>
                Points
              </Sort>
            </th>
            <th style={{ width: "10%" }}>Archive</th>
          </tr>
        </thead>
        <tbody>
          {reverseSortedList.map(item => (
            <tr key={item.objectID} className='table-row'>
              <td style={largeColumn}>
                <a href={item.url}>{item.title}</a>
              </td>
              <td style={midColumn}>{item.author}</td>
              <td style={smallColumn}>{item.num_comments}</td>
              <td style={smallColumn}>{item.points}</td>
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

const Sort = ({ sortKey, activeSortKey, onSort, children }) => {
  const sortClass = classNames("button-inline", {
    "button-active": sortKey === activeSortKey
  });
  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

export default Table;
