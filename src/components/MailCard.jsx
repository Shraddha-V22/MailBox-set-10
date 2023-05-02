import React from "react";
import { useMails } from "../contexts/MailContext";
import { Link } from "react-router-dom";

export default function MailCard({ mail, isSpam, isDeleted }) {
  const { mId, subject, content, isStarred, unread } = mail;
  const { dispatch } = useMails();
  return (
    <section className="mail-card">
      <h3>
        {mId} {subject}
      </h3>
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
        {!isSpam && !isDeleted && (
          <div>
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
        )}
        {isSpam && (
          <div>
            <button
              onClick={() => dispatch({ type: "RECOVER_MAIL", payload: mId })}
            >
              Move to Inbox
            </button>
            <button onClick={() => dispatch({ type: "DELETE", payload: mId })}>
              Delete
            </button>
          </div>
        )}
        {isDeleted && (
          <div>
            <button
              onClick={() => dispatch({ type: "RECOVER_MAIL", payload: mId })}
            >
              Move to Inbox
            </button>
            <button
              onClick={() =>
                dispatch({
                  type: "DELETE",
                  payload: { deletedPermanently: true, mId },
                })
              }
            >
              Delete Permanently
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
