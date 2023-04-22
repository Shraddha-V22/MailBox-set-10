import { useState } from "react";
import { useMails } from "../contexts/MailContext";
import { useEffect } from "react";

export default function FilterMails() {
  const [filterInput, setFilterInput] = useState({
    unread: false,
    starred: false,
  });
  const { dispatch } = useMails();

  useEffect(() => {
    dispatch({ type: "FILTER", payload: filterInput });
  }, [filterInput]);

  const filterInputHandler = (e) => {
    const { name, checked } = e.target;
    setFilterInput((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <section className="filter-mail">
      <h4>Filter:</h4>
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
          name="starred"
          id="starred"
          onClick={filterInputHandler}
        />
        <label htmlFor="starred">Starred Mails</label>
      </div>
    </section>
  );
}
