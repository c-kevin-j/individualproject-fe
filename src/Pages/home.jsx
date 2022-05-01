import React from "react";
import Navbar from "../Components/Navbar";
import Form from "../Components/Form";
import { Card, Button, Avatar } from "react-daisyui";
import Image from "next/image";
import Link from "next/link";
// import { useDispatch } from "react-redux";
// import { saveUserAction } from "../Redux/Actions/userAction";

export default function HomePage() {
  // const dispatch = useDispatch();
  const [count, setCount] = React.useState(0);
  const [textCoba, setTextCoba] = React.useState("");

  const handleDecrement = () => {
    let temp = count;
    temp--;
    setCount(temp);
  };
  const handleIncrement = () => {
    let temp = count;
    temp++;
    setCount(temp);
  };

  const handleSubmit = (data) => {
    setTextCoba(data);
    // dispatch(saveUserAction(data))
  };

  return (
    <div>
      <Navbar />
      {/* <h2>Home Page</h2>
    <div>
      <button type="button" onClick={handleDecrement}> - </button>
      <label className="px-2"> {count} </label>
      <button type="button" onClick={handleIncrement}> + </button>
    </div>
    <div>
      <label for="my-modal" className="btn modal-button">Open Modal</label>

      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label for="my-modal" className="modal cursor-pointer">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Congratulations random Interner user!</h3>
          <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
          <div className="modal-action">
            <label for="my-modal" className="btn">Yay!</label>
          </div>
        </div>
      </label>
    </div>
    <div>
      <h1>{textCoba}</h1>
      <Form
        title="Judul Form"
        handleSubmit={handleSubmit}
      />
    </div> */}
      <div className="container mx-auto pt-5">
        <div className="px-6 lg:px-40">
          <Card>
            <Card.Body className="p-2 bg-black \">
              <div className="flex">
                <label
                  className="btn btn-ghost btn-circle avatar mx-2 my-auto flex-none"
                >
                  <Avatar
                    className="w-10 rounded-full"
                    src="https://api.lorem.space/image/face?hash=33791"
                  />
                </label>
                <div className="mx-2 my-auto grow">@UsernameA</div>
                <div className="mx-2 my-auto text-sm text-slate-500">
                  Created at
                </div>
              </div>
              <Link href="/post/post">
                <Card.Image
                  className="object-cover"
                  src="https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?b=1&k=20&m=517188688&s=612x612&w=0&h=x8h70-SXuizg3dcqN4oVe9idppdt8FUVeBFemfaMU7w="
                  alt="Shoes"
                />
              </Link>
            </Card.Body>
          </Card>
          <div className="h-3" />
          <Card>
            <Card.Body className="p-2 bg-black \">
              <div className="flex">
                <label
                  className="btn btn-ghost btn-circle avatar mx-2 my-auto flex-none"
                >
                  <Avatar
                    className="w-10 rounded-full "
                    src="https://api.lorem.space/image/face?hash=33791"
                  />
                </label>
                <div className="mx-2 my-auto grow">@UsernameA</div>
                <div className="mx-2 my-auto text-sm text-slate-500">
                  Created at
                </div>
              </div>
              <Link href="/post/post">
              <Card.Image
                className="object-cover"
                src="https://api.lorem.space/image/shoes?w=400&h=225"
                alt="Shoes"
                />
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
