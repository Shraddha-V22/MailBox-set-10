import React from "react";
import { useMails } from "../contexts/MailContext";
import MailCard from "../components/MailCard";
import FilterMails from "../components/FilterMails";

export default function Inbox() {
  const { mails } = useMails();

  // const filteredData =
  //   mails.filters.length > 0
  //     ? mails.allMails.filter((mail) => mails.filters.every((el) => mail[el]))
  //     : mails.allMails;

  return (
    <section>
      <FilterMails />
      <section className="emails-section">
        {mails.filteredMails.map((mail) => (
          <MailCard key={mail.mId} mail={mail} />
        ))}
      </section>
    </section>
  );
}
