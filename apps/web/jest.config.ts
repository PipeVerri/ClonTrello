/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
import nextJest from "next/jest.js";

const config: Config = {
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	testMatch: ["**/*.test.tsx"],
};

const createJestConfig = nextJest({
	dir: "./",
});

export default createJestConfig(config);
