import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInbox } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useMails } from "../contexts/MailContext";

export default function Aside() {
  const { mails } = useMails();
  const styleLink = ({ isActive }) => (isActive ? "styleActiveLink" : "");

  return (
    <aside className="aside">
      <h1>Email</h1>
      <NavLink className={styleLink} to="/">
        <div className="flex">
          <FontAwesomeIcon icon={faInbox} />
          <small>Inbox</small>
          <small>{mails.filteredMails.length}</small>
        </div>
      </NavLink>
      <NavLink className={styleLink} to="/spam">
        <div className="flex">
          <FontAwesomeIcon icon={faExclamationCircle} />
          <small>Spam</small>
          <small>{mails.spam.length !== 0 && mails.spam.length}</small>
        </div>
      </NavLink>
      <NavLink className={styleLink} to="/trash">
        <div className="flex">
          <FontAwesomeIcon icon={faTrash} />
          <small>Trash</small>
          <small>{mails.trash.length !== 0 && mails.trash.length}</small>
        </div>
      </NavLink>
    </aside>
  );
}
