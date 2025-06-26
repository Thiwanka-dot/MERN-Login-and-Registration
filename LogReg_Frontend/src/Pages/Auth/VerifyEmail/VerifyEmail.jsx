import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router'
import AuthContext from '../../../AuthContext/AuthContext';
import Swal from 'sweetalert2'

export default function VerifyEmail(){

    const {token} = useParams();
    const {handleSubmit} = useContext(AuthContext);
    const navigate = useNavigate()
    // console.log('Verify Email Token',token);

    const handleVerifyEmail = async (e) => {
    e.preventDefault();

    try {
        const {status, message} = await handleSubmit(`/verify-email/${token}`, {});

        if (status === 200) {
            Swal.fire({
                title: message,
                icon: 'success',
                draggable: true
            });

            // console.log('verify email: ', status, message);
            navigate('/login');

        } else {
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error'
            });
        }
    } catch (err) {
        Swal.fire({
            title: 'Error',
            text: 'Something went wrong!',
            icon: 'error'
        });
    }
};


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
                        <h3 className="text-5xl text-[#313131] font-semibold capitalize">verify email</h3>
                        <p className="text-base text-[#3313131} font-medium">
                            An authentication link has been sent to your email
                        </p>
                        <form className="space-y-4" onSubmit={handleVerifyEmail}>
                            
                            <button
                                type="submit"
                                className="max-w-[640px] w-full h-[56px] bg-[#515def] text-white rounded-lg flex items-center justify-center text-base text-[#f3f3f3] capitalize font-semibold cursor-pointer"
                            >
                                verify email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
