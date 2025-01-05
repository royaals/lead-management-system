//@ts-nocheck
import { API_URL } from "@/lib/utils";
import React, { useState, useEffect } from 'react'

import { DashboardShell } from "../components/Shell"
import { LeadSearch } from "../components/LeadSearch"
import { StatsCards } from "../components/StatsCards"
import { LeadsList } from "../components/LeadList"
import { PendingCallsCard } from "../components/PendingCalls"
import { RecentInteractionsCard } from "../components/RecentInteractions"
import { Lead, PendingCall, Interaction } from "../types/dashboard"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from '@/components/Header'

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [pendingCalls, setPendingCalls] = useState<PendingCall[]>([])
  const [recentInteractions, setRecentInteractions] = useState<Interaction[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loadingMessage, setLoadingMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [searchResultsMessage, setSearchResultsMessage] = useState('')

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoadingMessage('Loading dashboard data...')
      const [leadsData, pendingCallsData, recentInteractionsData] = await Promise.all([
        fetch(`${API_URL}/api/leads`).then(res => res.json()).catch(() => []),
        fetch(`${API_URL}/api/call-plans/pending`).then(res => res.json()).catch(() => []),
        fetch(`${API_URL}/api/interactions/recent`).then(res => res.json()).catch(() => []),
      ])
      setLeads(leadsData)
      setFilteredLeads(leadsData)
      setPendingCalls(pendingCallsData)
      setRecentInteractions(recentInteractionsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setErrorMessage('Failed to load dashboard data. Please refresh the page.')
    } finally {
      setLoadingMessage('')
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    
    if (!term.trim()) {
      setFilteredLeads(leads)
      setSearchResultsMessage('')
      return
    }

    const searchResults = leads.filter(lead => 
      lead.restaurant_name.toLowerCase().includes(term.toLowerCase()) ||
      lead.address.toLowerCase().includes(term.toLowerCase()) ||
      lead.contact_number.toLowerCase().includes(term.toLowerCase()) ||
      lead.assigned_kam.toLowerCase().includes(term.toLowerCase())
    )

    setFilteredLeads(searchResults)
    setSearchResultsMessage(`Found ${searchResults.length} result${searchResults.length !== 1 ? 's' : ''} for "${term}"`)
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <Header />
      <DashboardShell>
        <div className="space-y-6">
          {loadingMessage && <Alert><AlertDescription>{loadingMessage}</AlertDescription></Alert>}
          {errorMessage && <Alert variant="destructive"><AlertDescription>{errorMessage}</AlertDescription></Alert>}
          {searchResultsMessage && <Alert><AlertDescription>{searchResultsMessage}</AlertDescription></Alert>}

          <div className="space-y-6">
            <LeadSearch onSearch={handleSearch} />
            
            
            <div className="grid gap-6 lg:grid-cols-7">
              <LeadsList 
                leads={filteredLeads} 
                className="lg:col-span-4 h-[calc(100vh-15rem)]" 
              />
              <div className="space-y-6 lg:col-span-3">
                <PendingCallsCard pendingCalls={pendingCalls} />
                <RecentInteractionsCard recentInteractions={recentInteractions} />
              </div>
            </div>
          </div>
        </div>
      </DashboardShell>
    </div>
  )
}
