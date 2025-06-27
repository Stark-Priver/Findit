import { FileTextIcon, SearchIcon, UsersIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import axios from "axios";

// Data for the "How It Works" cards
const howItWorksData = [
  {
    icon: <SearchIcon className="w-6 h-6" />,
    title: "Search Found Items",
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


interface FoundItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  dateFound: string;
  status: string;
  finder: {
    name: string;
    email: string;
  };
  images?: string[];
}

interface LostItem {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  dateLost: string;
  status?: string;
  images?: string[];
}

export const HowItWorksSection = (): JSX.Element => {
  const [recentItems, setRecentItems] = useState<FoundItem[]>([]);
  const [recentLostItems, setRecentLostItems] = useState<LostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingLost, setLoadingLost] = useState(true);

  useEffect(() => {
    fetchRecentItems();
    fetchRecentLostItems();
  }, []);

  const fetchRecentItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items/found");
      // Sort by dateFound descending and take the 4 most recent
      const sorted = response.data.sort((a: FoundItem, b: FoundItem) => new Date(b.dateFound).getTime() - new Date(a.dateFound).getTime());
      setRecentItems(sorted.slice(0, 4));
    } catch (error) {
      setRecentItems([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentLostItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items/lost");
      // Sort by dateLost descending and take the 4 most recent
      const sorted = response.data.sort((a: LostItem, b: LostItem) => new Date(b.dateLost).getTime() - new Date(a.dateLost).getTime());
      setRecentLostItems(sorted.slice(0, 4));
    } catch (error) {
      setRecentLostItems([]);
    } finally {
      setLoadingLost(false);
    }
  };

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
                <Link to="/report-lost-item">
                  <Button className="h-12 bg-[#1670d3] text-[#f7f9fc] font-bold">
                    Report Lost Item
                  </Button>
                </Link>
                <Link to="/found-items">
                  <Button
                    variant="outline"
                    className="h-12 bg-[#e8edf2] text-[#0c141c] font-bold border-none"
                  >
                    Search Found Items
                  </Button>
                </Link>
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
          {loading ? (
            <div className="col-span-4 text-center py-8">Loading...</div>
          ) : recentItems.length === 0 ? (
            <div className="col-span-4 text-center py-8 text-gray-500">No recently found items.</div>
          ) : (
            recentItems.map((item) => (
              <Card key={item._id} className="bg-transparent border-none">
                <CardContent className="flex flex-col gap-4 p-0">
                  <Link to={`/found-items/${item._id}`}>
                    <div
                      className="w-full h-[161px] rounded-lg bg-cover bg-center border border-[#e8edf2] hover:shadow-lg transition-shadow"
                      style={{ backgroundImage: `url(${(item.images && item.images.length > 0) ? item.images[0] : '/vector---0-3.svg'})` }}
                    />
                  </Link>
                  <div className="flex flex-col">
                    <h3 className="font-medium text-[#0c141c] text-base tracking-normal leading-6 font-sans">
                      {item.title}
                    </h3>
                    <p className="font-normal text-[#4f7096] text-sm tracking-normal leading-[21px] font-sans">
                      {item.location}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Found on: {new Date(item.dateFound).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Link to={`/found-items/${item._id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {item.status === 'available' && (
                      <Link to={`/claim-item/${item._id}`}>
                        <Button size="sm" className="bg-[#1670d3]">
                          Claim Item
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Recently Reported Lost Items Section */}
        <div className="pt-8 pb-3">
          <h2 className="font-bold text-[#0c141c] text-[22px] tracking-normal leading-7 font-sans">
            Recently Reported Lost Items
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-4">
          {loadingLost ? (
            <div className="col-span-4 text-center py-8">Loading...</div>
          ) : recentLostItems.length === 0 ? (
            <div className="col-span-4 text-center py-8 text-gray-500">No recently reported lost items.</div>
          ) : (
            recentLostItems.map((item) => (
              <Card key={item._id} className="bg-transparent border-none">
                <CardContent className="flex flex-col gap-4 p-0">
                  <Link to={`/lost-items/${item._id}`}>
                    <div
                      className="w-full h-[161px] rounded-lg bg-cover bg-center border border-[#e8edf2] hover:shadow-lg transition-shadow"
                      style={{ backgroundImage: `url(${(item.images && item.images.length > 0) ? item.images[0] : '/vector---0-3.svg'})` }}
                    />
                  </Link>
                  <div className="flex flex-col">
                    <h3 className="font-medium text-[#0c141c] text-base tracking-normal leading-6 font-sans">
                      {item.title}
                    </h3>
                    <p className="font-normal text-[#4f7096] text-sm tracking-normal leading-[21px] font-sans">
                      {item.location}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">Lost on: {new Date(item.dateLost).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Link to={`/lost-items/${item._id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};