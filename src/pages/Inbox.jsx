import React from "react";
import { useMails } from "../contexts/MailContext";
import MailCard from "../components/MailCard";
import FilterMails from "../components/FilterMails";
import { useState } from "react";

export default function Inbox() {
  const {
    mails: { allMails },
  } = useMails();
  const [filteredMails, setFilteredMails] = useState(allMails);

  return (
    <section>
      <FilterMails setFilteredMails={setFilteredMails} />
      <section className="emails-section">
        {filteredMails.map((mail) => (
          <MailCard key={mail.mId} mail={mail} />
        ))}
      </section>
    </section>
  );
}
