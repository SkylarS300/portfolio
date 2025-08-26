import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Projects from '../pages/Projects/Projects';
import ProjectDetail from '../pages/Projects/ProjectDetail';
import Poetry from '../pages/Poetry/Poetry';
import Resume from '../pages/Resume/Resume';
import Contact from '../pages/Contact/Contact';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'projects', element: <Projects /> },
            { path: 'projects/:slug', element: <ProjectDetail /> },
            { path: 'poetry', element: <Poetry /> },
            { path: 'resume', element: <Resume /> },
            { path: 'contact', element: <Contact /> },
        ],
    },
]);
