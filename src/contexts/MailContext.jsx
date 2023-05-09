import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";
import { mails as mailsData } from "../data/mailData";
import { useContext } from "react";
import { mailReducer } from "../reducers/mailReducer";

const MailContext = createContext(null);

const initialMails = {
  defaultMails: [...mailsData],
  trash: [],
  spam: [],
  filters: [],
  searchText: "",
  filteredMails: [...mailsData],
};

export default function MailProvider({ children }) {
  const [mails, dispatch] = useReducer(mailReducer, initialMails);

  return (
    <MailContext.Provider value={{ mails, dispatch }}>
      {children}
    </MailContext.Provider>
  );
}

export const useMails = () => useContext(MailContext);
