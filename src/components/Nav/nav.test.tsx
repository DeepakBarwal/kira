import { describe, expect, test, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./index";
import { navData } from "@/lib/navData";
import { NavDataType } from "./nav.type";
import * as nextAuth from "next-auth/react";
import customHook from "@/hooks/index";

describe("Navbar tests", () => {
  test("should render navbar when unauthenticated", () => {
    jest.spyOn(nextAuth, "useSession").mockImplementation(() => ({
      data: { user: { image: "" } },
      status: "unauthenticated",
    }));
    // render navbar
    const { queryByTestId, queryByText, getByTestId } = render(
      <Navbar externalNavData={navData as NavDataType} />
    );
    // query shimmer
    const profileShimmer = queryByTestId("profile_shimmer");
    expect(profileShimmer).not.toBeInTheDocument();
    // query Your Work Item
    const yourWork = queryByText("Your Work");
    expect(yourWork).not.toBeInTheDocument();
    // get login button
    const loginButton = getByTestId("login_btn");
    expect(loginButton).toBeInTheDocument();
  });

  test("should render navbar when authenticated", () => {
    jest.spyOn(nextAuth, "useSession").mockImplementation(() => ({
      data: { user: { image: "" } },
      status: "authenticated",
    }));
    const { getByTestId, getByText, queryByTestId } = render(
      <Navbar externalNavData={navData as NavDataType} />
    );
    const profilePictureElement = getByTestId("profile_shimmer");
    expect(profilePictureElement).toBeInTheDocument();
    const yourWork = getByText("Your Work");
    expect(yourWork).toBeInTheDocument();
    const loginButton = queryByTestId("login_btn");
    expect(loginButton).not.toBeInTheDocument();
  });

  test("navbar in mobile view", () => {
    jest.spyOn(nextAuth, "useSession").mockImplementation(() => ({
      data: { user: { image: "" } },
      status: "authenticated",
    }));
    jest.spyOn(customHook, "useWindowDimensions").mockImplementation(() => ({
      windowDimensions: {
        width: 300,
        height: 300,
      },
      isDesktop: false,
    }));
    const { queryByTestId, queryByText, getByTestId } = render(
      <Navbar externalNavData={navData as NavDataType} />
    );
    const hamburgerIcon = getByTestId("hamburger_icon");
    expect(hamburgerIcon).toBeInTheDocument();
  });
});
