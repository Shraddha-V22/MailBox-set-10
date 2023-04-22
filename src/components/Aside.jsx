import { Link } from "react-router-dom";

export default function Aside() {
  return (
    <aside className="aside">
      <Link to="/">Inbox</Link>
      <Link to="/spam">Spam</Link>
      <Link to="/trash">Trash</Link>
    </aside>
  );
}
