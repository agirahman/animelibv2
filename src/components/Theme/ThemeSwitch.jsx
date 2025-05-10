'use client'

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FiSun } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import Image from "next/image";

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()
  
    useEffect(() =>  setMounted(true), [])
  
    if (!mounted) return (
      <Image
        src="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    )
  
    if (resolvedTheme === 'dark') {
      return (
        <button aria-label="light theme button" type="button" onClick={() => setTheme('light')} className="p-2 rounded-lg text-zinc-300 bg-zinc-800 border border-zinc-500 cursor-pointer">
          <FiSun />
        </button>
      )
    }
  
    if (resolvedTheme === 'light') {
      return (
        <button aria-label="dark theme button" type="button" onClick={() => setTheme('dark')} className="p-2 rounded-lg text-zinc-400 bg-zinc-100 border border-zinc-500 cursor-pointer">
          <MdDarkMode />
        </button>
      )
    }
}

export default ThemeSwitch