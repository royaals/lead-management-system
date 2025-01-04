import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { type Lead } from "@/types/dashboard"
  
  interface StatsCardsProps {
    leads: Lead[]
  }
  
  export function StatsCards({ leads }: StatsCardsProps) {
    const stats = [
      {
        title: "Total Leads",
        value: leads.length,
        className: "bg-primary/10"
      },
      {
        title: "Active Leads",
        value: leads.filter(lead => lead.status === 'Active').length,
        className: "bg-green-500/10"
      },
      {
        title: "New Leads",
        value: leads.filter(lead => lead.status === 'New').length,
        className: "bg-blue-500/10"
      },
      {
        title: "Inactive Leads",
        value: leads.filter(lead => lead.status === 'Inactive').length,
        className: "bg-yellow-500/10"
      }
    ]
  
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className={stat.className}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }
  
  