import { useState } from "react";
import { useMails } from "../contexts/MailContext";
import { useEffect } from "react";

export default function FilterMails({ setFilteredMails }) {
  const [filterInput, setFilterInput] = useState({
    unread: false,
    starred: false,
  });
  const { mails } = useMails();

  useEffect(() => {
    let temp;
    if (!filterInput.unread && !filterInput.starred) {
      temp = mails.allMails;
    } else if (filterInput.unread && filterInput.starred) {
      temp = mails.allMails.filter((mail) => mail.unread && mail.isStarred);
    } else if (filterInput.unread) {
      temp = mails.allMails.filter((mail) => mail.unread);
    } else if (filterInput.starred) {
      temp = mails.allMails.filter((mail) => mail.isStarred);
    }
    setFilteredMails(temp);
  }, [mails, filterInput]);

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
