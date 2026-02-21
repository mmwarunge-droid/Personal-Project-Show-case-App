import "@testing-library/jest-dom";
// FIX for React Router + Jest (Node missing TextEncoder)
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

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