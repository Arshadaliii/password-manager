import React from "react";
import { useRef, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const [form, setForm] = useState({ site: "", username: "", password: "" });

  const showPassword = () => {
    if (ref.current.src.includes("/icons/hide.svg")) {
      ref.current.src = "icons/show.svg";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/hide.svg";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    setForm({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    if (confirm("Do you really want to delete this password?")) {
      const updatedArray = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updatedArray);
      localStorage.setItem("passwords", JSON.stringify(updatedArray));
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(i => i.id === id);
    setForm(passwordToEdit);
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className=" absolute  top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-50 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>

      <div className="md:my-container md:p-0 p-2">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">op/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own password manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            placeholder="Enter website URL" 
            name="site" 
            value={form.site} 
            onChange={handleChange} 
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
          />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input
              placeholder="Enter username" 
              name="username" 
              value={form.username} 
              onChange={handleChange} 
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
            />
            <div className="relative ">
              <input
                placeholder="Enter password" 
                name="password" 
                value={form.password} 
                onChange={handleChange} 
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password" 
                ref={passwordRef}
              />
              <span className="absolute right-0 cursor-pointer" onClick={showPassword}>
                <img width={30} ref={ref} src="icons/hide.svg" alt="" className="px-1 py-2 invert-color text-black" />
              </span>
            </div>
          </div>
          <button 
            onClick={savePassword} 
            className="flex justify-center items-center bg-green-400 rounded-full px-6 py-2 w-fit hover:bg-green-300 gap-2 border border-green-900"
          >
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800">
                <tr>
                  <th className="py-2 text-white">Site</th>
                  <th className="py-2 text-white">Username</th>
                  <th className="py-2 text-white">Password</th>
                  <th className="py-2 text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 flex justify-center border text-center">
                      <a href={item.site} target="_blank"><span>{item.site}</span></a>
                      <img className="size-7 py-1 w-6 copy cursor-pointer" onClick={() => copyText(item.site)} src="icons/copy.svg" alt="" />
                    </td>
                    <td className="py-2 relative border text-center">
                      <div className="flex justify-center">
                        <span>{item.username}</span>
                        <img className="size-7 py-1 copy cursor-pointer" onClick={() => copyText(item.username)} src="icons/copy.svg" alt="" />
                      </div>
                    </td>
                    <td className="py-2 text-center">
                      <div className="flex justify-center">
                        <span>{item.password}</span>
                        <img className="size-7 py-1 w-6 copy cursor-pointer" onClick={() => copyText(item.password)} src="icons/copy.svg" alt="" />
                      </div>
                    </td>
                    <td className="py-2 flex justify-center border text-center">
                      <div className="flex justify-center gap-1">
                        <span>
                          <img className="invert-0 size-7 cursor-pointer" onClick={() => editPassword(item.id)} src="icons/edit.svg" alt="" />
                        </span>
                        <span>
                          <img className="invert-0 size-7 cursor-pointer" onClick={() => deletePassword(item.id)} src="icons/delete.svg" alt="" />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
};

export default Manager;
