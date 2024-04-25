import styled from "@emotion/styled";
import { Button } from "@mantine/core";
import { useAppContext, useOption } from "../hooks";
import { useCallback } from "react";
import { useGlobalStore } from "../store/useGlobalStore";
import { useShallow } from "zustand/react/shallow";

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

  const { setTabAndOption } = useGlobalStore(
    useShallow((state) => ({
      setTabAndOption: state.settings.setTabAndOption,
    }))
  );

  const [value] = useOption(groupID, option.id, context.id || undefined);

  const onClick = useCallback(() => {
    setTabAndOption(option.displayOnSettingsScreen, option.id);
  }, [option.id, option.displayOnSettingsScreen, setTabAndOption]);

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
