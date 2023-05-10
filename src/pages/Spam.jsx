import React from "react";
import { useMails } from "../contexts/MailContext";
import MailCard from "../components/MailCard";

export default function Spam() {
  const { mails } = useMails();
  return (
    <section className="emails-section">
      <section>
        {mails?.spam.length > 0 ? (
          mails?.spam.map((mail) => (
            <MailCard key={mail.mId} mail={mail} isSpam />
          ))
        ) : (
          <h3>Nothing in Spam</h3>
        )}
      </section>
    </section>
  );
}
