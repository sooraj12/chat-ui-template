import { SystemPromptPlugin } from "./system-prompt";
import { TitlePlugin } from "./titles";
import { ContextTrimmerPlugin } from "./trimmer";

export const registeredPlugins = [
  SystemPromptPlugin,
  ContextTrimmerPlugin,
  TitlePlugin,
];
