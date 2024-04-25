import styled from "@emotion/styled";
import { Button, ActionIcon, Textarea, Loader } from "@mantine/core";
import { getHotkeyHandler, useHotkeys, useMediaQuery } from "@mantine/hooks";
import { useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext, useOption } from "../hooks";
import { QuickSettings } from "./QuickSettings";
import { useGlobalStore } from "../store/useGlobalStore";
import { useShallow } from "zustand/react/shallow";

const Container = styled.div`
  background: #292933;
  border-top: thin solid #393933;
  padding: 1rem 1rem 0.5rem 1rem;

  .inner {
    max-width: 50rem;
    margin: auto;
    text-align: right;
  }

  .settings-button {
    margin: 0.5rem -0.4rem 0.5rem 1rem;
    font-size: 0.7rem;
    color: #999;
  }
`;

function MessageInput(props) {
  const { setMessage, message, tab } = useGlobalStore(
    useShallow((state) => ({
      setMessage: state.message.setMessage,
      message: state.message.msg,
      tab: state.settings.tab,
    }))
  );

  const hasVerticalSpace = useMediaQuery("(min-height: 1000px)");

  const navigate = useNavigate();
  const context = useAppContext();
  const location = useLocation();

  const [submitOnEnter] = useOption("input", "submit-on-enter");

  const onChange = useCallback(
    (e) => {
      setMessage(e.target.value);
    },
    [setMessage]
  );

  const pathname = useLocation().pathname;

  const onSubmit = useCallback(async () => {
    const id = await context.onNewMessage(message);

    if (id) {
      if (!location.pathname.includes(id)) {
        navigate("/chat/" + id);
      }
      setMessage("");
    }
  }, [context, message, navigate, location.pathname, setMessage]);

  useHotkeys([["n", () => document.querySelector("#message-input")?.focus()]]);

  const blur = useCallback(() => {
    document.querySelector("#message-input")?.blur();
  }, []);

  const disabled = context.generating;

  const rightSection = useMemo(() => {
    return (
      <div
        style={{
          opacity: "0.8",
          paddingRight: "0.5rem",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        {context.generating && (
          <>
            <Button
              variant="subtle"
              size="xs"
              compact
              onClick={() => {
                context.chat.cancelReply(
                  context.currentChat.chat?.id,
                  context.currentChat.leaf?.id
                );
              }}
            >
              Cancel
            </Button>
            <Loader size="xs" style={{ padding: "0 0.8rem 0 0.5rem" }} />
          </>
        )}
        {!context.generating && (
          <>
            <ActionIcon size="xl" onClick={onSubmit}>
              <i className="fa fa-paper-plane" style={{ fontSize: "90%" }} />
            </ActionIcon>
          </>
        )}
      </div>
    );
  }, [onSubmit, context.generating, context.chat, context.currentChat]);

  const hotkeyHandler = useMemo(() => {
    const keys = [
      ["Escape", blur, { preventDefault: true }],
      ["ctrl+Enter", onSubmit, { preventDefault: true }],
    ];
    if (submitOnEnter) {
      keys.unshift(["Enter", onSubmit, { preventDefault: true }]);
    }
    const handler = getHotkeyHandler(keys);
    return handler;
  }, [onSubmit, blur, submitOnEnter]);

  const isLandingPage = pathname === "/";
  if (!isLandingPage && !context.id) {
    return null;
  }

  return (
    <Container>
      <div className="inner">
        <Textarea
          disabled={props.disabled || disabled}
          id="message-input"
          autosize
          minRows={hasVerticalSpace || context.isHome ? 3 : 2}
          maxRows={12}
          placeholder={"Ask a question..."}
          value={message}
          onChange={onChange}
          rightSection={rightSection}
          rightSectionWidth={context.generating ? 100 : 55}
          onKeyDown={hotkeyHandler}
        />
        <QuickSettings key={tab} />
      </div>
    </Container>
  );
}

export { MessageInput };
