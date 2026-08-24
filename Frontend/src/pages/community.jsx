import React, { useState } from "react";
import {
  Users,
  MessageCircle,
  Heart,
  MessageSquare,
  Share2,
  Search,
  Plus,
  TrendingUp,
  Award,
  Brain,
  Code2,
  ChevronRight,
  MoreHorizontal,
  Clock3,
  UserPlus,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";

/* ============================================================
   COMMUNITY POSTS
============================================================ */

const communityPosts = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "@alexjohnson",
    avatar: "AJ",
    time: "12 min ago",
    category: "Machine Learning",
    title: "Just improved my placement prediction model!",
    description:
      "After tuning the Random Forest hyperparameters, I managed to improve the model accuracy from 89.6% to 94.8%. Feature engineering made a huge difference.",
    likes: 128,
    comments: 24,
    shares: 12,
    liked: false,
  },
  {
    id: 2,
    name: "Sarah Williams",
    username: "@sarahw",
    avatar: "SW",
    time: "34 min ago",
    category: "Deep Learning",
    title: "What is your favorite neural network architecture?",
    description:
      "I have been experimenting with CNNs and Transformers recently. Curious to know what architectures everyone in the community is currently using for their projects.",
    likes: 96,
    comments: 31,
    shares: 8,
    liked: false,
  },
  {
    id: 3,
    name: "Michael Chen",
    username: "@michaelchen",
    avatar: "MC",
    time: "1 hour ago",
    category: "Data Science",
    title: "Looking for feedback on my prediction project",
    description:
      "I built a house price prediction model using Python and scikit-learn. Currently achieving 91.6% accuracy. Would love to hear suggestions for improving the model.",
    likes: 74,
    comments: 18,
    shares: 5,
    liked: false,
  },
];

/* ============================================================
   COMMUNITY MEMBERS
============================================================ */

const activeMembers = [
  {
    name: "Alex Johnson",
    username: "@alexjohnson",
    avatar: "AJ",
    role: "ML Engineer",
  },
  {
    name: "Sarah Williams",
    username: "@sarahw",
    avatar: "SW",
    role: "Data Scientist",
  },
  {
    name: "Michael Chen",
    username: "@michaelchen",
    avatar: "MC",
    role: "AI Developer",
  },
  {
    name: "Emily Davis",
    username: "@emilydavis",
    avatar: "ED",
    role: "ML Researcher",
  },
];

/* ============================================================
   TOP CONTRIBUTORS
============================================================ */

const contributors = [
  {
    rank: 1,
    name: "Alex Johnson",
    avatar: "AJ",
    points: "12,840",
    posts: 86,
  },
  {
    rank: 2,
    name: "Sarah Williams",
    avatar: "SW",
    points: "10,420",
    posts: 72,
  },
  {
    rank: 3,
    name: "Michael Chen",
    avatar: "MC",
    points: "9,860",
    posts: 64,
  },
];

/* ============================================================
   COMMUNITY PAGE
============================================================ */

function Community() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [posts, setPosts] = useState(communityPosts);
  const [search, setSearch] = useState("");

  /* ============================================================
     LIKE POST
  ============================================================ */

  const handleLike = (id) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked
                ? post.likes - 1
                : post.likes + 1,
            }
          : post
      )
    );
  };

  /* ============================================================
     FILTER POSTS
  ============================================================ */

  const filteredPosts = posts.filter((post) => {
    const value = search.toLowerCase();

    return (
      post.title.toLowerCase().includes(value) ||
      post.description.toLowerCase().includes(value) ||
      post.category.toLowerCase().includes(value) ||
      post.name.toLowerCase().includes(value)
    );
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() =>
          setSidebarCollapsed((prev) => !prev)
        }
      />

      {/* ======================================================
          MAIN APPLICATION AREA
      ====================================================== */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* ====================================================
            NAVBAR
        ==================================================== */}

        <Navbar
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        {/* ====================================================
            SCROLLABLE CONTENT
        ==================================================== */}

        <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">

          <div className="px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto w-full max-w-7xl">

              {/* =================================================
                  PAGE HEADER
              ================================================== */}

              <div className="mb-8">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <div className="mb-2 flex items-center gap-2">

                      <Users className="h-6 w-6 text-indigo-600" />

                      <span className="text-sm font-semibold text-indigo-600">
                        Community
                      </span>

                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      PredictHub Community
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                      Connect with developers, data scientists,
                      and AI enthusiasts from around the world.
                    </p>

                  </div>

                  {/* Create Post */}

                  <button
                    type="button"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-indigo-600
                      px-5
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-indigo-700
                      focus:outline-none
                      focus:ring-2
                      focus:ring-indigo-500
                      focus:ring-offset-2
                    "
                  >

                    <Plus className="h-4 w-4" />

                    Create Post

                  </button>

                </div>

              </div>

              {/* =================================================
                  COMMUNITY STATISTICS
              ================================================== */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* Members */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Community Members
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        24.8K
                      </h2>

                      <p className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600">

                        <TrendingUp className="h-4 w-4" />

                        +12.6%

                      </p>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">

                      <Users className="h-5 w-5 text-indigo-600" />

                    </div>

                  </div>

                </div>

                {/* Posts */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Total Posts
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        8,642
                      </h2>

                      <p className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600">

                        <TrendingUp className="h-4 w-4" />

                        +18.4%

                      </p>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">

                      <MessageCircle className="h-5 w-5 text-blue-600" />

                    </div>

                  </div>

                </div>

                {/* Active Today */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Active Today
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        3,482
                      </h2>

                      <p className="mt-3 text-sm font-medium text-slate-500">
                        14% of members
                      </p>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">

                      <ActivityIcon />

                    </div>

                  </div>

                </div>

                {/* Discussions */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="flex items-start justify-between">

                    <div>

                      <p className="text-sm font-medium text-slate-500">
                        Discussions
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        1,284
                      </h2>

                      <p className="mt-3 flex items-center gap-1 text-sm font-medium text-emerald-600">

                        <TrendingUp className="h-4 w-4" />

                        +9.8%

                      </p>

                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50">

                      <MessageSquare className="h-5 w-5 text-purple-600" />

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  MAIN COMMUNITY GRID
              ================================================== */}

              <div className="mt-6 grid gap-6 lg:grid-cols-3">

                {/* =================================================
                    COMMUNITY FEED
                ================================================== */}

                <div className="min-w-0 lg:col-span-2">

                  {/* Search */}

                  <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="relative">

                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                      <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                          setSearch(event.target.value)
                        }
                        placeholder="Search community posts..."
                        className="
                          w-full
                          rounded-xl
                          border
                          border-slate-200
                          bg-slate-50
                          py-3
                          pl-10
                          pr-4
                          text-sm
                          text-slate-700
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:border-indigo-400
                          focus:bg-white
                          focus:ring-2
                          focus:ring-indigo-100
                        "
                      />

                    </div>

                  </div>

                  {/* Feed Header */}

                  <div className="mb-4 flex items-center justify-between">

                    <div>

                      <h2 className="text-lg font-bold text-slate-900">
                        Community Feed
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Latest discussions and updates.
                      </p>

                    </div>

                    <button
                      type="button"
                      className="
                        hidden
                        items-center
                        gap-1
                        text-sm
                        font-semibold
                        text-indigo-600
                        hover:text-indigo-700
                        sm:flex
                      "
                    >
                      Latest

                      <ChevronRight className="h-4 w-4" />

                    </button>

                  </div>

                  {/* Posts */}

                  <div className="space-y-5">

                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (

                        <article
                          key={post.id}
                          className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-5
                            shadow-sm
                            transition
                            hover:shadow-md
                          "
                        >

                          {/* User Header */}

                          <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600">

                                {post.avatar}

                              </div>

                              <div>

                                <h3 className="text-sm font-bold text-slate-900">
                                  {post.name}
                                </h3>

                                <div className="mt-1 flex items-center gap-2">

                                  <span className="text-xs text-slate-400">
                                    {post.username}
                                  </span>

                                  <span className="text-xs text-slate-300">
                                    •
                                  </span>

                                  <span className="text-xs text-slate-400">
                                    {post.time}
                                  </span>

                                </div>

                              </div>

                            </div>

                            <button
                              type="button"
                              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                            >

                              <MoreHorizontal className="h-5 w-5" />

                            </button>

                          </div>

                          {/* Category */}

                          <div className="mt-4">

                            <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                              {post.category}
                            </span>

                          </div>

                          {/* Content */}

                          <div className="mt-4">

                            <h2 className="text-base font-bold text-slate-900">
                              {post.title}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {post.description}
                            </p>

                          </div>

                          {/* Actions */}

                          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">

                            <button
                              type="button"
                              onClick={() =>
                                handleLike(post.id)
                              }
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-medium
                                transition
                                ${
                                  post.liked
                                    ? "bg-red-50 text-red-600"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-red-500"
                                }
                              `}
                            >

                              <Heart
                                className="h-4 w-4"
                                fill={
                                  post.liked
                                    ? "currentColor"
                                    : "none"
                                }
                              />

                              {post.likes}

                            </button>

                            <button
                              type="button"
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-slate-500
                                transition
                                hover:bg-slate-50
                                hover:text-indigo-600
                              "
                            >

                              <MessageSquare className="h-4 w-4" />

                              {post.comments}

                            </button>

                            <button
                              type="button"
                              className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                px-3
                                py-2
                                text-sm
                                font-medium
                                text-slate-500
                                transition
                                hover:bg-slate-50
                                hover:text-indigo-600
                              "
                            >

                              <Share2 className="h-4 w-4" />

                              {post.shares}

                            </button>

                          </div>

                        </article>

                      ))
                    ) : (

                      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">

                        <Search className="mx-auto h-8 w-8 text-slate-300" />

                        <h3 className="mt-3 font-semibold text-slate-800">
                          No posts found
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Try searching with a different keyword.
                        </p>

                      </div>

                    )}

                  </div>

                </div>

                {/* =================================================
                    RIGHT SIDEBAR
                ================================================== */}

                <div className="space-y-6">

                  {/* =================================================
                      ACTIVE MEMBERS
                  ================================================== */}

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-slate-100 p-5">

                      <div>

                        <h2 className="text-base font-bold text-slate-900">
                          Active Members
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                          People active right now.
                        </p>

                      </div>

                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                    </div>

                    <div className="divide-y divide-slate-100">

                      {activeMembers.map((member) => (

                        <div
                          key={member.username}
                          className="flex items-center gap-3 p-4"
                        >

                          <div className="relative">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">

                              {member.avatar}

                            </div>

                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />

                          </div>

                          <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-semibold text-slate-800">
                              {member.name}
                            </h3>

                            <p className="truncate text-xs text-slate-400">
                              {member.role}
                            </p>

                          </div>

                          <button
                            type="button"
                            className="
                              rounded-lg
                              p-2
                              text-slate-400
                              transition
                              hover:bg-indigo-50
                              hover:text-indigo-600
                            "
                          >

                            <UserPlus className="h-4 w-4" />

                          </button>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* =================================================
                      TOP CONTRIBUTORS
                  ================================================== */}

                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 p-5">

                      <div className="flex items-center gap-2">

                        <Award className="h-5 w-5 text-amber-500" />

                        <h2 className="text-base font-bold text-slate-900">
                          Top Contributors
                        </h2>

                      </div>

                      <p className="mt-1 text-xs text-slate-500">
                        Community leaders this month.
                      </p>

                    </div>

                    <div className="divide-y divide-slate-100">

                      {contributors.map((contributor) => (

                        <div
                          key={contributor.rank}
                          className="flex items-center gap-3 p-4"
                        >

                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">

                            {contributor.rank}

                          </div>

                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">

                            {contributor.avatar}

                          </div>

                          <div className="min-w-0 flex-1">

                            <h3 className="truncate text-sm font-semibold text-slate-800">
                              {contributor.name}
                            </h3>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {contributor.posts} posts
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-xs font-bold text-indigo-600">
                              {contributor.points}
                            </p>

                            <p className="text-[10px] text-slate-400">
                              points
                            </p>

                          </div>

                        </div>

                      ))}

                    </div>

                    <button
                      type="button"
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-1
                        border-t
                        border-slate-100
                        p-4
                        text-sm
                        font-semibold
                        text-indigo-600
                        transition
                        hover:bg-slate-50
                      "
                    >

                      View Leaderboard

                      <ChevronRight className="h-4 w-4" />

                    </button>

                  </div>

                  {/* =================================================
                      COMMUNITY TOPICS
                  ================================================== */}

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                    <h2 className="text-base font-bold text-slate-900">
                      Popular Topics
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">

                      {[
                        "Machine Learning",
                        "Deep Learning",
                        "Python",
                        "AI",
                        "Data Science",
                        "React",
                        "FastAPI",
                        "Computer Vision",
                      ].map((topic) => (

                        <button
                          type="button"
                          key={topic}
                          className="
                            rounded-full
                            border
                            border-slate-200
                            bg-slate-50
                            px-3
                            py-1.5
                            text-xs
                            font-medium
                            text-slate-600
                            transition
                            hover:border-indigo-200
                            hover:bg-indigo-50
                            hover:text-indigo-600
                          "
                        >
                          #{topic}
                        </button>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  COMMUNITY CTA
              ================================================== */}

              <div className="mt-6 overflow-hidden rounded-2xl bg-indigo-600 p-6 shadow-sm sm:p-8">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <Users className="h-5 w-5 text-indigo-200" />

                      <span className="text-sm font-semibold text-indigo-200">
                        Join the conversation
                      </span>

                    </div>

                    <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                      Share your knowledge with the community.
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100">
                      Ask questions, share projects, discuss AI
                      and machine learning, and connect with other
                      developers.
                    </p>

                  </div>

                  <button
                    type="button"
                    className="
                      inline-flex
                      shrink-0
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-5
                      py-3
                      text-sm
                      font-bold
                      text-indigo-600
                      shadow-sm
                      transition
                      hover:bg-indigo-50
                    "
                  >

                    <Plus className="h-4 w-4" />

                    Create a Post

                  </button>

                </div>

              </div>

              {/* Bottom spacing */}

              <div className="h-10" />

            </div>

          </div>

          <Footer/>

        </main>

      </div>

    </div>
  );
}

/* ============================================================
   SMALL ACTIVITY ICON COMPONENT
============================================================ */

function ActivityIcon() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
      <TrendingUp className="h-5 w-5 text-emerald-600" />
    </div>
  );
}

export default Community;