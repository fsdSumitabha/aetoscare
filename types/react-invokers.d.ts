import "react";

// HTML Invoker Commands (command / commandfor) are not in @types/react yet.
// React passes these lowercase attributes through to the DOM unchanged.
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- must match React's declaration
  interface ButtonHTMLAttributes<T> {
    command?: "show-modal" | "close" | "request-close" | "show-popover" | "hide-popover" | "toggle-popover";
    commandfor?: string;
  }
}
