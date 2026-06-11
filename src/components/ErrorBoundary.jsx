import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0B0F19] text-[#E5E7EB] p-10">
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <pre className="bg-[#111827] p-4 rounded-lg text-sm text-red-300 overflow-auto">
            {String(this.state.error)}
            <br />
            {this.state.info?.componentStack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
