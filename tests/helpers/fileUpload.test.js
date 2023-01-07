import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name:'dsummnyrd',
    api_key:'973894187981928',
    api_secret: 'vK-RNmNB9NLscirxtVE6WfM5Ie8',
    secure: true
});

describe('Pruebas en fileUpload', () => { 
    test('Debe subir el archivo correctamente a Cloudinary', async() => {

        const imageURL = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png';
        const resp = await fetch( imageURL );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // console.log(url);
        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.png','');
        
        const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        });
        // console.log({cloudResp});

    }); 

    test('Debe retornar null', async() => {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect( url ).toBe(null)
        ;   
    });
});