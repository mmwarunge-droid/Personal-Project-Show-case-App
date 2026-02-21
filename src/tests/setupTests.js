import "@testing-library/jest-dom";

// Helper to mock fetch responses quickly in tests
global.setFetchResponse = (val) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(val),
    })
  );
};