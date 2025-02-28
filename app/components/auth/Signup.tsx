import Link from 'next/link';
import SignUpForm from './SignUpForm';

function Signup() {
 
    
  return (
    <div className="flex min-h-screen min-w-full justify-center items-center bg-gradient-to-r from-gray-200 to-blue-200">
    <div className="relative w-[900px] h-[580px] bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="absolute top-0 right-0 w-[55%] h-full bg-white flex flex-col items-center text-gray-800 text-center z-10 p-10">
        <h1 className="text-4xl mb-4">Sign up</h1>
       <SignUpForm/>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-0 before:absolute before:w-[300%] before:left-[-250%] before:h-full before:bg-blue-400 before:rounded-full before:z-10">
        <div className="absolute w-[50%] h-full flex flex-col justify-center items-center text-white z-20 p-6">
          <h1 className="text-4xl mb-4">Welcome Back!</h1>
          <p className="mb-4">Already have an account?</p>
          <Link href="/signin">
            <button className="w-[160px] h-[46px] border-2 border-white bg-transparent text-white font-medium">
              {`Sign In`} 
            </button>
          </Link>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup
