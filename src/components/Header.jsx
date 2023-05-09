import React from "react";
import FilterMails from "./FilterMails";

export default function Header() {
  return (
    <section className="header">
      <h1>Email</h1>
      <FilterMails />
    </section>
  );
}
