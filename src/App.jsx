import "./App.css";
import { Routes, Route } from "react-router-dom";
import Inbox from "./pages/inbox";
import Spam from "./pages/Spam";
import Trash from "./pages/Trash";
import Aside from "./components/Aside";
import Header from "./components/Header";
import MailDetails from "./pages/MailDetails";

function App() {
  return (
    <div className="layout">
      <Header />
      <Aside />
      <section className="main">
        <Routes>
          <Route path="/" element={<Inbox />} />
          <Route path="/mail/:mailId" element={<MailDetails />} />
          <Route path="/spam" element={<Spam />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
