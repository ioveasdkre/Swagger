import { Request, Response, NextFunction } from "express";

const addTag = (tag: string, prefix: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith(prefix)) {
      res.locals.swagger = res.locals.swagger || {};
      res.locals.swagger.tags = res.locals.swagger.tags || [];
      res.locals.swagger.tags.push(tag);
    }
    next();
  };
};

export { addTag };
