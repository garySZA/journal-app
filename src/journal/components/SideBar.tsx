import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks/reduxHooks";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth }: { drawerWidth: number }) => {
    const { displayName } = useAppSelector(( state: RootState ) => state.auth);
    const { notes } = useAppSelector(( state: RootState ) => state.journal);

    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant="permanent"
                open
                sx={{ 
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Typography variant='h6' noWrap component='div'>
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map( note => (
                            <SideBarItem key={ note.id } note={ note }/>
                        ))
                    }
                </List>
            </Drawer>
        </Box>
    )
}
