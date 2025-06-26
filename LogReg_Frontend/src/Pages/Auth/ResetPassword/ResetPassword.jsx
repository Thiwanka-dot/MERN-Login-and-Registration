import { useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import AuthContext from "../../../AuthContext/AuthContext";

export default function ResetPassword(){

    const createPasswordRef = useRef('');
    const confirmPasswordRef = useRef('');
    const navigate = useNavigate();
    const {token} = useParams();
    const {handleSubmit} = useContext(AuthContext);

    // console.log('Reset Password Token', token)

    const handleReset = async (e) => {
        e.preventDefault();

        if(createPasswordRef.current.value === confirmPasswordRef.current.value) {

            const body = {
                password: createPasswordRef.current.value
            }
            
            const {status, message} = await handleSubmit(`/reset-password/${token}`, body);
            
            if (status === 200) {
                Swal.fire({
                    title: message,
                    icon: 'success',
                    draggable: true
                });
    
                // console.log('user logged: ', status, message);
                navigate('/');
    
            }
        } else {
            console.log('Something went wrong!')
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
                        <h3 className="text-5xl text-[#313131] font-semibold capitalize">Reset Password</h3>
                        <p className="text-base text-[3313131} font-medium">
                            Your previous password has been resetted. Please set a new password for your account
                        </p>
                        <form className="space-y-4" onSubmit={handleReset}>
                            <input 
                                type="password"
                                ref={createPasswordRef}
                                className="max-w-[640px] w-full h-[56px] border-[1px] border-[#313131] rounded-lg outline-0 pl-3"
                                placeholder="Re-enter Password..."
                                required
                            />
                            <input 
                                type="password"
                                ref={confirmPasswordRef}
                                className="max-w-[640px] w-full h-[56px] border-[1px] border-[#313131] rounded-lg outline-0 pl-3"
                                placeholder="Confirm Password..."
                                required
                            />
                            <button
                                type="submit"
                                className="max-w-[640px] w-full h-[56px] bg-[#515def] text-white rounded-lg flex items-center justify-center text-base text-[#f3f3f3] capitalize font-semibold cursor-pointer"
                            >
                                reset password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}