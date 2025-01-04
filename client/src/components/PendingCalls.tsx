import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { type PendingCall } from "@/types/dashboard"
  
  interface PendingCallsCardProps {
    pendingCalls: PendingCall[]
  }
  
  export function PendingCallsCard({ pendingCalls }: PendingCallsCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Today's Pending Calls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pendingCalls.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending calls for today.</p>
          ) : (
            pendingCalls.map((call) => (
              <Card key={call.id}>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold">{call.restaurant_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(call.interaction_date).toLocaleTimeString()}
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
  
  