import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button";

export function PublicLayout() {
  return (
    <>
      <header className="absolute top-4 right-4 z-10">
        <Button asChild variant="outline">
          <Link to="/login">Admin Login</Link>
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
