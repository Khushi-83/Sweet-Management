"use client"

import { useState } from "react"
import type { Sweet } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Package } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useSweets } from "@/contexts/sweets-context"
import { useToast } from "@/hooks/use-toast"
import { EditSweetDialog } from "./edit-sweet-dailog"

interface AdminSweetCardProps {
  sweet: Sweet
}

export function AdminSweetCard({ sweet }: AdminSweetCardProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const { deleteSweet } = useSweets()
  const { toast } = useToast()

  const handleDelete = () => {
    deleteSweet(sweet.id)
    toast({
      title: "Sweet deleted",
      description: `${sweet.name} has been removed from inventory`,
    })
    setIsDeleteOpen(false)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            <img
              src="/sweets/candy.png"
              alt="Candy"
              width={300}
              height={300}
              className="object-cover"
            />
                  
            {sweet.quantity === 0 && (
              <Badge variant="destructive" className="absolute top-2 right-2">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight">{sweet.name}</h3>
            <Badge variant="outline">{sweet.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{sweet.description}</p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-primary">${sweet.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-sm">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className={sweet.quantity < 10 ? "text-destructive font-medium" : "text-muted-foreground"}>
                {sweet.quantity} in stock
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Button variant="outline" className="flex-1 gap-2 bg-transparent" onClick={() => setIsEditOpen(true)}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" className="flex-1 gap-2" onClick={() => setIsDeleteOpen(true)}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {sweet.name} from your inventory. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditSweetDialog sweet={sweet} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </>
  )
}
