import React,{useContext,useState,useEffect} from 'react';
import { navigate, useStaticQuery, graphql } from "gatsby";
import "./blogList.css"

import { AuthContext } from '../../context/auth/auth';

// material styles
import Pagination from '@material-ui/lab/Pagination';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        margin: "20px 0",
        boxShadow: "none",
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
        textAlign:"center"
    },
    },
    media: {
        width: "300px",
        height: "200px",
    },
    imageButton: {
        width: '300px',
        height:"200px",
        margin: "0 30px",
        [theme.breakpoints.down('xs')]: {
        marginTop: '20px'
    },
    },
    readMore: {
        color: '#3f51b5',
        cursor: "pointer",
        fontWeight: 'bold',
        fontFamily: "'Karla', serif",
        [theme.breakpoints.down('xs')]: {
        width: '100%'
    },
    },
    cardBody: {
        [theme.breakpoints.down('xs')]: {
            margin: '20px 30px'
    },
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
}));
  
// karla font family
// crimson text font family heading

export default function Blogs({ handleOpenLoginModal,blogsHeadingRef }) {
    const classes = useStyles();
    const { state } = useContext(AuthContext);
    const [pageNumber, setPageNumber] = useState(1);
    const [imageLoader, setImageLoader] = useState(true);


    useEffect(() => { 
        setTimeout(() => setImageLoader(false), 3000);
    },[])
    
    
    const onPageChange = (event, page) => {
        setPageNumber(page);
    }


    const onLink = (link) => { 
        if (state.isAuthenticated && !state.isLoading) {
            navigate(link);
        }
        else { 
            handleOpenLoginModal();
        }
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


    // for pagination
    let totalPages = Math.ceil(data.allContentfulBlogModel.nodes.length / 5);
    let LastPostIndex = pageNumber * 5;
    let FirstPostIndex = LastPostIndex - 5;
    const currentBlogs = data.allContentfulBlogModel.nodes.slice(FirstPostIndex,LastPostIndex);

    
     return (
         <div className="blog-list">

             <h1 ref={blogsHeadingRef}>Latest Blogs</h1>
             <div className="divider"></div>
             <div>
             {
                currentBlogs.map((blog, index) =>
                   <React.Fragment key={index}> <Card className={classes.root}>
                        <CardActionArea className={classes.imageButton}>
                            {
                                imageLoader ?
                                    <Skeleton animation="wave" variant="rect" width={300} height={200} /> :
                                    <CardMedia
                                    className={classes.media}
                                    image={blog.featuredImage.fluid.src}
                                    title={blog.title}
                                    />
                            }
                        </CardActionArea>
                        <CardContent className={classes.cardBody}>
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
                 <Pagination count={totalPages} page={pageNumber} onChange={onPageChange} color="primary" /> :
                     <Pagination count={1} page={pageNumber} onChange={onPageChange} color="primary" />}
                 </div>
             </div>

    );
}
  
