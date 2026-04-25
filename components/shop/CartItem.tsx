"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, Droplets } from "lucide-react";
import { useCart, type CartItem as CartItemType } from "@/components/providers/CartProvider";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  // Mocked old price for discount
  const oldPrice = parseFloat(item.price) * 1.25;
  const currentPrice = parseFloat(item.price);

  return (
    <div
      className="flex gap-4 sm:gap-6 rounded-2xl border border-border bg-white dark:bg-zinc-900/80 p-3 sm:p-4 transition-all hover:shadow-sm"
      id={`cart-item-${item.productId}`}
    >
      {/* Thumbnail */}
      <Link href={`/products/${item.productId}`} className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-zinc-50 dark:bg-zinc-950/50 group block">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-2 mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 96px, 112px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Droplets className="h-8 w-8 text-amber-400/40" />
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col py-0.5">
        <div className="flex justify-between items-start gap-2 mb-1">
          <div>
            <h3 className="font-semibold text-sm sm:text-base leading-snug text-foreground hover:text-amber-600 transition-colors line-clamp-2">
              <Link href={`/products/${item.productId}`}>{item.name}</Link>
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {item.category === "INDUSTRIAL" ? "15 Ltr" : "1 Ltr"}
            </p>
          </div>
          
          <button
            id={`remove-item-${item.productId}`}
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-red-500 transition-colors flex items-center justify-center shrink-0 -mt-1 -mr-1"
            onClick={() => removeItem(item.productId)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base sm:text-lg text-foreground leading-none">
                ₹{(currentPrice * item.quantity).toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
                ₹{(oldPrice * item.quantity).toFixed(2)}
              </span>
            </div>
            <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mt-1">
              You save ₹{((oldPrice - currentPrice) * item.quantity).toFixed(2)}
            </span>
          </div>

          {/* Quantity controls */}
          <div className="flex items-center justify-between bg-green-600 text-white rounded-lg h-8 px-1 shadow-sm font-semibold border border-green-700 w-[84px] shrink-0">
            <button
              id={`decrease-qty-${item.productId}`}
              className="p-1 hover:bg-green-700 rounded transition-colors"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="text-sm px-1 text-center flex-1">
              {item.quantity}
            </span>
            <button
              id={`increase-qty-${item.productId}`}
              className="p-1 hover:bg-green-700 rounded transition-colors"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
