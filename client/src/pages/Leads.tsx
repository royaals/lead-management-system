'use client'

import  { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Leads } from '../components/Leads'
import { AddLeadDialog } from '../components/LeadDialog'
import { LeadDetailsDialog } from '../components/LeadDetailsDialog'
import { AddContactDialog } from '../components/ContactDialog'
import { AddInteractionDialog } from '../components/InteractionDialog'
import { Lead } from '@/types/lead'
import Header from '../components/Header'
export default function LeadsPage() {
  
  const [leads, setLeads] = useState<Lead[]>([])
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAddLeadDialog, setShowAddLeadDialog] = useState(false)
  const [showLeadDetailsDialog, setShowLeadDetailsDialog] = useState(false)
  const [showAddContactDialog, setShowAddContactDialog] = useState(false)
  const [showAddInteractionDialog, setShowAddInteractionDialog] = useState(false)
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadLeads()
  }, [])

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase()
    const filtered = leads.filter(lead => 
      lead.restaurant_name.toLowerCase().includes(lowercasedFilter) ||
      lead.address.toLowerCase().includes(lowercasedFilter) ||
      lead.contact_number.toLowerCase().includes(lowercasedFilter) ||
      lead.assigned_kam.toLowerCase().includes(lowercasedFilter)
    )
    setFilteredLeads(filtered)
  }, [searchTerm, leads])

  const loadLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://lms-production-e0c2.up.railway.app/api/leads')
      if (!response.ok) {
        throw new Error('Failed to fetch leads')
      }
      const data = await response.json()
      setLeads(data)
      setFilteredLeads(data)
    } catch (error) {
      console.error('Error loading leads:', error)
      toast({
        title: "Error",
        description: "Failed to load leads. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddLead = (newLead: Lead) => {
    setLeads(prevLeads => [...prevLeads, newLead])
    toast({
      title: "Lead Added",
      description: "New lead has been successfully added.",
    })
  }

  const handleAddContact = () => {
    loadLeads() // Reload leads to get updated data
    toast({
      title: "Contact Added",
      description: "New contact has been successfully added.",
    })
  }

  const handleAddInteraction = () => {
    loadLeads() // Reload leads to get updated data
    toast({
      title: "Interaction Logged",
      description: "New interaction has been successfully logged.",
    })
  }

  const openLeadDetails = (leadId: string) => {
    setCurrentLeadId(leadId)
    setShowLeadDetailsDialog(true)
  }

  return (
    <>
    <Header />
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leads Management</h1>
        <Button onClick={() => setShowAddLeadDialog(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Lead
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search leads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
          <CardDescription>Manage and view your restaurant leads</CardDescription>
        </CardHeader>
        <CardContent>
          <Leads 
            leads={filteredLeads} 
            onLeadClick={openLeadDetails}
            loading={loading}
          />
        </CardContent>
      </Card>

      <AddLeadDialog
        open={showAddLeadDialog}
        onOpenChange={setShowAddLeadDialog}
        onLeadAdded={handleAddLead}
      />

      <LeadDetailsDialog
        open={showLeadDetailsDialog}
        onOpenChange={setShowLeadDetailsDialog}
        leadId={currentLeadId}
        onAddContact={() => setShowAddContactDialog(true)}
        onAddInteraction={() => setShowAddInteractionDialog(true)}
      />

      <AddContactDialog
        open={showAddContactDialog}
        onOpenChange={setShowAddContactDialog}
        leadId={currentLeadId}
        onContactAdded={handleAddContact}
      />

      <AddInteractionDialog
        open={showAddInteractionDialog}
        onOpenChange={setShowAddInteractionDialog}
        leadId={currentLeadId}
        onInteractionAdded={handleAddInteraction}
      />
    </div>
    
    </>
    
  )
}

