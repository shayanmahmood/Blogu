import { Input } from "../../components/ui/Input"
import Button from '../../components/ui/Button'
import { Link } from "react-router-dom"
import { MdOutlineLogin } from "react-icons/md";
import { useForm } from "react-hook-form";
import useSignUp from "../../features/authentication/useSignUp";

function SignUp() {
    const { register, handleSubmit, reset } = useForm()
    const { SignUp, isLoading } = useSignUp()
    const inputStyle = "h-12 text-md";


    function onSubmit({ email, password, firstname, lastname }) {
        SignUp({ email, password, firstname, lastname }, {
            onSettled: () => reset()
        })
    }
    return (
        <div className="flex items-center justify-center h-lvh">
            <div className="w-[90%] sm:w-[fit-content] gap-4 rounded-2xl flex flex-col items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4 w-11/12 sm:w-[25rem]">
                    <div>
                        <h1 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
                            Sign Up in to Blog Tech
                        </h1>
                        <p className="text-sm max-w-sm mt-2 text-slate-200">
                            Sign Up to join our community
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            name="firstname"
                            className={inputStyle}
                            placeholder="First Name"
                            {...register("firstname", {
                                reguired: "This Field is Reguired"
                            })}
                        />
                        <Input
                            type="text"
                            name="lastname"
                            className={inputStyle}
                            placeholder="Last Name"
                            {...register("lastname", {
                                required: "This Field is Reguired"
                            })}
                        />
                    </div>
                    <Input
                        type="email"
                        name="email"
                        className={inputStyle}
                        placeholder="Email Address"
                        {...register("email", {
                            required: "This is field is required",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Please provide a valid email address",
                            }
                        })}
                    />
                    <Input
                        type="password"
                        name="password"
                        className={inputStyle}
                        placeholder="Password"
                        {...register("password", {
                            required: "This is field is required",
                            minLength: {
                                value: 8,
                                message: "Password needs a minimum of 8 characters",
                            }
                        })}
                    />
                    <Button
                        type="submit"
                        className={`w-full h-12 text-md gap-2 ${isLoading && `bg-gray-500`}`}>
                        <MdOutlineLogin />
                        Create Account {isLoading && <span className="loader"></span>}
                    </Button>
                    <div className="w-full">
                        <Link
                            to='/login'
                            className="text-blue-500 hover:underline underline-offset-4"
                        >
                            Already have an account? Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
