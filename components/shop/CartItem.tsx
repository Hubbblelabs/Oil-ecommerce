"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type CartItem as CartItemType } from "@/components/providers/CartProvider";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div
      className="flex gap-6 rounded-3xl border border-border/40 bg-zinc-50 dark:bg-zinc-900/50 p-4 transition-all hover:bg-white dark:hover:bg-zinc-900 hover:shadow-sm"
      id={`cart-item-${item.productId}`}
    >
      {/* Thumbnail */}
      <Link href={`/products/${item.productId}`} className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10 group cursor-pointer block">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="128px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Droplets className="h-10 w-10 text-amber-400/60" />
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col py-1 pb-2">
        <div className="flex justify-between items-start gap-4 mb-1">
          <div>
            <h3 className="font-semibold text-lg leading-tight text-foreground hover:text-amber-600 transition-colors">
              <Link href={`/products/${item.productId}`}>{item.name}</Link>
            </h3>
            <p className="text-sm text-muted-foreground mt-1 capitalize">{item.category.toLowerCase()}</p>
          </div>
          
          <Button
            id={`remove-item-${item.productId}`}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1 shrink-0"
            onClick={() => removeItem(item.productId)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-auto flex items-end justify-between">
          {/* Quantity controls */}
          <div className="flex items-center gap-1 bg-background border border-border/60 rounded-xl p-1 shadow-sm">
            <Button
              id={`decrease-qty-${item.productId}`}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-muted"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <Button
              id={`increase-qty-${item.productId}`}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-muted"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Line total */}
          <div className="text-right">
            <span className="font-bold text-xl text-foreground">
              ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">₹{parseFloat(item.price).toFixed(2)} each</p>
          </div>
        </div>
      </div>
    </div>
  );
}
