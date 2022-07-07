// import React, {useState} from "react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AiFillHeart } from "react-icons/ai";
import { BsFillGridFill } from "react-icons/bs";
import { API_URL } from "../../../helper";
import Link from "next/link";
import AddButton from "../../Components/Atoms/AddButton";
import ModalCreatePost from "../../Components/Posts/ModalCreatePost";

export const getServerSideProps = async (ctx) => {
  try {
    let resUser = await axios.get(
      `${API_URL}/users/get/detail?id=${ctx.query.id}`
    );
    let resUserPosts = await axios.get(
      `${API_URL}/posts/get/userPost?id=${ctx.query.id}`
    );
    let resLikedPosts = await axios.get(
      `${API_URL}/posts/get/likedPost?id=${ctx.query.id}`
    );
    return {
      props: {
        user: resUser.data[0],
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

  let { user, posts, likedPosts } = props;
  const [selectedTab, setSelectedTab] = useState(1);
  const [visible, setVisible] = useState(false);

  const printProfile = () => {
    return (
      <>
        <div className="align-bottom">
          <div className="grid grid-cols-3">
            <div className="col-span-full text-2xl font-light text-secondary-content">
              {user.username}
            </div>
            <div className="col-span-full font-bold">{`${
              user.first_name ? user.first_name : ""
            } ${user.last_name ? user.last_name : ""}`}</div>
            <label className="label col-span-1">
              <span className="label-text">Bio</span>
            </label>
            <label className="label col-span-2">
              <span>{user.bio}</span>
            </label>
            <label className="label">
              <span className="label-text col-span-1">Email</span>
            </label>
            <label className="label col-span-2 link text-blue-400">
              {user.email}
            </label>
          </div>
        </div>
      </>
    );
  };

  const printPosts = (data) => {
    if (data.length > 0) {
      return data.map((val, idx) => {
        return (
          <>
            <Link href={`/post?id=${val.id}`}>
              <div
                className="card w-full aspect-square bg-base-200 shadow-xl 
                rounded-none 
                col-span-1
                flex place-content-center"
              >
                <div className="flex place-content-center h-full">
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
    } else {
      return (
        <div className="m-auto col-span-3">
          {selectedTab === 1 ? (
            <>
              <div className="font-bold">You haven't created any post yet</div>
              <br />
              <div>Click here to make your first post</div>
              <div className="text-center">
                <AddButton clickAdd={() => setVisible(true)} />
                <ModalCreatePost
                  visible={visible}
                  toggleVisible={() => setVisible(!visible)}
                />
              </div>
            </>
          ) : (
            <>You haven't liked any post yet</>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <div className="px-10 md:px-32 lg:px-48 xl:px-80 pt-5">
        <div>
          <div className="container flex px-4">
            <div className="avatar m-auto basis-1/4 place-content-center image-full">
              <div className="w-40 rounded-full">
                <img
                  className="mt-0"
                  src={`${API_URL}${user.profile_picture}`}
                />
              </div>
            </div>
            <div className="px-4 grow grid items-center">{printProfile()}</div>
          </div>
          <div className="tabs my-3 border-y-2  border-secondary-focus grid grid-cols-2 justify-items-center">
            <span
              className={`tab gap-2 ${
                selectedTab === 1 &&
                "tab-active text-secondary-content font-bold"
              }`}
              onClick={() => setSelectedTab(1)}
            >
              <BsFillGridFill />
              POSTS
            </span>
            <span
              className={`tab gap-2 ${
                selectedTab === 2 &&
                "tab-active text-secondary-content font-bold"
              }`}
              onClick={() => setSelectedTab(2)}
            >
              <AiFillHeart />
              LIKES
            </span>
          </div>
        </div>
        <div className="pt-2 grid grid-cols-3 gap-2 justify-items-center">
          {selectedTab === 1 ? printPosts(posts) : printPosts(likedPosts)}
        </div>
      </div>
    </>
  );
}

ProfilePage.layout = "L1";

export default ProfilePage;
