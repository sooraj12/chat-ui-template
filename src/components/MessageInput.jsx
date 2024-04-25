import styled from "@emotion/styled";
import { Button, ActionIcon, Textarea, Loader, Popover } from "@mantine/core";
import { getHotkeyHandler, useHotkeys, useMediaQuery } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAppContext } from '../core/context';
// import { useAppDispatch, useAppSelector } from '../store';
// import { selectMessage, setMessage } from '../store/message';
// import { selectSettingsTab, openOpenAIApiKeyPanel } from '../store/settings-ui';
// import { QuickSettings } from "./QuickSettings";
// import { useOption } from '../core/options/use-option';

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

const context = {};

function MessageInput(props) {
  // const message = useAppSelector(selectMessage);
  const hasVerticalSpace = useMediaQuery("(min-height: 1000px)");

  const [initialMessage, setInitialMessage] = useState("");

  const navigate = useNavigate();
  // const context = useAppContext();
  // const dispatch = useAppDispatch();

  // const tab = useAppSelector(selectSettingsTab);
  const tab = 1;

  // const [submitOnEnter] = useOption("input", "submit-on-enter");

  // const onChange = useCallback(
  //   (e) => {
  //     dispatch(setMessage(e.target.value));
  //   },
  //   [dispatch]
  // );

  const pathname = useLocation().pathname;

  // const onSubmit = useCallback(async () => {
  //   setSpeechError(null);

  //   const id = await context.onNewMessage(message);

  //   if (id) {
  //     if (!window.location.pathname.includes(id)) {
  //       navigate("/chat/" + id);
  //     }
  //     dispatch(setMessage(""));
  //   }
  // }, [context, message, dispatch, navigate]);

  // const onSpeechError = useCallback(
  //   (e) => {
  //     console.error("speech recognition error", e);
  //     setSpeechError(e.message);

  //     try {
  //       speechRecognition?.stop();
  //     } catch (e) {}

  //     try {
  //       stopRecording();
  //     } catch (e) {}

  //     setRecording(false);
  //   },
  //   [stopRecording]
  // );

  // const onHideSpeechError = useCallback(() => setSpeechError(null), []);

  // const onSpeechStart = useCallback(async () => {
  //   let granted = false;
  //   let denied = false;

  //   try {
  //     const result = await navigator.permissions.query({ name: "microphone" });
  //     if (result.state == "granted") {
  //       granted = true;
  //     } else if (result.state == "denied") {
  //       denied = true;
  //     }
  //   } catch (e) {}

  //   if (!granted && !denied) {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({
  //         video: false,
  //         audio: true,
  //       });
  //       stream.getTracks().forEach((track) => track.stop());
  //       granted = true;
  //     } catch (e) {
  //       denied = true;
  //     }
  //   }

  //   if (denied) {
  //     onSpeechError(new Error("speech permission was not granted"));
  //     return;
  //   }

  //   try {
  //     if (!recording) {
  //       setRecording(true);

  //       if (useOpenAIWhisper || !supportsSpeechRecognition) {
  //         if (!openAIApiKey) {
  //           dispatch(openOpenAIApiKeyPanel());
  //           return false;
  //         }
  //         // recorder.start().catch(onSpeechError);
  //         setInitialMessage(message);
  //         await startRecording();
  //       } else if (speechRecognition) {
  //         const initialMessage = message;

  //         speechRecognition.continuous = true;
  //         speechRecognition.interimResults = true;

  //         speechRecognition.onresult = (event) => {
  //           let transcript = "";
  //           for (let i = 0; i < event.results.length; i++) {
  //             if (event.results[i].isFinal && event.results[i][0].confidence) {
  //               transcript += event.results[i][0].transcript;
  //             }
  //           }
  //           dispatch(setMessage(initialMessage + " " + transcript));
  //         };

  //         speechRecognition.start();
  //       } else {
  //         onSpeechError(new Error("not supported"));
  //       }
  //     } else {
  //       if (useOpenAIWhisper || !supportsSpeechRecognition) {
  //         await stopRecording();
  //         setTimeout(() => setRecording(false), 500);
  //       } else if (speechRecognition) {
  //         speechRecognition.stop();
  //         setRecording(false);
  //       } else {
  //         onSpeechError(new Error("not supported"));
  //       }
  //     }
  //   } catch (e) {
  //     onSpeechError(e);
  //   }
  // }, [
  //   recording,
  //   message,
  //   dispatch,
  //   onSpeechError,
  //   setInitialMessage,
  //   openAIApiKey,
  // ]);

  // useEffect(() => {
  //   if (useOpenAIWhisper || !supportsSpeechRecognition) {
  //     if (!transcribing && !recording && transcript?.text) {
  //       dispatch(setMessage(initialMessage + " " + transcript.text));
  //     }
  //   }
  // }, [
  //   initialMessage,
  //   transcript,
  //   recording,
  //   transcribing,
  //   useOpenAIWhisper,
  //   dispatch,
  // ]);

  // useHotkeys([
  //   [
  //     "n",
  //     () =>
  //       document.querySelector <
  //       HTMLTextAreaElement >
  //       "#message-input"?.focus(),
  //   ],
  // ]);

  // const blur = useCallback(() => {
  //   document.querySelector("#message-input")?.blur();
  // }, []);

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
            <ActionIcon
              size="xl"
              // onClick={onSubmit}
            >
              <i className="fa fa-paper-plane" style={{ fontSize: "90%" }} />
            </ActionIcon>
          </>
        )}
      </div>
    );
  }, [
    // onSubmit,
    disabled,
    context.generating,
  ]);

  const isLandingPage = pathname === "/";
  if (context.isShare || (!isLandingPage && !context.id)) {
    return null;
  }

  // const hotkeyHandler = useMemo(() => {
  //   const keys = [
  //     ["Escape", blur, { preventDefault: true }],
  //     ["ctrl+Enter", onSubmit, { preventDefault: true }],
  //   ];
  //   if (submitOnEnter) {
  //     keys.unshift(["Enter", onSubmit, { preventDefault: true }]);
  //   }
  //   const handler = getHotkeyHandler(keys);
  //   return handler;
  // }, [onSubmit, blur, submitOnEnter]);

  return (
    <Container>
      <div className="inner">
        <Textarea
          disabled={props.disabled || disabled}
          id="message-input"
          autosize
          minRows={hasVerticalSpace || context.isHome ? 3 : 2}
          maxRows={12}
          placeholder={"Enter a message here..."}
          // value={message}
          // onChange={onChange}
          rightSection={rightSection}
          rightSectionWidth={context.generating ? 100 : 55}
          // onKeyDown={hotkeyHandler}
        />
        {/* <QuickSettings key={tab} /> */}
      </div>
    </Container>
  );
}

export { MessageInput };
