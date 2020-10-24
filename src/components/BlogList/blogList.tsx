import React,{useContext,useState} from 'react';
import { navigate } from "gatsby";
import "./blogList.css"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Link } from "gatsby";
import Avatar from '@material-ui/core/Avatar';
import { useStaticQuery, graphql } from "gatsby";
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';


import { AuthContext } from '../../context/auth/auth';

const useStyles = makeStyles({
    root: {
        display: "flex",
        margin: "20px 0",
        boxShadow: "none",
        alignItems:'center',
    },
    media: {
        width: "300px",
        height: "200px",
    },
    imageButton: {
        width: '300px',
        height:"200px",
        margin: "0 30px"
    },
    readMore: {
        color: '#3f51b5',
        cursor: "pointer",
        fontWeight: 'bold',
        fontFamily: "'Karla', serif",
    },
    date: {
        letterSpacing: '1.3px',
        fontFamily: "'Karla', sans-serif"
    },
    excerpt: {
        fontSize: "15px",
        fontFamily: "'Karla', sans-serif"
    },
    footer: {
        margin: '10px 0',
        padding: 0,
    },
    pagination: {
        padding: "30px 0",
        "& > nav > ul": {
            justifyContent: 'center'
        }
    }
});
  
// karla font family
// crimson text font family heading

export default function Blogs({ handleOpen,blogs }) {
    const classes = useStyles();
    const { state } = useContext(AuthContext);
    const [page, setPage] = useState(1);
      const onPageChange = (event,page) => { 
          console.log(page);
          setPage(page);
  }
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

    console.log(data, 'data');
    let totalPages = Math.ceil(data.allContentfulBlogModel.nodes.length / 5);
    let LastPostIndex = page * 5;
    let FirstPostIndex = LastPostIndex - 5;
    const currentBlogs = data.allContentfulBlogModel.nodes.slice(FirstPostIndex,LastPostIndex);
    
console.log(totalPages,currentBlogs)
    const onLink = (link) => { 
        if (state.isAuthenticated && !state.isLoading) {
            navigate(link);
        }
        else { 
            handleOpen();
        }
    }
    
     return (
         <div className="blog-list">

             <h1 ref={blogs}>Latest Blogs</h1>
             <div className="divider"></div>
             <div>
             {
                currentBlogs.map((blog, index) =>
                   <React.Fragment key={index}> <Card className={classes.root}>
                        <CardActionArea className={classes.imageButton}>
                            <CardMedia
                                className={classes.media}
                                image={blog.featuredImage.fluid.src}
                                title={blog.title}
                            />
                        </CardActionArea>
                        <CardContent>
                        <Typography className={classes.date} variant="body2" color="textSecondary" component="p">
                                {blog.publishedDate}
                        </Typography>
                            <Typography onClick={() => onLink("/blog/"+blog.slug)} gutterBottom variant="h5" component="h2">
                            {blog.title}
                        </Typography>
                            <Typography className={classes.excerpt} variant="body2" color="textSecondary" component="p">
                                {blog.excerpt.excerpt}
                        </Typography>
                            <CardActions className={classes.footer}>
                                <Typography className={classes.readMore} variant="body2" onClick={() => onLink("/blog/"+blog.slug)} color="textSecondary" component="p">
                                    Read More
                                    </Typography>
                            </CardActions>
                        </CardContent>


                    </Card>
                
                        <Divider />
                
                    </React.Fragment>)
}       
             </div>
             <div className={classes.pagination}>
             {totalPages > 1 ?
                 <Pagination count={totalPages} page={page} onChange={onPageChange} color="primary" /> :
                     <Pagination count={1} page={page} onChange={onPageChange} color="primary" />}
                 </div>
             </div>

    );
}
  
