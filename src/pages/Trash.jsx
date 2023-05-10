import React from "react";
import { useMails } from "../contexts/MailContext";
import MailCard from "../components/MailCard";

export default function Trash() {
  const { mails } = useMails();
  return (
    <section className="emails-section">
      <section>
        {mails?.trash.length > 0 ? (
          mails?.trash.map((mail) => (
            <MailCard key={mail.mId} mail={mail} isDeleted />
          ))
        ) : (
          <h3>Nothing in Trash</h3>
        )}
      </section>
    </section>
  );
}
