import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/Login/LoginView.vue';
import ManagerListView from '../views/Manager/ManagerListView.vue';
import ManagerEditView from '../views/Manager/ManagerEditView.vue';
import ManagerCreateView from '../views/Manager/ManagerCreateView.vue';
import NotFoundView from '../views/Error/NotFoundView.vue';
import OrgListView from '@/views/Org/OrgListView.vue';
import OrgCretView from '@/views/Org/OrgCretView.vue';
import OrgEditView from '@/views/Org/OrgEditView.vue';
import PersonalListView from '@/views/Personal/PersonalListView.vue';
import PersonalEditView from '@/views/Personal/PersonalEditView.vue';
import CompyView from '@/views/Compy/CompyView.vue';
import TestMain from '@/views/Test/TestMainView.vue';
import ProdtMain from '@/views/Prodt/ProdtMainView.vue';
import PayMent from '@/views/PayMent/PayMent.vue';
import TestRsltOrgList from '@/views/TestRslt/TestRsltOrgListView.vue';
import TestRsltPayList from '@/views/TestRslt/TestRsltPayListView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/login',
			name: 'login',
			component: LoginView,
			props: true,
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../views/AboutView.vue'),
		},
		{
			path: '/manager',
			name: 'ManagerList',
			component: ManagerListView,
		},
		{
			path: '/manager/create',
			name: 'ManagerCreate',
			component: ManagerCreateView,
		},
		// {
		// 	path: '/manager/:mngrId',
		// 	name: 'ManagerEdit',
		// 	component: ManagerEditView,
		// 	props: true,
		// 	// props: route => ({ id: parseInt(route.params.id) }),
		// },
		{
			path: '/manager/:mngrId/edit',
			name: 'ManagerEdit',
			component: ManagerEditView,
			//props: route => ({ id: parseInt(route.params.id) }),
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFoundView,
			// props: route => ({ id: parseInt(route.params.id) }),
		},
		{
			path: '/Org/OrgList',
			name: 'OrgList',
			component: OrgListView,
			// props: route => ({ id: parseInt(route.params.id) }),
		},
		{
			path: '/Org/OrgCret',
			name: 'OrgCret',
			component: OrgCretView,
			// props: route => ({ id: parseInt(route.params.id) }),
		},
		{
			path: '/Org/OrgEdit',
			name: 'OrgEdit',
			component: OrgEditView,
			// props: route => ({ id: parseInt(route.params.id) }),
		},

		{
			path: '/Compy/Compy',
			name: 'Compy',
			component: CompyView,
			// props: route => ({ id: parseInt(route.params.id) }),
		},

		{
			path: '/personal/PersonalListView',
			name: 'PersonalList',
			component: PersonalListView,
			// props: route => ({ id: parseInt(route.params.id) }),
		},
		{
			path: '/personal/:persnId/edit',
			name: 'PersonalEdit',
			component: PersonalEditView,
			//props: route => ({ persnId: parseInt(route.params.persnId) }),
		},
		{
			path: '/Test/TestMain',
			name: 'TestMain',
			component: TestMain,
			//props: route => ({ persnId: parseInt(route.params.persnId) }),
		},
		{
			path: '/Prodt/ProdtMain',
			name: 'ProdtMain',
			component: ProdtMain,
			//props: route => ({ persnId: parseInt(route.params.persnId) }),
		},
		{
			path: '/PayMent/PayMent',
			name: 'PayMent',
			component: PayMent,
			//props: route => ({ persnId: parseInt(route.params.persnId) }),
		},
		{
			path: '/TestRslt/TestRsltOrgList',
			name: 'TestRsltOrgList',
			component: TestRsltOrgList,
			// props: route => ({ id: parseInt(route.params.id) }),
		},
		{
			path: '/TestRslt/TestRsltPayList',
			name: 'TestRsltPayList',
			component: TestRsltPayList,
			// props: route => ({ id: parseInt(route.params.id) }),
		},
	],
});

export default router;
