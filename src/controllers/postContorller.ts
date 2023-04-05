import { Request, Response } from "express";
import { IPost } from "../interfaces/models/postInterface";
import { IHeaders } from "../interfaces/utils/headerInterface";
import { Post } from "../models/index";
import { isValidObjectId } from "../utils/utils";
import { handleSuccess } from "../helpers/handleSuccess";
import { handleError } from "../helpers/handleError";
import { headers } from "../helpers/headers";

class PostController {
  public static async getPosts(req: Request, res: Response): Promise<void> {
    /**
     * #swagger.tags = ["Posts - 貼文"]
     * #swagger.description = "取得全部貼文 API"
     * #swagger.responses[200] = {
          description: "貼文資訊",
          schema: {
            "status": "success",
            "data": {
              "_id": "642d0601353890fcfa38ade5",
              "content": "Ben",
              "image": "",
              "likes": 0,
              "user": {
                "_id": "642ac522734ec049aeb267ab",
                "name": "Mary",
                "photo": "https://thumb.fakeface.rest/thumb_female_30_8ab46617938c195cadf80bc11a96ce906a47c110.jpg"
              },
              "__v": 0
            }
          }
        }
      */
    try {
      const query: { timeSort?: string; q?: string } = req.query;

      // 使用三元運算子判斷是否為 asc (由舊至新)，若是則由舊至新排列，否則由新至舊排列
      // const timeSort = query.timeSort === "asc" ? "asc" : "desc";

      const timeSort = query.timeSort === "asc" ? "createdAt" : "-createdAt";

      const q = query.q !== undefined ? { content: new RegExp(query.q) } : {};

      const posts = await Post.find(q)
        .populate({
          path: "user",
          select: "name photo",
        })
        .sort(timeSort);

      if (!posts) return handleError(res);

      return handleSuccess<Omit<any, never>[]>(res, posts);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async createPost(req: Request, res: Response) {
    /**
     * #swagger.tags = ["Posts - 貼文"]
     * #swagger.description = "取得全部貼文 API"
     * #swagger.parameters["body"] = {
          description: "資料格式",
          in: "body",
          type: "object",
          required: true,
          schema: {
            content: "貼文內容",
            image: "https://thumb.fakeface.rest/thumb_female_30_8ab46617938c195cadf80bc11a96ce906a47c110.jpg",
            likes: 10000,
            userId: "642c26ffc416156385cd7b67",
          }
       }
      */
    try {
      const data = req.body;

      if (!isValidObjectId(data.userId)) return handleError(res);

      if (data.content === undefined) return handleError(res);

      const newPost: IPost = await Post.create<Partial<IPost>>({
        content: data.content,
        image: data.image,
        likes: data.likes,
        user: data.userId,
      });

      if (!newPost) return handleError(res);

      return handleSuccess<IPost>(res, newPost);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async deletePost(req: Request, res: Response) {
    /**
     * #swagger.ignore = true // 忽略不顯示 API文件
     */
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      const deletedPost = await Post.findByIdAndDelete(postId);

      if (!deletedPost) return handleError(res);

      handleSuccess<null>(res, null);
    } catch (error) {
      handleError(res, error);
    }
  }

  public static async deleteAllPosts(_req: Request, res: Response) {
    try {
      await Post.deleteMany();
      return handleSuccess<null>(res, null);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async updatePost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      const data = req.body;

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          content: data.content,
          image: data.image,
          likes: data.likes,
          updatedAt: new Date(), // 必要設定，確保 createdAt屬性保持不變
        },
        {
          new: true, // 回傳更新的文檔
        }
      );

      if (!updatedPost) return handleError(res);

      return handleSuccess<IPost>(res, updatedPost);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async getPost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      const post = await Post.findById(postId).populate({
        path: "user",
        select: "name photo",
      });

      if (!post) return handleError(res);

      return handleSuccess<IPost>(res, post);
    } catch (error) {
      return handleError(res, error);
    }
  }

  public static async optionsPost(req: Request, res: Response) {
    try {
      const postId = req.params.postId;

      if (!isValidObjectId(postId)) return handleError(res);

      return handleSuccess<IHeaders>(res, headers);
    } catch (error) {
      return handleError(res, error);
    }
  }
}

export { PostController };
