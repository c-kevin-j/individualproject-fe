import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../helper";

export const getServerSideProps = async (ctx) => {
  try {
    // // API JSON server
    // let resUsers = await axios.get(`${API_URL}/users`);
    // let resPosts = await axios.get(`${API_URL}/posts`);

    // API Backend
    let resUsers = await axios.get(`${API_URL}/users/get`);
    let resPosts = await axios.get(`${API_URL}/posts/get/0`);
    return {
      props: {
        users: resUsers.data,
        posts: resPosts.data,
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
  const [posts, setPosts]= React.useState(props.posts)
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
                      {/* image jsonserver */}
                      {/* <img
                        className="avatar w-10 rounded-full"
                        src={users[idxUser].profile_picture}
                      /> */}

                      {/* image backend */}
                      <img
                        className="avatar w-10 rounded-full"
                        src={`${API_URL}${users[idxUser].profile_picture}`}
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
                    {/* Image json server */}
                    {/* <img
                      className="object-cover w-auto h-full"
                      src={val.image}
                    /> */}

                    {/* Image backend */}
                    <img
                      className="object-cover w-auto h-full"
                      src={`${API_URL}${val.image}`}
                    />
                  </figure>
                </Link>
              </div>
              <div className="flex justify-center py-1 bg-base-200 font-light">
                <span>{val.caption}</span>
              </div>
            </div>
          </div>
          <div className="h-3" />
        </>
      );
    });
  };

  const infiniteScroll = async () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        let lastId = posts[posts.length-1].id
        let res = await axios.get(`${API_URL}/posts/get/${lastId}`)
        if (res){
          let tempPosts = [...posts]
          tempPosts.push(...res.data)
          setPosts(tempPosts)
          printPosts();
        }
      }
    }
  };


  return (
    <div className="mx-auto px-6 lg:px-36 xl:px-96 pt-5" >
      <div className="grid justify-items-center" onScroll={infiniteScroll()} ref={listInnerRef}>
        {printPosts()}
        {/* <div className="card rounded w-128">
            <div className="card-body p-2 bg-base-300 ">
              <div className="flex">
                <label
                  className="btn btn-ghost btn-circle avatar mx-2 my-auto flex-none"
                >
                  <img
                    className="avatar w-10 rounded-full"
                    src="https://api.lorem.space/image/face?hash=33791"
                  />
                </label>
                <div className="mx-2 my-auto grow">
                  @UsernameA
                </div>
                <div className="mx-2 my-auto text-sm text-slate-500">
                  Created at
                </div>
              </div>
              <Link href="/post">
                <figure>
                  <img
                    className="object-cover"
                    src="https://picsum.photos/500/500"
                  />
                </figure>
              </Link>
            </div>
          </div> */}
        {/* <div className="h-3" />
          <div className="card rounded w-128">
            <div className="card-body p-2 bg-base-300">
              <div className="flex">
                <label
                  className="btn btn-ghost btn-circle avatar mx-2 my-auto flex-none"
                >
                  <img
                    className="avatar w-10 rounded-full "
                    src="https://api.lorem.space/image/face?hash=33791"
                  />
                </label>
                <div className="mx-2 my-auto grow">@UsernameA</div>
                <div className="mx-2 my-auto text-sm text-slate-500">
                  Created at
                </div>
              </div>
              <Link href="/post">
                <figure>
                  <img
                    className="object-cover"
                    src="https://picsum.photos/500/500"
                    alt="Shoes"
                  />
                </figure>
              </Link>
            </div>
          </div> */}
      </div>
    </div>
  );
}

HomePage.layout = "L1";

export default HomePage;
