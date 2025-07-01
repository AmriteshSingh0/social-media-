import express from 'express';
const router = express.Router();
import Post from '../models/posts.js';
import cloudinary from '../lib/cloudinary.js';
import fileUpload from 'express-fileupload';

router.use(fileUpload({ useTempFiles: true }));

router.get('/',async(req,res)=>{
    try{
    const posts = await Post.find();
     res.json(posts);
   }
    catch(error){
        res.status(500).json({ error: 'Something went wrong' });
        console.log(error);
        }
})

router.post('/upload', async(req,res)=>{
    try{
        const {title, content}= req.body;
        const file = req.files.file;

        if(!file){
             console.log("no file waas given");
             return res.status(400).json({error:"File is required"})
             }

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'posts',
            resource_type: 'auto'
        });     


        const posts = new Post({
            title,
            content,
            file: result.secure_url,
        }); 

        await posts.save();
        res.status(201).json(posts);

    }
    catch(error){
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Something went wrong' });

    }
    })


router.post('/like/:postId',async(req,res)=>{
    try{
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }


        post.likes +=1;
        await post.save();
        res.json(post);
    }
    catch(error){
         console.error('Error liking post:', error);
         res.status(500).json({ error: 'Internal Server Error' });    
    }
});


router.post('/comment/:postId', async (req, res) => {
  try{
      const postId = req.params.postId;
      const{text}= req.body;
      const post = await Post.findById(postId);
      
      if(!post){
         console.log("no post was found");
        return res.status(404).json({error:'no post was found'})
      }

         post.comments.push({text});
         await post.save();
         return res.status(200).json(post);
  
 }catch(error){
     console.log("error adding the commnet");
     console.log(error);
     res.status(500).json({ error: error.message });
     }
}




)

    export default router;