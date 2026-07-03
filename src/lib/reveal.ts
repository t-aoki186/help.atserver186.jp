export function reveal(node: HTMLElement) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add("visible");
        observer.unobserve(node);
      }
    },
    { threshold: 0.1 }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    }
  };
}