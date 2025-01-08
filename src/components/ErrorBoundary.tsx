// src/components/ErrorBoundary.tsx
"use client";

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Алдаа гарлаа</h1>
            <p>Уучлаарай, алдаа гарлаа. Та хуудсаа дахин ачааллана уу.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Дахин ачааллах
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
