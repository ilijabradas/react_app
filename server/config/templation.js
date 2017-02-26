import Templation from 'nodemailer-templation';
import path from 'path';

//Create our new new mailer object
let template = new Templation({
    from: 'bradas.ilija@gmail.com',
    templates: {
      activation: path.resolve(__dirname, '../templates/activation.html')
    },
    attachments: [
      {
        filename: 'react_logo.png',
        path: path.resolve(__dirname, '../templates/images/react_logo.png'),
        cid: 'react@logo'
      },
      {
        filename: 'node_logo.png',
        path: path.resolve(__dirname, '../templates/images/node_logo.png'),
        cid: 'node@logo'
      }
    ],
    transportOptions: {
      service: 'gmail',
      auth: {
        user: 'bradas.ilija@gmail.com',
        pass: 'uswq3509'
      }
    }
  });
  export default template;
