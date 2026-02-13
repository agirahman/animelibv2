"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { PiStarFill } from "react-icons/pi";
import Image from "next/image";
import { fetchData } from "@/utils/services/api";

const SUGGESTION_QUERY = `
  query ($search: String) {
    Page(perPage: 5) {
      media(search: $search, type: ANIME, isAdult: false, sort: POPULARITY_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
          color
        }
        meanScore
        format
      }
    }
  }
`;

const InputSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Debounced search for suggestions
  useEffect(() => {
    if (!keyword.trim() || keyword.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await fetchData(SUGGESTION_QUERY, { search: keyword });
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Suggestion fetch error:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  // Global "/" shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!keyword.trim()) return;

    setShowSuggestions(false);
    router.push(`/search/${encodeURIComponent(keyword.trim())}`);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (selectedIndex > -1 && suggestions[selectedIndex]) {
        e.preventDefault();
        router.push(`/anime/${suggestions[selectedIndex].id}`);
        setShowSuggestions(false);
        setKeyword("");
      } else {
        handleSearch();
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setKeyword("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-[200px] sm:max-w-[300px] group">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setSelectedIndex(-1);
            setShowSuggestions(true);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => keyword.length >= 2 && setShowSuggestions(true)}
          className="block w-full px-4 py-2.5 pr-20 text-sm bg-gray-100/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-full border border-zinc-200 dark:border-zinc-700 focus:border-green-500 focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-green-500/10 transition-all duration-300 outline-none shadow-sm hover:shadow-md dark:text-white"
          placeholder="Search anime..."
        />

        <div className="absolute right-3 flex items-center gap-1">
          {keyword && (
            <button
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-full"
            >
              <RiCloseLine size={18} />
            </button>
          )}
          <button
            onClick={handleSearch}
            className="p-1.5 text-gray-400 hover:text-green-500 transition-colors rounded-full"
          >
            <RiSearchLine size={18} />
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (keyword.length >= 2) && (suggestions.length > 0 || loading) && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-[280px] sm:min-w-[350px] bg-white/90 dark:bg-zinc-900/95 backdrop-blur-lg border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {loading ? (
            <div className="p-4 text-center text-sm text-zinc-500">
              Searching titles...
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="px-4 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800">
                Top Suggestions
              </div>
              {suggestions.map((anime, index) => (
                <button
                  key={anime.id}
                  onClick={() => {
                    router.push(`/anime/${anime.id}`);
                    setShowSuggestions(false);
                    setKeyword("");
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center gap-3 p-3 text-left transition-colors ${selectedIndex === index
                      ? "bg-green-500/10 dark:bg-green-500/5 text-green-600 dark:text-green-400"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    }`}
                >
                  <div className="relative w-10 h-14 flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                    <Image
                      src={anime.coverImage.large}
                      alt={anime.title.romaji}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-bold truncate text-zinc-900 dark:text-zinc-100">
                      {anime.title.romaji}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded uppercase font-bold">
                        {anime.format}
                      </span>
                      {anime.meanScore && (
                        <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-bold">
                          <PiStarFill size={10} />
                          {anime.meanScore / 10}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
              <button
                onClick={handleSearch}
                className="p-3 text-center text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-green-500 dark:hover:text-green-400 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 transition-colors"
              >
                View all results for "{keyword}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputSearch;
