/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";

const UsersCard = ({ data }) => {


    function giveMeDate(timestamp, isMore) {
        // Assuming you have seconds stored in a variable named 'seconds'
        var seconds = timestamp;

        // Create a JavaScript Date object using seconds
        var date = new Date(seconds * 1000); // Convert seconds to milliseconds

        // Now you can use 'date' variable to get various date components
        // For example:
        var year = date.getFullYear();
        var month = date.getMonth() + 1; // Months are zero-based
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        // You can also format the date as a string in your preferred format
        var formattedDate = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        let newDate = ''
        if (isMore) {
            newDate = month + '/' + day + "/" + year + " " + hours + ':' + minutes + ':' + seconds;
        } else {
            newDate = formattedDate.substring(0, 8)
        }
        return newDate
    }

    return (
        <div className="flex flex-col border w-80 h-32 rounded-md items-center justify-center backdrop-blur-sm">
            <div className="flex gap-4">
                <img
                    src={data.image || './public/user.jpeg'}
                    alt="profile pic"
                    className="size-8 rounded-full aspect-square object-cover"
                />
                <div className="w-48 space-y-1">
                    <Link
                        className="hover:underline underline-offset-4"
                        to={`/creators/${data.id}`}
                    >
                        @{data.firstname}
                    </Link>
                    <p className="line-clamp-2 text-slate-200 text-sm">{data.bio}</p>
                    <span className="flex items-center gap-1 text-slate-400 text-sm">
                        <FaRegCalendarAlt /> Date joined: {giveMeDate(data.timeStamp.seconds)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default UsersCard;
