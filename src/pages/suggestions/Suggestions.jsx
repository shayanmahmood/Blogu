import * as React from "react";
import { MdOutlineSend } from "react-icons/md";
import Button from "../../components/ui/Button";
import { useForm } from "react-hook-form";
import useGetUser from "../../features/users/hooks/usegetUser";
import Spinner from "../../components/Spinner";
import { useSetSuggestion } from "../../features/suggestion/hooks/useAddSuggestion";

// Utility function to merge class names
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

// Input component
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "bg-slate-800 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

// TextArea component
const TextArea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                "bg-slate-800 flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
TextArea.displayName = "TextArea";

function Suggestion() {
    const inputStyle = "h-12 text-md";

    const { isLoading: isSetting, setSuggesion } = useSetSuggestion()
    const { user, isLoading } = useGetUser()
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    React.useEffect(() => {
        if (user) {
            setValue('userName', user.userName);
            setValue('email', user.email);
            // Set other fields similarly
        }
    }, [user, setValue]);

    // Handle form submission
    const onSubmit = (data) => {
        setSuggesion({ name: data.userName, email: data.email, suggestion: data.suggestion }, {
            onSettled: reset({
                suggestion: ""
            })
        })
    };


    if (isLoading || isSetting) {
        return <Spinner />
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[90%] sm:w-[fit-content] gap-4 rounded-2xl flex flex-col items-center">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-4 w-11/12 sm:w-[25rem]">
                    <div>
                        <h1 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200">
                            Suggestion Box
                        </h1>
                        <p className="text-sm max-w-sm mt-2 text-slate-200">
                            Please share your suggestions with us.
                        </p>
                    </div>
                    <Input
                        type="text"
                        name="userName"
                        className={inputStyle}
                        placeholder="Your Name"
                        disabled
                        {...register("userName")}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    <Input
                        type="email"
                        name="email"
                        className={inputStyle}
                        placeholder="Email Address"
                        disabled
                        {...register("email")}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    <TextArea
                        name="suggestion"
                        className={`${inputStyle} h-32`}
                        placeholder="Your Suggestion"
                        {...register("suggestion", {
                            required: "This field is required",
                            minLength: {
                                value: 10,
                                message: "Suggestion must be at least 10 characters long",
                            }
                        })}
                    />
                    {errors.suggestion && <p className="text-red-500">{errors.suggestion.message}</p>}
                    <Button
                        type="submit"
                        className={`w-full h-12 text-md gap-2 ${isLoading && `bg-gray-500`}`}>
                        <MdOutlineSend />
                        Submit
                        {isLoading && <span className="loader"></span>}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Suggestion;
