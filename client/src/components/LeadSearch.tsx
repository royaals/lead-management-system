'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { useState } from "react"

interface LeadSearchProps {
  onSearch: (term: string) => void
}

export function LeadSearch({ onSearch }: LeadSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    // Perform search as user types (optional)
    onSearch(value)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2 max-w-[600px]">
      <Input
        placeholder="Search leads..."
        value={searchTerm}
        onChange={handleChange}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </form>
  )
}

