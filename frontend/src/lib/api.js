import axios from 'axios';

 
const BASE_URL =import.meta.env.VITE_API_URL;


export const uploadPost = async(postData)=>{
    try{
         const response = await axios.post(`${BASE_URL}/posts/upload`, postData);
		 return response.data;
    }
    catch(error){
         console.error('❌ uploadPost error:', error);
		 throw error;
    }
}
export const getAllPosts = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/posts`);
		return response.data;
	} catch (error) {
		console.error("❌ Error fetching posts:", error);
		throw error;
	}
};

export const likePost = async (postId) => {
	try {
		const response = await axios.post(`${BASE_URL}/posts/like/${postId}`);
		return response.data;
	} catch (error) {
		console.error("❌ Error liking post:", error);
		throw error;
	}
};

export const commentOnPost = async (postId, commentText) => {
	try {
		const response = await axios.post(`${BASE_URL}/posts/comment/${postId}`, {
			text: commentText,
		});
		return response.data;
	} catch (error) {
		console.error("❌ Error adding comment:", error);
		throw error;
	}
};