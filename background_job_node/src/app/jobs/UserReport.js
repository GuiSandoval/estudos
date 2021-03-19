import Mail from '../lib/Mail';

export default {
    key: 'UserReport',
    // options: {
    //     delay: 1000,
    // },
    async handle({ data }) {
        const { user } = data;
        // console.log(user);
        console.log("UserReport Executado");
    },
};