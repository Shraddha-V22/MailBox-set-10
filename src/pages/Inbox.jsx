import React from "react";
import { useMails } from "../contexts/MailContext";
import MailCard from "../components/MailCard";
import FilterMails from "../components/FilterMails";
import { useState } from "react";

export default function Inbox() {
  const {
    mails: { allMails },
  } = useMails();
  return (
    <section>
      <FilterMails />
      <section className="emails-section">
        {allMails.map((mail) => (
          <MailCard key={mail.mId} mail={mail} />
        ))}
      </section>
    </section>
  );
}
