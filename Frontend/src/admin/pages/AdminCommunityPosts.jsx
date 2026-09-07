import { useEffect, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { requestJson } from "../../lib/api";

const AdminCommunityPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    requestJson("/admin/community/posts")
      .then((response) => setPosts(response.posts || []))
      .catch((requestError) => setError(requestError.message || "Unable to load community posts."))
      .finally(() => setLoading(false));
  }, []);

  const deletePost = async (post) => {
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    try {
      setDeletingId(post.id);
      await requestJson(`/admin/community/posts/${post.id}`, { method: "DELETE" });
      setPosts((current) => current.filter((item) => item.id !== post.id));
    } catch (requestError) {
      setError(requestError.message || "Unable to delete community post.");
    } finally {
      setDeletingId("");
    }
  };

  return <div className="space-y-6">
    <div className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-bold text-white">Community Posts</h1><p className="mt-1 text-sm text-slate-400">Review and moderate all community content.</p></div><div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">{posts.length} posts</div></div>
    {error && <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
    <div className="overflow-hidden rounded-xl border border-[#243047] bg-[#111827] shadow-xl shadow-black/20"><div className="overflow-x-auto"><table className="w-full min-w-225"><thead className="bg-slate-800/70"><tr>{["Post", "Author", "Type", "Engagement", "Created", "Action"].map((heading) => <th key={heading} className="px-5 py-3 text-left text-xs uppercase tracking-wider text-slate-400">{heading}</th>)}</tr></thead><tbody className="divide-y divide-[#243047]">{posts.map((post) => <tr key={post.id} className="transition hover:bg-slate-800/50"><td className="max-w-sm px-5 py-4"><p className="truncate text-sm font-semibold text-slate-200">{post.title}</p><p className="mt-1 line-clamp-1 text-xs text-slate-500">{post.description}</p></td><td className="px-5 py-4 text-sm text-slate-300">{post.author_name || "-"}</td><td className="px-5 py-4"><span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-semibold capitalize text-purple-300">{post.type}</span></td><td className="px-5 py-4 text-xs text-slate-400">{post.likes || 0} likes · {post.comments || 0} comments</td><td className="px-5 py-4 text-xs text-slate-400">{post.created_at ? new Date(post.created_at).toLocaleString() : "-"}</td><td className="px-5 py-4"><button type="button" onClick={() => deletePost(post)} disabled={deletingId === post.id} className="inline-flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"><Trash2 size={14} />{deletingId === post.id ? "Deleting..." : "Delete"}</button></td></tr>)}</tbody></table>{!loading && posts.length === 0 && <div className="p-12 text-center"><MessageSquare className="mx-auto h-8 w-8 text-slate-600" /><p className="mt-3 text-sm text-slate-500">No community posts found.</p></div>}{loading && <p className="p-8 text-center text-sm text-slate-500">Loading community posts...</p>}</div></div>
  </div>;
};

export default AdminCommunityPosts;
