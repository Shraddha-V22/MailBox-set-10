import { NavLink } from "react-router-dom";

export default function Aside() {
  const styleLink = ({ isActive }) => (isActive ? "styleActiveLink" : "");

  return (
    <aside className="aside">
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
