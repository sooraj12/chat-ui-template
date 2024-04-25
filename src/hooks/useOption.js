import { useCallback, useState } from "react";
import { useAppContext } from ".";

export function useOption(groupID, optionID, chatID) {
  const context = useAppContext();

  const [value, setValue] = useState(
    context.chat.options.getValidatedOption(groupID, optionID, chatID)
  );

  const setOptionValue = useCallback(
    (value) => {
      context.chat.options.setOption(groupID, optionID, value, chatID);
    },
    [groupID, optionID, chatID]
  );

  const option = context.chat.options.findOption(groupID, optionID);

  return [
    value,
    setOptionValue,
    typeof option.renderProps === "function"
      ? option.renderProps(value, context.chat.options, context)
      : option.renderProps,
  ];
}
