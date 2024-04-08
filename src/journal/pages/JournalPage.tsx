import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import { JournalLayout } from "../layout/JournalLayout";
import { NoteView, NothingSelectedView } from "../view";
import { startNewNote } from "../../store/journal";
import { RootState } from "../../store";

export const JournalPage = () => {
    const dispatch = useAppDispatch();
    const { isSaving, active } = useAppSelector(( state: RootState ) => state.journal);

    const onClickNewNote = () => {
        dispatch( startNewNote() );
    }
    
    return (
        <JournalLayout>
            {/* <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolorem maxime at beatae voluptas magnam fuga incidunt? Nisi, tempore aspernatur.</Typography> */}

            {
                !!active
                ? ( <NoteView /> )
                : ( <NothingSelectedView /> )
            }

            <IconButton
                onClick={ onClickNewNote }
                disabled={ isSaving }
                size='large'
                sx={{
                    color: 'white',
                    backgroundColor: 'error.main',
                    ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                    position: 'fixed',
                    right: 50,
                    bottom: 50
                }}
            >
                <AddOutlined sx={{ fontSize: 30 }}/>
            </IconButton>

        </JournalLayout>
    )
}
