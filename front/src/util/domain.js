export default process.env.NODE_ENV === "development"
  ? "http://localhost:9050"
  : process.env.NODE_ENV === "production" &&
    "https://casemanager.herokuapp.com";