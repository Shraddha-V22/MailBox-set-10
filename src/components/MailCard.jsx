import React from "react";
import { useMails } from "../contexts/MailContext";
import { Link } from "react-router-dom";

export default function MailCard({ mail }) {
  const { mId, subject, content, isStarred, unread } = mail;
  const { dispatch } = useMails();
  return (
    <section className="mail-card">
      <h3>{subject}</h3>
      <small>{content}</small>
      <button
        onClick={() => dispatch({ type: "STAR", payload: mId })}
        className="mail--star"
      >
        {isStarred ? "starred" : "star"}
      </button>
      <div className="mail--btns">
        <Link to={`/mail/${mId}`} class="mail--details-link">
          View details
        </Link>
        <button onClick={() => dispatch({ type: "DELETE", payload: mId })}>
          Delete
        </button>
        <button
          onClick={() => dispatch({ type: "MARK_AS_READ", payload: mId })}
        >
          {unread ? "Mark as read" : "Already read"}
        </button>
        <button onClick={() => dispatch({ type: "SPAM", payload: mId })}>
          spam
        </button>
      </div>
    </section>
  );
}
