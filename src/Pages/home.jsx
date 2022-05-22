import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../helper";

export const getServerSideProps = async (ctx) => {
  try {
    let resUsers = await axios.get(`${API_URL}/users`)
    let resPosts = await axios.get(`${API_URL}/posts`)
    return {
      props:{
        users:resUsers.data,
        posts:resPosts.data.reverse(),
      }
    }
  } catch (error) {
    return{
      props:{}
    }
  } 
}

function HomePage(props) {
  // const dispatch = useDispatch();
  let {users, posts} = props

  const printPosts = () => {
    return posts.map((val, idx)=>{
      let idxUser = users.findIndex((user)=>{
        return user.id === val.user_id
      })
      return<>
        <div className="card rounded-md border-2 w-128">
            <div className="card-body p-0 gap-0 bg-base-300 ">
              <div className="flex bg-base-200">
                <label
                  className="btn btn-ghost btn-circle avatar mx-2 my-1 flex-none"
                >
                  <img
                    className="avatar w-10 rounded-full"
                    src={users[idxUser].profile_picture}
                  />
                </label>
                <div className="mx-2 my-auto grow">
                  {users[idxUser].username}
                </div>
                <div className="mx-2 my-auto text-sm text-slate-500">
                  Created at
                </div>
              </div>
              <Link href={`/post?id=${val.id}`}>
                <figure className="py-2">
                  <img
                    className="object-cover"
                    src={val.image}
                  />
                </figure>
              </Link>
            </div>
          </div>
          <div className="h-3" />
      </>
    })
  }

  return (
    <div className="mx-auto px-6 lg:px-36 xl:px-96 pt-5">
        <div className="grid justify-items-center">
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