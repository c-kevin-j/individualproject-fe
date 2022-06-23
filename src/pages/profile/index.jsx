// import React, {useState} from "react";
import React, {useState} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { API_URL } from "../../../helper";
import Link from "next/link";

export const getServerSideProps = async (ctx) => {
  try {
    // // props json server
    // let resUser = await axios.get(`${API_URL}/users?id=${ctx.query.id}`);
    // let resAllPosts = await axios.get(`${API_URL}/posts`);
    // let resPosts = await axios.get(`${API_URL}/posts?user_id=${ctx.query.id}`);
    // let resLikedPosts = await axios.get(
    //   `${API_URL}/likes?user_id=${ctx.query.id}`
    // );
    // return {
    //   props: {
    //     user: resUser.data[0],
    //     allPosts: resAllPosts.data,
    //     posts: resPosts.data.reverse(),
    //     likedPosts: resLikedPosts.data.reverse(),
    //   },
    // };

    // props backend
    let resUser = await axios.get(`${API_URL}/users/get/detail?id=${ctx.query.id}`);
    console.log(resUser.data[0])
    // let resAllPosts = await axios.get(`${API_URL}/posts/get`);
    let resUserPosts = await axios.get(`${API_URL}/posts/get/userPost?id=${ctx.query.id}`);
    let resLikedPosts = await axios.get(`${API_URL}/posts/get/likedPost?id=${ctx.query.id}`);
    return {
      props: {
        user: resUser.data[0],
        // allPosts: resAllPosts.data,
        posts: resUserPosts.data.reverse(),
        likedPosts: resLikedPosts.data.reverse(),
      },
    };

  } catch (error) {
    return {
      props: {},
    };
  }
};

function ProfilePage(props) {
  // const { user } = useSelector((state)=>{
  //   return{
  //     user: state.usersReducer.user
  //   }
  // })

  let { user, posts, likedPosts } = props;
  const [selectedTab, setSelectedTab] = useState(1);

  const printProfile = () => {
    return (
      <>
        <div className="align-bottom">
          <div className="grid grid-cols-3">
            <div className="col-span-full text-2xl font-light text-primary-content">
              {user.username}
            </div>
            <div className="col-span-full font-bold">{`${user.first_name ? user.first_name : ""} ${user.last_name ? user.last_name : ""}`}</div>
            <label className="label col-span-1">
              <span className="label-text">Bio</span>
            </label>
            <label className="label col-span-2">
              <span>{user.bio}</span>
            </label>
            <label className="label">
              <span className="label-text col-span-1">Email</span>
            </label>
            <label className="label col-span-2 link text-accent">
              {user.email}
            </label>
          </div>
        </div>
      </>
    );
  };

  const printPosts = (data) => {
    return data.map((val, idx) => {
      return (
        <>
          <Link href={`/post?id=${val.id}`}>
            <div
              className="card w-full aspect-square bg-base-300 shadow-xl 
              rounded-none 
              col-span-1
              flex place-content-center"
            >
              <div className="flex place-content-center h-full">
                {/* image json server */}
                {/* <img
                  src={val.image}
                  className="object-contain object-center h-full"
                /> */}
                {/* image backend */}
                <img
                  src={`${API_URL}${val.image}`}
                  className="object-contain object-center h-full"
                />
              </div>
            </div>
          </Link>
        </>
      );
    });
  };

  // const printLikedPosts = () => {
  //   let filtered = [];
  //   for (let i = 0; i < likedPosts.length; i++) {
  //     let j=0;
  //     let check=false
  //     while (!check && j<allPosts.length) {
  //       if (likedPosts[i].post_id == allPosts[j].id){
  //         filtered.push(allPosts[j])
  //       }
  //       j++
  //     }
  //   }
  //   return printPosts(filtered)
  // };

  return (
    <>
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5">
        <div className="container flex px-4">
          <div className="avatar m-auto basis-1/4 place-content-center image-full">
            <div className="w-40 rounded-full">
              {/* image json server */}
              {/* <img className="mt-0" src={user.profile_picture} /> */}
              {/* image backend */}
              <img className="mt-0" src={`${API_URL}${user.profile_picture}`} />
            </div>
          </div>
          <div className="px-4 grow grid items-center">{printProfile()}</div>
        </div>
        <div className="tabs my-3 border-y-2 grid grid-cols-2 justify-items-center">
          <span
            className={`tab gap-2 ${selectedTab === 1 && "tab-active text-secondary font-bold"}`}
            onClick={() => setSelectedTab(1)}
          >
            <BsFillGridFill />
            POSTS
          </span>
          <span
            className={`tab gap-2 ${selectedTab === 2 && "tab-active text-secondary font-bold"}`}
            onClick={() => setSelectedTab(2)}
          >
            <AiFillHeart />
            LIKES
          </span>
        </div>
        <div className="pt-2 grid grid-cols-3 gap-2 justify-items-center">
          {/* {selectedTab === 1 ? printPosts(posts) : printLikedPosts()} */}
          {selectedTab === 1 ? printPosts(posts) : printPosts(likedPosts)}
        </div>
      </div>
    </>
  );
}

ProfilePage.layout = "L1";

export default ProfilePage;
