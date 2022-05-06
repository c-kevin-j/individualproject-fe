import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi"; 

function DetailPost (props) {
  const [likeButton, setLikeButton] = React.useState(false)
  const [likes, setLikes] = React.useState(0)
  const [commentList, setCommentList] = React.useState([])
  const [comment, setComment] = React.useState("")
  const [commentDate, setCommentDate] = React.useState("")

  const handleSubmitComment = () => {
    let tempCommentList = [...commentList]
    tempCommentList.push(comment)
    setCommentList(tempCommentList)
    let date = new Date();
    setCommentDate(`${date.getFullYear()} - ${date.getMonth()+1} - ${date.getDate()}`)
    setComment("")
  }

  const handleLikeButton = (arg) => {
    setLikeButton(!likeButton)
    let temp = likes
    if (arg === "like") {
      temp++
      setLikes(temp)
    } else if (arg === "unlike") {
      temp--
      setLikes(temp)
    }
  }

  const printComment = () => {
    if (commentList.length) {
      return commentList.map((value)=>{
        return <div className="grid grid-cols-10">
          <div className="avatar m-auto col-span-1">
            <div className="w-7 rounded-full">
              <img className="mt-0" src="https://api.lorem.space/image/face?hash=64318" />
            </div>
          </div>
          <div className="col-span-9">
            <a className="font-bold">
              username 
            </a>
            <label className="pl-1">
              {value}
            </label>
            <div className="text-sm text-slate-500">
              {commentDate}
            </div>
          </div>
        </div>
      }) 
    }
  }

  return (
    <div>
      <div className="mx-auto">
        <div className="bg-base-100 shadow-xl rounded-none mx-auto py-1">
          <div className="grid grid-cols-10">
            <div className="col-span-12 lg:col-span-6">
              <img className="w-auto h-auto mx-auto " src="https://api.lorem.space/image/movie" alt="Movie" />
            </div>
            <div className="col-span-12 lg:col-span-4 px-2 grid grid-rows-6">
              <div className="grid grid-cols-10 row-span-1">
                <div className="avatar m-auto col-span-1">
                  <div className="w-10 h-10 rounded-full">
                    <img className="mt-0" src="https://api.lorem.space/image/face?hash=64318" />
                  </div>
                </div>
                <div className="mx-2 my-auto col-span-7">
                  @UsernameA
                </div>
                <div className="mx-2 my-auto text-sm text-slate-500 col-span-1">
                  Date
                </div>
                <div className="mx-2 my-auto text-sm col-span-1">
                  <div className="dropdown dropdown-end">
                    <label tabIndex="0" className="btn">
                      <div className="w-10 rounded-full text-center">
                        <FiMoreVertical />
                      </div>
                    </label>
                    <ul
                      tabIndex="0"
                      className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 w-52"
                    >
                      <li>
                        <a>Delete</a>
                      </li>
                      <li>
                        <a>Edit</a>
                      </li>
                      <li>
                        <a>Share</a>
                      </li>
                    </ul>
                  </div>
        
                </div>
                <div className="col-span-10 py-1">
                  This is caption
                </div>
              </div>
              <div className="row-span-5">
                  {printComment()}
              </div>
                <div className="row-span-1">
                  <div className="flex">
                    <div className="basis-5 align-middle">
                      {
                        likeButton === false
                        ?
                        <AiOutlineHeart className="cursor-pointer" onClick={()=>handleLikeButton("like")}/>
                        :
                        <AiFillHeart className="text-red-600 cursor-pointer" onClick={()=>handleLikeButton("unlike")}/>
                      }
                    </div>
                    <div>
                      {likes} Likes
                    </div>
                  </div>
                  <div className="pr-4">
                    <textarea className="textarea textarea-bordered w-full" placeholder="Add comment..." value={comment} onChange={(e) => setComment(e.target.value)}/>
                    <button type="button" className="btn btn-s" onClick={handleSubmitComment}>Submit</button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DetailPost.layout= "L1"

export default DetailPost