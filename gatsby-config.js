module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              aliases: { sh: "bash", js: "javascript" },
              showLineNumbers: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `gkdw863cbodq`,
        accessToken: `fmZjnapal4THlQuSnJQwQ2VN4Ua6YAX7w5DLrEE1zhM`,
        forceFullSync: true,
      },
    },
  ],
};
