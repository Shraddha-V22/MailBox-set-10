import { mails as originalData } from "../data/mailData";

export const mailReducer = (state, { type, payload }) => {
  let tempMails = state;
  switch (type) {
    case "STAR":
      tempMails = {
        ...tempMails,
        defaultMails: tempMails.defaultMails.map((mail) =>
          mail.mId === payload ? { ...mail, isStarred: !mail.isStarred } : mail
        ),
      };
      break;
    case "DELETE":
      const deletedInInbox = tempMails.defaultMails.find(
        ({ mId }) => mId === payload
      );
      const deletedInSpam = tempMails.spam.find(({ mId }) => mId === payload);

      if (payload) {
        tempMails = {
          ...tempMails,
          defaultMails: deletedInInbox
            ? tempMails.defaultMails.filter((mail) => mail.mId !== payload)
            : tempMails.defaultMails,
          spam: deletedInSpam
            ? tempMails.spam.filter((mail) => mail.mId !== payload)
            : tempMails.spam,
          trash: payload.deletedPermanently
            ? tempMails.trash.filter(({ mId }) => mId !== payload.mId)
            : [...tempMails.trash, deletedInInbox ?? deletedInSpam],
        };
      } else {
        tempMails = {
          ...tempMails,
          defaultMails: tempMails.defaultMails.filter(
            (mail) => !mail.isChecked
          ),
          trash: [
            ...tempMails.trash,
            ...tempMails.defaultMails
              .filter((mail) => mail.isChecked)
              .map((mail) => ({ ...mail, isChecked: !mail.isChecked })),
          ],
        };
      }
      break;
    case "SPAM":
      if (payload) {
        tempMails = {
          ...tempMails,
          defaultMails: tempMails.defaultMails.filter(
            (mail) => mail.mId !== payload
          ),
          spam: [
            ...tempMails.spam,
            tempMails.defaultMails.find((mail) => mail.mId === payload),
          ],
        };
      } else {
        tempMails = {
          ...tempMails,
          defaultMails: tempMails.defaultMails.filter(
            (mail) => !mail.isChecked
          ),
          spam: [
            ...tempMails.spam,
            ...tempMails.defaultMails
              .filter((mail) => mail.isChecked)
              .map((mail) => ({ ...mail, isChecked: !mail.isChecked })),
          ],
        };
      }
      break;
    case "MARK_AS_READ":
      if (!payload.selectedMails) {
        tempMails = {
          ...tempMails,
          defaultMails: tempMails.defaultMails.map((mail) =>
            mail.mId === payload ? { ...mail, unread: !mail.unread } : mail
          ),
        };
      } else {
        tempMails = {
          ...tempMails,
          defaultMails: payload.selectedMails.every((mail) => !mail.unread)
            ? tempMails.defaultMails.map((mail) =>
                mail.isChecked
                  ? { ...mail, unread: true, isChecked: !mail.isChecked }
                  : mail
              )
            : tempMails.defaultMails.map((mail) =>
                mail.isChecked
                  ? { ...mail, unread: false, isChecked: !mail.isChecked }
                  : mail
              ),
        };
      }
      break;
    case "RECOVER_MAIL":
      const spamMail = tempMails.spam.find(({ mId }) => mId === payload);
      const trashMail = tempMails.trash.find(({ mId }) => mId === payload);
      const recoveredMail = spamMail ?? trashMail;

      !tempMails.defaultMails.find(({ mId }) => mId === payload) &&
        tempMails.defaultMails.push(recoveredMail);

      const tempSortedMails = originalData.filter(({ mId }) =>
        tempMails.defaultMails.find((mail) => mail.mId === mId)
      );

      tempMails = {
        ...tempMails,
        defaultMails: tempSortedMails,
        trash: trashMail
          ? tempMails.trash.filter(({ mId }) => mId !== payload)
          : tempMails.trash,
        spam: spamMail
          ? tempMails.spam.filter(({ mId }) => mId !== payload)
          : tempMails.spam,
      };
      break;
    case "SEARCH_MAIL":
      tempMails = {
        ...tempMails,
        searchText: payload,
      };
      break;
    case "FILTER":
      let temp = [];
      if (payload.checked) {
        temp = [...tempMails.filters, payload.name];
      } else {
        temp = tempMails.filters.filter((item) => item !== payload.name);
      }
      tempMails = {
        ...tempMails,
        filters: temp,
      };
      break;
      c;
    case "SELECT_MAILS":
      // console.log(payload);
      if (payload.name === "select-all") {
        tempMails = {
          ...tempMails,
          isChecked: payload.checked,
          defaultMails: tempMails.defaultMails.map((mail) => ({
            ...mail,
            isChecked: payload.checked,
          })),
        };
      } else {
        tempMails = {
          ...tempMails,
          defaultMails: tempMails.defaultMails.map((mail) =>
            payload === mail.mId
              ? { ...mail, isChecked: !mail.isChecked }
              : mail
          ),
        };
      }
      // console.log(tempMails.defaultMails);
      break;
    default:
      break;
  }

  if (tempMails.searchText.length) {
    tempMails = {
      ...tempMails,
      filteredMails: tempMails.defaultMails.filter(
        ({ subject, content }) =>
          subject.toLowerCase().includes(tempMails.searchText.toLowerCase()) ||
          content.toLowerCase().includes(tempMails.searchText.toLowerCase())
      ),
    };
  } else {
    tempMails = {
      ...tempMails,
      filteredMails: tempMails.defaultMails,
    };
  }

  if (tempMails.filters.length > 0) {
    tempMails = {
      ...tempMails,
      filteredMails: tempMails.filteredMails.filter((mail) =>
        tempMails.filters.every((el) => mail[el])
      ),
    };
  } else {
    tempMails = {
      ...tempMails,
      filteredMails: tempMails.filteredMails,
    };
  }
  return tempMails;
};
