import React from "react";
import { useParams } from "react-router-dom";
import { mails as MailsData } from "../data/mailData";
import MailCard from "../components/MailCard";

export default function MailDetails() {
  const { mailId } = useParams();
  const mail = MailsData.find((email) => email.mId === mailId);
  return <MailCard mail={mail} />;
}
