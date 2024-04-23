/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import axiosInstance from "@/axios.config";
import Header from "@/components/Header";

import { useAuth } from "@/context/authContext";
import { withAuth } from "@/hocs/withAuth";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";

import Carousel from "react-multi-carousel";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let query = "/user/list?category=" + user.sondageChoice + "&id=" + user._id;

    axiosInstance
      .get(query)
      .then((res) => setData(res.data))
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <Header />

      {Array.isArray(data) && data.length > 0 ? (
        <Carousel
          responsive={responsive}
          className="p-10 md:p-5 sm:p-2"
          arrows={true}
        >
          {data.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-3 rounded-lg border border-slate-200 h-full mr-10"
            >
              <Image
                src={item.img.url}
                alt="user img"
                height={500}
                width={100}
                className="h-[calc(100%-100px)] w-full"
              />
              <p className="font-extrabold text-lg">{item.name}</p>
              <a
                href={"https://wa.me/" + item.whatsappNumber}
                className="bg-blue-800 text-white text-center block rounded-md p-2"
              >
                {" "}
                Contacter sur whatsapp
              </a>
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="mt-10 text-center font-bold text-lg">
          Vous êtes seul pour le moment dans cette categorie vous serez notifier
          par email quand il aura des inscriptions
        </p>
      )}
    </div>
  );
};

export default withAuth(Dashboard);

// screens: {
//     xl: { max: "1280px" },
//     lg: { max: "1024px" },
//     mlg: { max: "1050px" },
//     md: { max: "968px" },
//     sm: { max: "640px" },
//   },
