import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from "../../helpers";
import { config } from '../../config/variables';

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.apiKeyCloud,
    api_secret: config.apiSecret,
    secure: true
});

describe('Pruebas en fileUpload', () => { 
    test('Debe de subir el archivo correctamente', async () => { 

        const imgUrl = 'https://scontent.flpb1-1.fna.fbcdn.net/v/t39.30808-6/434459130_1164777894703788_4010363022511755662_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3g_Drbgp7o4Ab4RELHc&_nc_ht=scontent.flpb1-1.fna&oh=00_AfB8ZErsavFa-MZYnu_g_iQ0LHT2qwmtVmUvt6IGcGWzMw&oe=661CA6B4';

        const response = await fetch( imgUrl );
        const blob = await response.blob();
        const file = new File([blob], 'foto.jpg');

        const url: string = await fileUpload( file );

        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length -1 ].replace('.jpg', '');

        const cloudResoponse = await cloudinary.api.delete_resources([ 'journal-app/' + imageId ], {
            resource_type: 'image',
        });
    });

    test('Debe de retornar null', async () => { 
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect( url ).toBe( null );
    });
});