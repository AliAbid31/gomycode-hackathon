import { useEffect, useState } from 'react';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import { AppProvider, useApp } from './context/AppContext';
import { MarketingLayout } from './layouts/MarketingLayout';
import { OverviewPage } from './pages/marketing/OverviewPage';
import { BrandsPage } from './pages/marketing/BrandManagementPage';
import { AIStudioPage } from './pages/marketing/AIStudioPage';
import { CalendarPage } from './pages/marketing/CalendarPage';
import { CampaignsPage } from './pages/marketing/CampaignsPage';
import { PerformancePage } from './pages/marketing/PerformancePage';
import { CreativeTeamPage } from './pages/marketing/CreativeTeamPage';
import { AssetHubPage } from './pages/marketing/AssetHubPage';
import { CreativeLayout } from './layouts/CreativeLayout';
import { CreativeDashboardPage } from './pages/creative/CreativeDashboardPage';
import { MyTasksPage } from './pages/creative/MyTasksPage';
import { CreativeBriefsPage } from './pages/creative/CreativeBriefsPage';
import { ReviewRevisionsPage } from './pages/creative/ReviewRevisionsPage';
import { CompletedWorkPage } from './pages/creative/CompletedWorkPage';

type Route = 'login' | 'signup' | 'forgot-password' | 'overview' | 'brands' | 'campaigns' | 'ai-studio' | 'calendar' | 'performance' | 'creative-team' | 'assets' | 'creative-dashboard' | 'creative-tasks' | 'creative-briefs' | 'creative-reviews' | 'creative-completed';
type NavigationRoute = Route | 'forgot-password';

function routeFromPath(pathname: string): Route {
	const path = pathname.toLowerCase();
	if (path === '/signup') return 'signup';
	if (path === '/forgot-password') return 'forgot-password';
	if (path === '/marketing/overview') return 'overview';
	if (path === '/marketing/brands') return 'brands';
	if (path === '/marketing/campaigns') return 'campaigns';
	if (path === '/marketing/ai-studio') return 'ai-studio';
	if (path === '/marketing/calendar') return 'calendar';
	if (path === '/marketing/performance') return 'performance';
	if (path === '/marketing/creative-team') return 'creative-team';
	if (path === '/marketing/assets') return 'assets';
	if (path === '/creative/dashboard') return 'creative-dashboard';
	if (path === '/creative/creativedashboardpage') return 'creative-dashboard';
	if (path === '/creative/tasks') return 'creative-tasks';
	if (path === '/creative/mytaskspage') return 'creative-tasks';
	if (path === '/creative/briefs') return 'creative-briefs';
	if (path === '/creative/creativebriefspage') return 'creative-briefs';
	if (path === '/creative/reviews') return 'creative-reviews';
	if (path === '/creative/reviewrevisionspage') return 'creative-reviews';
	if (path === '/creative/completed') return 'creative-completed';
	if (path === '/creative/completedworkpage') return 'creative-completed';
	return 'login';
}

function AppContent() {
	const { currentRoute, navigateTo } = useApp();
	const [route, setRoute] = useState<Route>(() => routeFromPath(window.location.pathname));

	useEffect(() => {
		const handlePopState = () => setRoute(routeFromPath(window.location.pathname));
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	useEffect(() => {
		setRoute(routeFromPath(currentRoute));
	}, [currentRoute]);

	const navigate = (nextRoute: NavigationRoute) => {
		const paths: Record<NavigationRoute, string> = {
			login: '/login',
			signup: '/signup',
			'forgot-password': '/forgot-password',
			overview: '/marketing/overview',
			brands: '/marketing/brands',
			campaigns: '/marketing/campaigns',
			'ai-studio': '/marketing/ai-studio',
			calendar: '/marketing/calendar',
			performance: '/marketing/performance',
			'creative-team': '/marketing/creative-team',
			assets: '/marketing/assets',
			'creative-dashboard': '/creative/dashboard',
			'creative-tasks': '/creative/tasks',
			'creative-briefs': '/creative/briefs',
			'creative-reviews': '/creative/reviews',
			'creative-completed': '/creative/completed',
		};
		const path = paths[nextRoute];
		setRoute(routeFromPath(path));
		navigateTo(path);
	};

	if (route === 'overview') {
		return <MarketingLayout><OverviewPage /></MarketingLayout>;
	}

	if (route === 'brands') {
		return <MarketingLayout><BrandsPage /></MarketingLayout>;
	}

	if (route === 'campaigns') {
		return <MarketingLayout><CampaignsPage /></MarketingLayout>;
	}

	if (route === 'ai-studio') {
		return <MarketingLayout><AIStudioPage /></MarketingLayout>;
	}

	if (route === 'calendar') {
		return <MarketingLayout><CalendarPage /></MarketingLayout>;
	}

	if (route === 'performance') {
		return <MarketingLayout><PerformancePage /></MarketingLayout>;
	}

	if (route === 'creative-team') {
		return <MarketingLayout><CreativeTeamPage /></MarketingLayout>;
	}

	if (route === 'assets') {
		return <MarketingLayout><AssetHubPage /></MarketingLayout>;
	}

	if (route === 'creative-dashboard') {
		return <CreativeLayout><CreativeDashboardPage /></CreativeLayout>;
	}

	if (route === 'creative-tasks') {
		return <CreativeLayout><MyTasksPage /></CreativeLayout>;
	}

	if (route === 'creative-briefs') {
		return <CreativeLayout><CreativeBriefsPage /></CreativeLayout>;
	}

	if (route === 'creative-reviews') {
		return <CreativeLayout><ReviewRevisionsPage /></CreativeLayout>;
	}

	if (route === 'creative-completed') {
		return <CreativeLayout><CompletedWorkPage /></CreativeLayout>;
	}

	if (route === 'forgot-password') {
		return <ForgotPasswordPage onNavigate={navigate} />;
	}

	if (route === 'signup') {
		return <SignUpPage onNavigate={navigate} />;
	}

	return <LoginPage onNavigate={navigate} onLoginSuccess={() => navigate('overview')} />;
}

export default function App() {
	return (
		<AppProvider>
			<AppContent />
		</AppProvider>
	);
}
