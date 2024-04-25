import { countTokens, runChatTrimmer } from "../../tokenizer/wrapper";

export class ContextTrimmerPlugin {
  describe() {
    return {
      id: "context-trimmer",
      name: "Message Context",
      options: [
        {
          id: "maxTokens",
          displayOnSettingsScreen: "chat",
          defaultValue: 2048,
          scope: "chat",
          renderProps: (value, options) => ({
            label: `Include a maximum of ${value} tokens`,
            type: "slider",
            min: 512,
            max: 2048,
            step: 64,
          }),
          validate: (value, options) => {
            const max = 2048;
            return value <= max;
          },
          displayInQuickSettings: {
            name: "Max Tokens",
            displayByDefault: false,
            label: (value) => `Max tokens: ${value}`,
          },
        },
        {
          id: "preserveSystemPrompt",
          displayOnSettingsScreen: "chat",
          defaultValue: true,
          scope: "chat",
          renderProps: {
            label: "Try to always include the System Prompt",
            type: "checkbox",
          },
        },
        {
          id: "preserveFirstUserMessage",
          displayOnSettingsScreen: "chat",
          defaultValue: true,
          scope: "chat",
          renderProps: {
            label: "Try to always include your first message",
            type: "checkbox",
          },
        },
      ],
    };
  }

  async preprocessModelInput(messages, parameters) {
    const before = await countTokens(messages);

    const options = this.options;

    const trimmed = await runChatTrimmer(messages, {
      maxTokens: options?.maxTokens ?? 2048,
      nMostRecentMessages: options?.maxMessages ?? undefined,
      preserveFirstUserMessage: options?.preserveFirstUserMessage || true,
      preserveSystemPrompt: options?.preserveSystemPrompt || true,
    });

    const after = await countTokens(trimmed);

    const diff = after - before;
    console.log(`[context trimmer] trimmed ${diff} tokens from context`);

    return {
      messages: trimmed,
      parameters,
    };
  }
}