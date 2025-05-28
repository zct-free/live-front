import AdminLayout from "@/layouts/AdminLayout.vue"; // Import the main layout
import { useUserStore } from "@/store/user"; // Import user store
import type { RouteRecordRaw } from "vue-router"; // Type import
import { createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/Login/LoginView.vue"),
		meta: { requiresAuth: false }, // Simplified meta
	},
	{
		path: "/", // Parent route for all authenticated views
		component: AdminLayout, // Use AdminLayout as the component for this route
		meta: { requiresAuth: true },
		children: [
			{
				path: "/home", // Default child for root, effectively makes '/' the home path
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
					icon: "UserOutlined",
				},
			},
		],
	},
	// Fallback route for 404
	{ path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("@/views/NotFound.vue") },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, _from, next) => {
	const userStore = useUserStore();
	const isLoggedIn = userStore.isLoggedIn;

	// Check if any matched route record requires authentication
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !isLoggedIn) {
		// If auth is required and user is not logged in, redirect to login
		next({ name: "login", query: { redirect: to.fullPath } });
	} else if (to.name === "login" && isLoggedIn) {
		// If user is logged in and tries to access login page, redirect to home
		next({ name: "home" });
	} else if (isLoggedIn && !userStore.userInfo) {
		// If user is logged in but userInfo is not loaded, try to load it
		try {
			await userStore.checkAuth();
			next(); // Proceed to the requested route
		} catch (error) {
			// If auth check fails, logout and redirect to login
			// await userStore.logout();
			next({ name: "login", query: { redirect: to.fullPath } });
		}
	} else {
		// Otherwise, allow navigation
		next();
	}
});

export default router;
