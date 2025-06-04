import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { SearchIcon } from "lucide-react";

const foundItems = [
  {
    id: 1,
    title: "Wallet",
    location: "Found near the library",
    date: "2024-01-20",
    image: "..//depth-7--frame-0.png",
    description: "Brown leather wallet containing student ID and bank cards",
  },
  {
    id: 2,
    title: "Backpack",
    location: "Found in the cafeteria",
    date: "2024-01-19",
    image: "..//depth-7--frame-0-1.png",
    description: "Black Nike backpack with laptop and notebooks inside",
  },
  {
    id: 3,
    title: "Notebook",
    location: "Found in the lecture hall",
    date: "2024-01-18",
    image: "..//depth-7--frame-0-2.png",
    description: "Blue spiral notebook with Physics notes",
  },
  {
    id: 4,
    title: "Keys",
    location: "Found near the main gate",
    date: "2024-01-17",
    image: "..//depth-7--frame-0-3.png",
    description: "Set of keys with a red keychain",
  },
];

export const FoundItemsList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Found Items</h2>

        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search found items..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1670d3]"
              />
            </div>
            <Button className="bg-[#1670d3]">Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foundItems.map((item) => (
            <Link key={item.id} to={`/found-items/${item.id}`}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div
                    className="h-48 bg-cover bg-center rounded-t-lg"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.location}</p>
                    <p className="text-gray-500 text-sm">Found on: {item.date}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};