module.exports = {
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    testEnvironment: "jsdom",
    transformIgnorePatterns: [
      "/node_modules/(?!axios)/" 
    ],
    moduleFileExtensions: ['js', 'jsx'],
  };