import React, { useState } from 'react';
import {uploadPost} from '../lib/api';

function CreatePost(){
    const [newPost, setnewPost]=useState({
        title:"",
        content:"",
        file:null,
    });


   const handleInputChange=(event)=>{
    const {name,value}=event.target;
    setnewPost({...newPost,[name]:value});
   }

  	const handleFileChange = (event) => {
		setnewPost({ ...newPost, file: event.target.files[0] });
	};



    const handlePostSubmit=async()=>{
        	const formData = new FormData();
	        formData.append("title", newPost.title);
	        formData.append("content", newPost.content);
	        formData.append("file", newPost.file);
            try{
                	const response = await uploadPost(formData); 
                    console.log("new shit tryng to be get uploadded is:", response);
                    
		            setnewPost({ title: "", content: "", file: null });
            }catch(error){
                   console.error("Error creating post:", error);
            }



            }


    return(
        <div className='create-post'>
            <h2>Create Posts</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newPost.title}
              onChange={handleInputChange}
            />
               <textarea
                name="content"
                placeholder="Content"
                value={newPost.content}
                onChange={handleInputChange}
                />
            
           
            <input type="file" name='file' onChange={handleFileChange}/>
            <button onClick={handlePostSubmit}>Post</button>
           </div>
          );

}

export default CreatePost;
