import axios from "axios";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import ModalEditPost from "../../Components/Posts/ModalEditPost";
import ModalSharePost from "../../Components/Posts/ModalSharePost";
import ModalConfirm from "../../Components/ModalConfirm";
import { useRouter } from "next/router";
import { API_URL } from "../../../helper";
import ModalAlert from "../../Components/ModalAlert";
import Link from "next/link";
import MetaTag from "../../Components/HeadMeta";

export const getServerSideProps = async (ctx) => {
  try {
    // props backend
    let resPost = await axios.get(
      `${API_URL}/posts/get/detail?id=${ctx.query.id}`
    );
    let resUsers = await axios.get(`${API_URL}/users/get`);
    return {
      props: {
        post: resPost.data.post,
        comments: resPost.data.post.comments,
        likes: resPost.data.post.likes,
        hasMoreComments: resPost.data.hasMoreComments,
        users: resUsers.data,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

function DetailPost(props) {
  // json server
  let router = useRouter();
  let { post, users, comments, likes, hasMoreComments } = props;
  let createdDate = post.created_at.slice(0, 10);
  // let token = localStorage.getItem("tokenIdUser");

  // user => user who is viewing the post
  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });

  const [commentList, setCommentList] = useState(comments);
  const [comment, setComment] = useState("");
  const [commentLength, setCommentLength] = useState(0);
  const [hasMoreComment, setHasMoreComment] = useState(hasMoreComments);
  const [editVisible, setEditVisible] = useState(false);
  // poster => user who post the picture
  const [poster, setPoster] = useState();
  const [userIsPoster, setUserIsPoster] = useState(false);

  // to see if user has already liked the post
  const [isLiked, setIsLiked] = useState(null);
  // to get number of likes
  const [likesList, setLikesList] = useState(likes);

  // to confirm delete
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const toggleConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const [pageIsLoading, setPageIsLoading] = useState(true);

  // modal alert
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    icon: "",
    title: "",
    text: "",
    onClick: null,
  });
  const toggleVisible = () => {
    setVisible(!visible);
  };

  // share modal
  const [shareModal, setShareModal] = useState(false);
  const toggleShare = () => {
    setShareModal(!shareModal);
  };
  const shareUrl = `https://individualproject-fe.vercel.app${router.asPath}`;

  // to check if user can edit / delete the post
  const getPoster = () => {
    let posterIdx = users.findIndex((val) => {
      if (val.id === post.user_id) {
        if (val.id === user.id) {
          setUserIsPoster((current) => true);
        }
        return val;
      }
    });
    setPoster(users[posterIdx]);
    console.log(users[posterIdx]);
  };

  const getIsLiked = () => {
    let check = false;
    let idx = 0;
    while (!check && idx < likes.length) {
      if (likes[idx].user_id == user.id) {
        check = true;
      }
      idx++;
    }
    setIsLiked(check);
  };

  React.useEffect(() => {
    getPoster();
    getIsLiked();
    setPageIsLoading(false);
  }, [user]);

  const handleSubmitComment = async () => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      let tempCommentList = [...commentList];
      const newComment = {
        user_id: user.id,
        comment,
        post_id: post.id,
      };
      tempCommentList.unshift(newComment);
      // await axios.post(`${API_URL}/comments`, newComment);
      await axios.post(`${API_URL}/posts/comment`, newComment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCommentList(tempCommentList);
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikeButton = async (arg) => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      setIsLiked(!isLiked);
      let tempArray = likesList;
      let form = {
        user_id: user.id,
        post_id: post.id,
      };
      if (arg === "like") {
        tempArray.push(form);
        setLikesList(tempArray);
        // await axios.post(`${API_URL}/likes`,form)
        let like = await axios.post(`${API_URL}/posts/like`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (arg === "unlike") {
        let likeIndex = tempArray.findIndex((val) => {
          return val.user_id == user.id;
        });
        // let unlike = await axios.delete(`${API_URL}/likes/${tempArray[likeIndex].id}`)
        let unlike = await axios.delete(
          `${API_URL}/posts/unlike?user_id=${user.id}&post_id=${post.id}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        tempArray.splice(likeIndex, 1);
        setLikesList(tempArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const printComment = () => {
    if (commentList.length) {
      return commentList.map((value) => {
        let commenter = users.filter((val) => {
          return val.id == value.user_id;
        })[0];
        let commentDate = value.created_at
          ? value.created_at.slice(0, 10)
          : "a few seconds ago";
        return (
          <div
            key={`${value.id}-${commenter.id}`}
            className="grid grid-cols-10 items-start p-2 gap-2 "
          >
            <div className="avatar col-span-1 self-start justify-self-center">
              <div className="w-7 rounded-full">
                <Link href={`/profile?id=${commenter.id}`}>
                  <img
                    className="mt-0"
                    src={`${API_URL}${commenter.profile_picture}`}
                  />
                </Link>
              </div>
            </div>
            <div className="col-span-9">
              <a className="font-bold">{commenter.username}</a>
              <label className="pl-1 break-words">{value.comment}</label>
              <div className="text-sm text-slate-500">{commentDate}</div>
            </div>
          </div>
        );
      });
    }
  };

  if (confirmDelete) {
    // try{
    let token = localStorage.getItem("tokenIdUser");

    axios
      .delete(`${API_URL}/posts/delete?id=${post.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setModalContent({
          icon: "success",
          title: "Success!",
          text: "Your post is deleted",
          onClick: () => {
            router.push(`/profile?id=${user.id}`);
          },
        });
        toggleVisible();
        setConfirmDelete(false);
      })
      .catch((error) => {
        setModalContent({
          icon: "error",
          title: "Error!",
          text: "Please try again",
        });
        toggleVisible();
        setConfirmDelete(false);
      });

    //   let res = axios.delete(`${API_URL}/posts/delete?id=${post.id}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     console.log(res)
    //     if (res) {
    //       setModalContent({
    //         icon: "success",
    //         title: "Success!",
    //         text: "Your post is deleted",
    //         onClick: () => {
    //           router.push(`/profile?id=${user.id}`);
    //         },
    //       });
    //     }
    //   setConfirmDelete(false);
    // }
    // catch (error) {
    //   console.log(error)
    //   setModalContent({
    //     icon: "error",
    //     title: "Error!",
    //     text: "Please try again",
    //   });
    //   toggleVisible();
    //   setConfirmDelete(false);
    // }
  }

  // const handleDelete = () => {
  //   try {
  //     let token = localStorage.getItem("tokenIdUser");
  //     console.log(confirmDelete);
  //     console.log(confirmDelete);

  //     if (confirmDelete) {
  //       console.log("ok");
  //       // let res = axios.delete(`${API_URL}/posts/delete?id=${post.id}`, {
  //       //   headers: {
  //       //     Authorization: `Bearer ${token}`,
  //       //   },
  //       // });
  //       // if (res) {
  //       //   setModalContent({
  //       //     icon: "success",
  //       //     title: "Success!",
  //       //     text: "Your post is deleted",
  //       //     onClick: () => {
  //       //       window.location.reload();
  //       //     },
  //       //   });
  //       //   router.push(`/profile?id=${user.id}`);
  //       // }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     setModalContent({
  //       icon: "error",
  //       title: "Error!",
  //       text: "Please try again",
  //     });
  //     toggleVisible();
  //   }
  // };

  const getMoreComments = async () => {
    try {
      let lastId = commentList[commentList.length - 1].id;
      let res = await axios.get(
        `${API_URL}/posts/get/comments/${post.id}/${lastId}`
      );
      if (res) {
        if (!res.data.hasMore) {
          setHasMoreComment(!hasMoreComments);
        }
        let newComments = [...res.data.comments];
        setCommentList((comments) => [...comments, ...newComments]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeInputComment = (e) => {
    let input = e.target.value;
    setComment(input);
    setCommentLength(input.length);
  };

  return (
    <div className="px-10 md:px-32 lg:px-48 xl:px-80">
      {!pageIsLoading ? (
        <div className="mx-auto">
          <MetaTag
            title="Kartoffel"
            description={`Look at this image by ${post.username}`}
            image={`${API_URL}${post.image}`}
          />
          <div className="bg-base-100 shadow-sm rounded-none mx-auto pt-1 max-h-screen">
            {/* grid untuk membagi bagian image dan detail */}
            <div className="grid grid-cols-10 overflow-y-visible bg-accent">
              {/* image */}
              <div className="col-span-12 my-2 grid items-center">
                {/* image json server */}
                {/* <img
                className="object-contain w-auto h-full mx-auto "
                src={post.image}
                alt="Movie"
              /> */}
                {/* image backend */}
                <img
                  className="object-contain w-auto h-full mx-auto "
                  src={`${API_URL}${post.image}`}
                  alt={`POST-${post.username}-${post.id}`}
                />
              </div>
              {/* detail */}
              <div className="col-span-12 px-2 grid grid-rows bg-accent">
                <div className="grid grid-cols-10 row-span-1 ">
                  <div className="col-span-10  items-center grid grid-cols-2 border-b-2 border-accent-content">
                    <div className="col-span-1 flex items-center">
                      <div className="basis-5 align-middle">
                        {isLiked === false ? (
                          <AiOutlineHeart
                            className="cursor-pointer"
                            onClick={() => handleLikeButton("like")}
                          />
                        ) : (
                          <AiFillHeart
                            className="text-red-600 cursor-pointer"
                            onClick={() => handleLikeButton("unlike")}
                          />
                        )}
                      </div>
                      <div>
                        {likesList.length > 1
                          ? `${likesList.length} Likes`
                          : `${likesList.length} Like`}
                      </div>
                    </div>
                    <div className="mx-2 my-auto text-[11px] italic text-accent-content col-span-1 text-right">
                      Created Date: {createdDate}
                    </div>
                  </div>
                  <div className="avatar col-span-7 flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full">
                      {/* image json server */}
                      {/* <img className="mt-0" src={post.profile_picture} /> */}
                      {/* image backend */}
                      <Link href={`/profile?id=${poster.id}`}>
                        <img
                          className="mt-0 cursor-pointer"
                          src={`${API_URL}${post.profile_picture}`}
                        />
                      </Link>
                    </div>
                    <Link href={`/profile?id=${poster.id}`}>
                      <span className="font-bold">{post.username}</span>
                    </Link>
                  </div>
                  <div className="my-auto text-sm col-span-3 grid justify-items-end">
                    <div className="dropdown dropdown-end ">
                      <label
                        tabIndex="0"
                        className="w-10 btn rounded-lg bg-inherit border-transparent hover:bg-accent-focus hover:border-transparent"
                      >
                        <div className="w-10 rounded-full text-center">
                          <FiMoreVertical className="text-secondary-content" size={28}/>
                        </div>
                      </label>
                      <ul
                        tabIndex="0"
                        className="mt-3 p-2 shadow menu menu-compact rounded dropdown-content bg-accent-focus w-52"
                      >
                        {userIsPoster && (
                          <>
                            <li>
                              <a onClick={() => toggleConfirm()}>Delete</a>
                            </li>
                            <li>
                              <a onClick={() => setEditVisible(true)}>Edit</a>
                            </li>
                          </>
                        )}
                        <li>
                          <a onClick={() => setShareModal(true)}>Share</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-span-10 pl-6 pb-2 break-words">
                    {post.caption}
                  </div>
                </div>
                <div className="row-auto max-h-[65vh] overflow-y-auto ">
                  {printComment()}
                </div>
                <div>
                  {hasMoreComment && (
                    <div
                      className="text-center cursor-pointer text-secondary-content underline"
                      onClick={() => getMoreComments()}
                    >
                      Load More Comments
                    </div>
                  )}
                </div>
                <div className="row-span-1">
                  {/* <div className="flex my-2 items-center">
                    <div className="basis-5 align-middle">
                      {isLiked === false ? (
                        <AiOutlineHeart
                          className="cursor-pointer"
                          onClick={() => handleLikeButton("like")}
                        />
                      ) : (
                        <AiFillHeart
                          className="text-red-600 cursor-pointer"
                          onClick={() => handleLikeButton("unlike")}
                        />
                      )}
                    </div>
                    <div>{likesList.length} Likes</div>
                  </div> */}
                  <div>
                    <div>
                      <textarea
                        className="textarea textarea-bordered w-full rounded-sm bg-white"
                        placeholder="Add comment..."
                        value={comment}
                        onChange={(e) => hanldeInputComment(e)}
                        maxLength="300"
                        wrap="soft"
                      />
                      <div className="text-right">{commentLength} / 300</div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="btn btn-sm rounded-sm"
                        onClick={handleSubmitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <ModalEditPost
        visible={editVisible}
        toggleVisible={() => setEditVisible(!editVisible)}
        postId={post.id}
        caption={post.caption}
      />
      <ModalConfirm
        visible={openConfirm}
        toggleVisible={() => toggleConfirm()}
        title="Warning!"
        text="Are you sure you want to delete this post?"
        onClick={() => setConfirmDelete(true)}
      />
      <ModalAlert
        visible={visible}
        toggleVisible={() => toggleVisible()}
        icon={modalContent.icon}
        title={modalContent.title}
        text={modalContent.text}
        onClick={modalContent.onClick}
      />
      <ModalSharePost
        visible={shareModal}
        toggleVisible={() => toggleShare()}
        shareUrl={shareUrl}
      />
    </div>
  );
}

DetailPost.layout = "L1";

export default DetailPost;
