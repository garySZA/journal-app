import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Note } from "../../types";
import { useMemo } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ note }: { note: Note }) => {
    const { body, title } = note;
    const dispatch = useAppDispatch();
    
    const newTitle = useMemo(() => {
        return title.length > 17
                ? title.substring(0, 17) + '...'
                : title

    }, [ title ])
    
    const onClickNote = () => {

        dispatch( setActiveNote( note ) );
    }

    return (
        <ListItem 
            disablePadding
            onClick={ onClickNote }
        >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={ newTitle }/>
                    <ListItemText secondary={ body }/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
