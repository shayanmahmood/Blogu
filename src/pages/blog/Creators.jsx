import UsersCard from "../../components/ui/UsersCard.jsx";
import useUsers from "../../features/users/hooks/useUsers.js";

const Creators = () => {
  const { isLoading, users } = useUsers()
 

  return (
    <div className="my-24 sm:my-36 flex flex-col gap-10 items-center">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(#ffffff33_1px,#010816_1px)] bg-[size:20px_20px] opacity-[0.6]" />
      <h1 className="text-4xl font-[500] w-4/5 text-slate-100 sm:w-[65%] text-center">
        Discover and Connect!
      </h1>
      {isLoading ? (
        <div className="col-span-3 animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-500" />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {!users ? (
            <h1 className="col-span-3">User not found.</h1>
          ) : (
            users &&
            users.map((items) => {
              return <UsersCard key={items.id} data={items} />;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Creators;
