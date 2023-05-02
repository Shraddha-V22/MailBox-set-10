export const mailReducer = (state, { type, payload }) => {
  let tempMails = state;
  switch (type) {
    case "STAR":
      tempMails = {
        ...tempMails,
        allMails: tempMails.allMails.map((mail) =>
          mail.mId === payload ? { ...mail, isStarred: !mail.isStarred } : mail
        ),
      };
      break;
    case "DELETE":
      const deletedInInbox = tempMails.allMails.find(
        ({ mId }) => mId === payload
      );
      const deletedInSpam = tempMails.spam.find(({ mId }) => mId === payload);

      tempMails = {
        ...tempMails,
        allMails: deletedInInbox
          ? tempMails.allMails.filter((mail) => mail.mId !== payload)
          : tempMails.allMails,
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
        allMails: tempMails.allMails.filter((mail) => mail.mId !== payload),
        spam: [
          ...tempMails.spam,
          tempMails.allMails.find((mail) => mail.mId === payload),
        ],
      };
      break;
    case "MARK_AS_READ":
      tempMails = {
        ...tempMails,
        allMails: tempMails.allMails.map((mail) =>
          mail.mId === payload ? { ...mail, unread: !mail.unread } : mail
        ),
      };
      break;
    case "RECOVER_MAIL":
      let recoveredMail =
        tempMails.spam.find(({ mId }) => mId === payload) ??
        tempMails.trash.find(({ mId }) => mId === payload);
      let mailOgIndex = tempMails.defaultMails.findIndex(
        ({ mId }) => mId === recoveredMail.mId
      );

      !tempMails.allMails.find(({ mId }) => mId === payload) &&
        tempMails.allMails.splice(mailOgIndex, 0, recoveredMail);

      tempMails = {
        ...tempMails,
        trash: tempMails.trash.find(({ mId }) => mId === payload)
          ? tempMails.trash.filter(({ mId }) => mId !== payload)
          : tempMails.trash,
        spam: tempMails.spam.find(({ mId }) => mId === payload)
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
      filteredMails: tempMails.allMails.filter((mail) =>
        tempMails.filters.every((el) => mail[el])
      ),
    };
  } else {
    tempMails = {
      ...tempMails,
      filteredMails: tempMails.allMails,
    };
  }
  return tempMails;
};
