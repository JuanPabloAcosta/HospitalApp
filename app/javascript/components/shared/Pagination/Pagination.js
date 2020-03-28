import React from "react";
import PropTypes from "prop-types";
import * as classNames from "classnames";
import styles from "./pagination-styles";

const PAGER_SIZE = 5;
class Pagination extends React.Component {
  constructor() {
    super();
  }

  renderLeftArrow() {
    const {
      pagy: { page }
    } = this.props;
    let btnClass = classNames({
      disabled: page === 1,
      "waves-effect": page > 1
    });
    return (
      <li className={btnClass}>
        <a
          onClick={() => {
            if (page - 1 > 0) {
              this.props.pageChanged(page - 1);
            }
          }}
        >
          <i className="material-icons">chevron_left</i>
        </a>
      </li>
    );
  }

  renderRightArrow() {
    const {
      pagy: { page, pages }
    } = this.props;
    const btnClass = classNames({
      disabled: page === pages,
      "waves-effect": page < pages
    });
    return (
      <li className={btnClass}>
        <a
          onClick={() => {
            if (page + 1 <= pages) {
              this.props.pageChanged(page + 1);
            }
          }}
        >
          <i className="material-icons">chevron_right</i>
        </a>
      </li>
    );
  }

  renderPageButtons() {
    const {
      pagy: { page, pages }
    } = this.props;
    let pagesToGenerate = PAGER_SIZE;
    if (pages < PAGER_SIZE) {
      pagesToGenerate = pages;
    }
    let array = Array.from(new Array(pagesToGenerate));
    array = array.map((_value, index) => index + 1);

    if (page > array[array.length - 1]) {
      array.shift();
      array.push(page);
    } else if (page < array[0]) {
      array.pop();
      array.splice(0, 1, page);
    }

    const pagesToShow = array.map((value, index) => {
      const pageButtonClass = classNames({
        active: page === value,
        "waves-effect": this.props.pagy !== value + 1
      });

      return (
        <li key={index} className={pageButtonClass}>
          <a onClick={() => this.props.pageChanged(value)}>{value}</a>
        </li>
      );
    });
    return pagesToShow;
  }

  render() {
    let paginationContainerClasses = classNames(
      styles.boundaries,
      "pagination"
    );
    return (
      <ul className={paginationContainerClasses}>
        {this.renderLeftArrow()}
        {this.renderPageButtons()}
        {this.renderRightArrow()}
      </ul>
    );
  }
}

Pagination.propTypes = {
  pagy: PropTypes.object.isRequired,
  pageChanged: PropTypes.func.isRequired
};
export default Pagination;
