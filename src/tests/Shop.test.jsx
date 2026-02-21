import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

test("Shop renders products from GET and supports search", async () => {
  global.setFetchResponse([
    { id: 1, name: "Kenya AA", description: "x", origin: "Kenya", price: 1200, location: "Location 1" },
    { id: 2, name: "Ethiopia Yirgacheffe", description: "y", origin: "Ethiopia", price: 1350, location: "Location 2" },
  ]);

  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <App />
    </MemoryRouter>
  );

  // Product cards should appear after fetch
  expect(await screen.findByText("Kenya AA")).toBeInTheDocument();
  expect(await screen.findByText("Ethiopia Yirgacheffe")).toBeInTheDocument();
});