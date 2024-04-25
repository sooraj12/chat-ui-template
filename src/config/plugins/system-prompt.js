const defaultSystemPrompt = `
The System Prompt is an invisible message inserted at the start
of the chat and can be used to give ChatGPT information about
itself and general guidelines for how it should respond
`.trim();

export class SystemPromptPlugin {
  describe() {
    return {
      id: "system-prompt",
      name: "System Prompt",
      options: [
        {
          id: "systemPrompt",
          defaultValue: defaultSystemPrompt,
          displayOnSettingsScreen: "chat",
          resettable: true,
          scope: "chat",
          renderProps: {
            type: "textarea",
            description: (
              <p>
                The System Prompt is an invisible message inserted at the start
                of the chat and can be used to give ChatGPT information about
                itself and general guidelines for how it should respond
              </p>
            ),
          },
          displayInQuickSettings: {
            name: "System Prompt",
            displayByDefault: true,
            label: "Customize system prompt",
          },
        },
      ],
    };
  }

  async preprocessModelInput(messages, parameters) {
    const output = [
      {
        role: "system",
        content: (this.options?.systemPrompt || defaultSystemPrompt).replace(
          "{{ datetime }}",
          new Date().toLocaleString()
        ),
      },
      ...messages,
    ];

    return {
      messages: output,
      parameters,
    };
  }
}
