exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function (
        context,
        request,
        callback
      ) {
        const regex = /^@?firebase(\/(.+))?/;
        if (regex.test(request)) {
          return callback(null, `umd ${request}`);
        }
        callback();
      }),
    });
  }
};

exports.createPages = async function ({ graphql, actions }) {
  const { createPage } = actions;
  const response = await graphql(`
    query {
      allContentfulBlogModel {
        nodes {
          title
          slug
          publishedDate(formatString: "YYYY MMM, DD")
          featuredImage {
            fluid {
              src
            }
          }
          body {
            json
          }
          excerpt {
            excerpt
          }
        }
      }
    }
  `);

  response.data.allContentfulBlogModel.nodes.forEach((edge) => {
    createPage({
      path: `/blog/${edge.slug}`,
      component: require.resolve("./src/components/Blog/blogs.tsx"),
      context: {
        title: edge.title,
        slug: edge.slug,
        publishedDate: edge.publishedDate,
        featuredImage: edge.featuredImage.fluid.src,
        body: edge.body.json,
        excerpt: edge,
      },
    });
  });
};
