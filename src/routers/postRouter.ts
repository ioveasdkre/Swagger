import express, { Router } from "express";
import { PostController } from "../controllers/postContorller";
import { addTag } from "../middlewares/addTag";

const PostRouter: Router = express.Router();

PostRouter.route("/posts")
  .all(addTag("Posts", "/posts"))
  .get(PostController.getPosts)
  .post(PostController.createPost)
  .delete(PostController.deleteAllPosts);

PostRouter.route("/posts/:postId")
  .get(PostController.getPost)
  .patch(PostController.updatePost)
  .delete(PostController.deletePost)
  .options(PostController.optionsPost);

export { PostRouter };
