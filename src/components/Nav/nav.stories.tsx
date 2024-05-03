import type { Meta, StoryObj } from "@storybook/react";
import AuthProvider from "@/context/authProvider";

import { Navbar } from "./index";
import { navData } from "@/lib/navData";
import { NavDataType } from "./nav.type";

const meta = {
  title: "Example/Navbar",
  component: Navbar,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    externalNavData: navData as NavDataType,
  },
};
