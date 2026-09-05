import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  ShieldCheck,
  UserCheck,
  UserX,
  Pencil,
  Trash2,
  Eye,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { requestJson } from "../../lib/api";

const AdminUsers = () => {
  // =====================================================
  // USERS
  // =====================================================

  const [users, setUsers] = useState([]);

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await requestJson("/admin/users");
        const apiUsers = [
          ...(data.users || []).map((user) => ({ ...user, role: "User" })),
          ...(data.admin || []).map((user) => ({ ...user, role: "Admin" })),
        ];

        setUsers(apiUsers.map((user) => ({
          ...user,
          id: user.id || user._id,
          status: user.active === false ? "Inactive" : "Active",
          predictions: user.predictions || 0,
        })));
      } catch (error) {
        console.error("Failed to load admin users:", error);
      }
    };

    loadUsers();
  }, []);

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "All" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [users, search, roleFilter, statusFilter]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "Admin"
  ).length;

  // =====================================================
  // DELETE USER
  // =====================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );

    setOpenMenu(null);
  };

  // =====================================================
  // TOGGLE STATUS
  // =====================================================

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : user
      )
    );

    setOpenMenu(null);
  };

  // =====================================================
  // CLOSE MENU
  // =====================================================

  const closeMenu = () => {
    setOpenMenu(null);
  };

  const openUserDialog = (user, mode) => {
    setSelectedUser({ user, mode });
    closeMenu();
  };

  const handleEditUser = (event) => {
    event.preventDefault();

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === selectedUser.user.id
          ? selectedUser.user
          : user
      )
    );
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-white">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage all registered PredictHub users.
          </p>
        </div>

        <Link
          to="/admin/users/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-300"
        >
          <Plus size={18} />
          Create User
        </Link>

      </div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">

        {/* Total */}
        <div className="rounded-xl border border-[#243047] bg-[#111827] p-4 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Total Users
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {totalUsers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
              <UserCheck size={19} />
            </div>

          </div>
        </div>


        {/* Active */}
        <div className="rounded-xl border border-[#243047] bg-[#111827] p-4 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Active Users
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {activeUsers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <UserCheck size={19} />
            </div>

          </div>
        </div>


        {/* Inactive */}
        <div className="rounded-xl border border-[#243047] bg-[#111827] p-4 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Inactive Users
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {inactiveUsers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <UserX size={19} />
            </div>

          </div>
        </div>


        {/* Admins */}
        <div className="rounded-xl border border-[#243047] bg-[#111827] p-4 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-500">
                Administrators
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {adminUsers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <ShieldCheck size={19} />
            </div>

          </div>
        </div>

      </div>


      {/* =================================================
          USERS TABLE
      ================================================= */}

      <div className="rounded-xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20">

        {/* ================================================
            FILTER HEADER
        ================================================= */}

        <div className="flex flex-col gap-3 border-b border-[#243047] p-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-sm">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search users..."
              className="h-10 w-full rounded-lg border border-[#243047] bg-slate-900/70 pl-10 pr-10 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:bg-slate-900 focus:ring-2 focus:ring-cyan-400/20"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X size={16} />
              </button>
            )}

          </div>


          {/* Filters */}
          <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">

            {/* Role */}
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="h-10 w-full rounded-lg border border-[#243047] bg-slate-900/70 px-3 text-sm text-slate-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 sm:w-auto"
            >
              <option value="All">
                All Roles
              </option>

              <option value="User">
                Users
              </option>

              <option value="Admin">
                Admins
              </option>
            </select>


            {/* Status */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="h-10 w-full rounded-lg border border-[#243047] bg-slate-900/70 px-3 text-sm text-slate-300 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 sm:w-auto"
            >
              <option value="All">
                All Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>


        {/* ================================================
            RESULT COUNT
        ================================================= */}

        <div className="border-b border-[#243047] px-4 py-3">

          <p className="text-xs text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-200">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-200">
              {totalUsers}
            </span>{" "}
            users
          </p>

        </div>


        {/* ================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-187.5">

            <thead className="bg-slate-800/70">

              <tr>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Role
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Action
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-100">

              {filteredUsers.length > 0 ? (

                filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-800/50"
                  >

                    {/* USER */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 font-semibold text-cyan-300">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-200">
                            {user.name}
                          </p>

                          <p className="truncate text-xs text-slate-400">
                            {user.email}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* ROLE */}
                    <td className="px-5 py-4">

                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-300">

                        {user.role === "Admin" && (
                          <ShieldCheck
                            size={15}
                            className="text-violet-500"
                          />
                        )}

                        {user.role}

                      </span>

                    </td>


                    {/* STATUS */}
                    <td className="px-5 py-4">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-semibold

                          ${
                            user.status === "Active"
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-slate-100 text-slate-500"
                          }
                        `}
                      >

                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full

                            ${
                              user.status === "Active"
                                ? "bg-emerald-500"
                                : "bg-slate-400"
                            }
                          `}
                        />

                        {user.status}

                      </span>

                    </td>


                    {/* ACTION */}
                    <td className="relative px-5 py-4 text-right">

                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === user.id
                              ? null
                              : user.id
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal size={18} />
                      </button>


                      {/* DROPDOWN */}
                      {openMenu === user.id && (

                        <div className="absolute right-5 top-14 z-30 w-44 overflow-hidden rounded-lg border border-[#243047] bg-[#111827] py-1 text-left shadow-xl shadow-black/30">

                          {/* View */}
                          <button
                            type="button"
                            onClick={() => openUserDialog(user, "view")}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
                          >
                            <Eye size={16} />
                            View User
                          </button>


                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => openUserDialog(user, "edit")}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
                          >
                            <Pencil size={16} />
                            Edit User
                          </button>


                          {/* Toggle */}
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(
                                user.id
                              )
                            }
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800"
                          >
                            {user.status === "Active" ? (
                              <>
                                <UserX size={16} />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck size={16} />
                                Activate
                              </>
                            )}
                          </button>


                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(user.id)
                            }
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete User
                          </button>

                        </div>

                      )}

                    </td>

                  </tr>

                ))

              ) : (

                /* =========================================
                   EMPTY STATE
                ========================================== */

                <tr>

                  <td
                    colSpan="4"
                    className="px-5 py-14 text-center"
                  >

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      <Search size={20} />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-slate-200">
                      No users found
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filters.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setRoleFilter("All");
                        setStatusFilter("All");
                      }}
                      className="mt-4 text-sm font-medium text-cyan-300 hover:text-cyan-200"
                    >
                      Clear filters
                    </button>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#243047] bg-[#111827] p-6 shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {selectedUser.mode === "edit" ? "Edit user" : "User details"}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  {selectedUser.user.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                aria-label="Close user dialog"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {selectedUser.mode === "edit" ? (
              <form onSubmit={handleEditUser} className="mt-5 space-y-4">
                <input
                  required
                  value={selectedUser.user.name}
                  onChange={(event) => setSelectedUser({ ...selectedUser, user: { ...selectedUser.user, name: event.target.value } })}
                  className="w-full rounded-lg border border-[#243047] bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400"
                  placeholder="Full name"
                />
                <input
                  required
                  type="email"
                  value={selectedUser.user.email}
                  onChange={(event) => setSelectedUser({ ...selectedUser, user: { ...selectedUser.user, email: event.target.value } })}
                  className="w-full rounded-lg border border-[#243047] bg-slate-900/70 px-3 py-2.5 text-sm text-slate-200 outline-none focus:border-cyan-400"
                  placeholder="Email"
                />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setSelectedUser(null)} className="rounded-lg px-4 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white">Cancel</button>
                  <button type="submit" className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">Save User</button>
                </div>
              </form>
            ) : (
              <div className="mt-5 space-y-3 text-sm">
                <p className="rounded-lg bg-slate-900/70 p-3 text-slate-300">Email: {selectedUser.user.email}</p>
                <p className="rounded-lg bg-slate-900/70 p-3 text-slate-300">Role: {selectedUser.user.role}</p>
                <p className="rounded-lg bg-slate-900/70 p-3 text-slate-300">Status: {selectedUser.user.status}</p>
                <p className="rounded-lg bg-slate-900/70 p-3 text-slate-300">Last active: {selectedUser.user.lastActive}</p>
                <p className="rounded-lg bg-slate-900/70 p-3 text-slate-300">Predictions: {selectedUser.user.predictions}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminUsers;