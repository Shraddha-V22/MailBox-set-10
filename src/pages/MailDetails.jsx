import React from "react";
import { useParams } from "react-router-dom";
import { mails as MailsData } from "../data/mailData";
import MailCard from "../components/MailCard";

export default function MailDetails() {
  const { mailId } = useParams();
  const mail = MailsData.find((email) => email.mId === mailId);
  const { mId, subject, content, isStarred, unread } = mail;
  return (
    <section className="mail-details">
      <h1 className="subject">{subject}</h1>
      <div>
        <div className="avatar"></div>
        <div className="sender-address">
          <p>email123@gmail.com</p>
          <small>to me</small>
        </div>
      </div>
      <p className="mail-content">{content}</p>
      <div className="btns">
        <button>reply</button>
        <button>forward</button>
      </div>
    </section>
  );
}
