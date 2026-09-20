import React from 'react';
import { BsRobot } from 'react-icons/bs';
import { IoSparkles } from "react-icons/io5";

function Auth() {
  const dispatch = useDispatch()
  const handleGoogleAuth = async () => {
    try {
      const response = await signInwithPopup(authRouter, provider)
      let User = response.User
      let name = User.displayName
      let email = Use.email
      const result = await axios.post(ServerUrl + "/api/auth/google", { name, email }, { withCredentials: true })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
      dispatch(setUserData(null))
    }
  }


  return (
    <div className="w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20">
      <div className="w-full max-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h2 className='font-semibold text-lg'>Next-GenAI</h2>
        </div>
        <h1 classname='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'></h1>
        Continue with
        <span classname='bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>

        </span>
      </div>
    </div>
  );
}

export default Auth;
