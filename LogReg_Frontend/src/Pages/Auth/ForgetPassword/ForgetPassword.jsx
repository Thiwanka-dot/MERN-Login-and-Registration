import { useContext, useRef } from "react";
import AuthContext from "../../../AuthContext/AuthContext";
import Swal from "sweetalert2";

export default function ForgetPassword(){
    const findEmailRef = useRef('')
    const {handleSubmit} = useContext(AuthContext);

    const handleForget = async (e) => {
            e.preventDefault();
    
            const body = {
                email: findEmailRef.current.value,
            }
            
            const {status, message} = await handleSubmit(`/forget-password`, body);
            
            if (status === 200) {
                Swal.fire({
                    title: message,
                    icon: 'success',
                    draggable: true
                });
    
                // console.log('forget user: ', status, message);
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
                        <h3 className="text-5xl text-[#313131] font-semibold capitalize">Forgot your Password?</h3>
                        <p className="text-base text-[3313131} font-medium">
                            Don't worry. It happens to all of us. Enter your email below to recover your password
                        </p>
                        <form className="space-y-4" onSubmit={handleForget}>
                            <input 
                                type="email"
                                ref={findEmailRef}
                                className="max-w-[640px] w-full h-[56px] border-[1px] border-[#313131] rounded-lg outline-0 pl-3"
                                placeholder="Your Email..."
                                required
                            />
                            <button
                                type="submit"
                                className="max-w-[640px] w-full h-[56px] bg-[#515def] text-white rounded-lg flex items-center justify-center text-base text-[#f3f3f3] capitalize font-semibold cursor-pointer"
                            >
                                submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}