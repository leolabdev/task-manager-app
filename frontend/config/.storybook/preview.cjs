import { addDecorator } from "@storybook/react";
import { withThemes } from "storybook-addon-themes";
import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import "../../src/app/styles/index.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: "light",
    list: [
      { name: "light", class: ["app", "app_light_theme"], color: "#bda692" },
      { name: "dark", class: ["app", "app_dark_theme"], color: "#563333" },
      { name: "matrix", class: ["app", "app_matrix_theme"], color: "#07ce07" },
    ],
  },

};

addDecorator(withThemes);
addDecorator(RouterDecorator);
