module.exports = {
  siteMetadata: {
    title: `Personal Startpage`,
    description: `A startpage that's pretty much only configured to be used by me`,
    author: `@bambanah`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `favicon.png`,
      },
    },
    "gatsby-plugin-typescript",
    "gatsby-plugin-scss-typescript",
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: require("./firebase.json"),
      },
    },
  ],
};
