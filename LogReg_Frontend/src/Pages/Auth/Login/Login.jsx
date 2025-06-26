import { useContext, useRef } from "react"
import {Link, useNavigate} from "react-router"
import AuthContext from "../../../AuthContext/AuthContext";
import Swal from 'sweetalert2'

export default function Login(){

    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate()
    const {handleSubmit} = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        const body = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        
        const {status, message} = await handleSubmit(`/login`, body);
        
        if (status === 200) {
            Swal.fire({
                title: message,
                icon: 'success',
                draggable: true
            });

            // console.log('user logged: ', status, message);
            navigate('/');

        }
    }

    return(
        <div className="w-full flex items-center justify-center">
            <div className="lg:container">
                <div className="flex items-center gap-16 justify-between w-full">
                    {/* left wrapper */}
                    <div className="left_wrapper">
                        <img src="../src/assets/register.png" alt="" />
                    </div>
                    {/* right wrapper */}
                    <div className="right_wrapper space-y-4 ma-w-[640px] w-full h-auto">
                        <h3 className="text-5xl text-[#313131] font-semibold capitalize">Login</h3>
                        <p className="text-base text-[3313131} font-medium">
                            Login to access your travelwise account
                        </p>
                        <form className="space-y-4" onSubmit={handleLogin}>
                            <input 
                                type="email"
                                ref={emailRef}
                                className="max-w-[640px] w-full h-[56px] border-[1px] border-[#313131] rounded-lg outline-0 pl-3"
                                placeholder="Your Email..."
                                required
                            />
                            <input 
                                type="password"
                                ref={passwordRef}
                                className="max-w-[640px] w-full h-[56px] border-[1px] border-[#313131] rounded-lg outline-0 pl-3"
                                placeholder="Your Password..."
                                required
                            />
                            <p className="max-w-[640px] w-full h-auto text-sm text-[#313131] font-normal flex items-center justify-end">
                                <Link to={'/forget-password'} className="text-red-500 font-medium">Forget Password</Link>
                            </p>
                            <button
                                type="submit"
                                className="max-w-[640px] w-full h-[56px] bg-[#515def] text-white rounded-lg flex items-center justify-center text-base text-[#f3f3f3] capitalize font-semibold cursor-pointer"
                            >
                                login
                            </button>
                        </form>
                        <p className="max-w-[640px] w-full h-auto text-sm text-[#313131] font-normal">
                            Already have an account? 
                            <Link to={'/register'} className="text-red-500 font-medium"> Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}