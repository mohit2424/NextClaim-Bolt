import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SearchItem {
  id: string
  name: string
}

interface ElasticSearchProps {
  items: SearchItem[]
  onSearch: (query: string) => void
  className?: string
}

export function ElasticSearch({ items, onSearch, className }: ElasticSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchItem[]>([])

  useEffect(() => {
    if (query.length > 0) {
      const filteredItems = items.filter(
        (item) =>
          item.id.toLowerCase().includes(query.toLowerCase()) || item.name.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredItems)
    } else {
      setResults([])
    }
  }, [query, items])

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex">
        <Input
          type="search"
          placeholder="Search claims..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button onClick={handleSearch} className="ml-2">
          Search
        </Button>
      </div>
      {results.length > 0 && (
        <ScrollArea className="absolute z-10 mt-1 w-full max-h-60 bg-white border rounded-md shadow-lg">
          {results.map((item) => (
            <Link key={item.id} href={`/claims/${item.id}`} className="block">
              <div className="px-4 py-2 hover:bg-gray-100">
                <span className="font-medium">{item.id}</span> - {item.name}
              </div>
            </Link>
          ))}
        </ScrollArea>
      )}
    </div>
  )
}

