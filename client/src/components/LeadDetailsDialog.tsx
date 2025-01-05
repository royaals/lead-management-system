import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Lead } from '@/types/lead'

interface LeadDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  leadId: string | null
  onAddContact: () => void
  onAddInteraction: () => void
}

export function LeadDetailsDialog({ open, onOpenChange, leadId, onAddContact, onAddInteraction }: LeadDetailsDialogProps) {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (leadId) {
      loadLeadDetails(leadId)
    }
  }, [leadId])

  const loadLeadDetails = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:3000/api/leads/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch lead details')
      }
      const data = await response.json()
      setLead(data)
    } catch (error) {
      console.error('Error loading lead details:', error)
      // You might want to show an error message to the user here
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500'
      case 'Active': return 'bg-green-500'
      case 'Inactive': return 'bg-gray-500'
      default: return 'bg-primary'
    }
  }

  if (!lead) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>{lead.restaurant_name}</DialogTitle>
          <DialogDescription>
            Lead details and management
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <Card>
              <CardContent className="space-y-2 pt-4">
                <p><strong>Address:</strong> {lead.address}</p>
                <p><strong>Contact:</strong> {lead.contact_number}</p>
                <p><strong>Status:</strong> <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge></p>
                <p><strong>KAM:</strong> {lead.assigned_kam}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contacts">
            <Card>
              <CardContent className="pt-4">
                <Button onClick={onAddContact} className="mb-4">Add Contact</Button>
                <ScrollArea className="h-[300px]">
                  {lead.contacts && lead.contacts.length > 0 ? (
                    lead.contacts.map((contact) => (
                      <Card key={contact.id} className="mb-2">
                        <CardContent className="p-4">
                          <h4 className="font-semibold">{contact.name}</h4>
                          <p><strong>Role:</strong> {contact.role}</p>
                          <p><strong>Phone:</strong> {contact.phone_number}</p>
                          <p><strong>Email:</strong> {contact.email}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p>No contacts found for this lead.</p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="interactions">
            <Card>
              <CardContent className="pt-4">
                <Button onClick={onAddInteraction} className="mb-4">Add Interaction</Button>
                <ScrollArea className="h-[300px]">
                  {lead.interactions && lead.interactions.length > 0 ? (
                    lead.interactions.map((interaction) => (
                      <Card key={interaction.id} className="mb-2">
                        <CardContent className="p-4">
                          <h4 className="font-semibold">{new Date(interaction.interaction_date).toLocaleDateString()} - {interaction.interaction_type}</h4>
                          <p>{interaction.notes}</p>
                          {interaction.follow_up_required && (
                            <Badge variant="outline" className="mt-2">Follow-up Required</Badge>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <p>No interactions found for this lead.</p>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

