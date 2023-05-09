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
import { useState } from "react";
// import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function MailCard({ mail, isSpam, isDeleted, detailed }) {
  const { mId, subject, content, isStarred, unread } = mail;
  const mailCardRef = useRef(null);
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

  return (
    <section
      className={`mail-card ${unread ? "unread" : ""}`}
      ref={mailCardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/mail/${mId}`)}
    >
      <div className="mail-title">
        <div>
          <button
            onClick={() => dispatch({ type: "STAR", payload: mId })}
            className="mail--star"
          >
            {isStarred ? (
              <FontAwesomeIcon icon={faStarFull} title={"starred"} />
            ) : (
              <FontAwesomeIcon icon={faStar} title={"star"} />
            )}
          </button>
        </div>
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
        {/* <Link to={`/mail/${mId}`} className="mail--details-link">
          View details
        </Link> */}
        {!isSpam && !isDeleted && (
          <div>
            <button onClick={() => dispatch({ type: "DELETE", payload: mId })}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              onClick={() => dispatch({ type: "MARK_AS_READ", payload: mId })}
            >
              {unread ? (
                <FontAwesomeIcon icon={faEnvelope} />
              ) : (
                <FontAwesomeIcon icon={faEnvelopeOpen} />
              )}
            </button>
            <button onClick={() => dispatch({ type: "SPAM", payload: mId })}>
              <FontAwesomeIcon icon={faCircleExclamation} />
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
