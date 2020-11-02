import Router from "next/router";
import { auth } from "../config/firebase";

const login = "/login?redirected=true"; // Define your login route address.

const PrivateRoute = (WrappedComponent: any) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context: any) => {
    const currentUser = await auth.currentUser;
    console.log(currentUser);
    // Are you an authorized user or not?
    if (!currentUser || currentUser === undefined) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        });
        context.res?.end();
      } else {
        Router.replace(login);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: currentUser,
      });
      return { ...wrappedProps, currentUser };
    }

    return { currentUser };
  };

  return hocComponent;
};

export default PrivateRoute;
