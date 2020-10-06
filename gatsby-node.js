exports.createPages = async function ({ graphql, actions }) { 
    const { createPage } = actions;
    const response = await graphql(`
    query{
        allContentfulBlogModel {
            nodes {
              title
            }
          }
    }
    `);

    createPage({
        path: `/blog`,
        component: require.resolve("./src/components/blogs.tsx"),
        context: {
            title : response
        }
    })

    console.log(response, 'res')

    response.data.allContentfulBlogModel.nodes.forEach(edge => { 
        createPage({
            path: `/blog/${edge.title}`,
            component: require.resolve("./src/components/blogs.tsx"),
            context: {
                title : edge.title
            }
        })
    });

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
}

// exports.onCreatePage = async ({ page, actions }) => { 
//     const { createPage } = actions;
    
//     if (path.path.match(/^\/app/)) { 
//         page.matchPath = '/app/'
        
//         createPage(page)
//     }
// }