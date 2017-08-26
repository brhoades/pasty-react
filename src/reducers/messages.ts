import {
  SET_GENERAL_ERROR,
} from "../actions/types";

export interface IMessagesReducer {
  general: {
    header: string;
    content: string;
  };
}

const initial: IMessagesReducer = {
  general: {
    header: "",
    content: "",
  },
};

const messages = (state: IMessagesReducer = initial, action) => {
  switch (action.type) {
    case SET_GENERAL_ERROR:
      return {
        general: {
          content: action.error,
          header: action.header,
        },
      };

    default:
      return { ...initial };
  }
};

export default messages;
