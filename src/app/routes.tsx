import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import ProjectDetail from '../pages/Projects/ProjectDetail';
import Poetry from '../pages/Poetry/Poetry';
import Resume from '../pages/Resume/Resume';
import Contact from '../pages/Contact/Contact';
import Skills from '../pages/Skills/Skills';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />, // friendly fallback for route errors (including 404)
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'projects', element: <Projects /> },
            { path: 'projects/:slug', element: <ProjectDetail /> },
            { path: 'poetry', element: <Poetry /> },
            { path: 'skills', element: <Skills /> },
            { path: 'resume', element: <Resume /> },
            { path: 'contact', element: <Contact /> },
            { path: '*', element: <NotFound /> }, // catch-all for unmatched URLs
        ],
    },
]);
