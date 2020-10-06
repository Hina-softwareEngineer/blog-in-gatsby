import React from "react";
import { Link, navigate } from "gatsby";
import { Router} from '@reach/router';
import Header from "../components/header";
import { blogs } from '../../blogs';
import Blog from '../components/blogs';

export default function Home() {
  return (
    <div>
      hina home
       
      <div>
        {/* {
          blogs.map((blog,index)=>  <Blog key={index} data={blog} />)
        }
        */}
        </div>

    </div>
  );
}