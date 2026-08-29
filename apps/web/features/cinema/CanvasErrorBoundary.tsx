"use client";
import { Component, type ReactNode } from "react";

interface State {
  failed: boolean;
}

export class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null; // static backdrop shows through
    return this.props.children;
  }
}
