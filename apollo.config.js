module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagname: "gql",
    service: {
      name: "instaclone",
      url: "http://localhost:4000/graphql",
    },
  },
};
