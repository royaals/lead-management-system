//@ts-nocheck

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

import { Button } from "@/components/ui/button"
import Header from '@/components/Header'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  restaurant_name: z.string().min(2, {
    message: "Restaurant name must be at least 2 characters.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  contact_number: z.string().min(5, {
    message: "Contact number must be at least 5 characters.",
  }),
  status: z.enum(["New", "Active", "Inactive"]),
  assigned_kam: z.string().min(2, {
    message: "Assigned KAM must be at least 2 characters.",
  }),
})

export default function CreateLeadPage() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      restaurant_name: "",
      address: "",
      contact_number: "",
      status: "New",
      assigned_kam: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('https://lms-production-e0c2.up.railway.app/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          title: "Lead created",
          description: "New lead has been successfully added.",
        })
        navigate('/dashboard')
      } else {
        throw new Error('Failed to add lead')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create lead. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
    <Header />
    <div className="container mx-auto py-10">
    
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Lead</CardTitle>
        <CardDescription>Add a new restaurant lead to the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="restaurant_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restaurant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter restaurant name" {...field} />
                  </FormControl>
                  <FormDescription>
                    The official name of the restaurant.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter restaurant address" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    The full address of the restaurant.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The primary contact number for the restaurant.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The current status of the lead.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assigned_kam"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned KAM</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter assigned KAM" {...field} />
                  </FormControl>
                  <FormDescription>
                    The Key Account Manager assigned to this lead.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Creating..." : "Create Lead"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  </div>
    </>
    
  )
}

