exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    body: JSON.stringify({ message: "Headers set successfully" }),
  };
};
