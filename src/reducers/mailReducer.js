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
      return {
        ...state,
        allMails: state.allMails.filter((mail) => mail.mId !== payload),
        trash: [
          ...state.trash,
          state.allMails.find((mail) => mail.mId === payload),
        ],
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
          mail.mId === payload ? { ...mail, unread: false } : mail
        ),
      };
    default:
      return state;
  }
};
