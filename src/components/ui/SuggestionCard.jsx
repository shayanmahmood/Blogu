/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SuggestionCard = ({ data }) => {


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
        var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        let newDate = ''
        if (isMore) {
            newDate = month + '-' + day + "-" + year + " " + hours + ':' + minutes + ':' + seconds;
        } else {
            newDate = formattedDate.substring(0, 8)
        }
        return newDate
    }

    const date = giveMeDate(data?.timeStamp?.seconds);
    const redirect = useNavigate();

    return (
        <motion.div
            className="w-4/5 md:w-[25rem] flex flex-col rounded-xl bg-black"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
        >
            <div className="flex flex-col gap-2 py-6 px-5">
                <h1 className="text-2xl hover:underline cursor-pointer line-clamp-2">
                    @{data?.name}
                </h1>
                <h4 className="text-green-300 p-5"><span className="text-slate-200">SAID:  </span>"{data.suggestion}"</h4> 
                <span className="text-gray-600">{date}</span>
            </div>
        </motion.div>
    );
};

export default SuggestionCard;
