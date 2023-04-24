import { useState } from "react";
import { useMails } from "../contexts/MailContext";
import { useEffect } from "react";

export default function FilterMails({ setFilteredMails }) {
  const [filterInput, setFilterInput] = useState([]);
  const { mails } = useMails();

  useEffect(() => {
    let temp;
    temp = mails.allMails.filter((mail) => {
      for (let i = 0; i < filterInput.length; i++) {
        if (!mail[filterInput[i]]) return false;
      }
      return true;
    });
    setFilteredMails(temp);
  }, [mails, filterInput]);

  const filterInputHandler = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFilterInput((prev) => [...prev, name]);
    } else {
      setFilterInput((prev) => prev.filter((item) => item !== name));
    }
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
          name="isStarred"
          id="starred"
          onClick={filterInputHandler}
        />
        <label htmlFor="starred">Starred Mails</label>
      </div>
    </section>
  );
}
