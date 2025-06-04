import { FileTextIcon, SearchIcon, UsersIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

// Data for the "How It Works" cards
const howItWorksData = [
  {
    icon: <SearchIcon className="w-6 h-6" />,
    title: "SearchIcon Found Items",
    description:
      "Browse our database of found items, with detailed descriptions and contact information for the finders.",
  },
  {
    icon: <FileTextIcon className="w-6 h-6" />,
    title: "Report Lost Items",
    description:
      "Easily report your lost item with a description, location, and contact details. Our system will notify you if a match is found.",
  },
  {
    icon: <UsersIcon className="w-6 h-6" />,
    title: "Connect with Finders",
    description:
      "If someone finds your item, you'll be notified and can connect with the finder to arrange its return.",
  },
];

// Data for the "Recently Found Items" section
const recentlyFoundItems = [
  {
    image: "..//depth-7--frame-0.png",
    title: "Wallet",
    location: "Found near the library",
  },
  {
    image: "..//depth-7--frame-0-1.png",
    title: "Backpack",
    location: "Found in the cafeteria",
  },
  {
    image: "..//depth-7--frame-0-2.png",
    title: "Notebook",
    location: "Found in the lecture hall",
  },
  {
    image: "..//depth-7--frame-0-3.png",
    title: "Keys",
    location: "Found near the main gate",
  },
];

export const HowItWorksSection = (): JSX.Element => {
  return (
    <section className="flex justify-center px-4 md:px-10 lg:px-40 py-5 w-full">
      <div className="flex flex-col max-w-[960px] w-full">
        {/* Hero Banner */}
        <div className="w-full mb-10">
          <div className="relative w-full h-[480px] rounded-lg overflow-hidden [background:linear-gradient(90deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.4)_100%),url(..//depth-6--frame-0.png)_50%_50%_/_cover]">
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              <div className="max-w-[896px] flex flex-col gap-2 text-center">
                <h1 className="font-black text-white text-4xl md:text-5xl tracking-[-2.00px] leading-[60px] font-sans">
                  Find What&#39;s Yours, Report What&#39;s Lost
                </h1>
                <p className="font-normal text-white text-base tracking-normal leading-6 font-sans">
                  Mbeya University of Science and Technology&#39;s official
                  platform for reporting lost items and searching for found
                  items on campus. Reconnecting students and staff with their
                  belongings.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <Button className="h-12 bg-[#1670d3] text-[#f7f9fc] font-bold">
                  Report Lost Item
                </Button>
                <Button
                  variant="outline"
                  className="h-12 bg-[#e8edf2] text-[#0c141c] font-bold border-none"
                >
                  SearchIcon Found Items
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="flex flex-col gap-10 py-10">
          <div className="flex flex-col gap-4">
            <h2 className="font-black text-[#0c141c] text-4xl tracking-[-1.00px] leading-[45px] font-sans">
              How It Works
            </h2>
            <p className="font-normal text-[#0c141c] text-base tracking-normal leading-6 font-sans">
              Our platform simplifies the process of reporting lost items and
              searching for found ones. Here&#39;s how you can use it:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {howItWorksData.map((item, index) => (
              <Card key={index} className="bg-[#f7f9fc] border-[#d1dbe8]">
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="w-6 h-6">{item.icon}</div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-[#0c141c] text-base tracking-normal leading-5 font-sans">
                      {item.title}
                    </h3>
                    <p className="font-normal text-[#4f7096] text-sm tracking-normal leading-[21px] font-sans">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recently Found Items Section */}
        <div className="pt-5 pb-3">
          <h2 className="font-bold text-[#0c141c] text-[22px] tracking-normal leading-7 font-sans">
            Recently Found Items
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4">
          {recentlyFoundItems.map((item, index) => (
            <Card key={index} className="bg-transparent border-none">
              <CardContent className="flex flex-col gap-4 p-0">
                <div
                  className="w-full h-[161px] rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="flex flex-col">
                  <h3 className="font-medium text-[#0c141c] text-base tracking-normal leading-6 font-sans">
                    {item.title}
                  </h3>
                  <p className="font-normal text-[#4f7096] text-sm tracking-normal leading-[21px] font-sans">
                    {item.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
