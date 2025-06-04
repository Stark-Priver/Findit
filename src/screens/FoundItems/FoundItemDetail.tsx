import React from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const foundItems = [
  {
    id: "1",
    title: "Wallet",
    location: "Found near the library",
    date: "2024-01-20",
    image: "..//depth-7--frame-0.png",
    description: "Brown leather wallet containing student ID and bank cards",
    finderName: "John Doe",
    contactEmail: "john.doe@must.ac.tz",
  },
  {
    id: "2",
    title: "Backpack",
    location: "Found in the cafeteria",
    date: "2024-01-19",
    image: "..//depth-7--frame-0-1.png",
    description: "Black Nike backpack with laptop and notebooks inside",
    finderName: "Jane Smith",
    contactEmail: "jane.smith@must.ac.tz",
  },
];

export const FoundItemDetail = () => {
  const { id } = useParams();
  const item = foundItems.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Item Not Found</h2>
          <Link to="/found-items">
            <Button className="bg-[#1670d3]">Back to Found Items</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link to="/found-items" className="text-[#1670d3] hover:underline mb-6 block">
          ← Back to Found Items
        </Link>

        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700">Description</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Location Found</h3>
                  <p className="text-gray-600">{item.location}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Date Found</h3>
                  <p className="text-gray-600">{item.date}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Found By</h3>
                  <p className="text-gray-600">{item.finderName}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700">Contact Information</h3>
                  <p className="text-gray-600">{item.contactEmail}</p>
                </div>

                <Button className="w-full bg-[#1670d3]">
                  Claim This Item
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};