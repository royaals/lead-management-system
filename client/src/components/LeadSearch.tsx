'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'
import { useState } from "react"

export function LeadSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = async () => {
    // Implement search functionality
  }

  return (
    <div className="flex w-full items-center space-x-2 max-w-[600px]">
      <Input
        placeholder="Search leads..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleSearch}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  )
}

