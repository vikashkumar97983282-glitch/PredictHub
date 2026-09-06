import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  Plus,
  MessageCircle,
  Share2,
  Bookmark,
  BookmarkCheck,
  Heart,
  MoreHorizontal,
  ChevronRight,
  Flame,
  Trophy,
  HelpCircle,
  Brain,
  BarChart3,
  Target,
  Users,
  TrendingUp,
  Send,
  X,
  CheckCircle2,
  MessageSquare,
  Flag,
  Sparkles,
} from "lucide-react";

import Sidebar from "../components/sidebar";
import Navbar from "../components/header";
import Footer from "../components/footer";
import { useSidebar } from "../contexts/use-sidebar";

/* ============================================================
   MOCK DATA
============================================================ */

const initialPosts = [
  {
    id: 1,
    type: "prediction",
    user: "Rahul Sharma",
    initials: "RS",
    time: "24 min ago",
    title: "Placement Prediction",
    description:
      "I used PredictHub to estimate my placement probability using my academic and skill profile.",
    model: "Random Forest",
    predictionType: "Placement Prediction",
    result: "87% Placement Probability",
    inputs: [
      ["CGPA", "8.4"],
      ["Skills", "Python, SQL, ML"],
      ["Internship", "1"],
    ],
    tags: ["PlacementPrediction", "RandomForest"],
    likes: 24,
    comments: 8,
    shares: 4,
    bookmarked: false,
    liked: false,
  },

  {
    id: 2,
    type: "discussion",
    user: "Priya Patel",
    initials: "PP",
    time: "1 hour ago",
    title: "Which model gives better placement predictions?",
    description:
      "I tested Random Forest and Logistic Regression. Random Forest seems more accurate in my case. What models are you using?",
    tags: ["Discussion", "PlacementPrediction"],
    likes: 31,
    comments: 12,
    shares: 6,
    bookmarked: false,
    liked: false,
  },

  {
    id: 3,
    type: "question",
    user: "Amit Kumar",
    initials: "AK",
    time: "2 hours ago",
    title: "How can I improve my prediction accuracy?",
    description:
      "My current model accuracy is around 78%. What techniques should I try to improve it?",
    category: "Model Accuracy",
    answers: 7,
    accepted: true,
    tags: ["ModelAccuracy", "MachineLearning"],
    likes: 18,
    comments: 7,
    shares: 2,
    bookmarked: false,
    liked: false,
  },

  {
    id: 4,
    type: "prediction",
    user: "Neha Singh",
    initials: "NS",
    time: "4 hours ago",
    title: "House Price Prediction Result",
    description:
      "Sharing my latest house price prediction generated with PredictHub.",
    model: "XGBoost",
    predictionType: "House Price Prediction",
    result: "₹68.5 Lakhs Estimated Price",
    inputs: [
      ["Area", "1,850 sq.ft"],
      ["Bedrooms", "3"],
      ["Location", "Delhi NCR"],
    ],
    tags: ["HousePricePrediction", "XGBoost"],
    likes: 17,
    comments: 5,
    shares: 3,
    bookmarked: false,
    liked: false,
  },

  {
    id: 5,
    type: "discussion",
    user: "Vikash Sharma",
    initials: "VS",
    time: "Yesterday",
    title: "Random Forest vs XGBoost",
    description:
      "For tabular prediction problems, which one has given you better results? I am comparing both models for my project.",
    tags: ["RandomForest", "XGBoost", "MachineLearning"],
    likes: 42,
    comments: 16,
    shares: 9,
    bookmarked: false,
    liked: false,
  },
];

const trendingTopics = [
  { name: "PlacementPrediction", discussions: 128 },
  { name: "MachineLearning", discussions: 94 },
  { name: "HousePricePrediction", discussions: 86 },
  { name: "ModelAccuracy", discussions: 76 },
  { name: "RandomForest", discussions: 71 },
];

const popularModels = [
  {
    name: "Random Forest",
    discussions: 184,
    icon: Brain,
  },
  {
    name: "XGBoost",
    discussions: 162,
    icon: TrendingUp,
  },
  {
    name: "Logistic Regression",
    discussions: 143,
    icon: BarChart3,
  },
  {
    name: "Neural Network",
    discussions: 119,
    icon: Brain,
  },
  {
    name: "Decision Tree",
    discussions: 97,
    icon: Target,
  },
];

const contributors = [
  {
    rank: 1,
    name: "Rahul Sharma",
    initials: "RS",
    points: 152,
    answers: 48,
  },
  {
    rank: 2,
    name: "Priya Patel",
    initials: "PP",
    points: 137,
    answers: 42,
  },
  {
    rank: 3,
    name: "Amit Kumar",
    initials: "AK",
    points: 121,
    answers: 37,
  },
  {
    rank: 4,
    name: "Vikash Sharma",
    initials: "VS",
    points: 98,
    answers: 31,
  },
];

const categories = [
  "All",
  "Predictions",
  "Discussions",
  "Questions",
];

/* ============================================================
   HELPERS
============================================================ */

function getPostTypeLabel(type) {
  if (type === "prediction") return "Prediction";
  if (type === "discussion") return "Discussion";
  if (type === "question") return "Question";

  return "Community";
}

function getPostTypeIcon(type) {
  if (type === "prediction") return Target;
  if (type === "discussion") return MessageSquare;
  if (type === "question") return HelpCircle;

  return MessageCircle;
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

function Community({ initialPrediction = null }) {
  const {
    isSidebarOpen,
    isMobileMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    closeMobileMenu,
  } = useSidebar();

  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const [showShareModal, setShowShareModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const [expandedComments, setExpandedComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const [shareForm, setShareForm] = useState({
    predictionType: "Placement Prediction",
    model: "Random Forest",
    result: "",
    title: "",
    description: "",
    tags: "",
  });

  const [questionForm, setQuestionForm] = useState({
    title: "",
    details: "",
    category: "Machine Learning",
    tags: "",
  });

  /* ============================================================
     LOADING
  ============================================================ */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  /* ============================================================
     PREDICTION PAGE INTEGRATION
  ============================================================ */

  useEffect(() => {
    if (!initialPrediction) return;

    setShareForm((previous) => ({
      ...previous,
      predictionType:
        initialPrediction.predictionType ||
        previous.predictionType,

      model:
        initialPrediction.model ||
        previous.model,

      result:
        initialPrediction.result ||
        previous.result,

      title:
        initialPrediction.title ||
        previous.title,

      description:
        initialPrediction.description ||
        previous.description,

      tags:
        initialPrediction.tags ||
        previous.tags,
    }));

    setShowShareModal(true);
  }, [initialPrediction]);

  /* ============================================================
     FILTER
  ============================================================ */

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (activeCategory === "Predictions") {
      result = result.filter(
        (post) => post.type === "prediction"
      );
    }

    if (activeCategory === "Discussions") {
      result = result.filter(
        (post) => post.type === "discussion"
      );
    }

    if (activeCategory === "Questions") {
      result = result.filter(
        (post) => post.type === "question"
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();

      result = result.filter((post) => {
        return (
          post.title?.toLowerCase().includes(query) ||
          post.description
            ?.toLowerCase()
            .includes(query) ||
          post.user?.toLowerCase().includes(query) ||
          post.model?.toLowerCase().includes(query) ||
          post.tags?.some((tag) =>
            tag.toLowerCase().includes(query)
          )
        );
      });
    }

    return result;
  }, [posts, activeCategory, searchQuery]);

  /* ============================================================
     LIKE
  ============================================================ */

  const handleLike = (postId) => {
    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes:
                post.likes +
                (post.liked ? -1 : 1),
            }
          : post
      )
    );
  };

  /* ============================================================
     BOOKMARK
  ============================================================ */

  const handleBookmark = (postId) => {
    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? {
              ...post,
              bookmarked: !post.bookmarked,
            }
          : post
      )
    );
  };

  /* ============================================================
     SHARE
  ============================================================ */

  const handleShare = async (postId) => {
    const post = posts.find(
      (item) => item.id === postId
    );

    if (!post) return;

    try {
      await navigator.clipboard.writeText(
        window.location.href
      );

      setPosts((previous) =>
        previous.map((item) =>
          item.id === postId
            ? {
                ...item,
                shares: item.shares + 1,
              }
            : item
        )
      );

      alert("Community post link copied.");
    } catch (error) {
      console.error(
        "Unable to copy link:",
        error
      );
    }
  };

  /* ============================================================
     COMMENTS
  ============================================================ */

  const toggleComments = (postId) => {
    setExpandedComments((previous) => ({
      ...previous,
      [postId]: !previous[postId],
    }));
  };

  const submitComment = (postId) => {
    const text =
      commentText[postId]?.trim();

    if (!text) return;

    setPosts((previous) =>
      previous.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments:
                post.comments + 1,
            }
          : post
      )
    );

    setCommentText((previous) => ({
      ...previous,
      [postId]: "",
    }));
  };

  /* ============================================================
     SHARE PREDICTION
  ============================================================ */

  const handleSharePrediction = (event) => {
    event.preventDefault();

    if (
      !shareForm.title.trim() ||
      !shareForm.result.trim()
    ) {
      return;
    }

    const newPost = {
      id: Date.now(),
      type: "prediction",
      user: "You",
      initials: "YU",
      time: "Just now",

      title: shareForm.title,

      description:
        shareForm.description ||
        "Shared a prediction with the PredictHub community.",

      model: shareForm.model,

      predictionType:
        shareForm.predictionType,

      result: shareForm.result,

      inputs: [],

      tags: shareForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      likes: 0,
      comments: 0,
      shares: 0,

      liked: false,
      bookmarked: false,
    };

    setPosts((previous) => [
      newPost,
      ...previous,
    ]);

    setShareForm({
      predictionType: "Placement Prediction",
      model: "Random Forest",
      result: "",
      title: "",
      description: "",
      tags: "",
    });

    setShowShareModal(false);
  };

  /* ============================================================
     ASK QUESTION
  ============================================================ */

  const handleAskQuestion = (event) => {
    event.preventDefault();

    if (
      !questionForm.title.trim() ||
      !questionForm.details.trim()
    ) {
      return;
    }

    const newPost = {
      id: Date.now(),

      type: "question",

      user: "You",
      initials: "YU",
      time: "Just now",

      title: questionForm.title,

      description: questionForm.details,

      category: questionForm.category,

      answers: 0,
      accepted: false,

      tags: questionForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),

      likes: 0,
      comments: 0,
      shares: 0,

      liked: false,
      bookmarked: false,
    };

    setPosts((previous) => [
      newPost,
      ...previous,
    ]);

    setQuestionForm({
      title: "",
      details: "",
      category: "Machine Learning",
      tags: "",
    });

    setShowQuestionModal(false);
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0d1422] text-white">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileMenuOpen={isMobileMenuOpen}
          onCloseMobileMenu={closeMobileMenu}
          onToggleSidebar={toggleSidebar}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={toggleMobileMenu} />

          <main className="flex-1 bg-[#0f1726] px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <CommunitySkeleton />
            </div>
          </main>
        </div>
      </div>
    );
  }

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <div className="flex min-h-screen bg-[#0d1422] text-white">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
        onToggleSidebar={toggleSidebar}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={toggleMobileMenu} />

        <main className="flex-1 overflow-x-hidden bg-[#0f1726]">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

              {/* ==================================================
                  HEADER
              ================================================== */}

              <section className="mb-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-400" />

                      <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                        Community
                      </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                      PredictHub Community
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                      Share predictions, discuss ML models,
                      ask questions, and learn from the
                      community.
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">

                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) =>
                          setSearchQuery(
                            event.target.value
                          )
                        }
                        placeholder="Search community..."
                        className="
                          h-11
                          w-full
                          rounded-xl
                          border
                          border-slate-700
                          bg-slate-800/70
                          pl-10
                          pr-4
                          text-sm
                          text-slate-200
                          outline-none
                          placeholder:text-slate-500
                          focus:border-blue-500/50
                          focus:ring-2
                          focus:ring-blue-500/10
                        "
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setShowShareModal(true)
                      }
                      className="
                        inline-flex
                        h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-blue-600
                        px-4
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-blue-500
                      "
                    >
                      <Plus className="h-4 w-4" />
                      Share Prediction
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShowQuestionModal(true)
                      }
                      className="
                        inline-flex
                        h-11
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800/70
                        px-4
                        text-sm
                        font-bold
                        text-slate-300
                        transition
                        hover:bg-slate-700
                      "
                    >
                      <HelpCircle className="h-4 w-4 text-cyan-400" />
                      Ask Question
                    </button>
                  </div>
                </div>
              </section>

              {/* ==================================================
                  CATEGORIES
              ================================================== */}

              <div className="mb-6 overflow-x-auto">
                <div className="flex min-w-max gap-2">

                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        setActiveCategory(category)
                      }
                      className={`
                        rounded-xl
                        px-4
                        py-2.5
                        text-sm
                        font-semibold
                        transition
                        ${
                          activeCategory === category
                            ? "bg-blue-600 text-white"
                            : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}

                </div>
              </div>

              {/* ==================================================
                  TRENDING
              ================================================== */}

              <section className="mb-7">

                <div className="mb-3 flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-400" />

                  <h2 className="text-lg font-bold text-slate-100">
                    Trending Topics
                  </h2>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2">

                  {trendingTopics.map((topic) => (
                    <button
                      key={topic.name}
                      type="button"
                      onClick={() =>
                        setSearchQuery(
                          topic.name
                        )
                      }
                      className="
                        min-w-[190px]
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800/60
                        p-4
                        text-left
                        transition
                        hover:border-blue-500/40
                        hover:bg-slate-800
                      "
                    >
                      <p className="truncate text-sm font-bold text-blue-300">
                        #{topic.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {topic.discussions} discussions
                      </p>
                    </button>
                  ))}

                </div>
              </section>

              {/* ==================================================
                  CONTENT
              ================================================== */}

              <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">

                {/* ==================================================
                    FEED
                ================================================== */}

                <section className="min-w-0">

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-100">
                        Community Feed
                      </h2>

                      <p className="mt-1 text-xs text-slate-500">
                        Useful predictions, discussions and
                        ML questions.
                      </p>
                    </div>

                    <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-500">
                      {filteredPosts.length} posts
                    </span>
                  </div>

                  {filteredPosts.length > 0 ? (
                    <div className="space-y-4">
                      {filteredPosts.map((post) => (
                        <CommunityPost
                          key={post.id}
                          post={post}
                          onLike={handleLike}
                          onBookmark={handleBookmark}
                          onShare={handleShare}
                          onToggleComments={
                            toggleComments
                          }
                          expanded={
                            !!expandedComments[
                              post.id
                            ]
                          }
                          commentText={
                            commentText[
                              post.id
                            ] || ""
                          }
                          setCommentText={
                            setCommentText
                          }
                          submitComment={
                            submitComment
                          }
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      icon={MessageCircle}
                      title="No posts found"
                      description="Try another search or be the first person to contribute."
                      buttonText="Share Prediction"
                      onClick={() =>
                        setShowShareModal(true)
                      }
                    />
                  )}
                </section>

                {/* ==================================================
                    RIGHT SIDEBAR
                ================================================== */}

                <aside className="space-y-5 xl:sticky xl:top-24">

                  {/* POPULAR MODELS */}

                  <SideCard
                    icon={Brain}
                    iconClass="text-purple-400"
                    title="Popular Models"
                  >
                    <div className="space-y-2">

                      {popularModels.map((model) => {
                        const Icon = model.icon;

                        return (
                          <button
                            key={model.name}
                            type="button"
                            className="
                              flex
                              w-full
                              items-center
                              gap-3
                              rounded-xl
                              p-2
                              text-left
                              transition
                              hover:bg-slate-700/40
                            "
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                              <Icon className="h-4 w-4 text-purple-400" />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-300">
                                {model.name}
                              </p>

                              <p className="text-xs text-slate-500">
                                {model.discussions} discussions
                              </p>
                            </div>

                            <ChevronRight className="h-4 w-4 text-slate-600" />
                          </button>
                        );
                      })}

                    </div>
                  </SideCard>

                  {/* CONTRIBUTORS */}

                  <SideCard
                    icon={Trophy}
                    iconClass="text-yellow-400"
                    title="Top Contributors"
                  >
                    <div className="space-y-4">

                      {contributors.map(
                        (contributor) => (
                          <div
                            key={
                              contributor.rank
                            }
                            className="flex items-center gap-3"
                          >
                            <span className="w-4 text-xs font-bold text-slate-600">
                              {contributor.rank}
                            </span>

                            <Avatar
                              initials={
                                contributor.initials
                              }
                              size="small"
                            />

                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-slate-300">
                                {
                                  contributor.name
                                }
                              </p>

                              <p className="text-xs text-slate-500">
                                {
                                  contributor.answers
                                }{" "}
                                helpful answers
                              </p>
                            </div>

                            <span className="text-xs font-bold text-yellow-400">
                              {
                                contributor.points
                              }
                            </span>
                          </div>
                        )
                      )}

                    </div>
                  </SideCard>

                  {/* QUICK STATS */}

                  <SideCard
                    icon={BarChart3}
                    iconClass="text-blue-400"
                    title="Community Stats"
                  >
                    <div className="grid grid-cols-2 gap-2">

                      <MiniStat
                        label="Predictions"
                        value="12.8K"
                      />

                      <MiniStat
                        label="Discussions"
                        value="4.2K"
                      />

                      <MiniStat
                        label="Questions"
                        value="1.8K"
                      />

                      <MiniStat
                        label="Members"
                        value="8.6K"
                      />

                    </div>
                  </SideCard>

                  {/* GUIDELINE */}

                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                      <Sparkles className="h-4 w-4 text-blue-400" />
                    </div>

                    <h3 className="mt-4 text-sm font-bold text-slate-200">
                      Share knowledge
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Share useful prediction results,
                      explain your approach and help
                      other ML learners.
                    </p>

                  </div>

                </aside>
              </div>
            </div>

            <Footer />
          </div>
        </main>
      </div>

      {/* ============================================================
          SHARE PREDICTION MODAL
      ============================================================ */}

      {showShareModal && (
        <Modal
          title="Share Prediction"
          subtitle="Share your prediction result with the community."
          icon={Target}
          onClose={() =>
            setShowShareModal(false)
          }
        >
          <form
            onSubmit={handleSharePrediction}
            className="space-y-5"
          >

            <div className="grid gap-4 sm:grid-cols-2">

              <FormField label="Prediction Type">
                <select
                  value={
                    shareForm.predictionType
                  }
                  onChange={(event) =>
                    setShareForm(
                      (previous) => ({
                        ...previous,
                        predictionType:
                          event.target.value,
                      })
                    )
                  }
                  className="form-input"
                >
                  <option>
                    Placement Prediction
                  </option>

                  <option>
                    House Price Prediction
                  </option>

                  <option>
                    Student Performance
                  </option>

                  <option>
                    Disease Prediction
                  </option>

                  <option>
                    Stock Price Prediction
                  </option>
                </select>
              </FormField>

              <FormField label="Model">
                <select
                  value={shareForm.model}
                  onChange={(event) =>
                    setShareForm(
                      (previous) => ({
                        ...previous,
                        model:
                          event.target.value,
                      })
                    )
                  }
                  className="form-input"
                >
                  <option>
                    Random Forest
                  </option>

                  <option>
                    XGBoost
                  </option>

                  <option>
                    Logistic Regression
                  </option>

                  <option>
                    Neural Network
                  </option>

                  <option>
                    Decision Tree
                  </option>
                </select>
              </FormField>

            </div>

            <FormField label="Prediction Result">
              <input
                type="text"
                value={shareForm.result}
                onChange={(event) =>
                  setShareForm(
                    (previous) => ({
                      ...previous,
                      result:
                        event.target.value,
                    })
                  )
                }
                placeholder="e.g. 87% Placement Probability"
                className="form-input"
              />
            </FormField>

            <FormField label="Title">
              <input
                type="text"
                value={shareForm.title}
                onChange={(event) =>
                  setShareForm(
                    (previous) => ({
                      ...previous,
                      title:
                        event.target.value,
                    })
                  )
                }
                placeholder="Give your prediction a title"
                className="form-input"
              />
            </FormField>

            <FormField label="Description">
              <textarea
                rows={4}
                value={
                  shareForm.description
                }
                onChange={(event) =>
                  setShareForm(
                    (previous) => ({
                      ...previous,
                      description:
                        event.target.value,
                    })
                  )
                }
                placeholder="Explain your prediction..."
                className="form-input resize-none"
              />
            </FormField>

            <FormField label="Tags">
              <input
                type="text"
                value={shareForm.tags}
                onChange={(event) =>
                  setShareForm(
                    (previous) => ({
                      ...previous,
                      tags:
                        event.target.value,
                    })
                  )
                }
                placeholder="MachineLearning, RandomForest"
                className="form-input"
              />
            </FormField>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setShowShareModal(false)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-slate-300
                  transition
                  hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-blue-500
                "
              >
                <Share2 className="h-4 w-4" />
                Share Prediction
              </button>

            </div>
          </form>
        </Modal>
      )}

      {/* ============================================================
          QUESTION MODAL
      ============================================================ */}

      {showQuestionModal && (
        <Modal
          title="Ask a Question"
          subtitle="Ask the community and get help with your ML problem."
          icon={HelpCircle}
          onClose={() =>
            setShowQuestionModal(false)
          }
        >
          <form
            onSubmit={handleAskQuestion}
            className="space-y-5"
          >

            <FormField label="Question Title">
              <input
                type="text"
                value={questionForm.title}
                onChange={(event) =>
                  setQuestionForm(
                    (previous) => ({
                      ...previous,
                      title:
                        event.target.value,
                    })
                  )
                }
                placeholder="What do you want to know?"
                className="form-input"
              />
            </FormField>

            <FormField label="Question Details">
              <textarea
                rows={6}
                value={questionForm.details}
                onChange={(event) =>
                  setQuestionForm(
                    (previous) => ({
                      ...previous,
                      details:
                        event.target.value,
                    })
                  )
                }
                placeholder="Explain your model, dataset, error or approach..."
                className="form-input resize-none"
              />
            </FormField>

            <div className="grid gap-4 sm:grid-cols-2">

              <FormField label="Category">
                <select
                  value={
                    questionForm.category
                  }
                  onChange={(event) =>
                    setQuestionForm(
                      (previous) => ({
                        ...previous,
                        category:
                          event.target.value,
                      })
                    )
                  }
                  className="form-input"
                >
                  <option>
                    Machine Learning
                  </option>

                  <option>
                    Deep Learning
                  </option>

                  <option>
                    Prediction
                  </option>

                  <option>
                    Model Accuracy
                  </option>

                  <option>
                    Data Processing
                  </option>

                  <option>
                    Python
                  </option>

                  <option>
                    General
                  </option>
                </select>
              </FormField>

              <FormField label="Tags">
                <input
                  type="text"
                  value={questionForm.tags}
                  onChange={(event) =>
                    setQuestionForm(
                      (previous) => ({
                        ...previous,
                        tags:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="Python, ML, Accuracy"
                  className="form-input"
                />
              </FormField>

            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() =>
                  setShowQuestionModal(false)
                }
                className="
                  rounded-xl
                  border
                  border-slate-700
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-slate-300
                  transition
                  hover:bg-slate-800
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-blue-500
                "
              >
                <Send className="h-4 w-4" />
                Post Question
              </button>

            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ============================================================
   COMMUNITY POST
============================================================ */

function CommunityPost({
  post,
  onLike,
  onBookmark,
  onShare,
  onToggleComments,
  expanded,
  commentText,
  setCommentText,
  submitComment,
}) {
  const TypeIcon = getPostTypeIcon(post.type);

  return (
    <article className="
      overflow-hidden
      rounded-2xl
      border
      border-slate-700/70
      bg-slate-800/50
      transition
      hover:border-slate-600
    ">

      <div className="p-5 sm:p-6">

        {/* USER */}

        <div className="flex items-center gap-3">

          <Avatar initials={post.initials} />

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <p className="text-sm font-bold text-slate-200">
                {post.user}
              </p>

              <span className="text-xs text-slate-600">
                •
              </span>

              <span className="text-xs text-slate-500">
                {post.time}
              </span>

            </div>

            <div className="mt-1 flex items-center gap-1.5">

              <TypeIcon className="h-3.5 w-3.5 text-blue-400" />

              <span className="text-xs font-semibold text-blue-400">
                {getPostTypeLabel(post.type)}
              </span>

            </div>
          </div>

          <button
            type="button"
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-slate-700
              hover:text-slate-300
            "
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>

        </div>

        {/* CONTENT */}

        <div className="mt-5">

          <h3 className="text-lg font-bold text-slate-100">
            {post.title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {post.description}
          </p>

        </div>

        {/* PREDICTION */}

        {post.type === "prediction" && (
          <div className="
            mt-5
            rounded-xl
            border
            border-blue-500/20
            bg-blue-500/5
            p-4
          ">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Prediction Result
                </p>

                <p className="mt-1 text-lg font-extrabold text-blue-300">
                  {post.result}
                </p>

              </div>

              <div className="
                rounded-lg
                border
                border-slate-700
                bg-slate-800/70
                px-3
                py-2
              ">

                <p className="text-[10px] uppercase tracking-wider text-slate-600">
                  Model
                </p>

                <p className="mt-1 text-xs font-bold text-slate-300">
                  {post.model}
                </p>

              </div>

            </div>

            {post.inputs?.length > 0 && (
              <div className="
                mt-4
                grid
                grid-cols-2
                gap-3
                border-t
                border-slate-700/60
                pt-4
                sm:grid-cols-3
              ">

                {post.inputs.map(
                  ([label, value]) => (
                    <div key={label}>

                      <p className="text-[10px] text-slate-600">
                        {label}
                      </p>

                      <p className="mt-1 truncate text-xs font-bold text-slate-300">
                        {value}
                      </p>

                    </div>
                  )
                )}

              </div>
            )}

            <button
              type="button"
              className="
                mt-4
                inline-flex
                items-center
                gap-1
                text-xs
                font-bold
                text-blue-400
                hover:text-blue-300
              "
            >
              View Prediction
              <ChevronRight className="h-3.5 w-3.5" />
            </button>

          </div>
        )}

        {/* QUESTION */}

        {post.type === "question" && (
          <div className="mt-5 flex flex-wrap items-center gap-3">

            <div className="
              inline-flex
              items-center
              gap-2
              rounded-lg
              border
              border-slate-700
              bg-slate-800
              px-3
              py-2
            ">
              <MessageCircle className="h-4 w-4 text-cyan-400" />

              <span className="text-xs font-semibold text-slate-300">
                {post.answers || 0} answers
              </span>
            </div>

            {post.accepted && (
              <div className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-emerald-500/20
                bg-emerald-500/5
                px-3
                py-2
              ">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                <span className="text-xs font-semibold text-emerald-400">
                  Accepted
                </span>
              </div>
            )}

            <button
              type="button"
              className="
                rounded-lg
                bg-blue-600
                px-4
                py-2
                text-xs
                font-bold
                text-white
                transition
                hover:bg-blue-500
              "
            >
              Answer
            </button>

          </div>
        )}

        {/* TAGS */}

        {post.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">

            {post.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setCommentText((previous) => ({
                    ...previous,
                  }))
                }
                className="
                  rounded-full
                  border
                  border-slate-700
                  bg-slate-800
                  px-2.5
                  py-1
                  text-[11px]
                  font-semibold
                  text-slate-500
                  transition
                  hover:border-blue-500/30
                  hover:text-blue-400
                "
              >
                #{tag}
              </button>
            ))}

          </div>
        )}

        {/* ACTIONS */}

        <div className="
          mt-5
          flex
          items-center
          gap-1
          border-t
          border-slate-700/60
          pt-4
        ">

          <PostAction
            icon={Heart}
            label={`${post.likes}`}
            active={post.liked}
            activeClass="text-rose-400"
            onClick={() =>
              onLike(post.id)
            }
          />

          <PostAction
            icon={MessageCircle}
            label={`${post.comments}`}
            onClick={() =>
              onToggleComments(post.id)
            }
          />

          <PostAction
            icon={Share2}
            label={`${post.shares}`}
            onClick={() =>
              onShare(post.id)
            }
          />

          <button
            type="button"
            onClick={() =>
              onBookmark(post.id)
            }
            className={`
              ml-auto
              rounded-lg
              p-2
              transition
              ${
                post.bookmarked
                  ? "bg-blue-500/10 text-blue-400"
                  : "text-slate-500 hover:bg-slate-700 hover:text-slate-300"
              }
            `}
            title="Bookmark"
          >
            {post.bookmarked ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            className="
              rounded-lg
              p-2
              text-slate-500
              transition
              hover:bg-slate-700
              hover:text-slate-300
            "
            title="Report"
          >
            <Flag className="h-4 w-4" />
          </button>

        </div>
      </div>

      {/* COMMENTS */}

      {expanded && (
        <div className="
          border-t
          border-slate-700/60
          bg-slate-900/30
          px-5
          py-5
          sm:px-6
        ">

          <div className="mb-4 flex items-center justify-between">

            <h4 className="text-sm font-bold text-slate-300">
              Comments
            </h4>

            <span className="text-xs text-slate-600">
              Join the discussion
            </span>

          </div>

          <div className="
            rounded-xl
            border
            border-slate-700
            bg-slate-800/70
            p-3
          ">

            <div className="flex gap-3">

              <Avatar
                initials="YU"
                size="small"
              />

              <div className="min-w-0 flex-1">

                <textarea
                  rows={2}
                  value={commentText}
                  onChange={(event) =>
                    setCommentText(
                      (previous) => ({
                        ...previous,
                        [post.id]:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="Add a useful comment..."
                  className="
                    w-full
                    resize-none
                    bg-transparent
                    text-sm
                    text-slate-300
                    outline-none
                    placeholder:text-slate-600
                  "
                />

                <div className="flex justify-end">

                  <button
                    type="button"
                    onClick={() =>
                      submitComment(post.id)
                    }
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      bg-blue-600
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-white
                      hover:bg-blue-500
                    "
                  >
                    <Send className="h-3.5 w-3.5" />
                    Comment
                  </button>

                </div>
              </div>
            </div>
          </div>

          {/* SAMPLE COMMENT */}

          <div className="mt-4 flex gap-3">

            <Avatar
              initials="AK"
              size="small"
            />

            <div className="min-w-0 flex-1">

              <div className="rounded-xl bg-slate-800/70 p-3">

                <div className="flex items-center justify-between">

                  <p className="text-xs font-bold text-slate-300">
                    Amit Kumar
                  </p>

                  <span className="text-[10px] text-slate-600">
                    18 min ago
                  </span>

                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Great result. I also got similar
                  performance using Random Forest.
                </p>

              </div>

              <div className="mt-1 flex gap-3 px-2">

                <button
                  type="button"
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-300"
                >
                  Like
                </button>

                <button
                  type="button"
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-300"
                >
                  Reply
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </article>
  );
}

/* ============================================================
   POST ACTION
============================================================ */

function PostAction({
  icon: Icon,
  label,
  active,
  activeClass = "",
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-lg
        px-3
        py-2
        text-xs
        font-semibold
        transition
        ${
          active
            ? `${activeClass} bg-slate-700/50`
            : "text-slate-500 hover:bg-slate-700/50 hover:text-slate-300"
        }
      `}
    >
      <Icon
        className={`h-4 w-4 ${
          active ? "fill-current" : ""
        }`}
      />

      {label}
    </button>
  );
}

/* ============================================================
   AVATAR
============================================================ */

function Avatar({
  initials,
  size = "normal",
}) {
  return (
    <div
      className={`
        flex
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-blue-500/20
        bg-blue-500/10
        font-bold
        text-blue-300
        ${
          size === "small"
            ? "h-8 w-8 text-[10px]"
            : "h-10 w-10 text-xs"
        }
      `}
    >
      {initials}
    </div>
  );
}

/* ============================================================
   SIDE CARD
============================================================ */

function SideCard({
  icon: Icon,
  iconClass,
  title,
  children,
}) {
  return (
    <section className="
      rounded-2xl
      border
      border-slate-700/70
      bg-slate-800/50
      p-5
    ">

      <div className="mb-5 flex items-center gap-3">

        <div className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          bg-slate-700/50
        ">
          <Icon
            className={`h-4 w-4 ${iconClass}`}
          />
        </div>

        <h3 className="text-sm font-bold text-slate-200">
          {title}
        </h3>

      </div>

      {children}
    </section>
  );
}

/* ============================================================
   MINI STAT
============================================================ */

function MiniStat({
  label,
  value,
}) {
  return (
    <div className="
      rounded-xl
      border
      border-slate-700/70
      bg-slate-900/30
      p-3
    ">

      <p className="text-sm font-bold text-slate-200">
        {value}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {label}
      </p>

    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  children,
}) {
  return (
    <div>

      <label className="
        mb-2
        block
        text-xs
        font-bold
        text-slate-400
      ">
        {label}
      </label>

      {children}

    </div>
  );
}

/* ============================================================
   MODAL
============================================================ */

function Modal({
  title,
  subtitle,
  icon: Icon,
  onClose,
  children,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >

      <div className="
        max-h-[90vh]
        w-full
        max-w-2xl
        overflow-y-auto
        rounded-2xl
        border
        border-slate-700
        bg-[#111a2b]
        shadow-2xl
      ">

        <div className="
          sticky
          top-0
          z-10
          flex
          items-start
          gap-4
          border-b
          border-slate-700/70
          bg-[#111a2b]
          px-5
          py-5
          sm:px-6
        ">

          <div className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-500/10
          ">
            <Icon className="h-5 w-5 text-blue-400" />
          </div>

          <div className="min-w-0 flex-1">

            <h2 className="text-lg font-bold text-slate-100">
              {title}
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              {subtitle}
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-slate-500
              hover:bg-slate-800
              hover:text-slate-300
            "
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        <div className="p-5 sm:p-6">
          {children}
        </div>

      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="
      rounded-2xl
      border
      border-dashed
      border-slate-700
      bg-slate-800/30
      px-6
      py-14
      text-center
    ">

      <div className="
        mx-auto
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl
        bg-slate-800
      ">
        <Icon className="h-6 w-6 text-slate-500" />
      </div>

      <h3 className="mt-5 text-base font-bold text-slate-300">
        {title}
      </h3>

      <p className="
        mx-auto
        mt-2
        max-w-md
        text-sm
        leading-6
        text-slate-500
      ">
        {description}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="
          mt-5
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-blue-600
          px-4
          py-2.5
          text-sm
          font-bold
          text-white
          hover:bg-blue-500
        "
      >
        <Plus className="h-4 w-4" />
        {buttonText}
      </button>

    </div>
  );
}

/* ============================================================
   SKELETON
============================================================ */

function CommunitySkeleton() {
  return (
    <div className="animate-pulse">

      <div className="h-4 w-28 rounded bg-slate-800" />

      <div className="mt-4 h-10 w-72 rounded-lg bg-slate-800" />

      <div className="mt-3 h-4 w-96 max-w-full rounded bg-slate-800" />

      <div className="mt-7 flex gap-3 overflow-hidden">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="
              h-20
              min-w-[180px]
              rounded-xl
              bg-slate-800
            "
          />
        ))}
      </div>

      <div className="
        mt-7
        grid
        gap-6
        xl:grid-cols-[minmax(0,1fr)_300px]
      ">

        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="
                h-56
                rounded-2xl
                bg-slate-800
              "
            />
          ))}
        </div>

        <div className="space-y-5">

          <div className="
            h-72
            rounded-2xl
            bg-slate-800
          " />

          <div className="
            h-64
            rounded-2xl
            bg-slate-800
          " />

        </div>

      </div>
    </div>
  );
}

export default Community;