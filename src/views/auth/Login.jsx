import postData from "helpers/HTTP";
import { useState } from "react";

export default function Login() {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });
  const onFinishLogin = () => {
    var body = {
      username: formFields.username,
      password: formFields.password,
    };
    postData("http://localhost:8000/auth/signup", body)
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChangeSignInForm = (e) => {
    setFormFields((prev) => {
      let fields = { ...prev };
      fields[`${e.target.id}`] = e.target.value;
      return fields;
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto px-10">
        <div className="rounded-lg bg-white shadow hover:shadow-md p-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="logo.png"
              style={{ width: "45%", height: "100%" }}
              alt="Stars Circles"
            />
          </div>
          <div className="max-w-md mx-auto md:max-w-sm md:w-96">
            <div className="flex flex-col text-center">
              <h1 className="text-3xl font-semibold tracking-tighter text-sky-400">
                Hi👋,
                <span className="text-gray-600"> Welcome Back.</span>
              </h1>
              <p className="mt-4 text-base font-medium text-gray-500">
                Enter your credentials to continue to Stars Circles dashboard.
              </p>
            </div>
            <form onSubmit={onFinishLogin}>
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-3 text-sm font-medium text-black"
                  >
                    Username
                  </label>
                  <input
                    onChange={onChangeSignInForm}
                    value={formFields.username}
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="block w-full h-12 px-4 py-2 text-sky-500 duration-200 border rounded-lg appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                  />
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="password"
                    className="block mb-3 text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <input
                    onChange={onChangeSignInForm}
                    value={formFields.password}
                    id="password"
                    className="block w-full h-12 px-4 py-2 text-sky-500 duration-200 border rounded-lg appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                    placeholder="Type password here..."
                    type="password"
                  />
                </div>
                <div className="col-span-full">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-sky-400 rounded-xl hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <p className="flex mx-auto text-sm font-medium leading-tight text-center text-black">
                  <a
                    className="ml-auto text-sky-400 hover:text-black"
                    href="/signup"
                  >
                    Sign up now
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
