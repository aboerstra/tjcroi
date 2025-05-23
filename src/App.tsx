import React, { useEffect } from 'react';
import Dashboard from './components/Dashboard';
import './index.css';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
    console.log('ErrorBoundary constructed');
  }

  static getDerivedStateFromError(error: any) {
    console.error('ErrorBoundary caught error:', error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Detailed error info:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-600">
          <h1>Something went wrong.</h1>
          <p>Please check the console for more details.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  useEffect(() => {
    console.log('App mounted');
    
    // Function to remove red bar
    const removeRedBar = () => {
      console.log('Removing red bars...');
      const redBars = document.querySelectorAll('div[style*="background-color: red"], div[style*="background-color:#ff0000"], div[style*="background-color: #ff0000"], div[style*="background-color:red"], div[style*="background:red"], div[style*="background: red"]');
      redBars.forEach(bar => {
        if (bar instanceof HTMLElement) {
          bar.style.display = 'none';
        }
      });
      
      // Also remove any elements with red background
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        if (el instanceof HTMLElement) {
          const style = window.getComputedStyle(el);
          if (style.backgroundColor === 'rgb(255, 0, 0)' || 
              style.backgroundColor === '#ff0000' || 
              style.backgroundColor === 'red') {
            el.style.display = 'none';
          }
        }
      });
    };
    
    // Function to move toggle below header
    const moveToggle = () => {
      console.log('Moving toggle...');
      const toggleContainer = document.getElementById('toggle-container');
      if (!toggleContainer) {
        console.log('Toggle container not found');
        return;
      }
      
      const header = document.querySelector('.bg-purple-900');
      if (header) {
        console.log('Header found, moving toggle');
        header.parentNode?.insertBefore(toggleContainer, header.nextSibling);
        toggleContainer.style.display = 'block';
      } else {
        console.log('Header not found');
      }
    };
    
    // Run immediately and also after a delay to ensure DOM is fully loaded
    removeRedBar();
    moveToggle();
    
    // Run again after a delay to catch any dynamically added elements
    setTimeout(() => {
      console.log('Running delayed cleanup...');
      removeRedBar();
      moveToggle();
    }, 500);
    
    // Run periodically to ensure red bar stays removed
    const interval = setInterval(() => {
      removeRedBar();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  console.log('App rendering...');
  
  try {
    return (
      <ErrorBoundary>
        <div className="app-container">
          <Dashboard />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error in App render:', error);
    return <div>Failed to render app</div>;
  }
}

export default App;
