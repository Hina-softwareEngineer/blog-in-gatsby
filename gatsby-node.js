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

  // createPage({
  //   path: `/blog`,
  //   component: require.resolve("./src/components/blogs.tsx"),
  //   context: {
  //     title: response,
  //   },
  // });

  console.log(response, "res");

  response.data.allContentfulBlogModel.nodes.forEach((edge) => {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.

    createPage({
      path: `/blog/${edge.slug}`,
      component: require.resolve("./src/components/blogs.tsx"),
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

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  // if (page.path.match(/^\/app/)) {
  //   page.matchPath = "/app/*";
  //   // Update the page.
  //   createPage(page);
  // }

  // actions.createPage({

  //         path: "my-dynamic-page",
  //         component: require.resolve(`./src/templates/dynamic-page.tsx`),
  //         context: {
  //             // Data passed to context is available
  //             // in pageContext props of the template component
  //             name: "Zia",
  //          },
  //     });
  //     console.log("End of Gatsby Node File");
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*";

    createPage(page);
  }
};
