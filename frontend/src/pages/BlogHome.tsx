import { useState } from "react";
import ArticleCard from "../components/blogcard"
import { useBlogs } from "../hooks/index";
import { Link } from "react-router-dom";






export default function BlogHome() {

  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");
  const [menuOpen, setMenuOpen] = useState(false);
  const { loading, blogs } = useBlogs();
  const token = localStorage.getItem("token");




  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">

          <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-black animate-spin" />

          <p className="text-sm text-gray-500 font-medium">
            Loading blogs...
          </p>

        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100">
        <div className="flex items-center gap-3 sm:gap-6">
          <span className="text-xl sm:text-2xl font-semibold tracking-tight">Medium</span>
          {/* Tabs — hidden on mobile */}
          <div className="hidden sm:flex">
            {(["for-you", "following"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm px-4 py-2 border-b-2 cursor-pointer transition-all ${activeTab === tab
                  ? "border-gray-900 text-gray-900 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
              >
                {tab === "for-you" ? "For you" : "Following"}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop nav right */}
        <div className="hidden sm:flex items-center gap-3">
          <Link to={"/createblog"}><button className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-800 px-3 py-1 rounded-full cursor-pointer">
            ✏️ Write
          </button>
          </Link>
          {(!token) && <Link to={"/signin"}><button className="text-sm bg-gray-900 text-white px-5 py-2 rounded-full font-medium hover:bg-gray-700 transition-colors cursor-pointer">
            Sign in
          </button>
          </Link>}

        </div>

        {/* Mobile nav right */}
        <div className="flex sm:hidden items-center gap-1">

          {/* Write button */}
          <Link
            to="/createblog"
            className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="text-lg">✏️</span>
          </Link>

          {/* Sign in */}
          {!token && (
            <Link
              to="/signin"
              className="text-xs bg-gray-900 text-white px-3 py-2 rounded-full font-medium hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              Sign in
            </Link>
          )}

          {/* Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
            aria-label="Menu"
          >
            ☰
          </button>

        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-b border-gray-100 px-4 py-3 bg-white space-y-2">
          {(!token) && <Link to={"/createblog"}><button className="block text-sm text-gray-700 py-1 cursor-pointer">✏️ Write</button></Link>}
          <button className="block text-sm text-gray-700 py-1">About</button>
          <button className="block text-sm text-gray-700 py-1">Help</button>
        </div>
      )}

      {/* Mobile tabs */}
      <div className="flex sm:hidden border-b border-gray-100 px-4">
        {(["for-you", "following"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm px-4 py-2.5 border-b-2 transition-all ${activeTab === tab
              ? "border-gray-900 text-gray-900 font-medium"
              : "border-transparent text-gray-500"
              }`}
          >
            {tab === "for-you" ? "For you" : "Following"}
          </button>
        ))}
      </div>

      {/* Banner */}
      <div className="bg-yellow-400 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        <span className="text-xs sm:text-sm text-gray-900">
          <strong>Get unlimited access</strong>
          <span className="hidden sm:inline"> to the best of Medium for less than $1/week.</span>
        </span>
        <span className="text-xs sm:text-sm font-semibold text-gray-900 underline cursor-pointer whitespace-nowrap">
          Become a member →
        </span>
      </div>

      {/* Main layout */}
      <div className="max-w-5xl mx-auto">

        {/* On mobile: stacked. On lg: side by side */}
        <div className="lg:flex">

          {/* Feed */}
          <main className="flex-1 px-4 sm:px-6 lg:border-r lg:border-gray-100">
            {activeTab === "for-you" &&
              blogs.map((article) => (
                <Link key={article.id} to={`/blog/${article.id}`} className="block"  ><ArticleCard article={article} />
                </Link>

              ))
            }

            {activeTab === "following" && (
              <div className="flex flex-col items-center justify-center py-20 text-center">

                <div className="text-5xl mb-4">
                  👥
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Nothing here yet
                </h2>

                <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                  Follow your favorite writers and publications to see their latest stories here.
                </p>

                <button onClick={() => {
                  setActiveTab("for-you")
                }} className="mt-6 px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">
                  Discover writers
                </button>

              </div>
            )}

          </main>

          {/* Sidebar — shown below feed on mobile/tablet, beside on lg */}
          <div className="px-4 sm:px-6 py-6 border-t border-gray-100 lg:border-t-0 lg:border-l-0">

          </div>

        </div>
      </div>
    </div>
  );
}
