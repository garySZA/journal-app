import { ReactNode } from "react";
import { Box, Toolbar } from "@mui/material";
import { Navbar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Box sx={{ display:'flex' }}>
            
            {/* Navbar */}
            <Navbar drawerWidth={ drawerWidth }/>

            {/* Slidebar */}
            <SideBar drawerWidth={ drawerWidth }/>

            <Box
                component='main'
                sx={{ flexGrow: 1, p: 3 }}
            >
                {/* Toolbar */}
                <Toolbar />

                { children }

            </Box>
        </Box>
    )
}
