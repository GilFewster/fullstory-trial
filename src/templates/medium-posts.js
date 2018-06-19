import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";

export const MediumPostTemplate = ({ title, content, contentComponent }) => {
   const PageContent = contentComponent || Content;

   return (
      <section className="section section--gradient">
         <div className="container">
            <div className="columns">
               <div className="column is-10 is-offset-1">
                  <div className="section">
                     <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                        {title}
                     </h2>
                     <PageContent className="content" content={content} />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

MediumPostTemplate.propTypes = {
   title: PropTypes.string.isRequired,
   content: PropTypes.string,
   contentComponent: PropTypes.func
};

const MediumPost = ({ data }) => {
   const { edges } = data.allMediumPost;
   console.log(edges);
   const posts = edges.map(edge => {
  
      const node = edge.node;
     return `<div style="border: 1px solid #eaecee; padding: 2em 4em; margin-bottom:2em;">
        <h3>${node.title}</h3>
        <p>${node.virtuals.subtitle}</p>
        <p><a href="${node.url}">Read More</a></p>
      </div>`;
   });
   return (
      <MediumPostTemplate
         contentComponent={HTMLContent}
         title="Medium"
         content={posts.join("")}
      />
   );
};

MediumPost.propTypes = {
   data: PropTypes.object.isRequired
};

export default MediumPost;

export const MediumPostQuery = graphql`
   query MediumPostQuery {
      allMediumPost(sort: { fields: [createdAt], order: DESC }) {
         edges {
            node {
               id
               title
               virtuals {
                  subtitle
                  previewImage {
                     imageId
                  }
               }
            }
         }
      }
   }
`;
