import React from "react";
import { GoHomeFill } from "react-icons/go";
import { PiTelevisionFill } from "react-icons/pi";
import { MdLocalMovies } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";


export const navigation = [
    {
        label: "TV Show",
        href: 'tv',
        icon: <PiTelevisionFill />
    },
    {
        label: "Movies",
        href: 'movie',
        icon: <MdLocalMovies />
    },
]

export const mobileNavigation = [
    {
        label: "Home",
        href: "/",
        icon: <GoHomeFill />
    },
    ...navigation,
    {
        label: "search",
        href: "/search",
        icon: <IoSearchOutline/>
    }
]
