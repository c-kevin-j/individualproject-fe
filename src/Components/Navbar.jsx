import Link from "next/link";
import AddButton from "./Atoms/AddButton";

function Navbar(props) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href="/home">
          <a className="btn btn-ghost normal-case text-xl">Navbar</a>
        </Link>
      </div>
      <div className="flex-none gap-2">
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div> */}
        <Link href="/post/create">
          <div>
            <AddButton />
          </div>
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.lorem.space/image/face?hash=33791" />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <Link href="/profile">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
            </Link>
            <li>
              <a>Settings</a>
            </li>
            <Link href="/">
              <li>
                <a>Logout</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar