import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";

// Importing category and menu constants
import { categories } from "../utils/constants";

// Global context for app state
import { Context } from "../context/contextApi";

const LeftNav = () => {
    // Using context to get selected categories and mobile menu state
    const { selectedCategories, setSelectedCategories, mobileMenu } = useContext(Context);

    // Use navigate hook for navigation
    const navigate = useNavigate();

    // Handle category selection or home/menu click
    const clickHandler = (name, type) => {
        switch (type) {
            case "category":
                // Set the selected category for filtering
                return setSelectedCategories(name);
            case "home":
                // Set home as the selected category
                return setSelectedCategories(name);
            case "menu":
                return false;
            default:
                break;
        }
    }

    return (
        <div
            className={`md:block w-[240px] overflow-y-auto h-full py-4 bg-black absolute md:relative z-10 translate-x-[-240px] md:translate-x-0 transition-all 
                ${mobileMenu ? "translate-x-0" : ""}`
            }
        >
            <div className="flex px-5 flex-col">
                {
                    // Iterate over categories to render LeftNavMenuItem for each
                    categories?.map((item) => {
                        return (
                            <div key={item.name}>
                                <LeftNavMenuItem 
                                    text={item.type === "home" ? "Home" : item.name} 
                                    icon={item.icon}
                                    // On click, update selected category and navigate to home
                                    action={() => {
                                        clickHandler(item.name, item.type);
                                        navigate("/")
                                    }}
                                    // Highlight the active category
                                    className={`${selectedCategories === item.name ? "bg-white/[0.15]" : ""}`}
                                />

                                {
                                    // If the item has a divider, render a horizontal line
                                    item.divider && (
                                        <hr className="my-5 border-white/[0.2]" />
                                    )
                                }
                            </div>
                        )
                    })
                }
                <hr className="my-5 border-white/[0.2]" />
                <div className="text-white/[0.5] text-[12px]">
                    Made with ❤️ by Suraj Adhikari
                </div>
            </div>
        </div>
    )
}

export default LeftNav