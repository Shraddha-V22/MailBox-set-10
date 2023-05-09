import { useState } from "react";
import { useMails } from "../contexts/MailContext";
import { useEffect } from "react";

export default function FilterMails() {
  const { dispatch } = useMails();

  const filterInputHandler = (e) => {
    const { name, checked } = e.target;
    dispatch({ type: "FILTER", payload: { name, checked } });
  };

  return (
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
  );
}
