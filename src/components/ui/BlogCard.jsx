/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BlogsCard = ({ data }) => {


  
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

  const date = giveMeDate(data?.created_at?.seconds);
  const redirect = useNavigate();

  return (
    <motion.div
      className="w-4/5 md:w-[25rem] flex flex-col rounded-xl bg-black"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring" }}
    >
      <img
        src={data?.image}
        alt="thubmnail"
        className="aspect-video rounded-md cursor-pointer"
        onClick={() => redirect(`/blog/${data?.id}`)}
      />
      <div className="flex flex-col gap-2 py-6 px-5">
        <span className="py-1 px-4 bg-zinc-800 w-[fit-content] rounded-full text-white text-sm">
          {data?.category.toUpperCase()}
        </span>
        <h1
          className="text-2xl hover:underline cursor-pointer line-clamp-2"
          onClick={() => redirect(`/blog/${data?.id}`)}
        >
          {data?.title}
        </h1>
        <Link
          className="text-gray-600 hover:underline"
          to={`/creators/${data?.autherId}`}
        >
          @{data.author}
        </Link>
        <span className="text-gray-600">{date}</span>
      </div>
    </motion.div>
  );
};

export default BlogsCard;
