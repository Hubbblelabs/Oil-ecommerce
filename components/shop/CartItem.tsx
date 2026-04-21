"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type CartItem as CartItemType } from "@/components/providers/CartProvider";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  return (
    <div
      className="flex gap-4 rounded-xl border border-border/60 bg-card/60 p-4 backdrop-blur-sm"
      id={`cart-item-${item.productId}`}
    >
      {/* Thumbnail */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Droplets className="h-8 w-8 text-amber-400/60" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <p className="font-semibold leading-tight">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.category}</p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center gap-2">
            <Button
              id={`decrease-qty-${item.productId}`}
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              id={`increase-qty-${item.productId}`}
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Line total + remove */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-amber-600">
              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
            </span>
            <Button
              id={`remove-item-${item.productId}`}
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => removeItem(item.productId)}
              aria-label={`Remove ${item.name} from cart`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
