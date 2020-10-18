import React,{useContext} from 'react';
import { navigate } from "gatsby";
import "./blogList.css"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Link } from "gatsby";
import { useStaticQuery, graphql } from "gatsby";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { AuthContext } from '../context/auth/auth';

const useStyles = makeStyles({
    root: {
        display: "flex",
        margin: "20px 0",
        boxShadow: "none",
    },
    media: {
        width: "300px",
        height:"200px"
    },
    imageButton: {
        width: '300px',
        margin: "0 30px"
    }
});
  
// karla font family
// crimson text font family heading

export default function Blogs(props) {
    const classes = useStyles();
    const authentication = useContext(AuthContext);
    const data = useStaticQuery(
        graphql`
          query {
            allContentfulBlogModel {
              nodes {
                title
                slug
                publishedDate(formatString: "MMMM DD, YYYY")
                excerpt {
                  excerpt
                }
                featuredImage {
                    fluid {
                        src
                    }
                }
                body {
                    json
                }
                    
              }
            }
          }
        `
      );
    
    console.log("data ; ", data,authentication);
    
     return (
         <div className="blog-list">

             <h1>Latest Blogs</h1>
             <div className="divider"></div>
             <div>
             {
                data.allContentfulBlogModel.nodes.map((blog, index) =>
                   <React.Fragment key={index}> <Card className={classes.root}>
                        <CardActionArea className={classes.imageButton}>
                            <CardMedia
                                className={classes.media}
                                image={blog.featuredImage.fluid.src}
                                title={blog.title}
                            />
                        </CardActionArea>
                        <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                                {blog.publishedDate}
                        </Typography>
                            <Typography gutterBottom variant="h5" component="h2">
                                <Link href={`/blog/${blog.slug}`} onClick={e=>e.preventDefault()}>
                            {blog.title}
  </Link>
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {blog.excerpt.excerpt}
                        </Typography>
                            <CardActions>
                                <Typography variant="body2" color="textSecondary" component="p">
                                
                        
                                    <Link href={`/blog/${blog.slug}`} onClick={e => e.preventDefault()}>Read More</Link>
                                    </Typography>
                            </CardActions>
                        </CardContent>


                    </Card>
                
                <Divider/></React.Fragment>)
}       
             </div>
             </div>

    );
}
  
