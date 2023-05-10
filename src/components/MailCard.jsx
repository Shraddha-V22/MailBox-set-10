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

export default function MailCard({ mail, isSpam, isDeleted }) {
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
    dispatch({
      type: "DELETE",
      payload: !permanent ? mId : { deletedPermanently: true, mId },
    });
  };

  const recoverMail = (e) => {
    e.stopPropagation();
    dispatch({
      type: "RECOVER_MAIL",
      payload: mId,
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

        <h3>{subject.length > 25 ? subject.substr(0, 25) + "..." : subject}</h3>
        <p className="mail-content">
          {content.length > 80 ? content.substr(0, 80) + "..." : content}
        </p>
      </div>
      <div className={`mail--btns ${hovered ? "" : "hide-element"}`}>
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: "SPAM", payload: mId });
              }}
            >
              <FontAwesomeIcon
                icon={faCircleExclamation}
                title="move to spam"
              />
            </button>
          </div>
        )}
        {isSpam && (
          <div>
            <button onClick={recoverMail}>Move to Inbox</button>
            <FontAwesomeIcon icon={faTrash} title="move to trash" />
          </div>
        )}
        {isDeleted && (
          <div>
            <button onClick={recoverMail}>Move to Inbox</button>
            <button onClick={(e) => deleteMail(e, true)}>
              <FontAwesomeIcon icon={faTrash} title="delete permanently" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
