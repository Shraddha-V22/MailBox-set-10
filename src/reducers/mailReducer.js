export const mailReducer = (state, { type, payload }) => {
  switch (type) {
    case "STAR":
      return {
        ...state,
        allMails: state.allMails.map((mail) =>
          mail.mId === payload ? { ...mail, isStarred: !mail.isStarred } : mail
        ),
      };
    case "DELETE":
      console.log(state.trash);
      const deletedInInbox = state.allMails.find(({ mId }) => mId === payload);
      const deletedInSpam = state.spam.find(({ mId }) => mId === payload);

      return {
        ...state,
        allMails: deletedInInbox
          ? state.allMails.filter((mail) => mail.mId !== payload)
          : state.allMails,
        spam: deletedInSpam
          ? state.spam.filter((mail) => mail.mId !== payload)
          : state.spam,
        trash: payload.deletedPermanently
          ? state.trash.filter(({ mId }) => mId !== payload.mId)
          : [...state.trash, deletedInInbox ?? deletedInSpam],
      };
    case "SPAM":
      return {
        ...state,
        allMails: state.allMails.filter((mail) => mail.mId !== payload),
        spam: [
          ...state.spam,
          state.allMails.find((mail) => mail.mId === payload),
        ],
      };
    case "MARK_AS_READ":
      return {
        ...state,
        allMails: state.allMails.map((mail) =>
          mail.mId === payload ? { ...mail, unread: !mail.unread } : mail
        ),
      };
    case "RECOVER_MAIL":
      let recoveredMail =
        state.spam.find(({ mId }) => mId === payload) ??
        state.trash.find(({ mId }) => mId === payload);
      let mailOgIndex = state.defaultMails.findIndex(
        ({ mId }) => mId === recoveredMail.mId
      );

      !state.allMails.find(({ mId }) => mId === payload) &&
        state.allMails.splice(mailOgIndex, 0, recoveredMail);

      return {
        ...state,
        trash: state.trash.find(({ mId }) => mId === payload)
          ? state.trash.filter(({ mId }) => mId !== payload)
          : state.trash,
        spam: state.spam.find(({ mId }) => mId === payload)
          ? state.spam.filter(({ mId }) => mId !== payload)
          : state.spam,
      };
    case "FILTER":
      let temp = [];
      if (payload.checked) {
        temp = [...state.filters, payload.name];
      } else {
        temp = state.filters.filter((item) => item !== payload.name);
      }
      return {
        ...state,
        filters: temp,
      };
    default:
      return state;
  }
};
