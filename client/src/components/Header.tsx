
import { Button } from "@/components/ui/button"

import { ChefHat } from 'lucide-react'
import { Link } from "react-router-dom"
const Header = () => {
  return (
    <div>
          <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
           
            <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LMS</span>
          </div>
            
          
          <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium ">
            <Button size="sm"> Home</Button>
             
            </Link>
            <Link to="/dashboard" className="text-sm font-medium ">
            <Button size="sm"> Dashboard</Button>
             
            </Link>
            <Link to="/createlead" className="text-sm font-medium ">
            <Button size="sm"> Create Lead</Button>
             
            </Link>
            <Link to="/leads" className="text-sm font-medium ">
              <Button size="sm">Leads</Button>
            </Link>
              
           
          </nav>
          
        </div>
      </header>
    </div>
  )
}

export default Header
