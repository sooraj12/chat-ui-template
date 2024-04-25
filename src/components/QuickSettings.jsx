import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { useAppContext, useOption } from "../hooks";
import { useAppDispatch } from "../store";
import { setTabAndOption } from "../store/settings";
import { useCallback } from "react";

const Container = styled.div`
  margin: 0.5rem -0.5rem;

  display: flex;
  flex-wrap: wrap;
  text-align: left;

  justify-content: center;

  @media (min-width: 40em) {
    justify-content: flex-end;
  }

  .mantine-Button-root {
    font-size: 0.7rem;
    color: #999;
  }
`;

export function QuickSettingsButton({ groupID, option }) {
  const context = useAppContext();
  const dispatch = useAppDispatch();

  const [value] = useOption(groupID, option.id, context.id || undefined);

  const onClick = useCallback(() => {
    dispatch(
      setTabAndOption({
        tab: option.displayOnSettingsScreen,
        option: option.id,
      })
    );
  }, [option.id, dispatch, option.displayOnSettingsScreen]);

  const labelBuilder = option.displayInQuickSettings?.label;
  let label = option.id;

  if (labelBuilder) {
    label =
      typeof labelBuilder === "string"
        ? labelBuilder
        : labelBuilder(value, context.chat.options, context);
  }

  return (
    <Button variant="subtle" size="xs" compact onClick={onClick}>
      <span>{label}</span>
    </Button>
  );
}

function QuickSettings() {
  const context = useAppContext();
  const options = context.chat.getQuickSettings();

  if (!options.length) {
    return <div style={{ height: "1rem" }} />;
  }

  return (
    <Container>
      {options.map((o) => (
        <QuickSettingsButton
          groupID={o.groupID}
          option={o.option}
          key={o.groupID + "." + o.option.id}
        />
      ))}
    </Container>
  );
}

export { QuickSettings };
