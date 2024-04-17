import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { startNewNote } from "../../../store/journal";
import { addNewEmptyNote, savingNote, setActiveNote } from "../../../store/journal/journalSlice";
import { FirebaseDB } from "../../../firebase/config";


describe('Pruebas en Journal Thunks', () => { 
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );
    
    test('startNewNote debe de crear una nueva nota en blanco', async () => { 
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid } });
        
        await startNewNote()( dispatch, getState );

        expect( dispatch ).toHaveBeenCalledWith( savingNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrl: []
        }) );
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            id: expect.any( String ),
            date: expect.any( Number ),
            imageUrl: []
        }));

        //* Borrar de Firebase:
        const colectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
        const { docs } = await getDocs( colectionRef );

        await Promise.all( docs.map(({ ref }) => deleteDoc( ref ) ));

    }, 10000);
});