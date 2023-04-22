import React from "react";
import { useMails } from "../contexts/MailContext";
import MailCard from "../components/MailCard";

export default function Trash() {
  const { mails } = useMails();
  return (
    <section>
      <h1>Trash</h1>
      <section>
        {mails?.trash.length > 0 ? (
          mails?.trash.map((mail) => <MailCard key={mail.mId} mail={mail} />)
        ) : (
          <h3>Nothing in Trash</h3>
        )}
      </section>
    </section>
  );
}