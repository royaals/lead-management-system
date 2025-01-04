import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { type Lead } from "@/types/dashboard"
  
  interface LeadsListProps {
    leads: Lead[]
  }
  
  export function LeadsList({ leads }: LeadsListProps) {
    const getStatusColor = (status: Lead['status']) => {
      const colors = {
        'New': 'bg-blue-500',
        'Active': 'bg-green-500',
        'Inactive': 'bg-yellow-500'
      }
      return colors[status]
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {leads.length === 0 ? (
            <p className="text-sm text-muted-foreground">No leads found.</p>
          ) : (
            leads.map((lead) => (
              <Card key={lead.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{lead.restaurant_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {lead.address}
                      </p>
                      <p className="text-sm">
                        Contact: {lead.contact_number}
                      </p>
                      <p className="text-sm">
                        KAM: {lead.assigned_kam}
                      </p>
                    </div>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    )
  }
  
  