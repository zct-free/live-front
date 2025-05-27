import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // Type import
import { checkAuth } from "../services/authService"; // Changed to relative path
import AdminLayout from "@/layouts/AdminLayout.vue"; // Import the main layout

const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/LoginView.vue"),
		meta: { requiresAuth: false }, // Simplified meta
	},
	{
		path: "/", // Parent route for all authenticated views
		component: AdminLayout, // Use AdminLayout as the component for this route
		meta: { requiresAuth: true },
		children: [
			{
				path: "", // Default child for root, effectively makes '/' the home path
				name: "home",
				component: () => import("@/views/HomeView.vue"),
				meta: {
					title: "Home",
					icon: "HomeOutlined", // Keep existing icon for sidebar
				},
			},
			{
				path: "sub-page",
				name: "sub-page",
				component: () => import("@/views/SubPageView.vue"), // Ensure this view exists
				meta: {
					title: "Sub Page" /*, icon: "SomeIcon" */,
                    icon: "UserOutlined"
				},
			},
			{
				path: "canvas",
				name: "canvas",
				component: () => import("@/views/canvas.vue"), // Ensure this view exists
				meta: {
					title: "Canvas",
					icon: "CanvasIcon"
				},
			},
			

			// Add other routes that use AdminLayout here
		],
	},
	// Fallback route for 404
	{ path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const isLoggedIn = checkAuth();

	// Check if any matched route record requires authentication
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !isLoggedIn) {
		// If auth is required and user is not logged in, redirect to login
		next({ name: "login", query: { redirect: to.fullPath } });
	} else if (to.name === "login" && isLoggedIn) {
		// If user is logged in and tries to access login page, redirect to home
		next({ name: "home" });
	} else {
		// Otherwise, allow navigation
		next();
	}
});

export default router;
