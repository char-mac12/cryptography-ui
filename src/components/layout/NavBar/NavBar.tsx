import { useState } from "react"

import NavItem from "./NavItem"
import './NavBar.css'

interface NavBarProps {
    selectedPage: string
    setSelectedPage: (page: string) => void
}

const navItems = [
    {
        title: "Cipher Catalog",
        description: "Browse All"
    },
    {
        title: "Frequency Analysis",
        description: "Statistical Tools"
    },
    {
        title: "Reference",
        description: "Tables & History"
    }
]

function NavBar(props: NavBarProps) {
    return (
        <div className="navigation-bar">
            {navItems.map((item) => (
                <NavItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    isSelected={props.selectedPage === item.title}
                    onClick={() => props.setSelectedPage(item.title)}
                />
            ))}
        </div>
    )
}

export default NavBar