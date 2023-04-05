import { Request, Response, NextFunction } from "express";

const addTag = (tag: string, prefix: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith(prefix)) {
      if (!res.locals.swagger) {
        res.locals.swagger = {};
      }
      if (!res.locals.swagger.tags) {
        res.locals.swagger.tags = [];
      }
      if (!res.locals.swagger.tags.includes(tag)) {
        res.locals.swagger.tags.push(tag);
      }
    }
    next();
  };
};

export { addTag };
