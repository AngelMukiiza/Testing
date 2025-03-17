module.exports = {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest", // Use babel-jest to transform .js and .jsx files
    },
    transformIgnorePatterns: [
        "/node_modules/(?!msw)/", // Transform msw (or any other dependencies that are ES module based)
    ],
    testEnvironment: "jsdom", // Set the test environment to jsdom for browser-like behavior
};
