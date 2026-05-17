/**
 * Next.js App Router template — RootLayout 안의 children 을 wrap.
 * layout.tsx 와 달리 라우트 변경 시마다 *재마운트* — fade-in + slide-in 자연 trigger.
 *
 * tailwindcss-animate 의 utility 사용:
 *   animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out
 *
 * SiteNav / SiteFooter 는 layout.tsx 에 머무르므로 animation 영향 받지 않음.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
      {children}
    </div>
  );
}
