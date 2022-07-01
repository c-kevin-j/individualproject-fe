import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../helper";
import InfiniteScroll from "react-infinite-scroll-component";

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
    return {
      props: {},
    };
  }
};

function HomePage(props) {
  // const dispatch = useDispatch();
  let { users } = props;
  const [posts, setPosts] = useState(props.posts);
  const [hasMore, setHasMore] = useState(true);
  const listInnerRef = React.useRef();

  const printPosts = () => {
    return posts.map((val, idx) => {
      let idxUser = users.findIndex((user) => {
        return user.id === val.user_id;
      });
      let createdDate = val.created_at.slice(0, 10);
      return (
        <>
          <div className="card rounded-md w-128 shadow-md">
            <div className="card-body p-0 gap-0 bg-base-300 ">
              <Link href={`/profile?id=${users[idxUser].id}`}>
                <div className="flex bg-base-200">
                  <label className="btn btn-ghost btn-circle avatar mx-2 my-1 flex-none">
                    <Link href={`/profile?id=${users[idxUser].id}`}>
                      <img
                        className="avatar w-10 rounded-full"
                        src={`${API_URL}${users[idxUser].profile_picture}`}
                        alt={`pict-${users[idxUser].username}`}
                      />
                    </Link>
                  </label>
                  <Link href={`/profile?id=${users[idxUser].id}`}>
                    <div className="mx-2 my-auto grow font-bold">
                      {users[idxUser].username}
                    </div>
                  </Link>
                  <div className="mx-2 my-auto text-sm text-slate-500">
                    {createdDate}
                  </div>
                </div>
              </Link>
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
              <div className="flex justify-center py-1 bg-base-200 font-light break-normal">
                {val.caption}
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
    <div className="mx-auto px-6 lg:px-36 xl:px-96 pt-5">
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
        )
          :
          <div>
            Nothing to see here...
          </div>
      }
      </div>
    </div>
  );
}

HomePage.layout = "L1";

export default HomePage;
