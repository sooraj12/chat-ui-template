import { useCallback, useEffect, useRef, useState } from "react";
import { useAppContext } from "./useAppContext";

export function useOption(groupID, optionID, chatID) {
  const context = useAppContext();

  const [value, setValue] = useState(
    context.chat.options.getValidatedOption(groupID, optionID, chatID)
  );
  const [version, setVersion] = useState(0);

  const timer = useRef();

  const onUpdate = useCallback(
    (updatedGroupID) => {
      if (groupID === updatedGroupID) {
        setValue(
          context.chat.options.getValidatedOption(groupID, optionID, chatID)
        );
        setVersion((v) => v + 1);
      } else {
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
          setValue(
            context.chat.options.getValidatedOption(groupID, optionID, chatID)
          );
          setVersion((v) => v + 1);
        }, 500);
      }
    },
    [groupID, optionID, chatID]
  );

  useEffect(() => {
    context.chat.on("plugin-options-update", onUpdate);
    return () => {
      context.chat.off("plugin-options-update", onUpdate);
    };
  }, [chatID, onUpdate]);

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
    version,
  ];
}
