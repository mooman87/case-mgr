
const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";

const domain = isLocal ? "/.netlify/functions/app" : "";

export default domain;
