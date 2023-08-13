import categoyRouter from "./categories/category.routes.js";
import SubCategoyRouter from "./subCategory/subCategory.routes.js";
import brandRouter from "./brand/brand.routes.js";
// import productRouter from "./product/product.router.js";

export function allRouters(app) {
  app.use("/api/v1/category", categoyRouter);
  app.use("/api/v1/subCategory", SubCategoyRouter);
  app.use("/api/v1/brand", brandRouter);

  app.all("*", (req, res, next) => {
    next(new Error("404 Not Found URL", { cause: 404 }));
  });

  app.use((err, req, res, next) => {
    let error = err.message;
    const statusCode = error.statusCode || 500; 

    res.status(statusCode).json({ error })
   });
}
