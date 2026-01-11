import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import {
  FaUsersCog,
  FaUserShield,
  FaUserTag,
} from "react-icons/fa";
import useRole from "../../../Role/useRole";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const accentColor = "#6366f1"; // Changed to Indigo-500
  const axiosSecure = useAxiosSecure();
  const [, , refetchUserRole] = useRole();

  const swalConfig = {
    background: "var(--fallback-b1,oklch(var(--b1)))",
    color: "var(--fallback-bc,oklch(var(--bc)))",
    confirmButtonColor: accentColor,
    cancelButtonColor: "#94a3b8",
    customClass: { popup: 'rounded-[2rem]' }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        ...swalConfig,
        title: "Error",
        text: "Failed to fetch user list.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user]);

  const handleUpdateRole = async (id, name, newRole) => {
    Swal.fire({
      ...swalConfig,
      title: `Promote ${name}?`,
      text: `Confirming promotion to ${newRole.toUpperCase()}. This grants elevated system permissions.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, Make ${newRole}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const endpoint = `/users/make-${newRole}/${id}`;
          const res = await axiosSecure.patch(endpoint, {});
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              ...swalConfig,
              title: "Role Updated!",
              text: `${name} is now a ${newRole}.`,
              icon: "success",
              timer: 2000,
            });
            fetchUsers();
            if (refetchUserRole && id === user?.uid) {
                refetchUserRole();
            }
          }
        } catch (error) {
          console.error("Role update failed:", error);
          Swal.fire({
            ...swalConfig,
            title: "Error",
            text: "Update failed. Check admin permissions.",
            icon: "error",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span
          className="loading loading-spinner loading-lg"
          style={{ color: accentColor }}
        ></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen text-base-content animate-in fade-in duration-500">
      <header className="mb-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black italic tracking-tight flex items-center gap-3 uppercase">
            <FaUsersCog style={{ color: accentColor }} />
            User Management
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest opacity-60 mt-2">
            Control access levels and assign system roles.
          </p>
          <div className="h-1.5 w-24 bg-[#6366f1] mt-4 rounded-full hidden lg:block"></div>
        </div>

        <div className="stats shadow-xl bg-indigo-600 text-white border-none rounded-3xl">
          <div className="stat py-3 px-8 text-center lg:text-left">
            <div className="stat-title text-indigo-100 text-xs font-black uppercase tracking-widest italic">
              Total Members
            </div>
            <div className="stat-value text-3xl font-black">
              {users.length}
            </div>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto shadow-2xl rounded-[2.5rem] border border-base-300 bg-base-100">
        <table className="table w-full">
          <thead className="bg-indigo-50/50">
            <tr className="text-indigo-600 uppercase text-xs font-black tracking-widest border-b border-base-300">
              <th className="py-5">User</th>
              <th className="py-5">Contact Info</th>
              <th className="text-center py-5">Current Role</th>
              <th className="text-right py-5">Assign Authority</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-base-200">
            {users.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-indigo-50/30 transition-colors group"
              >
                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 font-bold border border-indigo-200 group-hover:scale-110 transition-transform">
                        <span>{item.name?.charAt(0) || "U"}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base tracking-tight leading-tight">
                        {item.name || "Anonymous"}
                      </div>
                      <div className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">
                        ID: {item._id.slice(-8)}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="text-sm font-medium opacity-80 italic">
                  {item.email}
                </td>

                <td className="text-center">
                  <span
                    className={`badge font-black uppercase italic px-4 py-3 border-2 tracking-tighter text-[10px] ${
                      item.role === "admin"
                        ? "border-rose-500 text-rose-600 bg-rose-50"
                        : item.role === "librarian"
                        ? "border-indigo-500 text-indigo-600 bg-indigo-50"
                        : "border-slate-300 text-slate-500 bg-slate-50 opacity-60"
                    }`}
                  >
                    {item.role || "User"}
                  </span>
                </td>

                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    {/* Promote to Librarian */}
                    <button
                      onClick={() => handleUpdateRole(item._id, item.name, "librarian")}
                      className="btn btn-sm bg-white border-indigo-100 text-indigo-500 hover:bg-indigo-600 hover:text-white rounded-xl font-bold uppercase italic text-[10px] shadow-sm transition-all"
                      disabled={item.role === "librarian" || item.role === "admin"}
                    >
                      <FaUserTag className="hidden sm:inline text-sm" />
                      Librarian
                    </button>

                    {/* Promote to Admin */}
                    <button
                      onClick={() => handleUpdateRole(item._id, item.name, "admin")}
                      className="btn btn-sm bg-white border-rose-100 text-rose-500 hover:bg-rose-600 hover:text-white rounded-xl font-bold uppercase italic text-[10px] shadow-sm transition-all"
                      disabled={item.role === "admin"}
                    >
                      <FaUserShield className="hidden sm:inline text-sm" />
                      Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-20 bg-base-100 mt-10 rounded-[2rem] border-2 border-dashed border-base-300">
          <p className="font-bold uppercase tracking-widest opacity-30 italic">No user records found in the database.</p>
        </div>
      )}
    </div>
  );
};

export default AllUsers;