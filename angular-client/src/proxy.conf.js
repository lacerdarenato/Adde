const proxy = [
  {
    context: "/api",
    target: "http://localhost:5002",
    pathRewrite: { "^/api": "" },
  },
];

module.exports = proxy;
