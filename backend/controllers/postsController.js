const { dbQuery } = require("../config/database");
const { uploader } = require("../config/uploader");
const fs = require("fs");

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      let resultPosts = await dbQuery(
        `select p.id, p.image, p.caption, p.created_at, p.user_id, u.username, u.profile_picture from posts p 
        join users u on u.id = p.user_id;`
      );
      let resultComments = await dbQuery(
        `select c.id, c.user_id, u.username, u.profile_picture, c.post_id, c.comment, c.created_at from comments c
        join users u on c.user_id = u.id`
      );
      let resultLikes = await dbQuery(
        `select l.id, l.user_id, u.username, l.post_id from likes l
        join users u on l.user_id = u.id;`
      );

      resultPosts.forEach((postVal) => {
        let comments = [];
        resultComments.forEach((commentsVal) => {
          if (postVal.id == commentsVal.post_id) {
            comments.push({
              user_id: commentsVal.user_id,
              username: commentsVal.username,
              profile_picture: commentsVal.profile_picture,
              comment: commentsVal.comment,
              created_at: commentsVal.created_at,
            });
          }
          postVal.comments = comments;
        });

        let likes = [];
        resultLikes.forEach((likesVal) => {
          if (postVal.id == likesVal.post_id) {
            likes.push({
              user_id: likesVal.user_id,
            });
          }
          postVal.likes = likes;
        });
      });

      res.status(200).send(resultPosts);
    } catch (error) {
      return next(error);
    }
  },
  detailPost: async (req, res, next) => {
    // untuk menampilkan detail pada post page
    try {
      const { id } = req.query;
      let resultPost = await dbQuery(
        `select p.id, p.image, p.caption, p.created_at, p.user_id, u.username, u.profile_picture from posts p 
        join users u on u.id = p.user_id where p.id=${id};`
      );
      let resultComments = await dbQuery(
        `select c.id, c.user_id, u.username, u.profile_picture, c.post_id, c.comment, c.created_at from comments c
        join users u on c.user_id = u.id where c.post_id=${id};`
      );
      let resultLikes = await dbQuery(
        `select l.id, l.user_id, u.username, l.post_id from likes l
        join users u on l.user_id = u.id where l.post_id=${id};`
      );
      resultPost[0].comments = resultComments;
      resultPost[0].likes = resultLikes;
      console.log(resultPost[0])
      res.status(200).send(resultPost[0]);
    } catch (error) {
      return next(error);
    }
  },
  getUserPosts: async (req, res, next) => {
    try {
      let resultUserPosts = await dbQuery(
        // `select p.id, p.image, p.created_at, p.user_id, u.username from posts p
        // join users u on u.id = p.user_id where p.user_id = ${req.query.id};`
        `select id, image, created_at, user_id from posts where user_id = ${req.query.id};`
      );
      res.status(200).send(resultUserPosts);
    } catch (error) {
      return next(error);
    }
  },
  getLikedPosts: async (req, res, next) => {
    try {
      let resultLikedPosts = await dbQuery(
        `select p.id, p.image, p.created_at, p.user_id from posts p
        join likes l on p.id = l.post_id 
        join users u on l.user_id = u.id
        where l.user_id = ${req.query.id};`
      );
      res.status(200).send(resultLikedPosts);
    } catch (error) {
      return next(error);
    }
  },
  addPost: async (req, res, next) => {
    // pengiriman data FE hanya token => masuk ke readtoken => untuk mendapatkan id, tidak dari req.body
    // data yang dikirimkan: user_id, caption, image file
    const uploadFile = uploader("/imgPosts", "IMGPOSTS").array("image", 1);
    // console.log(uploadFile);
    uploadFile(req, res, async (error) => {
      try {
        // console.log(req.body.data);
        // console.log("pengecekan file:", req.files);
        const { user_id, caption } = JSON.parse(req.body.data);
        let addPost = await dbQuery(
          `insert into posts (user_id, image, caption) value (${user_id}, '/imgPosts/${req.files[0].filename}', '${caption}')`
        );
        if (addPost) {
          res.status(200).send(addPost);
        }
      } catch (error) {
        req.files.forEach((val) =>
          fs.unlinkSync(`./public/imgPosts/${val.filename}`)
        );
        return next(error);
      }
    });
  },
  editPost: async (req, res, next) => {
    // pengiriman data FE hanya token => masuk ke readtoken => untuk mendapatkan id, tidak dari req.body
    // melakukan edit caption
    try {
      const { id, caption } = req.body;
      let editPost = await dbQuery(
        `update posts set caption='${caption}' where id=${id};`
      );
      if (editPost) {
        res.status(200).send(editPost);
      }
    } catch (error) {
      return next(error);
    }
  },
  deletePost: async (req, res, next) => {
    // pengiriman data FE hanya token => masuk ke readtoken => untuk mendapatkan id, tidak dari req.body
    try {
      // get id post from request
      const { id } = req.query;
      let fileName = await dbQuery(`select image from posts where id=${id}`);

      // delete
      try {
        fs.unlinkSync(`./public/${fileName[0].image}`);
        let deletePost = await dbQuery(`delete from posts where id=${id}`);
        if (deletePost) {
          res.status(200).send(deletePost);
        }
      } catch (error) {
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  },
  addComment: async (req, res, next) => {
    try {
      const { user_id, post_id, comment } = req.body;
      let addComment = await dbQuery(
        `insert into comments (user_id, post_id, comment) value (${user_id},${post_id},'${comment}')`
      );
      if (addComment) {
        res.status(200).send({
          success: true,
          message: "Comment added",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  addLike: async (req, res, next) => {
    try {
      const { user_id, post_id } = req.body;
      let addLike = await dbQuery(
        `insert into likes (user_id, post_id) value (${user_id},${post_id})`
      );
      if (addLike) {
        res.status(200).send({
          success: true,
          message: "Like added",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
  removeLike: async (req, res, next) => {
    try {
      console.log(req.query)
      const { user_id, post_id } = req.query;
      let removeLike = await dbQuery(
        `delete from likes where user_id = ${user_id} and post_id=${post_id}`
      );
      if (removeLike) {
        res.status(200).send({
          success: true,
          message: "Like removed",
        });
      }
    } catch (error) {
      return next(error);
    }
  },
};
