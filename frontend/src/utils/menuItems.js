import {home, doctor, mental, medical} from '../utils/Icons'
export const menuItems = [
    {
        id: 1,
        title: 'Home',
        icon: home,
        link: '/dashboard',
    },
    {
        id: 2,
        title: "Symptom Analysis",
        icon: medical,
        link: "/SymptomAnalysis",
    },
    {   
        id: 3,
        title: "Mind-Bot",
        icon: mental,
        link: '/MentalWellness',
    },
    {
        id: 4,
        title: "Consult Doctor",
        icon: doctor,
        link: '/ConsultDoctor',
    }
]