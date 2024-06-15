import * as React from "react"
import { cn } from "../../lib/utils"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import useGetUser from "../../features/users/hooks/usegetUser";
import useUpdateUser from "../../features/users/hooks/useUpdateUser";
import Spinner from "../../components/Spinner";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        (<input
            type={type}
            className={cn(
                "bg-slate-800 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props} />)
    );
})
Input.displayName = "Input"

export { Input }

const EditUser = () => {
    const params = useParams();
    const history = useNavigate();
    const [img, setImg] = useState(null);
    const { isLoading, user } = useGetUser();

    const { isLoading: isUpdating, updateUser } = useUpdateUser()

    const [firstname, setfirstname] = useState(user?.firstname);
    const [lastname, setlastname] = useState(user?.lastname);
    const [bio, setbio] = useState(user?.bio);


    function getUserNameFromEmail(emailAddress) {
        if (typeof emailAddress !== 'string') {
            throw new Error('Invalid email address');
        }

        const atIndex = emailAddress.indexOf('@');
        if (atIndex === -1) {
            throw new Error('Invalid email address format');
        }

        const userName = emailAddress.substring(0, atIndex);
        return userName;
    }

    
    function handleSubmit(e) {
        e.preventDefault()
        updateUser({
            userid: params.userid,
            userName: getUserNameFromEmail(user.email),
            firstname,
            lastname,
            bio,
            img,
            existingImage: user.image
        })
    }


    if(isLoading || isUpdating){
        return <Spinner />
    }
    return (
        <div className="my-24 sm:my-36 flex flex-col items-center gap-5">
            {user && (
                <form
                    className="w-[80%] md:w-[60%] xl:w-[40%] flex flex-col gap-4 items-center"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="img">
                        <img
                            src={img ? URL.createObjectURL(img) : user.image || '../../public/user.jpeg'}
                            alt="Profile pic"
                            className="rounded-full w-48 sm:w-64 hover:brightness-75 aspect-square object-cover cursor-pointer"
                        />
                    </label>
                    <input
                        type="file"
                        id="img"
                        onChange={(e) => setImg(e.target.files[0])}
                        className="hidden"
                        accept="image/*"
                    />
                    <div className="w-full space-y-2">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            value={getUserNameFromEmail(user.email)}
                            onChange={() => alert("Username cannot be changed.")}
                            className="h-12"
                        />
                    </div>
                    <div className="flex gap-5 w-full flex-col sm:flex-row">
                        <div className="flex flex-col flex-grow space-y-2">
                            <label htmlFor="firstname" className="">
                                First Name
                            </label>
                            <Input
                                type="text"
                                name="firstname"
                                id="firstname"
                                value={user.firstname && firstname}
                                className="h-12"
                                onChange={(e) => setfirstname(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col flex-grow space-y-2">
                            <label htmlFor="lastname">Last Name</label>
                            <Input
                                type="text"
                                name="lastname"
                                id="lastname"
                                value={user.lastname && lastname}
                                className="h-12"
                                onChange={(e) => setlastname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        <label htmlFor="bio">Bio</label>
                        <Input
                            type="text"
                            name="bio"
                            id="bio"
                            value={bio}
                            className="h-12"
                            onChange={(e) => setbio(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-5 w-full">
                        <Button
                            type="reset"
                            onClick={() => history(-1)}
                            className="flex-grow"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-grow">
                            Done
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditUser;
