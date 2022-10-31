import { useEffect } from "react";
import { Link, useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as {
    statusText: string;
    message: string;
    status: number;
    data: unknown;
  };
  // for some reason during prod only the app boots on an error page
  // I don't know why, so until then, terrible hack
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>
        <Link to={"/"}>To Home</Link>
      </p>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
