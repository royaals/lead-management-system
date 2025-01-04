import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Badge } from "@/components/ui/badge"
  import { type Interaction } from "@/types/dashboard"
  
  interface RecentInteractionsCardProps {
    recentInteractions: Interaction[]
  }
  
  export function RecentInteractionsCard({ recentInteractions }: RecentInteractionsCardProps) {
    const getTypeColor = (type: Interaction['interaction_type']) => {
      const colors = {
        'Call': 'bg-blue-500',
        'Visit': 'bg-green-500',
        'Order': 'bg-purple-500'
      }
      return colors[type]
    }
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Interactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentInteractions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No recent interactions.</p>
          ) : (
            recentInteractions.map((interaction) => (
              <Card key={interaction.id}>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{interaction.restaurant_name}</h3>
                      <Badge className={getTypeColor(interaction.interaction_type)}>
                        {interaction.interaction_type}
                      </Badge>
                    </div>
                    <p className="text-sm">{interaction.notes}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(interaction.created_at).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
    )
  }
  
  