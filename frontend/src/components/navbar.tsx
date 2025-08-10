"use client";

import { useStacks } from "@/hooks/use-stacks";
import { abbreviateAddress } from "@/lib/stx-utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Plus, Home, LogOut } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const { userData, connectWallet, disconnectWallet, handleMintOne } =
    useStacks();
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}

        <div className="hidden md:flex items-center space-x-1">
          {/* Navigation Links */}
          <Link
            href="/"
            className="flex items-center text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
          >
            <Image
              src={"/pemiluchain.png"}
              alt="logo"
              width={50}
              height={50}
              className="object-cover"
            />
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              PemiluChain
            </span>
          </Link>

          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/create" className="flex items-center gap-2">
              Create Proposal
            </Link>
          </Button>
        </div>

        {/* Wallet Section */}
        <div className="flex items-center gap-3">
          {userData ? (
            <div className="flex items-center gap-2">
              {/* Address Badge */}
              <Badge
                variant="secondary"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5"
              >
                <Wallet className="h-3 w-3" />
                {abbreviateAddress(userData.profile.stxAddress.testnet)}
              </Badge>

              {/* Mint Button */}
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() =>
                  handleMintOne(userData.profile.stxAddress.testnet)
                }
              >
                Mint One
              </Button>

              {/* Disconnect Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={disconnectWallet}
                className="text-muted-foreground hover:text-foreground border-muted-foreground/20 hover:border-muted-foreground/40 bg-transparent cursor-pointer"
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Disconnect</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Wallet className="h-4 w-4" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t bg-background/95 backdrop-blur">
        <div className="container flex items-center justify-center gap-1 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
