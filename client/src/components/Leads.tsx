
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Lead } from '../types/lead'

interface LeadsListProps {
  leads: Lead[]
  onLeadClick: (leadId: string) => void
  loading: boolean
}

export function Leads({ leads, onLeadClick, loading }: LeadsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-500'
      case 'Active': return 'bg-green-500'
      case 'Inactive': return 'bg-gray-500'
      default: return 'bg-primary'
    }
  }

  if (loading) {
    return <div className="text-center py-4">Loading leads...</div>
  }

  if (leads.length === 0) {
    return <div className="text-center py-4">No leads found.</div>
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="space-y-4">
        {leads.map(lead => (
          <Card key={lead.id} className="hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{lead.restaurant_name}</h3>
                  <p className="text-sm text-muted-foreground">{lead.address}</p>
                  <p className="text-sm">Contact: {lead.contact_number}</p>
                  <p className="text-sm">KAM: {lead.assigned_kam}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={getStatusColor(lead.status)}>{lead.status}</Badge>
                  <Button variant="outline" size="sm" onClick={() => onLeadClick(lead.id)}>
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

