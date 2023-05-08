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
      break;
    case "SPAM":
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
      break;
    case "MARK_AS_READ":
      tempMails = {
        ...tempMails,
        defaultMails: tempMails.defaultMails.map((mail) =>
          mail.mId === payload ? { ...mail, unread: !mail.unread } : mail
        ),
      };
      break;
    case "RECOVER_MAIL":
      const spamMail = tempMails.spam.find(({ mId }) => mId === payload);
      const trashMail = tempMails.trash.find(({ mId }) => mId === payload);
      const recoveredMail = spamMail ?? trashMail;

      !tempMails.defaultMails.find(({ mId }) => mId === payload) &&
        tempMails.defaultMails.push(recoveredMail);

      const tempSortedMails = tempMails.defaultMails.filter(({ mId }) =>
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
    case "FILTER":
      let temp = [];
      if (payload.checked) {
        temp = [...state.filters, payload.name];
      } else {
        temp = tempMails.filters.filter((item) => item !== payload.name);
      }
      tempMails = {
        ...state,
        filters: temp,
      };
      break;
    default:
      break;
  }

  if (tempMails.filters.length > 0) {
    tempMails = {
      ...tempMails,
      filteredMails: tempMails.defaultMails.filter((mail) =>
        tempMails.filters.every((el) => mail[el])
      ),
    };
  } else {
    tempMails = {
      ...tempMails,
      filteredMails: tempMails.defaultMails,
    };
  }
  return tempMails;
};
