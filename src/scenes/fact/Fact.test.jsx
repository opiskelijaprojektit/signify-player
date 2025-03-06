import { render, screen, waitFor, cleanup } from "@testing-library/react"
import { vi, afterEach, beforeEach, describe, test } from "vitest"
import Fact from "./Fact"
import { orientations } from "../../utils/types"
import useLocalStorage from "../../utils/useLocalStorage"
import "@testing-library/jest-dom"

// Mock the useLocalStorage hook
vi.mock("../../utils/useLocalStorage", () => {
  let storage = {}
  let listeners = new Set()

  return {
    default: vi.fn((key, defaultValue) => {
      return [
        storage[key] || defaultValue,
        (newValue) => {
          storage[key] = newValue
          listeners.forEach((listener) => listener()) // Trigger re-renders
        },
      ]
    }),
  }
})

// Mock API response
const mockFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        scenes: [{ type: "fact", data: { API: "https://mockapi.com/fact" } }],
      }),
  })
)

// Mock fact API response
const mockFactFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ text: "Mocked Fact of the Day!" }),
  })
)

describe("Fact Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      if (url === "http://localhost:3000/scenes") return mockFetch()
      if (url === "https://mockapi.com/fact") return mockFactFetch()
      return Promise.reject(new Error("Unknown API Error"))
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    cleanup()
  })

  test("renders Fact component with loading text", () => {
    render(
      <Fact
        orientation={orientations.landscape}
        url={{ landscape: "/test.jpg", portrait: "/test.jpg" }}
      />
    )
    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  test("fetches and displays the random fact", async () => {
    render(
      <Fact
        orientation={orientations.landscape}
        url={{ landscape: "/test.jpg", portrait: "/test.jpg" }}
      />
    )

    await waitFor(() =>
      expect(screen.getByText("Mocked Fact of the Day!")).toBeInTheDocument()
    )
  })

  test("renders correct image based on orientation", () => {
    render(
      <Fact
        orientation={orientations.portrait}
        url={{ landscape: "/landscape.jpg", portrait: "/portrait.jpg" }}
      />
    )

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      expect.stringContaining("/portrait.jpg")
    )
  })
})
