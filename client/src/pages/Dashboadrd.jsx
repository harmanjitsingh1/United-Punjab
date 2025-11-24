import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { logoutUserThunk } from "../store/thunks/user.thunk";
import { useDispatch, useSelector } from "react-redux";
// import { clearUser } from "@/store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  LogOut,
  User,
  Phone,
  Mail,
  IdCard,
  KeyRound,
  HelpCircle,
} from "lucide-react";

const Dashboadrd = () => {
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userProfile, screenLoading, isAuthorized } = useSelector(
    (state) => state.auth
  );

  const handleLogout = async () => {
    const data = await dispatch(logoutUserThunk());
    if (data?.payload?.success) {
      toast.success(data?.payload?.message || "Logout successful!");
      navigate("/");
    } else {
      toast.error(data?.payload?.message || "Logout failed.");
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* Heading */}
      <div className="text-center mb-12">
        <h3 className="text-4xl font-extrabold text-[#F57517] mb-2">
          Dashboard
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Manage your profile & account settings
        </p>
      </div>

      {/* Profile Card */}
      <Card className="rounded-2xl shadow-lg border border-transparent bg-gradient-to-r from-[#F57517]/10 dark:via-zinc-800 via-[#f0f0f0]  to-[#F57517]/10 hover:border-[#F57517] transition-all duration-300 mb-10">
        <CardHeader className="flex items-center gap-3">
          <User className="w-10 h-10 text-[#F57517]" />
          <h4 className="text-2xl font-bold">
            {userProfile?.fullName.toUpperCase() || "N/A"}
          </h4>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-lg">
            <Mail className="text-[#F57517]" />
            <span>{userProfile?.email || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Phone className="text-[#F57517]" />
            <span>{userProfile?.phone || "N/A"}</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <IdCard className="text-[#F57517]" />
            <span>{userProfile?.aadhar || "N/A"}</span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card
          className="rounded-2xl p-6 cursor-pointer border border-transparent hover:border-[#F57517] shadow-md transition"
          onClick={() => navigate("/reset-password")}
        >
          <CardContent className="text-center flex flex-col items-center gap-2">
            <KeyRound className="w-8 h-8 text-[#F57517]" />
            <span className="text-lg font-semibold">Change Password</span>
          </CardContent>
        </Card>

        <Card
          className="rounded-2xl p-6 cursor-pointer border border-transparent hover:border-[#F57517] shadow-md transition"
          onClick={() => console.log("Help")}
        >
          <CardContent className="text-center flex flex-col items-center gap-2">
            <HelpCircle className="w-8 h-8 text-[#F57517]" />
            <span className="text-lg font-semibold">Help</span>
          </CardContent>
        </Card>

        <Card
          className="rounded-2xl p-6 cursor-pointer bg-[#F57517] hover:bg-[#ff8533] transition text-white shadow-md"
          onClick={() => setShowDialog(true)}
        >
          <CardContent className="text-center flex flex-col items-center gap-2">
            <LogOut className="w-8 h-8" />
            <span className="text-lg font-semibold">Logout</span>
          </CardContent>
        </Card>
      </div>

      {/* Logout Confirmation */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-10 text-md">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="h-10 text-md text-white bg-[#F57517] hover:bg-[#ff8533]"
              onClick={handleLogout}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );

  // return (
  //   <>
  //     <div>Dashboadrd</div>

  //     <div
  //       className="top-4 right-4 flex items-center gap-2 cursor-pointer"
  //       onClick={() => setShowDialog(true)}
  //     >
  //       <LogOut />
  //       Logout
  //     </div>

  //     <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
  //       <AlertDialogContent>
  //         <AlertDialogHeader>
  //           <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
  //           <AlertDialogDescription>
  //             Are you sure you want to logout?
  //           </AlertDialogDescription>
  //         </AlertDialogHeader>
  //         <AlertDialogFooter>
  //           <AlertDialogCancel className="h-10 text-md">
  //             Cancel
  //           </AlertDialogCancel>
  //           <AlertDialogAction
  //             className="h-10 text-md text-white"
  //             onClick={handleLogout}
  //           >
  //             Confirm
  //           </AlertDialogAction>
  //         </AlertDialogFooter>
  //       </AlertDialogContent>
  //     </AlertDialog>
  //   </>
  // );
};

export default Dashboadrd;
