require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `HINA KHADIM BLOGS`,
    description: `Hey folks, Are you interested in knowing how to become 
    a professional Software Engineer or do you want to know my Coding Journey?...`,
  },
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
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
        forceFullSync: true,
      },
    },
  ],
};
