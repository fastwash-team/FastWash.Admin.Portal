import { Outlet } from "react-router";

const AuthenticatedLayout = () => {
  const { host } = window.location;
  const isStaging = ["dev.fastwash.africa", "fast-wash.netlify.app"].includes(
    host
  );
  console.log({ host, isStaging });

  return (
    <div className="loader-wrapper">
      {isStaging && <div className="demo-banner">STAGING</div>}
      <Outlet />
      {/* <h2>Loading</h2> */}
    </div>
  );
};

export default AuthenticatedLayout;
