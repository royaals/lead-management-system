import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Users, LineChart, Calendar, MessageSquare, ArrowRight } from 'lucide-react'
import { Link } from "react-router-dom"
import Header from "./Header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <Header />
      {/* Main Content */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container px-4 py-12 md:py-24">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Next Generation <span className="text-primary">Lead Management</span> for Restaurant KAMs
              </h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Streamline your key account management with our comprehensive lead tracking and relationship management system.
                Built specifically for restaurant industry professionals.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/dashboard" className="text-lg font-medium hover:text-primary">
                <Button size="lg">
                  Try it free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </Link>
               
               
              </div>
            </div>
           
          </div>
        </section>

        {/* Products Section */}
        <section className="border-t bg-gray-50/50">
          <div className="container px-4 py-12 md:py-24">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Highlighted Products</h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
                Comprehensive tools designed specifically for restaurant key account managers
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Efficiently track and manage leads from initial contact through conversion
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Account Manager</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Centralize account information and track performance metrics
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Hub</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Generate insights from your account portfolio with advanced analytics
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container px-4 py-12 md:py-24">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Key Features</h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
              Everything you need to manage your key restaurant accounts effectively
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Contact Management",
                description: "Keep track of all your restaurant contacts and communication history",
                icon: Users,
              },
              {
                title: "Performance Tracking",
                description: "Monitor account performance metrics and identify growth opportunities",
                icon: LineChart,
              },
              {
                title: "Meeting Scheduler",
                description: "Schedule and manage client meetings and follow-ups",
                icon: Calendar,
              },
              {
                title: "Communication Hub",
                description: "Centralize all client communications in one place",
                icon: MessageSquare,
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container flex h-16 items-center justify-between px-4">
          <p className="text-sm text-gray-500">© 2024 LMS. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-primary">
              Privacy
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-primary">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

