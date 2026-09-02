import React, { useMemo, useState } from "react";
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

const AdminUsers = () => {
  // =====================================================
  // USERS
  // =====================================================

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 4,
      name: "Neha Gupta",
      email: "neha@example.com",
      role: "User",
      status: "Inactive",
    },
  ]);

  // =====================================================
  // STATES
  // =====================================================

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenu, setOpenMenu] = useState(null);

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

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Users
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all registered PredictHub users.
          </p>
        </div>

        <Link
          to="/admin/users/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create User
        </Link>

      </div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        {/* Total */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Total Users
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {totalUsers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <UserCheck size={19} />
            </div>

          </div>
        </div>


        {/* Active */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Active Users
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {activeUsers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <UserCheck size={19} />
            </div>

          </div>
        </div>


        {/* Inactive */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Inactive Users
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
                {inactiveUsers}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <UserX size={19} />
            </div>

          </div>
        </div>


        {/* Admins */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Administrators
              </p>

              <p className="mt-1 text-2xl font-bold text-slate-900">
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

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* ================================================
            FILTER HEADER
        ================================================= */}

        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">

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
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
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
          <div className="flex flex-col gap-2 sm:flex-row">

            {/* Role */}
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

        <div className="border-b border-slate-100 px-4 py-3">

          <p className="text-xs text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-600">
              {totalUsers}
            </span>{" "}
            users
          </p>

        </div>


        {/* ================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">

          <table className="w-full min-w-[750px]">

            <thead className="bg-slate-50">

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
                    className="transition hover:bg-slate-50"
                  >

                    {/* USER */}
                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-600">
                          {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold text-slate-800">
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

                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">

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

                        <div className="absolute right-5 top-14 z-30 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 text-left shadow-lg">

                          {/* View */}
                          <button
                            type="button"
                            onClick={() => {
                              console.log(
                                "View user:",
                                user
                              );
                              closeMenu();
                            }}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
                          >
                            <Eye size={16} />
                            View User
                          </button>


                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => {
                              console.log(
                                "Edit user:",
                                user
                              );
                              closeMenu();
                            }}
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
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
                            className="flex w-full items-center gap-3 px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
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

                    <h3 className="mt-4 text-sm font-semibold text-slate-800">
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
                      className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
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

    </div>
  );
};

export default AdminUsers;