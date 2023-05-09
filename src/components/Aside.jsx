import { NavLink } from "react-router-dom";

export default function Aside() {
  const styleLink = ({ isActive }) => (isActive ? "styleActiveLink" : "");

  return (
    <aside className="aside">
      <h1>Email</h1>
      <NavLink className={styleLink} to="/">
        Inbox
      </NavLink>
      <NavLink className={styleLink} to="/spam">
        Spam
      </NavLink>
      <NavLink className={styleLink} to="/trash">
        Trash
      </NavLink>
    </aside>
  );
}
