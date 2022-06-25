import axios from "axios";
import React, {useState} from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { useSelector } from "react-redux";
import ModalEditPost from "../../Components/Posts/ModalEditPost";
import { useRouter } from "next/router";
import { API_URL } from "../../../helper";

export const getServerSideProps = async (ctx) => {
  try {
    // // props json server
    // let resPost = await axios.get(`${API_URL}/posts?id=${ctx.query.id}`);
    // let resUsers = await axios.get(`${API_URL}/users`);
    // let resComments = await axios.get(
    //   `${API_URL}/comments?post_id=${ctx.query.id}`
    // );
    // let resLikes = await axios.get(`${API_URL}/likes?post_id=${ctx.query.id}`);
    // return {
    //   props: {
    //     post: resPost.data[0],
    //     users: resUsers.data,
    //     comments: resComments.data,
    //     likes: resLikes.data,
    //   },
    // };

    // props backend

    let resPost = await axios.get(`${API_URL}/posts/get/detail?id=${ctx.query.id}`);
    let resUsers = await axios.get(`${API_URL}/users/get`);
    return {
      props: {
        post: resPost.data,
        comments: resPost.data.comments,
        likes: resPost.data.likes,
        users: resUsers.data,
      }
    }

  } catch (error) {
    return {
      props: {
        
      },
    };
  }
};

function DetailPost(props) {
  // json server
  let router = useRouter();
  let { post, users, comments, likes } = props;
  let createdDate = post.created_at.slice(0,10)
  // let token = localStorage.getItem("tokenIdUser");

  // user => user who is viewing the post
  const { user } = useSelector((state) => {
    return {
      user: state.usersReducer.user,
    };
  });
  
  const [commentList, setCommentList] = useState(comments);
  const [comment, setComment] = useState("");
  // const [commentDate, setCommentDate] = useState("");
  const [editVisible, setEditVisible] = useState(false);
  // poster => user who post the picture
  const [poster, setPoster] = useState([]);
  const [userIsPoster, setUserIsPoster] = useState(false);
  
  // to see if user has already liked the post
  const [isLiked, setIsLiked] = useState(null);
  // to get number of likes
  const [likesList, setLikesList] = useState(likes);

  // to check if user can edit / delete the post
  const getPoster = () => {
    let posterIdx = users.findIndex((val) => {
      if (val.id === post.user_id) {
        if (val.id === user.id) {
          setUserIsPoster(current => !current);
        }
        return val;
      }
    });
    setPoster(users[posterIdx]);
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
      tempCommentList.push(newComment);
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
    try{
      let token = localStorage.getItem("tokenIdUser");
      setIsLiked(!isLiked);
      let tempArray = likesList;
      let form = {
        user_id:user.id,
        post_id:post.id,
      }
      if (arg === "like") {
        tempArray.push(form)
        setLikesList(tempArray);
        // await axios.post(`${API_URL}/likes`,form)
        let like = await axios.post(`${API_URL}/posts/like`,form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      } else if (arg === "unlike") {
        let likeIndex = tempArray.findIndex((val)=>{
          return val.user_id == user.id
        })
        // let unlike = await axios.delete(`${API_URL}/likes/${tempArray[likeIndex].id}`)
        let like = await axios.delete(`${API_URL}/posts/unlike?user_id=${user.id}&post_id=${post.id}`)
        tempArray.splice(likeIndex,1)
        setLikesList(tempArray);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const printComment = () => {
    if (commentList.length) {
      return commentList.map((value) => {
        let commenter = users.filter((val) => {
          return val.id == value.user_id;
        })[0];
        let commentDate = value.created_at ? value.created_at.slice(0,10) : "a few seconds ago"
        return (
          <div key={commenter.id} className="grid grid-cols-10 items-start py-2">
            <div className="avatar col-span-1 self-start justify-self-center">
              <div className="w-7 rounded-full">
                {/* image json server */}
                {/* <img className="mt-0" src={`${commenter.profile_picture}`} /> */}
                {/* image backend */}
                <img className="mt-0" src={`${API_URL}${commenter.profile_picture}`} />
              </div>
            </div>
            <div className="col-span-9">
              <a className="font-bold">{commenter.username}</a>
              <label className="pl-1">{value.comment}</label>
              <div className="text-sm text-slate-500">{commentDate}</div>
            </div>
          </div>
        );
      });
    }
  };

  const handleDelete = () => {
    try {
      let token = localStorage.getItem("tokenIdUser");
      if (confirm("Yakin ingin hapus?")) {
        let res = axios.delete(`${API_URL}/posts/delete?id=${post.id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          alert(`Delete berhasil`);
          router.push(`/profile?id=${user.id}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {
    
  };

  return (
    <div className="px-10 md:px-32 lg:px-48 xl:px-80">
      <div className="mx-auto">
        <div className="bg-base-100 shadow-sm rounded-none mx-auto py-1">
          {/* grid untuk membagi bagian image dan detail */}
          <div className="grid grid-cols-10 bg-base-200">
            {/* image */}
            <div className="col-span-12 lg:col-span-6 my-2 grid items-center">
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
            <div className="col-span-12 lg:col-span-4 px-2 grid grid-rows lg:grid-rows-6 bg-base-200">
              <div className="grid grid-cols-10 row-span-1">
                <div className="avatar col-span-7 lg:col-span-6 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full">
                    {/* image json server */}
                    {/* <img className="mt-0" src={post.profile_picture} /> */}
                    {/* image backend */}
                    <img className="mt-0" src={`${API_URL}${post.profile_picture}`} />
                  </div>
                  {post.username}
                </div>
                <div className="mx-2 my-auto text-xs text-slate-500 col-span-2 text-right">
                  {createdDate}
                </div>
                <div className="my-auto text-sm col-span-1 grid justify-items-end lg:col-span-2">
                  <div className="dropdown dropdown-end ">
                    <label
                      tabIndex="0"
                      className="w-10 btn rounded-sm bg-inherit border-transparent hover:bg-base-200 hover:border-transparent"
                    >
                      <div className="w-10 rounded-full text-center">
                        <FiMoreVertical />
                      </div>
                    </label>
                    <ul
                      tabIndex="0"
                      className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 w-52"
                    >
                      {userIsPoster && (
                        <>
                          <li>
                            <a
                              // className={!userIsPoster && `hidden`}
                              onClick={handleDelete}
                            >
                              Delete
                            </a>
                          </li>
                          <li>
                            <a
                              // className={!userIsPoster && `hidden`}
                              onClick={() => setEditVisible(true)}
                            >
                              Edit
                            </a>
                          </li>
                        </>
                      )}
                      <li>
                        <a>Share</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-span-10 py-1">{post.caption}</div>
              </div>
              <div className="row-auto lg:row-span-5">{printComment()}</div>
              <div className="row-span-1">
                <div className="flex">
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
                </div>
                <div>
                  <textarea
                    className="textarea textarea-bordered w-full rounded-sm"
                    placeholder="Add comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-s rounded-sm"
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
      <ModalEditPost
        visible={editVisible}
        toggleVisible={() => setEditVisible(!editVisible)}
        postId={post.id}
        caption={post.caption}
      />
    </div>
  );
}

DetailPost.layout = "L1";

export default DetailPost;
