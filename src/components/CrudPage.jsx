// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import Swal from "sweetalert2";

// const CrudPage = () => {
//   const [data, setData] = useState([]);
//   const [view, setView] = useState({ email: "", password: "" });
//   const emailRef = useRef();
//   const passwordRef = useRef();

//   useEffect(() => {
//     axios.get("http://localhost:3001/v1/user/get").then((res) => {
//       setData(res.data.result);
//     });
//   }, []);

//   const handleDelete = async (id) => {
//     await axios.delete(`http://localhost:3001/v1/user/delete/${id}`);
//     setData(data.filter((user) => user._id !== id));
//     showToast("User Deleted Successfully", "success");
//   };

//   const handleSubmit = async () => {
//     const finalData = {
//       email: emailRef.current.value,
//       password: passwordRef.current.value,
//     };
//     try {
//       const res = await axios.post(
//         "http://localhost:3001/v1/user/post",
//         finalData
//       );
//       setData((prevData) => [...prevData, res.data.result]);
//       showToast("User Added Successfully", "success");
//     } catch (error) {
//       showToast(error.response.data.message, "error");
//     }
//     emailRef.current.value = "";
//     passwordRef.current.value = "";
//   };

//   const handleView = (id) => {
//     const viewData = data.find((user) => user._id === id);
//     setView(viewData);
//   };

//   const handleChange = (e) => {
//     setView({ ...view, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await axios.put(
//         `http://localhost:3001/v1/user/update/${view._id}`,
//         view
//       );
//       setData((prevData) =>
//         prevData.map((user) => (user._id === view._id ? res.data.body : user))
//       );
//       showToast("User Updated Successfully", "success");
//     } catch (error) {
//       showToast(error.response.data.message, "error");
//     }
//   };

//   const showToast = (title, icon) => {
//     const Toast = Swal.mixin({
//       background: "black",
//       color: "white",
//       toast: true,
//       position: "top-start",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       },
//     });
//     Toast.fire({ icon, title });
//   };

//   return (
//     <>
//       <div className="d-flex justify-content-center mt-5">
//         <div className="card" style={{ width: "25rem", padding: "25px" }}>
//           <div className="card-body">
//             <div className="input-group mb-3">
//               <span className="input-group-text" id="basic-addon1">
//                 @
//               </span>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email"
//                 aria-label="email"
//                 aria-describedby="basic-addon1"
//                 ref={emailRef}
//               />
//             </div>
//             <div className="input-group mb-3">
//               <span className="input-group-text" id="basic-addon2">
//                 ...
//               </span>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Password"
//                 aria-label="Password"
//                 aria-describedby="basic-addon2"
//                 ref={passwordRef}
//               />
//             </div>
//             <button
//               className="btn btn-outline-dark w-100"
//               onClick={handleSubmit}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//       <table className="table table-bordered w-75 m-auto mt-5">
//         <thead>
//           <tr>
//             <th>Email</th>
//             <th>Password</th>
//             <th>Role</th>
//             <th>Delete</th>
//             <th>Update</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((val) => (
//             <tr
//               key={val._id}
//               style={{
//                 height: "auto",
//                 textAlign: "center",
//                 verticalAlign: "center",
//               }}
//             >
//               <td>{val.email}</td>
//               <td>{val.password}</td>
//               <td>{val.role}</td>
//               <td>
//                 <button
//                   className="btn btn-outline-danger"
//                   onClick={() => handleDelete(val._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//               <td>
//                 <button
//                   className="btn btn-outline-info"
//                   data-bs-toggle="modal"
//                   data-bs-target="#exampleModal"
//                   onClick={() => handleView(val._id)}
//                 >
//                   Update
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">
//                 Modal title
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               <div className="input-group mb-3">
//                 <span className="input-group-text" id="basic-addon3">
//                   @
//                 </span>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Email"
//                   aria-label="email"
//                   name="email"
//                   value={view.email}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="input-group mb-3">
//                 <span className="input-group-text" id="basic-addon4">
//                   ...
//                 </span>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Password"
//                   aria-label="Password"
//                   name="password"
//                   value={view.password}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 data-bs-dismiss="modal"
//                 onClick={handleUpdate}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CrudPage;

import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { deleteData, postData, updateData } from "../Toolkit/Slices/UserSlice";
import { CircularProgress } from "@mui/joy";

const CrudPage = () => {
  const [view, setView] = useState({ email: "", password: "" });
  const emailRef = useRef();
  const passwordRef = useRef();
  let dispatch = useDispatch();

  let { user, isError, isLoading } = useSelector((state) => state.user);

  const showToast = (title, icon) => {
    const Toast = Swal.mixin({
      background: "black",
      color: "white",
      toast: true,
      width: "auto",
      position: "bottom-start",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({ icon, title });
  };

  if (isError) {
    showToast(isError, "error");
  }
  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-item-center w-100"
        style={{ marginTop: "300px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleSubmit = async () => {
    const finalData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(postData({ data: finalData }));
    if (user) {
      showToast("User Added Successfully", "success");
    } else if (isError) {
      showToast(isError, "error");
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleDelete = (id) => {
    dispatch(deleteData(id));
    if (user) {
      showToast("User Deleted Successfully", "success");
    }
  };

  const handleView = (id) => {
    const viewData = user.find((user) => user._id === id);
    setView(viewData);
  };

  const handleChange = (e) => {
    setView({ ...view, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    dispatch(updateData({ id: view._id, data: view }));
    if (user) {
      showToast("User Updated Successfully", "success");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="card" style={{ width: "25rem", padding: "25px" }}>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                @
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                aria-label="email"
                aria-describedby="basic-addon1"
                ref={emailRef}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon2">
                ...
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                ref={passwordRef}
              />
            </div>
            <button
              className="btn btn-outline-dark w-100"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <table className="table table-bordered w-75 m-auto mt-5">
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Role</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((val) => (
            <tr
              key={val._id}
              style={{
                height: "auto",
                textAlign: "center",
                verticalAlign: "center",
              }}
            >
              <td>{val.email}</td>
              <td>{val.password}</td>
              <td>{val.role}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(val._id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-outline-info"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleView(val._id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon3">
                  @
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  aria-label="email"
                  name="email"
                  value={view.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon4">
                  ...
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  name="password"
                  value={view.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CrudPage;
