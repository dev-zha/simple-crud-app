import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="fixed w-full z-20 top-0 start-0 bg-gray-200">
      <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto py-2 px-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/zha-logo.png" className="h-10" alt="App Logo" />
        </Link>
        <div className="w-auto">
          <ul className="font-medium flex flex-row space-x-8">
            <li>
              <Link
                to="/posts/create"
                className="text-gray-600 hover:text-gray-800"
              >
                New Post
              </Link>
            </li>
            <li>
              <AlertDialog>
                <AlertDialogTrigger>Logout</AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you are going to sign out from our
                      application.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => logout()}>
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
