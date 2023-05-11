import { useState } from "react";
import { useMails } from "../contexts/MailContext";
import { useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

export default function FilterMails() {
  const { mails, dispatch } = useMails();
  const selectRef = useRef(null);

  const selectedMails = mails.defaultMails.filter(({ isChecked }) => isChecked);

  const handleSelectFilter = () => {
    selectRef.current.classList.toggle("hide-element");
  };

  const handleFilter = (filterCategory) => {
    dispatch({ type: "SELECT_MAILS", payload: filterCategory });
    handleSelectFilter();
  };

  const filterInputHandler = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: "FILTER", payload: { name, checked } });
  };

  return (
    <section className="filter-comp">
      <section className="filter-mail">
        <input
          type="text"
          placeholder="Search mail"
          className="search-input"
          onChange={(e) =>
            dispatch({ type: "SEARCH_MAIL", payload: e.target.value })
          }
        />
        <div>
          <input
            type="checkbox"
            name="unread"
            id="unread"
            onClick={filterInputHandler}
          />
          <label htmlFor="unread">Unread Mails</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="isStarred"
            id="starred"
            onClick={filterInputHandler}
          />
          <label htmlFor="starred">Starred Mails</label>
        </div>
      </section>
      <section className="select-mails">
        {mails.isChecked ? (
          <div
            onClick={() => dispatch({ type: "SELECT_MAILS", payload: "none" })}
          >
            <FontAwesomeIcon icon={faSquareCheck} />
          </div>
        ) : (
          <div
            onClick={() => dispatch({ type: "SELECT_MAILS", payload: "all" })}
          >
            <FontAwesomeIcon icon={faSquare} />
          </div>
        )}
        <div className="filter-section">
          <div className="filter-select" onClick={handleSelectFilter}>
            <FontAwesomeIcon icon={faCaretDown} />
          </div>
          <div className="filter-list hide-element" ref={selectRef}>
            <ul className="filter-categories-list">
              <li onClick={() => handleFilter("all")}>all</li>
              <li onClick={() => handleFilter("none")}>none</li>
              <li onClick={() => handleFilter("read")}>read</li>
              <li onClick={() => handleFilter("unread")}>unread</li>
              <li onClick={() => handleFilter("starred")}>starred</li>
              <li onClick={() => handleFilter("unstarred")}>unstarred</li>
            </ul>
          </div>
        </div>
        {(mails.isChecked || selectedMails.length > 0) && (
          <section className="flex">
            <FontAwesomeIcon
              icon={faTrash}
              title="delete"
              onClick={() => dispatch({ type: "DELETE" })}
            />
            {selectedMails.length > 0 &&
            selectedMails.every((mail) => !mail.unread) ? (
              <FontAwesomeIcon
                icon={faEnvelopeOpen}
                title="mark as unread"
                onClick={() =>
                  dispatch({ type: "MARK_AS_READ", payload: { selectedMails } })
                }
              />
            ) : (
              <FontAwesomeIcon
                icon={faEnvelope}
                title="mark as read"
                onClick={() =>
                  dispatch({ type: "MARK_AS_READ", payload: { selectedMails } })
                }
              />
            )}
            <FontAwesomeIcon
              icon={faCircleExclamation}
              title="Report Spam"
              onClick={() => dispatch({ type: "SPAM" })}
            />
          </section>
        )}
      </section>
    </section>
  );
}
