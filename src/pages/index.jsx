import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../helper";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillHeart } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/router";
import ModalSharePost from "../Components/Posts/ModalSharePost";
import MetaTag from "../Components/HeadMeta";

export const getServerSideProps = async (ctx) => {
  try {
    let resUsers = await axios.get(`${API_URL}/users/get`);
    let resPosts = await axios.get(`${API_URL}/posts/get/0`);
    return {
      props: {
        users: resUsers.data,
        posts: resPosts.data.posts,
      },
    };
  } catch (error) {
    console.log(error)
    return {
      props: {},
    };
  }
};

function HomePage(props) {
  // const dispatch = useDispatch();
  const router = useRouter();
  let { users } = props;
  const [posts, setPosts] = useState(props.posts);
  const [hasMore, setHasMore] = useState(true);
  const [usernameShare,setUsernameShare] = useState("");
  const [imageShare,setImageShare] = useState("");
  // let usernameShare = ""
  // let imageShare=""

  // share modal
  const [shareModal, setShareModal] = useState(false);
  const toggleShare = () => {
    setShareModal(!shareModal);
  };
  const [shareUrl,setShareUrl] = useState("")

  const handleShareButton = (username, imageurl, id) =>{
    setShareModal(true);
    setUsernameShare(username)
    setImageShare(imageurl)
    setShareUrl(`https://individualproject-fe.vercel.app/post/shared?id=${id}`)
  }

  const printPosts = () => {
    return posts.map((val, idx) => {
      let totalLikes = val.likes.length;
      let idxUser = users.findIndex((user) => {
        return user.id === val.user_id;
      });
      let createdDate = val.created_at.slice(0, 10);
      return (
        <>
          <div className="card rounded-md w-128 shadow-md">
            <div className="card-body p-0 gap-0 bg-base-300 ">
              <div>
                <div className="flex bg-accent items-center">
                  <label className="btn btn-ghost btn-circle avatar mx-2 my-1 flex-none">
                    <Link href={`/profile?id=${users[idxUser].id}`}>
                      <img
                        className="avatar w-10 rounded-full"
                        src={`${API_URL}${users[idxUser].profile_picture}`}
                        alt={`pict-${users[idxUser].username}`}
                      />
                    </Link>
                  </label>
                  <div className="mx-2 my-auto grow font-bold">
                    <Link href={`/profile?id=${users[idxUser].id}`}>
                      <span className="cursor-pointer">
                        {users[idxUser].username}
                      </span>
                    </Link>
                  </div>
                  {/* <div className="mx-2 my-auto text-sm text-slate-500 text-accent-content">
                    {createdDate}
                  </div> */}
                  <div className="dropdown dropdown-end ">
                    <label
                      tabIndex="0"
                      className="w-10 btn rounded-lg bg-inherit border-transparent hover:bg-accent-focus hover:border-transparent"
                    >
                      <div className="w-10 rounded-full text-center">
                        <FiMoreVertical
                          className="text-secondary-content"
                          size={28}
                        />
                      </div>
                    </label>
                    <ul
                      tabIndex="0"
                      className="mt-3 p-2 shadow menu menu-compact rounded dropdown-content bg-accent-focus w-52"
                    >
                      <li>
                        <a onClick={() => handleShareButton(users[idxUser].username, val.image, val.id)}>Share</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="min-h-fit">
                <Link href={`/post?id=${val.id}`}>
                  <figure>
                    <img
                      className="object-cover w-auto h-full"
                      src={`${API_URL}${val.image}`}
                      alt={`post-${users[idxUser].username}-${val.id}`}
                    />
                  </figure>
                </Link>
              </div>
              <div className="bg-accent p-2 space-y-1">
                <div className="grid grid-cols-3">
                  <div className="col-span-1 flex items-center gap-x-2">
                    <AiFillHeart />{" "}
                    {totalLikes > 1
                      ? `${totalLikes} likes`
                      : `${totalLikes} like`}
                  </div>
                  {/* TODO: ubah jadi ke kanan */}
                  <div className="col-span-2 mx-2 my-auto text-[11px] italic text-right text-accent-content">
                    Created Date: {createdDate}
                  </div>
                </div>
                <div className="font-light break-all ml-6">{val.caption}</div>
              </div>
            </div>
          </div>
          <div className="h-3" />
        </>
      );
    });
  };

  const getMorePosts = async () => {
    try {
      let lastId = posts[posts.length - 1].id;
      let res = await axios.get(`${API_URL}/posts/get/${lastId}`);
      if (res) {
        if (!res.data.hasMore) {
          setHasMore(!hasMore);
        }
        let newPosts = [...res.data.posts];
        setPosts((posts) => [...posts, ...newPosts]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto px-6 lg:px-36 xl:px-96 pt-2">
      <MetaTag
        title="Kartoffel"
        description={`Look at this image by ${usernameShare}`}
        image={`${API_URL}${imageShare}`}
      />
      <div className="grid justify-items-center">
        {posts.length > 0 ? (
          <InfiniteScroll
            dataLength={posts.length}
            next={getMorePosts}
            hasMore={hasMore}
            loader={<h3>Loading...</h3>}
          >
            {printPosts()}
          </InfiniteScroll>
        ) : (
          <div>Nothing to see here...</div>
        )}
      </div>
      <ModalSharePost
        visible={shareModal}
        toggleVisible={() => toggleShare()}
        shareUrl={shareUrl}
      />
    </div>
  );
}

HomePage.layout = "L1";

export default HomePage;
