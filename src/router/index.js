import Vue from 'vue'
import VueRouter from 'vue-router'

/*懒加载，提高性能*/
const Login = () => import('../views/Login')
const Home = () => import('../views/Home')
const Setting = () => import('../components/content/Setting')
const Appointment = () => import('../components/content/Appointment')
const Notify = () => import('../components/content/Notify')
const OnlineMedical = () => import('../components/content/OnlineMedical')
const Medicine = () => import('../components/content/OfSources/Medicine')
const Tool = () => import('../components/content/OfSources/Tool')
const In = () => import('../components/content/OfSources/In')
const Vaccine =  () => import('../components/content/Vaccine')
const PatientInfo = () => import('../components/content/OfPatient/PatientInfo')
const Pie = () => import('../components/content/Pie')

const Manager = () => import('../views/Manager')
const manageUsers = () => import('../components/content/OfManagement/manageUsers')
const manageMoney = () => import('../components/content/OfManagement/manageMoney')

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/management',
        name: '首页',
        component: Manager,
        children: [
            {
                path: '/manageUsers',
                name: '用户管理',
                component: manageUsers
            },
            {
                path: '/manageMoney',
                name: '账单管理',
                component: manageMoney
            }
        ]
    },
    {
        path: '/home',
        name: '首页',
        component: Home,
        children: [
            {
                path: '/setting',
                name: '个人设置',
                component: Setting
            },
            {
                path: '/appointment',
                name: '预约挂号',
                component: Appointment
            },
            {
                path: '/patientInfo',
                name: '病患就诊',
                component:PatientInfo
            },
            {
                path: '/notify',
                name: '信息通知',
                component: Notify
            },
            {
                path: '/online_medical',
                name: '在线就医',
                component: OnlineMedical
            },
            {
                path: '/medicine',
                name: '药物信息',
                component: Medicine
            },
            {
                path: '/tool',
                name: '器械信息',
                component: Tool
            },
            {
                path: '/inOut',
                name: '出入库',
                component: In
            },
            {
                path: '/vaccine',
                name: '疫苗接种',
                component:Vaccine
            },
            {
                path: '/pie',
                name:'就诊统计',
                component:Pie
            }

        ]
    }
]

const router = new VueRouter({
    routes,
    mode: "history"
})

export default router