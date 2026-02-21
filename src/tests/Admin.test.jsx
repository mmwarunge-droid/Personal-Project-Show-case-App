import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

/**
 * Note: our simple setFetchResponse returns the same value for all fetch calls.
 * The app code is defensive when POST/PATCH returns odd payloads.
 */
test("Admin can add a product and see it", async () => {
  global.setFetchResponse([]); // initial GET returns empty list (and POST may also return [])

  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <App />
    </MemoryRouter>
  );

  const name = screen.getByLabelText("Coffee Name");
  const desc = screen.getByLabelText("Description");
  const origin = screen.getByLabelText("Origin");
  const price = screen.getByLabelText("Price");
  const submit = screen.getByRole("button", { name: /submit/i });

  fireEvent.change(name, { target: { value: "Coffee" } });
  fireEvent.change(desc, { target: { value: "Nice coffee" } });
  fireEvent.change(origin, { target: { value: "Kenya" } });
  fireEvent.change(price, { target: { value: "100" } });

  fireEvent.click(submit);

  await waitFor(() => {
    expect(screen.getAllByText("Coffee")[0]).toBeInTheDocument();
  });
});