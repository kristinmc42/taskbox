import "../src/index.css";

// registers the msw addon
import { initialize, mswDecorator } from "msw-storybook-addon";

// Initializa msw
initialize();

//Provide the msw addon decorator globally
export const decorators = [mswDecorator];

//👇 Configures Storybook to log the actions( onArchiveTask and onPinTask ) in the UI.
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
