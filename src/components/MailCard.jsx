import React from "react";
import { useMails } from "../contexts/MailContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MailCard({ mail, isSpam, isDeleted, detailed }) {
  const { mId, subject, content, isStarred, unread } = mail;
  const [hovered, setHovered] = useState(false);
  const { dispatch } = useMails();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    console.log("mouse entered");
    setHovered(true);
  };
  const handleMouseLeave = () => {
    console.log("mouse Left");
    setHovered(false);
  };

  const deleteMail = (e, permanent) => {
    e.stopPropagation();
    console.log("clicked", e, permanent);
    dispatch({
      type: "DELETE",
      payload: !permanent ? mId : { deletedPermanently: true, mId },
    });
  };

  return (
    <section
      className={`mail-card ${unread ? "unread" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/mail/${mId}`)}
    >
      <div className="mail-title">
        <button
          className="checkbox-btn"
          onClick={(e) => {
            e.stopPropagation();
            dispatch({
              type: "SELECT_MAILS",
              payload: mId,
            });
          }}
        >
          {mail.isChecked ? (
            <FontAwesomeIcon icon={faSquareCheck} />
          ) : (
            <FontAwesomeIcon icon={faSquare} />
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch({ type: "STAR", payload: mId });
          }}
          className="mail--star"
        >
          {isStarred ? (
            <FontAwesomeIcon icon={faStarFull} title={"starred"} />
          ) : (
            <FontAwesomeIcon icon={faStar} title={"star"} />
          )}
        </button>

        {detailed ? (
          <h3>{subject}</h3>
        ) : (
          <h3>
            {subject.length > 100 ? subject.substr(0, 100) + "..." : subject}
          </h3>
        )}
        {detailed ? (
          <p>{content}</p>
        ) : (
          <p>
            {content.length > 100 ? content.substr(0, 100) + "..." : content}
          </p>
        )}
      </div>
      <div
        className={`mail--btns ${hovered && !detailed ? "" : "hide-element"}`}
      >
        {!isSpam && !isDeleted && (
          <div>
            <button onClick={(e) => deleteMail(e)}>
              <FontAwesomeIcon icon={faTrash} title="move to trash" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "MARK_AS_READ", payload: mId });
              }}
            >
              {unread ? (
                <FontAwesomeIcon icon={faEnvelope} title="mark as read" />
              ) : (
                <FontAwesomeIcon icon={faEnvelopeOpen} title="already read" />
              )}
            </button>
            <button onClick={() => dispatch({ type: "SPAM", payload: mId })}>
              <FontAwesomeIcon
                icon={faCircleExclamation}
                title="move to spam"
              />
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
            <FontAwesomeIcon icon={faTrash} title="move to trash" />
          </div>
        )}
        {isDeleted && (
          <div>
            <button
              onClick={() => dispatch({ type: "RECOVER_MAIL", payload: mId })}
            >
              Move to Inbox
            </button>
            <button onClick={(e) => deleteMail(e, true)}>
              <FontAwesomeIcon icon={faTrash} title="delete permanently" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
