import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { type Lead } from "@/types/dashboard"
  import { ScrollArea } from "@/components/ui/scroll-area"
  
  interface LeadsListProps {
    leads: Lead[]
    className?: string
  }
  
  export function LeadsList({ leads, className }: LeadsListProps) {
    const getStatusColor = (status: Lead['status']) => {
      const colors = {
        'New': 'bg-blue-500',
        'Active': 'bg-green-500',
        'Inactive': 'bg-yellow-500'
      }
      return colors[status]
    }
  
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <CardContent className="space-y-4 p-4">
            {leads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads found.</p>
            ) : (
              leads.map((lead) => (
                <Card key={lead.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 min-w-0 flex-1">
                        <h3 className="font-semibold truncate">{lead.restaurant_name}</h3>
                        <p className="text-sm text-muted-foreground break-words">
                          {lead.address}
                        </p>
                        <p className="text-sm break-words">
                          Contact: {lead.contact_number}
                        </p>
                        <p className="text-sm break-words">
                          KAM: {lead.assigned_kam}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(lead.status)} shrink-0`}>
                        {lead.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    )
  }
  
  